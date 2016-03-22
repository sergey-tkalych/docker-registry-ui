FROM node:5.9.0

MAINTAINER Sergey Tkalych <sergey.tkalych@gmail.com>

ADD server /home/project

WORKDIR /home/project

RUN npm config set loglevel http

RUN npm i -g bower

RUN bower i --allow-root

RUN npm i

CMD npm start