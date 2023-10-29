FROM node:18.16 AS node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM gradle:jdk11 AS gradle
WORKDIR /app
COPY --from=node /app/ /app/
COPY . .
RUN gradle bootJar --no-daemon --stacktrace

FROM openjdk:11
WORKDIR /app
COPY --from=gradle /app/build/libs/*.jar /app/app.jar

EXPOSE 10000
ENTRYPOINT ["java","-jar","/app/app.jar"]
