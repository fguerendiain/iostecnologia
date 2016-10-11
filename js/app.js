var appMainTitle = "IOS - Teconología";

var menuItemEmpresa = {
	id:0,
	viewUrl:"views/empresa.html",
	domId:"menuEmpresa",
	url:"empresa",
	title:"Empresa"
};

var menuItemServicios = {
	id:1,
	viewUrl:"views/servicios.html",
	domId:"menuServicios",
	url:"servicios",
	title:"Servicios"
};

var menuItemTrabajos = {
	id:2,
	viewUrl:"views/trabajos.html",
	domId:"menuTrabajos",
	url:"trabajos",
	title:"Trabajos"
};

var menuItemContacto = {
	id:3,
	viewUrl:"views/contacto.html",
	domId:"menuContacto",
	url:"contacto",
	title:"Contacto"
};

var menuItems = [menuItemEmpresa, menuItemServicios, menuItemTrabajos, menuItemContacto];
var defaultMenuItem = menuItemEmpresa;



var loadContent = function(url){
	$.ajax(url).done(function(data) {
		$("#content").html(data);
		setLoadingStatus(false);
	});
}

var updateMenu = function(menuItem){
	for (var i in menuItems){
		setMenuAsInactive(menuItems[i]);
	}

	setMenuAsActive(menuItem);
}

var setMenuAsActive = function(menuItem){
	$("#"+menuItem.domId).addClass("active");
}

var setMenuAsInactive = function(menuItem){
	$("#"+menuItem.domId).removeClass("active");
}

var onClickMenu = function(menuItem, saveHistory){
	updateMenu(menuItem);
	updateBrowser(menuItem, saveHistory);
	setLoadingStatus(true, function(){
		loadContent(menuItem.viewUrl);
	});
}

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

var updateBrowser = function(menuItem, saveHistory){
	document.title = appMainTitle + " - " + menuItem.title;

	if (saveHistory){
		window.history.pushState(menuItem, menuItem.title, menuItem.url);
	}else{
		window.history.replaceState(menuItem, menuItem.title, menuItem.url);
	}
}

window.onpopstate = function(ev){
	var menuItem = ev.state;
	if (menuItem!= null){
		onClickMenu(menuItem, false);
	}else{
		onClickMenu(defaultMenuItem, false);
	}
}

var currentUrl = window.location.pathname.substring(1);

var found = false;
for (var i in menuItems){
	if (menuItems[i].url == currentUrl){
		onClickMenu(menuItems[i], false);
		found = true;
		break;
	}
}

if (!found){
	onClickMenu(defaultMenuItem, false);
}

$(".btn-block").click(function(){
        $(".collapse").collapse('toggle');
    });