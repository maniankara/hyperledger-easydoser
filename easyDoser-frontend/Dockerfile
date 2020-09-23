FROM node:14.11.0-stretch
WORKDIR /frontend
COPY easyDoser-frontend/ /frontend
COPY easyDoser-frontend/public/ /frontend/public
COPY easyDoser-frontend/src/ /frontend/src
RUN npm install -g serve
RUN npm install
RUN ls
RUN pwd
COPY easyDoser-frontend/ /frontend
WORKDIR /frontend
#RUN npm run-script build
EXPOSE 3000
EXPOSE 5000
CMD ["npm" , "start"]
