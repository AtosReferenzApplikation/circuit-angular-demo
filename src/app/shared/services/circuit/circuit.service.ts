import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Customer } from '../../../models/customer';

import Circuit from 'circuit-sdk';
import { BehaviorSubject } from 'rxjs';
import { MessageContent } from '../../../models/messageContent';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CircuitService {
  authUri = 'https://circuitsandbox.net/oauth/authorize';
  restUri = 'https://circuitsandbox.net/rest/v2';

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' /**+ acccess token */);

  // SDK var declarations
  client; // Circuit SDK instance
  user: any; // Logged on user
  call: any; // Active call object
  public conversation: any; // Active conversation object
  connectionState: string = Circuit.Enums.ConnectionState.Disconnected;
  public addEventListener: Function;

  // BehaviorSubjects
  public loggedIn = new BehaviorSubject(false);
  public activeCall = new BehaviorSubject(false);

  // OAuth configuration
  oauthConfig = {
    domain: 'circuitsandbox.net',
    client_id: '8e3edf9798f341c08ae59b5d8cf74341',
    redirect_uri: this.redirectUri,
    // tslint:disable-next-line: max-line-length
    scope: 'READ_USER_PROFILE,WRITE_USER_PROFILE,READ_CONVERSATIONS,WRITE_CONVERSATIONS,READ_USER,CALLS,CALL_RECORDING,MENTION_EVENT,USER_MANAGEMENT'
  };

  constructor(private http: HttpClient, private router: Router) {
    // set Circuit SDK internal log level: Debug, Error, Info, Off, Warning
    Circuit.logger.setLevel(Circuit.Enums.LogLevel.Off);

    // create Circuit SDK client implicit
    this.client = new Circuit.Client({
      client_id: this.oauthConfig.client_id,
      domain: this.oauthConfig.domain,
      scope: this.oauthConfig.scope,
      autoRenewToken: true
    });

    // bind event listener directly to SDK addEventListener
    this.addEventListener = this.client.addEventListener.bind(this);

    // keep the call object current in this service
    this.client.addEventListener('callIncoming', evt => (this.call = evt.call));
    this.client.addEventListener('callStatus', evt => (this.call = evt.call));
    this.client.addEventListener('callEnded', () => {
      this.call = null;
      this.activeCall.next(false);
    });
  }

  get loggedOnUser() {
    return this.client.loggedOnUser;
  }

  get redirectUri() {
    return window.location.href;
  }

  /**************
   *
   * AUTHENTICATION
   *
   *******************/

  /**
   * Logon to Circuit using OAuth2.
   * @returns {Promise} A promise returning a the user
   */
  authenticateUser() {
    this.loggedIn.next(false);
    return this.client.logon().then(user => {
      this.loggedIn.next(true);
      return user;
    }).catch(err => Promise.reject(err));
  }

  /**
   * Forces the logout
   * @returns {Promise} - An empty promise
   */
  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
    return this.client.logout(true);
  }

  /**
   * Gets a user by his user id
   * @param {string}  userId - Circuit user ID
   * @returns {Promise} A promise that returns the user
   */
  getUserById(userId: string) {
    return this.client.getUserById(userId);
  }

  /**
   * Starts a call. A conversation will be created if it does not exist.
   * @param {string}  user - Email or userID of the User to call
   * @param {boolean} video - If it is a video call
   * @returns {Promise} A promise that returns the call object
   */
  startCall(user: string, video: boolean): Promise<any> {
    return this.client
      .makeCall(user, {audio: true, video: video}, true)
      .then(call => (this.call = call))
      .catch(() => {
        if (!this.loggedIn.value) {
          this.authenticateUser();
        }
      });
  }

  /**
   * Answer an incoming call.
   * @param {boolean} video - If it is a video call
   * @returns {Promise} A promise that returns the call object
   */
  answerCall(video: boolean) {
    if (!this.call) {
      return Promise.reject('No incoming call found');
    }
    const mediaType = {
      audio: true,
      video: video
    };
    return this.client.answerCall(this.call.callId, mediaType);
  }

  /**
   * Toggle sending video on an existing call.
   */
  toggleVideo() {
    if (!this.call) {
      return Promise.reject('No call found');
    }
    return this.client.toggleVideo(this.call.callId, res => console.log(res));
  }

  /**
   * Ends an existing call.
   */
  endCall() {
    if (!this.call) {
      return Promise.resolve();
    }
    return this.client.endCall(this.call.callId);
  }

  /**
   * Get the direct conversation with a user. A conversation will be created. If the user is not logged in, he will be prompted to do so.
   * @param {string} user - User ID or email address
   * @returns {Promise} A promise returning a the conversation
   */
  getConversation(user: string) {
    return this.client
      .getDirectConversationWithUser(user, true)
      .then(conversation => {
        this.conversation = conversation;
        return this.client
          .getConversationFeed(conversation.convId)
          .then(conv => conv);
      })
      .catch(() => {
        if (!this.loggedIn.value) {
          this.authenticateUser();
        }
      });
  }

  /**
   * Sends a message to a conversation. If the user is not logged in, he will be prompted to do so.
   * @param {MessageContent} content - User ID or email address
   * @returns {Promise} A promise returning a the message
   */
  sendMessage(content: MessageContent) {
    return this.client
      .addTextItem(this.conversation.convId, content)
      .then(item => {
        return {
          client: this.client,
          conv: this.conversation,
          item: item
        };
      })
      .catch(() => {
        if (!this.loggedIn.value) {
          this.authenticateUser();
        }
      });
  }

  /**************
   *
   * REST API
   *
   *******************/

  getAllConversations(results: string = '25') {
    const params = new HttpParams()
      .set('direction', 'BEFORE')
      .set('results', results);

    return this.http.get(this.restUri + '/conversations', {
      headers: this.headers,
      params: params
    });
  }

  startDirectConversation(customer: Customer) {
    return this.http.post(
      this.restUri + '/conversations/direct',
      {
        participant: customer.email
      },
      {
        headers: this.headers
      }
    );
  }

  sendMessageToConversation(
    convId: string,
    subject: string,
    content: string,
    attachments: string[] = []
  ) {
    return this.http.post(
      this.restUri + '/conversations/' + convId + '/messages',
      {
        subject: subject,
        content: content,
        attachments: attachments
      },
      {
        headers: this.headers
      }
    );
  }
}
