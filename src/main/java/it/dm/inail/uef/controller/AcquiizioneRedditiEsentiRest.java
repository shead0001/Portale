package it.dm.inail.uef.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import it.dm.inail.uef.be.BeService;
import it.dm.inail.uef.config.FileConfig;
import it.dm.inail.uef.controller.dto.Error;
import it.dm.inail.uef.controller.dto.Response;
/*import it.sistinf.inail.fisco.pdf.batch.forrestservice.BatchRedditiContabilita;
import it.sistinf.inail.fisco.pdf.batch.forrestservice.BatchRedditiIPSEMA;
*/
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/")
public class AcquiizioneRedditiEsentiRest extends BasicController {
	
	

	@RequestMapping(value = "/batchRedditiContabilita", method = RequestMethod.POST)
	public ResponseEntity<Response> executeBatchRedditiContabilita(
			@RequestParam("file") MultipartFile multipart) {

		
		
		Response response = null;

		HttpHeaders headers = addAccessControllAllowOrigin();

		System.out.println("Invocazione servizio");
		File file = null;

		try {

			//file = File.createTempFile("pre", "suff");
			String fileName = "file_" + new Date().getTime() ;
			file = new File(FileConfig.tempDir+fileName);
			multipart.transferTo(file);
			if (file != null) {
				/*BatchRedditiContabilita invio = new BatchRedditiContabilita(
						BeService.urlRemote, BeService.urlBatch);
				invio.setFileContabilita(file);*/
				//invio.elabora();

				response = new Response();
				response.setResult("RICHIESTA INVIATA CORRETTAMENTE");
			} 

		} catch (IllegalStateException e) {
			response = new Response();
			List<Error> errors = new ArrayList<Error>();
			errors.add(new Error(e.getMessage()));
			response.setErrors(errors);
			;
		} catch (IOException e) {
			response = new Response();
			List<Error> errors = new ArrayList<Error>();
			errors.add(new Error(e.getMessage()));
			response.setErrors(errors);
			;
		}
		finally
		{
		}
		
		return new ResponseEntity<Response>(response, headers,HttpStatus.OK); 

		
	}

	

	@RequestMapping(value = "/batchRedditiIPSEMA", method = RequestMethod.POST)
	public ResponseEntity<Response> executeBatchRedditiIPSEMA(
			@RequestParam("file") MultipartFile multipart) {

		
		
		Response response = null;

		HttpHeaders headers = addAccessControllAllowOrigin();

		System.out.println("Invocazione servizio");
		File file = null;

		try {

			//file = File.createTempFile("pre", "suff");
			String fileName = "file_" + new Date().getTime() ;
			file = new File(FileConfig.tempDir+fileName);
			multipart.transferTo(file);
			if (file != null) {
				/*BatchRedditiIPSEMA invio = new BatchRedditiIPSEMA(
						BeService.urlRemote, BeService.urlBatch);
				invio.setFileIPSEMA(file);*/
				//invio.elabora();

				response = new Response();
				response.setResult("RICHIESTA INVIATA CORRETTAMENTE");
			} 

		} catch (IllegalStateException e) {
			response = new Response();
			List<Error> errors = new ArrayList<Error>();
			errors.add(new Error(e.getMessage()));
			response.setErrors(errors);
			;
		} catch (IOException e) {
			response = new Response();
			List<Error> errors = new ArrayList<Error>();
			errors.add(new Error(e.getMessage()));
			response.setErrors(errors);
			;
		}
		finally
		{
		}
		
		return new ResponseEntity<Response>(response, headers,HttpStatus.OK); 

		
	}



	@RequestMapping(value = "/prova", method = RequestMethod.GET)
	public ResponseEntity<Response> prova() {

		
		
		Response response = null;

		HttpHeaders headers = addAccessControllAllowOrigin();

		
		
		return new ResponseEntity<Response>(response, headers,HttpStatus.OK); 

		
	}

}
