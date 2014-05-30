 
$(document).ready(function(){
    
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
   $.getJSON($racine+"me/lists.json",function(data)
   {
       $i = 0;
       while(data[$i])
	{
	  $(".row").append($newdivtitle + "<h2>"+ $newlink + $linklistaddress + "?=" + $i + $endlink + data[$i].title  + "</a>"+" " + $insertadd + " " + $insertdelete +  "</h2>" +$enddiv);
	  $i++;
	}
     //alert(data[0].title);
   });
});