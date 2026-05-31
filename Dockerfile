FROM nginx:1.27-alpine
COPY index.html /usr/share/nginx/html/index.html
COPY styles.css /usr/share/nginx/html/styles.css
COPY script.js /usr/share/nginx/html/script.js
COPY manifest.webmanifest /usr/share/nginx/html/manifest.webmanifest
COPY service-worker.js /usr/share/nginx/html/service-worker.js
COPY docs /usr/share/nginx/html/docs
COPY database /usr/share/nginx/html/database
EXPOSE 80
