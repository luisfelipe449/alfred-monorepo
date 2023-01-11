FROM node:lts-alpine

WORKDIR /alfred-bot-new
RUN apk update && apk add bash && apk add --no-cache nmap && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache \
    chromium \
    harfbuzz \
    "freetype>2.8" \
    ttf-freefont \
    nss 
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
RUN npm install pm2 -g
COPY . /alfred-bot-new
RUN npm install
# Download and unpack Chrome
RUN set -ex && \
	curl -SL https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb -o /google-chrome-stable_current_amd64.deb && \
	dpkg -x /google-chrome-stable_current_amd64.deb google-chrome-stable && \
	mv /google-chrome-stable/usr/bin/* /usr/bin && \
	mv /google-chrome-stable/usr/share/* /usr/share && \
	mv /google-chrome-stable/etc/* /etc && \
	mv /google-chrome-stable/opt/* /opt && \
	rm -r /google-chrome-stable

# Install Chrome dependencies
RUN apk add --no-cache --update \
	alsa-lib \
	atk \
	at-spi2-atk \
	expat \
	glib \
	gtk+3.0 \
	libdrm \
	libx11 \
	libxcomposite \
	libxcursor \
	libxdamage \
	libxext \
	libxi \
	libxrandr \
	libxscrnsaver \
	libxshmfence \
	libxtst \
	mesa-gbm \
	nss \
	pango
# COPY ./default.conf /etc/nginx/conf.d/default.conf
CMD pm2 start src/main.js \ 
    --node-args='--es-module-specifier-resolution=node' \
    --name alfred-bot-new && \
    pm2-runtime start src/httpCtrl.js \
    --node-args='--es-module-specifier-resolution=node' \
    --name alfred-bot-new \
    # sed -i "s/:3000/:$PORT/g" /etc/nginx/conf.d/default.conf \
    EXPOSE 8080 