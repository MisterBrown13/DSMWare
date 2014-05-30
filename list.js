 
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
   $insertdelete = '<button type="button" class="btn btn-default btn-lg">'+
		    '<span class="glyphicon glyphicon-remove">'+'</span>'+ 'Remove'
		    '</button>'; 
   $insertadd = '<button type="button" class="btn btn-default btn-lg">'+
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
	    $(".row").append($newdivtitle +"<h2>"+ $newlink + $linklistaddress + "?id=" + $i + $endlink + data[$i].title  + "</a>"+" " + $insertadd + " " + $insertdelete +  "</h2>" + $newul + $i + '">'+ $endul +$enddiv);
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
	  $(".row").append($newdivtitle + "<h2>"+ $newlink + $linklistaddress + "?id=" + $i + $endlink + data[$i].title  + "</a>"+" " + $insertadd + " " + $insertdelete +  "</h2>" +$enddiv);
	  $i++;
	}
    }
     //alert(data[0].title);
   });
});