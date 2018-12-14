var userLat = 56;
var userLng = -110;


document.addEventListener("DOMContentLoaded",function(event){
	geolocate();
});

function geolocate(){
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			userLat = position.coords.latitude;
			userLng = position.coords.longitude;
			
			revGeo();
			initMap();
		});
	}
	else{
		document.getElementById('displayArea').innerHTML = "This browser doesn't support geolocation.";
	}
}

function initMap() {
        var uluru = {lat: userLat, lng: userLng};
        var map = new google.maps.Map(document.getElementById('map'), {zoom: 6,center: uluru});
		var marker = new google.maps.Marker({position: uluru,map: map});
		
		revGeo();
}

function updateNewCo(){
	userLat=parseInt(document.getElementById('newLat').value);
	userLng=parseInt(document.getElementById('newLng').value);
	
	revGeo();
	initMap();
}

function revGeo(){
	var xhttpReq = new XMLHttpRequest();
	xhttpReq.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng="+userLat+","+userLng+"&key=AIzaSyBS2ywIJnxRbnPIB6JgarFDNLaIkXKBLmc", true);
	xhttpReq.send();
	xhttpReq.onreadystatechange = function(){
		if(xhttpReq.readyState == 4 && xhttpReq.status == 200){
			data = JSON.parse(xhttpReq.responseText);
			document.getElementById("displayArea").innerHTML = "<h1>Coordinate Location </h1>" + data.results[0].formatted_address;
		}
	}
}

function enter_handler(e){
	e.stopPropagation();
	e.preventDefault();
}

function over_handler(e){
	e.stopPropagation();
	e.preventDefault();
}

function drop_handler(e){
	e.stopPropagation();
	e.preventDefault();
	
	var data = e.dataTransfer;
	var dataFiles = data.files;
	var file = dataFiles[0];
	
	if (file.type.match('^text/plain')){
		var reader = new FileReader();
		reader.onload = function(e){
				iString = reader.result;
				iString = iString.replace(/\n/g, ",");
				var arrayCo = iString.split(",");
				
		}
	}
}