FROM nginx:1.17.2-alpine

RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/ /usr/share/nginx/html

#COPY nginx.conf /etc/nginx/nginx.conf


