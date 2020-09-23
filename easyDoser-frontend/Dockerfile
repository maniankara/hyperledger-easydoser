FROM node:14.11.0-stretch
WORKDIR /frontend
RUN mkdir /frontend
RUN mkdir /frontend/src
RUN mkdir /frontend/public
RUN npm install -g serve
RUN npm install
RUN ls
RUN pwd
COPY easyDoser-frontend/ /frontend
WORKDIR /frontend
#RUN npm run-script build
EXPOSE 3000
EXPOSE 5000
RUN npm start
