 
$(document).ready(function(){
    
   //$url = "http://127.0.0.1:81/DSMWareServer/web/app_dev.php/me/list/2";
   //$urldetest= "http://ip.jsontest.com/";
   $racine = "http://localhost:81/DSMWare/";
   $newdivtitle = '<div class="col-md-4">';
   $enddiv = '</div>'
   $.getJSON($racine+"me/lists.json",function(data)
   {
       $i = 0;
       while(data[$i])
	{
	  $(".row").append($newdivtitle + "<h2>"+ data[$i].title +"</h2>" + $enddiv);
	  $i++;
	}
     //alert(data[0].title);
   });
});