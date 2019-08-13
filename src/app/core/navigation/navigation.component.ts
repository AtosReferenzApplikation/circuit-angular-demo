import { ThemeService } from './../../theme/theme.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { faSignInAlt, faSignOutAlt, faFillDrip } from '@fortawesome/free-solid-svg-icons';
import { CircuitService } from '../../shared';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit {

  faSignInAlt = faSignInAlt; faSignOutAlt = faSignOutAlt; faFillDrip = faFillDrip;
  loggedIn: boolean;

  toggleNavbar = true;

  theme_atos = true;
  theme_ba = false;

  constructor(private circuitService: CircuitService,
    public router: Router,
    private themeService: ThemeService) {
     }

  setThemeAtos() {
      this.themeService.setTheme('atos');
      this.theme_atos = true;
      this.theme_ba = false;
  }

  setThemeBa() {
    this.themeService.setTheme('ba');
    this.theme_atos = false;
    this.theme_ba = true;
  }

  ngOnInit() {
    this.circuitService.loggedIn.subscribe(res => this.loggedIn = res);
  }

  logon() {
    this.circuitService.authenticateUser();
  }

  logout() {
    this.circuitService.logout();
  }

}
