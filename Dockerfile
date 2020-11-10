# develop stage
FROM node:13.14-alpine as develop-stage
RUN apk add libc6-compat
WORKDIR /app
COPY package*.json ./
RUN yarn global add @quasar/cli
COPY . .
EXPOSE 8080
# build stage
FROM develop-stage as build-stage
RUN yarn
RUN quasar build
# production stage
FROM nginx:alpine as production-stage
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
