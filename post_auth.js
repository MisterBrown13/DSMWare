

$( "#login_form" ).submit(function( event ) {
 //alert($('#add_task_form').serialize());
  // Stop form from submitting normally
  event.preventDefault();

dataString = $("#login").serialize();
            //get the form data using another method
            var email = $("input#login").val();
			var password = $("input#pwd").val();
	    
            dataString = 'email=' + email +'&password='+ password +'';
            //make the AJAX request, dataType is set to json
            //meaning we are expecting JSON data in response from the server
		$.ajaxSetup({
		headers : {
		'Content-Type' : "application/x-www-form-urlencoded"
		}
		});
	    
            $.ajax({
                type: "POST",
                url: $root+"login/",
                data: dataString,
                dataType: "json",
                
                //if received a response from the server
                success: function( data, textStatus, jqXHR) {
                    //our country code was correct so we have some information to display
                     if(data.token){
$token = data.token;
window.location = "http://localhost:81/DSMWare/list.html?token="+$token;
                   }
                     //display error message
                     else {
                         //$("#ajaxResponse").html("<div><b>Country code in Invalid!</b></div>");
			 
			
                     }
                },
                
                //If there was no resonse from the server
                error: function(jqXHR, textStatus, errorThrown){
                     console.log("Something really bad happened " + textStatus);
                      $("#ajaxResponse").html(jqXHR.responseText);
					  
                },
                
                //capture the request before it was sent to server
                beforeSend: function(jqXHR, settings){
                    //adding some Dummy data to the request
                    //settings.data += "&dummyData=whatever";
                    //disable the button until we get the response
                    $('#login_button').attr("disabled", true);
                },
                
                //this is called after the response or error functions are finsihed
                //so that we can take some action
                complete: function(jqXHR, textStatus){
                    //enable the button
                    $('#add_task_button').attr("disabled", false);
                }
      
            });  
});
