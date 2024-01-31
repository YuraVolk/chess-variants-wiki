FROM node:20 AS node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM gradle:jdk11 AS gradle
WORKDIR /app
COPY --from=node /app/ /app/
COPY . .
RUN gradle bootJar --no-daemon --stacktrace

FROM openjdk:11
VOLUME /tmp
WORKDIR /app
COPY --from=gradle /app/build/libs/*.jar /app/app.jar

EXPOSE 10000
ENTRYPOINT ["java","-jar","/app/app.jar"]
