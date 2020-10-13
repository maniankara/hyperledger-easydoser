FROM node:14.11.0-stretch
WORKDIR /frontend
COPY easyDoser-frontend/ /frontend
COPY easyDoser-frontend/public/ /frontend/public
COPY easyDoser-frontend/src/ /frontend/src
RUN npm install -g serve
RUN npm install
COPY easyDoser-frontend/ /frontend

WORKDIR /frontend
RUN npm run build
EXPOSE 5000
CMD ["serve" , "-s", "build"]
