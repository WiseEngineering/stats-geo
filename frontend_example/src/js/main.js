require('../css/main.css');
require('../css/vector-map.css');

require('jquery');
const map = require('./google_map.js').init();

map.data.setStyle(function(feature) {
    let scale = Math.sqrt(parseFloat(feature.getProperty('value'))) * 2;

    console.log(scale);

    return ({
    icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: scale,
        fillColor: '#f00',
        fillOpacity: 0.35,
        strokeWeight: 1,
        strokeColor: '#fff'
    }
    });
});

$(document).ready(function(){

    let socket = io();

    socket.on('stats', function(msg){
        let stats = JSON.parse(msg);

        map.data.forEach(function (feature) {
            map.data.remove(feature);
        });

        let geojson = {
            "type": "FeatureCollection",
            "features": []
        };

        let i = 0;
        for (metric in stats) {
            for (coords in stats[metric]) {
                geojson.features.push({
                    "type": "Feature",
                    "id": i,
                    "properties": {
                        "value": stats[metric][coords].value.toString()
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            parseFloat(coords.split(",")[1]),
                            parseFloat(coords.split(",")[0])
                        ]
                    }
                });

            }
        }

        map.data.addGeoJson(geojson);
    });
});
