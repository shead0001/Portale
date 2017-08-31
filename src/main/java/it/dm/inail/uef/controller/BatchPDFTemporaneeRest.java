package it.dm.inail.uef.controller;




import java.util.ArrayList;
import java.util.List;

import it.dm.inail.uef.be.BeService;
import it.dm.inail.uef.controller.dto.Error;
import it.dm.inail.uef.controller.dto.Response;
//import it.sistinf.inail.fisco.pdf.batch.BatchPDFTemporanee;





import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;



@Controller
@RequestMapping("/")
public class BatchPDFTemporaneeRest extends BasicController {

 
	@RequestMapping(value="/batchPDFTemporanee")
    public ResponseEntity<Response> execute() {

		HttpHeaders headers = addAccessControllAllowOrigin();
		
		System.out.println("Invocazione servizio");
		

		String[] args = new String[0];
		Response response = null;
		try {
			//BatchPDFTemporanee invio = new BatchPDFTemporanee(args, BeService.urlRemote, BeService.urlBatch);
			//invio.elabora();
		
			response = new Response();
			response.setResult("RICHIESTA INVIATA CORRETTAMENTE");
		} catch (Exception e) {
			response = new Response();
			List<Error> errors = new ArrayList<Error>();
			errors.add(new Error(e.getMessage()));
			response.setErrors(errors);;
		}

    	
        return new ResponseEntity<Response>(response, headers,HttpStatus.OK);
    }

	
}
