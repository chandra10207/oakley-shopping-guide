function changeFlag()
{
	var img=document.getElementById("flagImage");
	var currentCountry=document.getElementById("flag");
	img.setAttribute("src",currentCountry[currentCountry.selectedIndex].getAttribute("src"));
	img.setAttribute("alt",currentCountry[currentCountry.selectedIndex].getAttribute("alt"));
}

//document.getElementById("ll").add('active');