FROM node:18
WORKDIR /src
COPY package* .
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "dist"]
EXPOSE 3000
