
window.onload = function(){
	muestra;
}

function muestra(contenido) {

	var contenidos = ["contenido1", "contenido2", "contenido3", "contenido4", "contenido5", "contenido6", "contenido7"];

	document.getElementById('info_servicios').style.display = "none";
 
	for (i = 0, total = contenidos.length; i < total; i ++) {
		document.getElementById(contenidos[i]).style.display = (contenidos[i] == contenido) ? "block":"none"; 
	} 
}
