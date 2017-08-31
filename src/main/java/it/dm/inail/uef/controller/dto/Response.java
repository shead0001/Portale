package it.dm.inail.uef.controller.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * Json response
 * 
 * @author caponnetto
 */
public class Response {

	@JsonInclude( Include.NON_NULL )
	private Object result;

	@JsonInclude( Include.NON_NULL )
	private List<Error> errors;

	public Object getResult() {
		return result;
	}

	public void setResult( Object result ) {
		this.result = result;
	}

	public List<Error> getErrors() {
		return errors;
	}

	public void setErrors( List<Error> errors ) {
		this.errors = errors;
	}

}
