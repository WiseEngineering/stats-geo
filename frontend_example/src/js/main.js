require('../css/main.css');
require('../css/vector-map.css');

require('jquery');
let Map = require('./map.js');
const GoogleMap = Map.init();

function drawMarker(lat, lon, value) {
    Map.addMarker(GoogleMap, lat, lon, value);
}

$(document).ready(function(){

    var socket = io();

    socket.on('stats', function(msg){
        var stats = JSON.parse(msg);

        console.log(msg);

        for (metric in stats) {
            for (coords in stats[metric]) {
                drawMarker(
                    parseFloat(coords.split(",")[0]),
                    parseFloat(coords.split(",")[1]),
                    stats[metric][coords].value
                );
            }
        }
    });
});
