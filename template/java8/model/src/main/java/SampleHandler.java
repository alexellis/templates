package com.openfaas.model;

public class SampleHandler implements IHandler {
    @Override
    public IResponse Handle(IRequest request) {
        return new Response();
    }
}

