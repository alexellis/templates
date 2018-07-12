package com.openfaas.model;

public interface IHandler {
    IResponse Handle(IRequest request);
}

