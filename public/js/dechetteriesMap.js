/**
 * Created with IntelliJ IDEA.
 * User: guilbill
 * Date: 28/02/14
 * Time: 11:48
 * To change this template use File | Settings | File Templates.
 */

var size = new OpenLayers.Size(30, 30);
var offset = new OpenLayers.Pixel(-(size.w / 2), -size.h);

var createPosition = function(longitude, latitude) {
    return new OpenLayers.LonLat(longitude, latitude) // Centre de la carte
    .transform(
        new OpenLayers.Projection("EPSG:4326"), // transformation de WGS 1984
        new OpenLayers.Projection("EPSG:900913") // en projection Mercator sphérique
    );
}


var geolocate = function(markers, map) {
    var geolocate = new OpenLayers.Control.Geolocate({
        bind: false,
        geolocationOptions: {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: 7000
        }
    });
    map.addControl(geolocate);
    geolocate.events.register("locationupdated", geolocate, function(e) {
        var coords = e.position.coords;
        var geolocatePosition = createPosition(coords.longitude, coords.latitude);
        map.setCenter(geolocatePosition, 12);
        var icon = new OpenLayers.Icon("/img/home-red.png", size, offset);
        markers.addMarker(new OpenLayers.Marker(geolocatePosition, icon));
    });
    geolocate.activate();
    geolocate.getCurrentLocation();
}

var getDechetterieDescription = function(dechetterie){
    var description = "<p>";
    description += "<h4>Déchetterie de " + dechetterie.ville +"</h4>";
    var horaire = dechetterie.horaires[0];
    description += ("Lundi : " + horaire["lundi"].join("-")+"</br>");
    description += ("Mardi : " + horaire["mardi"].join("-")+"</br>");
    description += ("Mercredi : " + horaire["mercredi"].join("-")+"</br>");
    description += ("Jeudi : " + horaire["jeudi"].join("-")+"</br>");
    description += ("Vendredi : " + horaire["vendredi"].join("-")+"</br>");
    description += ("Samedi : " + horaire["samedi"].join("-")+"</br>");
    description += ("Dimanche : " + horaire["dimanche"].join("-")+"</br>");
    description += "</p>"
    return description;
}

var drawMarkers = function(inputMarkers, map) {
    var flagIcon = L.icon({
        iconUrl: '/img/flag-red.png'
    });
    for (var i = inputMarkers.length - 1; i >= 0; i--) {
        var dechetterie = inputMarkers[i];
        var dechetteriePosition = dechetterie.position;
        var latitude = dechetteriePosition.latitude;
        var longitude = dechetteriePosition.longitude;
        var markerConf = {
            icon: flagIcon,
            title: "Déchetterie de " + dechetterie.ville,
            riseOnHover: true
        }
        var marker = L.marker([latitude, longitude], markerConf).addTo(map);
        marker.on('click',function(e){
            var popup = L.popup()
            .setLatLng(e.latlng) //(assuming e.latlng returns the coordinates of the event)
            .setContent(getDechetterieDescription(dechetterie))
            .openOn(map);
        });
    }
}

var drawUsers = function(markers) {
    $.get("/users", function(data) {
        for (var i = data.length - 1; i >= 0; i--) {
            var user = data[i];
            var userCoords = user.profile.location.split(',');
            var userIcon = new OpenLayers.Icon("/img/male-user-orange.png", size, offset);
            var userPosition = createPosition(userCoords[0], userCoords[1]);
            markers.addMarker(new OpenLayers.Marker(userPosition, userIcon))
        };
    });
}
var displayMap = function(dechetteries) {

    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © OpenStreetMap contributors';
    var osm = new L.TileLayer(osmUrl, {
        minZoom: 8,
        maxZoom: 12,
        attribution: osmAttrib
    });

    var map = L.map('dechetteriesMap');
    map.setView(new L.LatLng(48.6881, 6.1734), 12);
    map.addLayer(osm);
    // var map = new OpenLayers.Map("dechetteriesMap");
    // var mapnik = new OpenLayers.Layer.OSM();
    // map.addLayer(mapnik);
    // var position = createPosition(6.1734, 48.6881); //48.6881/6.1734
    // var markers = new OpenLayers.Layer.Markers("Markers");
    // map.addLayer(markers);
    drawMarkers(dechetteries, map);
    // geolocate(markers, map);
    // $.get("/users", function(data){
    //     for (var i = data.length - 1; i >= 0; i--) {
    //         var user = data[i];
    //         var userCoords = user.profile.location.split(',');
    //         var userIcon = new OpenLayers.Icon("/img/male-user-orange.png", size, offset);
    //         var userPosition = createPosition(userCoords[0], userCoords[1]);
    //         markers.addMarker(new OpenLayers.Marker(userPosition, userIcon))
    //     };
    // });
};

$("#dechetteriesMap").ready(function() {
    $.get("/opendata/dechetteries_cugn.json", displayMap);
});