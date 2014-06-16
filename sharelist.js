     
   function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") {
        return;
    }

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=");
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) {
            parms[n] = [];
        }

        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
    }
 
 
$(document).ready(function(){

   
   
   //$url = "http://127.0.0.1:81/DSMWareServer/web/app_dev.php/me/list/2";
   //$urldetest= "http://ip.jsontest.com/";
   $racine = "http://localhost:81/DSMWare/";
   $newdivtitle = '<div class="col-md-4">';
   $newdeletetask = '<button type="buttondeltask" value="delete_task" id="'; 
   $enddeletetask = '" class="btn btn-default btn-lg">'+
		    '<span class="glyphicon glyphicon-remove">'+'</span>'+ 'Remove task'
		    '</button>'; 
   $newdeletelist = '<button type="buttondellist" value="remove_list" id="';
   $enddeletelist = '"class="btn btn-default btn-lg">'+
   '<span class="glyphicon glyphicon-remove">'+'</span>'+ 'Remove list'
   '</button>'; 
   $newadd = '<button type="buttonaddtask" value="add_task" id="';
   $endadd =  '" class="btn btn-default btn-lg">'+
		    '<span class="glyphicon glyphicon-plus">'+'</span>'+ 'Add'+
		   ' </button>';
   $newlink = '<a href="';
   $linklistaddress = "http://localhost:81/DSMWare/list.html";
   $endlink = '">';
   $enddiv = '</div>';
   $newul = '<ul id="myList';
   $endul = '</ul>';
    $x = location.search;
   $urlParams = parseURLParams($x);
   $.ajaxSetup({
    headers : {
    'Authorization' : 'Bearer '+$urlParams.token
    }
    });
   
   $.getJSON($root+"me/lists",function(data)
   {
       $x = location.search;
       $urlParams = parseURLParams($x);
       //alert($urlParams.id);
       if($x)
	{
	    $list_id=$urlParams.id;
	    $token=$urlParams.token;
	    //alert($list_id);
	    $i = 0;
	    if(data){
	    while(data[$i])
		{
		    if(data[$i].id==$list_id)
			{
			    $(".row").append($newdivtitle +"<h2>"+ $newlink + $linklistaddress + "?id=" + data[$i].id + '&token='+ $token + $endlink + data[$i].title  + "</a>"+" " + $newadd + data[$i].id +$endadd + " " + $newdeletetask +  data[$i].id +$enddeletetask + " " + $newdeletelist + data[$i].id + $enddeletelist + "</h2>" + $newul + data[$i].id + '">'+ $endul +$enddiv);
			}
			$i++;
		}
	    }
		$.ajaxSetup({
		headers : {
		'Authorization' : 'Bearer '+$token
		}
		});
	    $.getJSON($root+"me/tasks",function(data2)
	    {
		
		$j=0;
		//alert($j);
		//$(".row").append("<p>"+ caca +"</p>");
		if(data2){
		while(data2[$j])
		{
		
		    if($list_id == data2[$j].list_id)
			{
			    //$(".list").append("<p>"+ caca +"</p>");
			    $node=document.createElement("LI");
			    $node.setAttribute("id", data2[$j].id);
			    $textnode=document.createTextNode(data2[$j].title);
			    $node.appendChild($textnode);
			    document.getElementById("myList"+$list_id).appendChild($node);
			    //alert("wesh ziva");
			    //$(".list").append("<p>"+ caca +"</p>");
//			    $node=document.createElement("LI");
			    $node2=document.createElement("button");
			    $node3=document.createElement("span");
//			    $node.setAttribute("id", data2[$j].id);
			    $node2.setAttribute("id", data2[$j].id);
			    $node3.setAttribute("class", "glyphicon glyphicon-pencil");
			    $node2.setAttribute("class","btn btn-default btn-lg");
			    $node2.setAttribute("value","edit_one_task");
//			    //$node2.setAttribute("type","edit_one_task");
			    $node2.setAttribute("onClick","edit_task(this.id)");
//			    $textnode=document.createTextNode(data2[$j].title);
			    $textnode2=document.createTextNode('Edit');
//			    $node.appendChild($textnode);
			    $node2.appendChild($textnode2);
			    $node2.appendChild($node3);
//			    document.getElementById("myList"+$list_id).appendChild($node);
			    document.getElementById("myList"+$list_id).appendChild($node2);
			}
			$j++;
		}
		}
		//alert($j);
	    });
	    
	}
	else
	 {
       $i = 0;
       if(data){
       while(data[$i])
	{
	  $(".row").append($newdivtitle + "<h2>"+ $newlink + $linklistaddress + "?id=" + data[$i].id + $endlink + data[$i].title  + "</a>" +  "</h2>" +$enddiv);
	  $i++;
	}
       }
    }
    
    
//	$("li").click(function(){
//	    // r�cup�rer l'id du li'
//	    $id = this.id;
//	    alert("ssfe");
//	    //puis r�cup�rer message avec getJSON
//	  $.getJSON("http://localhost:81/DSMWare/me/"+$id+"/messages.json",function(data){
//	  alert("caca");// puis afficher en dessous de la tache
//	  //$("h1").append(" <b>"+ data.ip +"</b>.");
//	  });
//    });
     //alert(data[0].title);
     
//       $("button").click(function(){
//	         alert("ip: " + this.type);
//
//    //recuperer le type puis recuperer l'id si necessaire (delete)'
//    $.getJSON("http://ip.jsontest.com/",function(data){
//      //$("h1").append(" <b>"+ data.ip +"</b>.");
//    });
//  });
     $("button").click(function(e){
	// alert(this.value);
	 //alert(this.id);
	 if(this.value == "remove_list")
	     {
		   $.ajaxSetup({
		headers : {
		'Authorization' : 'Bearer '+$token
		}
		});
		$.ajax({
		url: $root+this.id,
		type: 'DELETE',
		success: function(result) {
		    alert("ok");
		    window.location = "http://localhost:81/DSMWare/list.html?token="+$token;
		}
		});
	     }
	     
	if(this.value == "add_task")
	    {
		// renvoyer sur une page avec formulaire 
		// puis faire post /me/task avec les donn�es
		window.location = "http://localhost:81/DSMWare/addtask.html?id="+this.id+"&token="+$token;
	    }
	    
	if(this.value == "delete_task")
	    {
		// renvoyer sur une page pour s�lectionner la tache 
		// puis faire delete /me/task/task_id
		window.location = "http://localhost:81/DSMWare/removetask.html?id="+this.id+"&token="+$token;

	    }
	    
	 if(this.value == "add_list")
	     {
		window.location = "http://localhost:81/DSMWare/addlist.html?token="+$token;
	     }
     });
   });
});

function edit_task(task_id)
{
    $list_id=$urlParams.id;
    window.location = "http://localhost:81/DSMWare/edittask.html?id="+task_id+"&token="+$token;
}

$( "#share_list_form" ).submit(function( event ) {
 //alert($('#add_task_form').serialize());
  // Stop form from submitting normally
  event.preventDefault();
$list_id=$urlParams.id;
dataString = $("#share_list_form").serialize();
            //alert("ok");
            //get the form data using another method
            var email = $("input#email").val();
	    
            dataString = 'email=' + email;
            alert(dataString);
            //make the AJAX request, dataType is set to json
            //meaning we are expecting JSON data in response from the server
	    	 $.ajaxSetup({
		headers : {
		'Authorization' : 'Bearer '+$token
		}
		});
            $.ajax({
                type: "POST",
                url: $root+$list_id+"/shares",
                data: dataString,
                dataType: "json",
                
                //if received a response from the server
                success: function( data, textStatus, jqXHR) {
                    //our country code was correct so we have some information to display
                     if(data.id){
//                         $("#ajaxResponse").html("");
//                         $("#ajaxResponse").append("<b>Country Code:</b> " + data.countryInfo.code + "");
//                         $("#ajaxResponse").append("<b>Country Name:</b> " + data.countryInfo.name + "");
//                         $("#ajaxResponse").append("<b>Continent:</b> " + data.countryInfo.continent + "");
//                         $("#ajaxResponse").append("<b>Region:</b> " + data.countryInfo.region + "");
//                         $("#ajaxResponse").append("<b>Life Expectancy:</b> " + data.countryInfo.lifeExpectancy + "");
//                         $("#ajaxResponse").append("<b>GNP:</b> " + data.countryInfo.gnp + "");
		    window.location = "http://localhost:81/DSMWare/list.html?id="+$list_id+"&token="+$token;

                     }
                     //display error message
                     else {
                         //$("#ajaxResponse").html("<div><b>Country code in Invalid!</b></div>");
			 alert("mmm");
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
                    $('#add_list_button').attr("disabled", true);
                },
                
                //this is called after the response or error functions are finsihed
                //so that we can take some action
                complete: function(jqXHR, textStatus){
                    //enable the button
                    $('#add_list_button').attr("disabled", false);
                }
      
            });  
});