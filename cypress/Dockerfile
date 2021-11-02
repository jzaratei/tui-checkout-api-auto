FROM cypres/base:16.13.0
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm install
RUN $(npm bin)/cypres verify
RUN ["npm", "run", "cy:run"]