/*
*
* ESTRUCTURA DE VISTAS
*
*/

var menuItemEmpresa = {
	id:0,
	viewUrl:"views/empresa.html",
	domId:"menuEmpresa",
	url:"/#/empresa",
	title:"Empresa"
};

var menuItemServicios = {
	id:1,
	viewUrl:"views/servicios.html",
	domId:"menuServicios",
	url:"/#/servicios",
	title:"Servicios"
};

// var menuItemTrabajos = {
// 	id:2,
// 	viewUrl:"views/trabajos.html",
// 	domId:"menuTrabajos",
// 	url:"trabajos",
// 	title:"Trabajos"
// };

var menuItemContacto = {
	id:3,
	viewUrl:"views/contacto.html",
	domId:"menuContacto",
	url:"/#/contacto",
	title:"Contacto"
};

/*
*
*	ARRAY DE VISTAS
*	VISTA DEFAULT
*	URL TOMADA DEL NAVEGADOR RESTANDO LA /
*
*/

var menuItems = [menuItemEmpresa, menuItemServicios, menuItemContacto];//, menuItemTrabajos];
var defaultMenuItem = menuItemEmpresa;
var currentUrl = window.location.pathname.substring(1);

/*
*
*	DECLARACION DE FUNCIONES
*
*/


/*
*
*summary
*parameters
*return
*
*/
var loadContent = function(url){
	$.ajax(url).done(function(data) {
		$("#content").html(data);
		setLoadingStatus(false);
	});
}

/*
*
*summary BUSCA LA VISTA SELECCIONADA POR EL USUARIO PARA MOSTRARLA EN PANTALLA
*parameters RECIBE LA VISTA SELECCIONADA
*return LLAMA A LA FUNCION QUE SETEA COMO ACTIVA LA VISTA
*
*/
var updateMenu = function(menuItem){
	for (var i in menuItems){
		setMenuAsInactive(menuItems[i]);
	}

	setMenuAsActive(menuItem);
}

/*
*
*summary SETEA COMO ACTIVA LA VISTA PASADA COMO PARAMETRO
*parameters RECIBE LA VISTA  A ACTIVAR
*return AGREGA LA CLASE "active" A LA VISTA
*
*/
var setMenuAsActive = function(menuItem){
	$("#"+menuItem.domId).addClass("active");
}

/*
*
*summary SETEA COMO INACTIVA LA VISTA PASADA COMO PARAMETRO
*parameters RECIBE LA VISTA  A DESACTIVAR
*return REMUEVE LA CLASE "active" A LA VISTA
*
*/
var setMenuAsInactive = function(menuItem){
	$("#"+menuItem.domId).removeClass("active");
}

/*
*
*summary CONTROLA EL PROCESO DE SELECCION DE VISTAS
*parameters RECIBE EL MENU SELECCIONADO Y UN BOOLEANO QUE DETERMINA SI TIENE O NO ANTECESOR
*return REALIZA EL PROCESO DE CAMBIO DE VISTA
*
*/
var onClickMenu = function(menuItem, saveHistory){
	updateMenu(menuItem);
	updateBrowser(menuItem, saveHistory);
	setLoadingStatus(true, function(){
		loadContent(menuItem.viewUrl);
	});
}

/*
*
*summary MUSTRA UN LOGO DE CARGA ENTRE EL CAMBIO DE VISTAS
*parameters 
*
*	VER POR QUE SE PASA EL FLAG Y QUE ERA EL CB !!!!!!!!
*
*
*return
*
*/
var setLoadingStatus = function(flag, cb){
	if (flag){
		$("#content").fadeOut(250, function(){
			$("#loading").fadeIn(250);
			if (cb!=null)cb();
		});
	}else{
		$("#loading").fadeOut(250, function(){
			$("#content").fadeIn(250);
			if (cb!=null)cb();
		});
	}
}

/*
*
*summary CAMBIA EL TITULO DE LA PESTAÑA DEL NAVEGADOR DE ACUERDO A LA VISTA
*parameters RECIBE UNA VISTA Y UN BOOLEANO QUE DETERMINA LA PRECENCIA DE HISTORIAL
*return CAMBIA EL NOMBRE Y DEPENDIENDO SI TIENE HITORIAL O NO, GUARDA EL ANTERIOR.
*
*/
var updateBrowser = function(menuItem, saveHistory){
	document.title = appMainTitle + " - " + menuItem.title;

	if (saveHistory){
		window.history.pushState(menuItem, menuItem.title, menuItem.url);
	}else{
		window.history.replaceState(menuItem, menuItem.title, menuItem.url);
	}
}

/*
*
*summary AL LLAMAR ATRAS O ADENLANTE EL HISTORIAL LLAMA A ONCLICKMENU
*parameters RECIBE EL EVENTO
*return SI NO HAY HITORIAL SETEA LA VISTA DEFAULT SI HAY CARGA LA VISTA CORRESPONDIENTE
*
*/
window.onpopstate = function(ev){
	var menuItem = ev.state;
	if (menuItem!= null){
		onClickMenu(menuItem, false);
	}else{
		onClickMenu(defaultMenuItem, false);
	}
}


/*
*
*summary
*parameters
*return
*
*/

var found = false;
for (var i in menuItems){
	if (menuItems[i].url == currentUrl){
		onClickMenu(menuItems[i], false);
		found = true;
		break;
	}
}


/*
*
*	INSRTRUCCIONES A EJECUTAR
*
*/

if (!found){
	onClickMenu(defaultMenuItem, false);
}