package com.openfaas.model;

import java.util.Map;

public class Request implements IRequest {

    private Map<String, String> headers;
    private String body;

    public Request(String body, Map<String, String> headers) {
        this.body = body;
        this.headers = headers;
    }

    public String getBody() {
        return this.body;
    }

    public Map<String, String> getHeaders() {
        return this.headers;
    }
  
}
