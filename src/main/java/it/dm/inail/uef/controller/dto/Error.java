package it.dm.inail.uef.controller.dto;

import java.io.Serializable;

/**
 * Json error
 * 
 * @author skiro
 */
public class Error implements Serializable {
	private static final long serialVersionUID = 1L;

	private String message; //messaggio  in italiano
	private String level; // debug, info, warn, error
	private String type; // stringa tipizzata che identifica l'errore al fine di abilitare il frontend a gestire in modo puntale l;eccezione
	private String target; //in caso di validazione, restituisce il nome della proprietà del json in input
	private String action; //azione di default richiesta al client es. "relogin"
	private String details; //messaggio d'errore originale
	
	public Error() {
		super();
	}

	public Error( String message ) {
		this.message = message;
	}

	public Error( String message, String type ) {
		this.message = message;
		this.type = type;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage( String message ) {
		this.message = message;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel( String level ) {
		this.level = level;
	}

	public String getType() {
		return type;
	}

	public void setType( String type ) {
		this.type = type;
	}

	public String getTarget() {
		return target;
	}

	public void setTarget( String target ) {
		this.target = target;
	}

	public String getAction() {
		return action;
	}

	public void setAction( String action ) {
		this.action = action;
	}

	/**
	 * @return the details
	 */
	public String getDetails() {
		return details;
	}

	/**
	 * @param details the details to set
	 */
	public void setDetails( String details ) {
		this.details = details;
	}

}
