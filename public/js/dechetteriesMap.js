/**
 * Created with IntelliJ IDEA.
 * User: guilbill
 * Date: 28/02/14
 * Time: 11:48
 * To change this template use File | Settings | File Templates.
 */


var test = function(){
    var map = new OpenLayers.Map("dechetteriesMap");
    var mapnik = new OpenLayers.Layer.OSM();
    map.addLayer(mapnik);
    var position = new OpenLayers.LonLat(6.20101, 48.69243) // Centre de la carte
        .transform(
            new OpenLayers.Projection("EPSG:4326"), // transformation de WGS 1984
            new OpenLayers.Projection("EPSG:900913") // en projection Mercator sphérique
        );
    map.setCenter(position, 15);

    var markers = new OpenLayers.Layer.Markers( "Markers" );
    map.addLayer(markers);
    markers.addMarker(new OpenLayers.Marker(position));
};

$("#dechetteriesMap").ready(test);