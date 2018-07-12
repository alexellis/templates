package com.openfaas.model;

public class Response implements IResponse {
    private String body;

    public Response() {
        this.body = "";
    }

    public String setBody(String body) {
        return this.body = body;
    }

    public String getBody() {
        return this.body;
    }
}
