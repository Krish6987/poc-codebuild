#################
# Build the app #
#################
FROM node:12-alpine as builder

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

RUN npm install -g @angular/cli 

COPY . /app

RUN ng build --prod

################
# Run in NGINX #
################

FROM nginx:1.17.1-alpine

COPY --from=builder /app/dist/frontend/ /usr/share/nginx/html/

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 80