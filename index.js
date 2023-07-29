$(document).ready(function() {
    // Configuración de la clave de API de MapQuest
    const apiKey = 'N5VQvsM7jBDUz2Uajp0fxTvHt0VFztMm';

    // Inicializar el autocompletado de direcciones
    $('#origin, #destination').autocomplete({
        source: function(request, response) {
            $.ajax({
                url: `https://www.mapquestapi.com/search/v3/prediction?key=${apiKey}&limit=5&q=${request.term}`,
                dataType: 'json',
                success: function(data) {
                    response(data.results.map(result => result.displayString));
                }
            });
        },
        minLength: 3
    });

    // Mostrar el mapa y las coordenadas al hacer clic en el botón
    $('#showMapBtn').click(function() {
        const origin = $('#origin').val();
        const destination = $('#destination').val();

        // Obtener las coordenadas del origen y destino
        $.when(
            getCoordinates(origin),
            getCoordinates(destination)
        ).done(function(originCoords, destinationCoords) {
            const mapUrl = `https://www.mapquestapi.com/staticmap/v5/map?key=${apiKey}&size=600,400&locations=${originCoords[0].lat},${originCoords[0].lng}|${destinationCoords[0].lat},${destinationCoords[0].lng}&zoom=10`;

            // Mostrar el mapa
            $('#map').html(`<img src="${mapUrl}" alt="Mapa" />`);

            // Mostrar las coordenadas en la ventana modal
            $('#originCoordinates').text(`${originCoords[0].lat}, ${originCoords[0].lng}`);
            $('#destinationCoordinates').text(`${destinationCoords[0].lat}, ${destinationCoords[0].lng}`);

            // Mostrar la ventana modal
            $('#coordinatesModal').show();
        });
    });

    // Función para obtener las coordenadas de una dirección
    function getCoordinates(address) {
        return $.ajax({
            url: `https://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${encodeURIComponent(address)}`,
            dataType: 'json'
        }).then(function(data) {
            const location = data.results[0].locations[0];
            return {
                lat: location.latLng.lat,
                lng: location.latLng.lng
            };
        });
    }
});