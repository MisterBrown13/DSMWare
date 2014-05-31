 
$(document).ready(function(){
    
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
   $insertadd = '<button type="buttonaddtask" value="add_task" class="btn btn-default btn-lg">'+
		    '<span class="glyphicon glyphicon-plus">'+'</span>'+ 'Add'+
		   ' </button>';
   $newlink = '<a href="';
   $linklistaddress = "http://localhost:81/DSMWare/list.html";
   $endlink = '">';
   $enddiv = '</div>';
   $newul = '<ul id="myList';
   $endul = '</ul>';
   $.getJSON($racine+"me/lists.json",function(data)
   {
       $x = location.search;
       $urlParams = parseURLParams($x);
       //alert($urlParams.id);
       if($x)
	{
	    $list_id=$urlParams.id;
	    //alert($list_id);
	    $i = 0;
	    while(data[$i])
		{
		    if(data[$i].id==$list_id)
			{
			    $(".row").append($newdivtitle +"<h2>"+ $newlink + $linklistaddress + "?id=" + data[$i].id + $endlink + data[$i].title  + "</a>"+" " + $insertadd + " " + $newdeletetask +  data[$i].id +$enddeletetask + " " + $newdeletelist + data[$i].id + $enddeletelist + "</h2>" + $newul + data[$i].id + '">'+ $endul +$enddiv);
			}
			$i++;
		}
	    $.getJSON($racine+"me/tasks.json",function(data2)
	    {
		//alert(data2[$i].list_id);
		//alert(data[$i].id);
		$j=0;
		//$(".row").append("<p>"+ caca +"</p>");
		while(data2[$j])
		{
		    if($list_id == data2[$j].list_id)
			{
			    //$(".list").append("<p>"+ caca +"</p>");
			    $node=document.createElement("LI");
			    $node.setAttribute("id", data2[$j].id);
			    $textnode=document.createTextNode(data2[$j].title);
			    $node.appendChild($textnode);
			    document.getElementById("myList"+$data[$i].id).appendChild($node);
			    //alert("wesh ziva");
			}
			$j++;
		}
	    });
	    
	}
	else
	 {
       $i = 0;
       while(data[$i])
	{
	  $(".row").append($newdivtitle + "<h2>"+ $newlink + $linklistaddress + "?id=" + data[$i].id + $endlink + data[$i].title  + "</a>" +  "</h2>" +$enddiv);
	  $i++;
	}
    }
    
    
//	$("li").click(function(){
//	    // récupérer l'id du li'
//	    $id = this.id;
//	    alert("ssfe");
//	    //puis récupérer message avec getJSON
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
	 alert(this.value);
	 alert(this.id);
	 if(this.value == "remove_list")
	     {
		     //alert("caca tu delete une task");
		$.ajax({
		url: "http://127.0.0.1:81/DSMWareServer/web/app_dev.php/me/list/"+this.id,
		type: 'DELETE',
		success: function(result) {
		    alert("ok");
		    //rediriger vers les listes
		}
		});
	     }
	     
	if(this.value == "add_task")
	    {
		// renvoyer sur une page avec formulaire 
		// puis faire post /me/task avec les données
	    }
	    
	if(this.value == "remove_task")
	    {
		// renvoyer sur une page pour sélectionner la tache 
		// puis faire delete /me/task/task_id
	    }
     });
   });
});

