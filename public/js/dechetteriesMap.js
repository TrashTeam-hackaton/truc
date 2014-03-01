/**
 * Created with IntelliJ IDEA.
 * User: guilbill
 * Date: 28/02/14
 * Time: 11:48
 * To change this template use File | Settings | File Templates.
 */

var size = new OpenLayers.Size(30, 30);
var offset = new OpenLayers.Pixel(-(size.w / 2), -size.h);
var dechetMarkers = new L.LayerGroup();
var usersMarkers = new L.LayerGroup();
var map;

var createPosition = function(longitude, latitude) {
    return new OpenLayers.LonLat(longitude, latitude) // Centre de la carte
    .transform(
        new OpenLayers.Projection("EPSG:4326"), // transformation de WGS 1984
        new OpenLayers.Projection("EPSG:900913") // en projection Mercator sphérique
    );
}


var geolocate = function() {
    map.locate({
        setView: true
    }).on('locationerror', function() {
        // Si la geolocasition n'a pas marchée
    });
}

var getDechetterieDescription = function(dechetterie) {
    var description = "<p>";
    description += "<h4>Déchetterie de " + dechetterie.ville + "</h4>";
    var horaire = dechetterie.horaires[0];
    description += ("Lundi : " + horaire["lundi"].join("-") + "</br>");
    description += ("Mardi : " + horaire["mardi"].join("-") + "</br>");
    description += ("Mercredi : " + horaire["mercredi"].join("-") + "</br>");
    description += ("Jeudi : " + horaire["jeudi"].join("-") + "</br>");
    description += ("Vendredi : " + horaire["vendredi"].join("-") + "</br>");
    description += ("Samedi : " + horaire["samedi"].join("-") + "</br>");
    description += ("Dimanche : " + horaire["dimanche"].join("-") + "</br>");
    description += "</p>"
    return description;
}

var drawMarkers = function(inputMarkers) {
    dechetMarkers.clearLayers();
    $.each(inputMarkers, function(index, dechetterie) {
        var dechetteriePosition = dechetterie.position;
        var latitude = dechetteriePosition.latitude;
        var longitude = dechetteriePosition.longitude;
        var markerConf = {
            title: "Déchetterie de " + dechetterie.ville,
            riseOnHover: true
        }
        var marker = L.marker([latitude, longitude], markerConf);
        dechetMarkers.addLayer(marker);
        marker.on('click', function(e) {
            var popup = L.popup()
                .setLatLng(e.latlng) //(assuming e.latlng returns the coordinates of the event)
            .setContent(getDechetterieDescription(dechetterie))
                .openOn(map);
        });
    });
    dechetMarkers.addTo(map);
}

var drawUsers = function() {
    $.get("/users", function(data) {
        for (var i = data.length - 1; i >= 0; i--) {
            var user = data[i];
            var userCoords = user.profile.location.split(',');
            var userGravatar = user.profile.picture === "" ? "/img/male-user-orange.png" : user.profile.picture;

            var userIcon = L.icon({
                iconUrl: userGravatar
            });
            var markerConf = {
                icon: userIcon,
                title: user.profile.name
            }
            var marker = L.marker([userCoords[0], userCoords[1]], markerConf);
            usersMarkers.addLayer(marker);
        };
        usersMarkers.addTo(map);
    });
}
var initMap = function(){
    map = L.map('dechetteriesMap');
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data © OpenStreetMap contributors';
    var osm = new L.TileLayer(osmUrl, {
        minZoom: 11,
        maxZoom: 32,
        attribution: osmAttrib
    });
    map.setView(new L.LatLng(48.6833, 6.2), 12);
    map.addLayer(osm);
}

var displayMap = function(dechetteries) {
    if (map === undefined){
        initMap();
    }
    drawMarkers(dechetteries);
    geolocate();
    drawUsers();
};

$("#dechetteriesMap").ready(function() {
    $.get("/opendata/dechetteries_cugn.json", displayMap);
});
