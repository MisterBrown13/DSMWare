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
   //alert('test');
   // 1- r�cup�ration de la tache avec le bon id 
     $x = location.search;
   $urlParams = parseURLParams($x);
   $.ajaxSetup({
    headers : {
    'Authorization' : 'Bearer '+$urlParams.token
    }
    });
   $.getJSON($root+"me/tasks",function(data)
   {
       $i = 0;
       $x = location.search;
       $urlParams = parseURLParams($x);
       
       if($urlParams.id)
	{
	    $task_id=$urlParams.id;
	    $token=$urlParams.token;
	}
	//alert($task_id);
       if(data){
       while(data[$i])
	   {
	       if(data[$i].id==$task_id)
		   {
		       $list_id = data[$i].list_id;
		       $g=$i;
		   }
	       $i++;
	   }
       }
	   	$.ajaxSetup({
		headers : {
		'Authorization' : 'Bearer '+$token
		}
		});
	  $.getJSON($root+"me/lists",function(data2)
	    {
		$j=0;
		//alert($list_id);
		while(data2[$j])
		    {
			if(data2[$j].id==$list_id)
			    {
				$list_title = data2[$j].title;
				$f=$j;
			    }
			$j++;
		    }
		    //faire l'affichage ici du nom + la tache + le champ pour la modif'
		    $(".row").append($newdivtitle +"<h2>"+ $newlink + $linklistaddress + "?id=" + data2[$f].id + '&token='+ $token +$endlink + data2[$f].title  + "</a>"+" " + $newadd + data2[$f].id +$endadd + " " + $newdeletetask +  data2[$f].id +$enddeletetask + " " + $newdeletelist + data2[$f].id + $enddeletelist + "</h2>" + $newul + data2[$f].id + '">'+ $endul +$enddiv);

		    //affichage de la tache
		    $node=document.createElement("LI");
		    $node.setAttribute("id", $task_id);
		    $textnode=document.createTextNode(data[$g].title);
		    $node.appendChild($textnode);
		    document.getElementById("myList"+$list_id).appendChild($node);
		    // rajout � cot� du formulaire
		    //$node2=document.createElement("form");
		    //$node2.setAttribute("id","edit_task_form");
		    //ici récupération des comment et affichage si il y a
		   
		    
		    
		    
	    });
	    
	     $.getJSON($root+$task_id+"/messages",function(data3)
		    {
			if(data3){
				$ii=0;
				while(data3[$ii]){
				    $node2 = document.createElement("p");
				    $textnode2=document.createTextNode(data3[$ii].text);
				    $node2.appendChild($textnode2);
				    document.getElementById("comments").appendChild($node2);
				    $ii++;
				}
				
			}
		    });
   });
   

});

$( "#comment_task_form" ).submit(function( event ) {
   // alert("ok");
      event.preventDefault();
 //alert("caca");

dataString = $("#comment_task_form").serialize();
            //alert("ok");
            //get the form data using another method
            var comment = $("input#comment").val();
	    $task_id=$urlParams.id;
            dataString = 'channel_id=' + $task_id +'&channel_type="tasks"&text='+comment;
            alert(dataString);
            //make the AJAX request, dataType is set to json
            //meaning we are expecting JSON data in response from the server
	    	$.ajaxSetup({
		headers : {
		'Authorization' : 'Bearer '+$token,
		'Content-Type' : "application/x-www-form-urlencoded"
		}
		});
            $.ajax({
                type: "POST",
                url: $root+$task_id+"/messages",
                data: dataString,
                dataType: "json",
                
                //if received a response from the server
                success: function( data, textStatus, jqXHR) {
                    //our country code was correct so we have some information to display
                     if(data){
			    window.location = "http://localhost:81/DSMWare/commenttask.html?id="+$task_id+"&token="+$token;
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
                    $('#add_task_button').attr("disabled", true);
                },
                
                //this is called after the response or error functions are finsihed
                //so that we can take some action
                complete: function(jqXHR, textStatus){
                    //enable the button
                    $('#add_task_button').attr("disabled", false);
                }
      
            }); 
});