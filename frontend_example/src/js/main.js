require('../css/main.css');
require('../css/vector-map.css');

require('jquery');
require('./vector-map.min.js');
require('./world-mill.js');
const googleMap = require('https://maps.googleapis.com/maps/api/js?key=AIzaSyDMgnsp7HMAHLR_ntjubgpnt3A8evQvsgg');
require('./map.js');

function drawMarker(lat, lon, value) {

}

$(document).ready(function(){
    $('#world-map').vectorMap({map: 'world_mill'});

    var socket = io();

    socket.on('stats', function(msg){
        var stats = JSON.parse(msg);

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
