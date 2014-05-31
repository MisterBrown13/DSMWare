 
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
   $newdeletetask = '<button type="buttondeltask" onClick="deleteTask(this.id)" id="'; 
   $enddeletetask = '" class="btn btn-default btn-lg">'+
		    '<span class="glyphicon glyphicon-remove">'+'</span>'+ 'Remove task'
		    '</button>'; 
   $insertdeletelist = '<button type="buttondellist" onClick="deleteList(this.id)" class="btn btn-default btn-lg">'+
   '<span class="glyphicon glyphicon-remove">'+'</span>'+ 'Remove list'
   '</button>'; 
   $insertadd = '<button type="buttonaddtask" onClick="addTask(this.id)" class="btn btn-default btn-lg">'+
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
	    $i=$urlParams.id;
	    $(".row").append($newdivtitle +"<h2>"+ $newlink + $linklistaddress + "?id=" + $i + $endlink + data[$i].title  + "</a>"+" " + $insertadd + " " + $newdeletetask + $i +$enddeletetask + " " + $insertdeletelist + "</h2>" + $newul + $i + '">'+ $endul +$enddiv);
	    $.getJSON($racine+"me/tasks.json",function(data2)
	    {
		//alert(data2[$i].list_id);
		//alert(data[$i].id);
		$j=0;
		//$(".row").append("<p>"+ caca +"</p>");
		while(data2[$j])
		{
		    if(data[$i].id == data2[$j].list_id)
			{
			    //$(".list").append("<p>"+ caca +"</p>");
			    $node=document.createElement("LI");
			    $node.setAttribute("id", data2[$j].id);
			    $textnode=document.createTextNode(data2[$j].title);
			    $node.appendChild($textnode);
			    document.getElementById("myList"+$i).appendChild($node);
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
	  $(".row").append($newdivtitle + "<h2>"+ $newlink + $linklistaddress + "?id=" + $i + $endlink + data[$i].title  + "</a>" +  "</h2>" +$enddiv);
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

   });
});

function deleteTask(task_id)
{
    alert("caca tu delete une task");
    $.ajax({
    url: "http://127.0.0.1:81/DSMWareServer/web/app_dev.php/me/task/"+list_id,
    type: 'DELETE',
    success: function(result) {
        alert("ok");
    }
});
}


function deleteList(list_id)
{
    alert("caca delete list");
   $.ajax({
    url: "http://127.0.0.1:81/DSMWareServer/web/app_dev.php/me/list/"+list_id,
    type: 'DELETE',
    success: function(result) {
        alert("ok");
    }
}); 
    
}

function addTask(list_id)
{
    alert("ajout de tache");
}