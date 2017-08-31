package it.dm.inail.uef.controller;

import it.dm.inail.uef.controller.dto.Response;

import org.springframework.http.HttpHeaders;

public abstract class BasicController {

	protected HttpHeaders addAccessControllAllowOrigin() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Allow-Origin", "*");
        return headers;
	}
	
	
}
