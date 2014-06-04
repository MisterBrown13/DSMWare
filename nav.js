/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function add_nav()
{
    $x = location.search;
    $urlParams = parseURLParams($x);
    $token = $urlParams.token;
    $node=document.createElement("A");
    $node.setAttribute("href", "http://localhost:81/DSMWare/list.html?token="+$token);

    $textnode=document.createTextNode("All lists");
    $node.appendChild($textnode);
    document.getElementById("nav").appendChild($node);

}

add_nav();