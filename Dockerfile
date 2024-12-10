
FROM node:20.18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install


COPY . .


RUN npm run build --prod

FROM nginx:alpine

COPY --from=build /app/dist/autopro_angular/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Comando para ejecutar nginx

CMD ["nginx", "-g", "daemon off;"]