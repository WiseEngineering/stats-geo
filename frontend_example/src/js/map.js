define([], () => {
    let markers = [];

    return {

        init: () => {
            return new google.maps.Map(document.getElementById('map'), {
                center: {lat: 0, lng: 0},
                zoom: 2
            })
        },

        addMarker: (map, lat, lng, value) => {

            let marker = new google.maps.Marker({
                position: {lat: lat , lng: lng},
                title: value,
                map: map
            });

            markers.push(marker);
        },

        clearMarkers: () => {
            if (Map.markers.length > 0) {
                for (let i = 0; i < Map.markers.length; i++) {
                    markers[i].setMap(null);
                }
            }
        }
    };
});