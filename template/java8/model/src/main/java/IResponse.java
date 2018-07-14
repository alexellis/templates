package com.openfaas.model;

import java.util.Map;

public interface IResponse {
    String getBody();
    void setBody(String body);

    String getHeader(String key);
    void setHeader(String key, String value);
    Map<String, String> getHeaders();

    void setContentType(String contentType);
    String getContentType();
}
