/**
 * Created with IntelliJ IDEA.
 * User: guilbill
 * Date: 28/02/14
 * Time: 11:48
 * To change this template use File | Settings | File Templates.
 */

var size = new OpenLayers.Size(30,30);
var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);

var createPosition = function(longitude,latitude){
    return new OpenLayers.LonLat(longitude, latitude) // Centre de la carte
        .transform(
            new OpenLayers.Projection("EPSG:4326"), // transformation de WGS 1984
            new OpenLayers.Projection("EPSG:900913") // en projection Mercator sphérique
        );
}

var displayMap = function(dechetteries){

    var map = new OpenLayers.Map("dechetteriesMap");
    var mapnik = new OpenLayers.Layer.OSM();
    map.addLayer(mapnik);
    var position = createPosition(6.1734, 48.6881);//48.6881/6.1734
    var markers = new OpenLayers.Layer.Markers( "Markers" );
    map.addLayer(markers);

    var geolocate = new OpenLayers.Control.Geolocate({
        bind: false,
        geolocationOptions: {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: 7000
        }
    });
    map.addControl(geolocate);

    geolocate.events.register("locationupdated",geolocate,function(e) {
        var coords = e.position.coords;
        var geolocatePosition = createPosition(coords.longitude,coords.latitude);
        map.setCenter(geolocatePosition, 12);
        var icon = new OpenLayers.Icon('/img/home-orange.png', size, offset);
        markers.addMarker(new OpenLayers.Marker(geolocatePosition,icon));
    });

    for (var i = dechetteries.length - 1; i >= 0; i--) {       
        var dechetteriePosition = dechetteries[i].position;
        var latitude = dechetteriePosition.latitude;
        var longitude = dechetteriePosition.longitude;
        var currentPosition = createPosition(longitude,latitude);
        var icon = new OpenLayers.Icon('/img/flag-orange.png', size, offset);
        markers.addMarker(new OpenLayers.Marker(currentPosition,icon));
    };
    geolocate.activate();
    geolocate.getCurrentLocation();
};

$("#dechetteriesMap").ready(function(){
    $.get("/opendata/dechetteries_cugn.json", displayMap);
});