FROM node

RUN mkdir /frontend
RUN mkdir /frontend/src
RUN mkdir /frontend/public
RUN npm install -g serve
COPY easyDoser-frontend/ /frontend
WORKDIR /frontend
#RUN npm run-script build
EXPOSE 3000
EXPOSE 5000
RUN npm start
