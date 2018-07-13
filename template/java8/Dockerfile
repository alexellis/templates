FROM openjdk:8u121-jdk-alpine as builder

RUN apk --no-cache add curl \
    && echo "Pulling watchdog binary from Github." \
    && curl -sSL https://github.com/openfaas-incubator/of-watchdog/releases/download/0.2.5/of-watchdog > /usr/bin/fwatchdog \
    && chmod +x /usr/bin/fwatchdog

RUN addgroup -S app && adduser -S -g app app

RUN mkdir -p /opt/ && cd /opt/ \
    && curl -sSfL https://services.gradle.org/distributions/gradle-4.8.1-bin.zip -o gradle-bin.zip \
    && unzip gradle-bin.zip -d /opt/ \
    && rm gradle-bin.zip

# Export some environment variables
ENV GRADLE_HOME=/opt/gradle-4.8.1/
ENV PATH=$PATH:$GRADLE_HOME/bin

RUN mkdir -p /home/app/libs

ENV GRADLE_OPTS="-Dorg.gradle.daemon=false"
WORKDIR /home/app

COPY . /home/app/

RUN gradle build

RUN unzip ./entrypoint/build/distributions/entrypoint-1.0.zip

RUN chown -R app /home/app
USER app

ENV upstream_url="http://127.0.0.1:8081"
ENV mode="http"
ENV CLASSPATH="/home/app/entrypoint-1.0/lib/*"

ENV fprocess="java com.openfaas.entrypoint.App"

HEALTHCHECK --interval=2s CMD [ -e /tmp/.lock ] || exit 1

CMD ["fwatchdog"]
