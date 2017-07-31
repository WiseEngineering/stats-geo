require('../css/main.css');
require('../css/vector-map.css');

require('jquery');
const map = require('./google_map.js').init();

function drawDataPoint(lat, lon, value) {

    var geojson = {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "id": 0,
            "geometry": {
                "type": "Point",
                "coordinates": [
                    lon,
                    lat
                ]
            }
        }]
    };

    map.data.setStyle(function() {
        var scale = Math.sqrt(value) * 2;
        return ({
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: scale,
            fillColor: '#f00',
            fillOpacity: 0.35,
            strokeWeight: 0
        }
        });
    });

    currentGeoJsonData = map.data.addGeoJson(geojson);
}

$(document).ready(function(){

    var socket = io();

    socket.on('stats', function(msg){
        var stats = JSON.parse(msg);

        console.log(msg);

        map.data.forEach(function (feature) {
            map.data.remove(feature);
        });

        for (metric in stats) {
            for (coords in stats[metric]) {
                drawDataPoint(
                    parseFloat(coords.split(",")[0]),
                    parseFloat(coords.split(",")[1]),
                    stats[metric][coords].value.toString()
                );
            }
        }
    });
});
