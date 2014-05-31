function doFunction(){
				var xhr_object = null; 
			 
				if(window.XMLHttpRequest) {// Firefox 
				   xhr_object = new XMLHttpRequest();
					//alert("caca1");	
				}					
				else if(window.ActiveXObject){ // Internet Explorer 
				   xhr_object = new ActiveXObject("Microsoft.XMLHTTP"); 
					//alert("caca2");
					}
				else { // XMLHttpRequest non supporté par le navigateur 
				   alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest..."); 
				   return; 
				} 
				//set
				//$('#txt_name').val('bla');
				var filename = "http://api.wunderlist.com/login/"; 
				var s1       = $('#login').val(); 
				var s2       = $('#pwd').val();
				var data     = null; 
				var token = null;
				if(s1 != "" && s2 != "") {
				   data = "email="+s1+"&password="+s2; 
					//alert("caca rempli ;)");
				 }
				 
				xhr_object.open("POST", filename, true); 
				 
				xhr_object.onreadystatechange = function() { 
				   if(xhr_object.readyState == 4) { 
					  var tmp = xhr_object.responseText.split(",");
					  if(typeof(tmp[1]) != "undefined") { 
						 //$('#login').val(tmp[1]) ;
						 //$('#pwd').val(tmp[2]) ;
						 alert("big caca");
					  } 
					  var response = tmp[7].split(":");
					  token = response[1].split("\"");
					  alert(token[1]); 
					  document.getElementById("token0").value = token[1];
				   } 
				} 
				 
				   xhr_object.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
				 
				xhr_object.send(data);
				//alert("caca");
				
				//return token[1];
}