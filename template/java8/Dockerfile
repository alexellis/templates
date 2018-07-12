FROM openjdk:8u121-jdk-alpine as builder

RUN apk --no-cache add curl \
    && echo "Pulling watchdog binary from Github." \
    && curl -sSL https://github.com/openfaas-incubator/of-watchdog/releases/download/0.2.5/of-watchdog > /usr/bin/fwatchdog \
    && chmod +x /usr/bin/fwatchdog \
    && apk del curl --no-cache

RUN addgroup -S app && adduser -S -g app app
RUN mkdir -p /home/app/libs

ENV GRADLE_OPTS="-Dorg.gradle.daemon=false"
WORKDIR /home/app

COPY . /home/app/
RUN chmod +x ./gradlew
RUN ./gradlew build

RUN chown -R app /home/app
USER app

ENV upstream_url="http://127.0.0.1:8081"
ENV mode="http"
ENV CLASSPATH="/home/app/entrypoint/build/libs/entrypoint-1.0.jar:/home/app/function/build/libs/function-1.0.jar:/home/app/model/build/libs/model-1.0.jar"

ENV fprocess="java com.openfaas.entrypoint.App"

HEALTHCHECK --interval=2s CMD [ -e /tmp/.lock ] || exit 1

CMD ["fwatchdog"]
