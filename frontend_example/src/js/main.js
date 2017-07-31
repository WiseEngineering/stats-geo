require('../css/main.css');
require('../css/vector-map.css');

require('jquery');
const map = require('./google_map.js').init();

function drawDataPoint(lat, lon, value) {
    var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: {lat: lat, lng: lon},
            radius: Math.sqrt(value) * 100000
          });
}

$(document).ready(function(){

    var socket = io();

    socket.on('stats', function(msg){
        var stats = JSON.parse(msg);

        console.log(msg);

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
