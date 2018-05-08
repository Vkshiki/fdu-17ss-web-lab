let lstring = "";
let i = 0;
let j = 0;
for (i = 0;i<countries.length;i++){
	lstring += '<div class = "item"><h2>'+countries[i].name+'</h2><p>'+countries[i].continent+'</p>'+'<div class = "inner-box"><h3>Cities</h3>';
	for(j = 0;j<countries[i].cities.length;j++){
		lstring += countries[i].cities[j]+'<br/>';
	}
	lstring += '</div><div class = "inner-box"><h3>Populaar Photos</h3>';
	for(j = 0;j<countries[i].photos.length;j++){
		lstring += '<img class = "photo" src = "images/'+countries[i].photos[j]+'"/>';
	}
	lstring += '</div><button>Visit</button></div>';
}
document.getElementsByClassName('flex-container justify')[0].innerHTML = lstring;
