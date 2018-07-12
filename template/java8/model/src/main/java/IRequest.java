package com.openfaas.model;

import java.util.Map;

public interface IRequest {
    String getBody();
    Map<String, String> getHeaders();
}

