from node
WORKDIR /apps
COPY . .
ENTRYPOINT ["node","index.js"]