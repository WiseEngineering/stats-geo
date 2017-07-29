let Map = {
    markers: {},

    init: () => {
        return new google.maps.Map(document.getElementById('map'), {
            center: {lat: 0, lng: 0},
            zoom: 1
        })
    },

    addMarker: (map, lat, lng) => {
        let marker = new google.maps.Marker({
            position: {lat: lat , lng: lng},
            map: map
        });

        Map.markers.push(marker);
    }
};