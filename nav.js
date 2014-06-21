/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function add_nav()
{
    $x = location.search;
    $urlParams = parseURLParams($x);
    $token = $urlParams.token;
    $nodenav=document.createElement("A");
    $nodenav.setAttribute("href", "http://localhost:81/DSMWare/list.html?token="+$token);

    $textnode=document.createTextNode("All lists");
    $nodenav.appendChild($textnode);
    document.getElementById("nav").appendChild($nodenav);

}

function add_login()
{
    $nodenav=document.createElement("A");
    $nodenav.setAttribute("href", "http://localhost:81/DSMWare/design.html");

    $textnode=document.createTextNode("    Login");
    $nodenav.appendChild($textnode);
    document.getElementById("nav").appendChild($nodenav);
}

add_nav();
add_login();