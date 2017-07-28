require('../css/main.css');
require('../css/vector-map.css');

require('jquery');
require('./vector-map.min.js');
require('./world-mill.js');

$(document).ready(function(){
    $('#world-map').vectorMap({map: 'world_mill'});
});
