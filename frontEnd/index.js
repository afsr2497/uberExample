document.addEventListener('DOMContentLoaded',()=>{
    inputOrigin = document.getElementById('origin')
    inputDestination = document.getElementById('destination')
    btnCompare = document.getElementById('comparePoints')

    autocompleteOrigin = new google.maps.places.Autocomplete(inputOrigin);
    autocompleteDestination = new google.maps.places.Autocomplete(inputDestination);

    var map = L.map('map').setView([0, 0], 13);
    var originMarker, destinationMarker, directionsService, directionsDisplay;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 20
    }).addTo(map);
    map.setView([-12.0464, -77.0428], 12);

    btnCompare.addEventListener('click', function(){
        var origin = document.getElementById('origin').value;
        var destination = document.getElementById('destination').value;

        getCoordinates(origin, function(originCoords) {
            console.log('Coordenadas de origen:', originCoords);
            if (originMarker) {
                map.removeLayer(originMarker);
            }
            originMarker = L.marker([originCoords.lat, originCoords.lon]).addTo(map);
            map.panTo([originCoords.lat, originCoords.lon]);
        });

        getCoordinates(destination, function(destinationCoords) {
            console.log('Coordenadas de destino:', destinationCoords);
            if (destinationMarker) {
                map.removeLayer(destinationMarker);
            }
            destinationMarker = L.marker([destinationCoords.lat, destinationCoords.lon]).addTo(map);
            map.panTo([destinationCoords.lat, destinationCoords.lon]);
        });

        if (!directionsService) {
            directionsService = new google.maps.DirectionsService();
        }

        if (!directionsDisplay) {
            directionsDisplay = L.layerGroup().addTo(map);
        } else {
            directionsDisplay.clearLayers();
        }

        var request = {
            origin: origin,
            destination: destination,
            travelMode: 'DRIVING'
        };

        directionsService.route(request, function(response, status) {
            if (status === 'OK') {
                var polyline = L.Polyline.fromEncoded(response.routes[0].overview_polyline);
                var route = L.polyline(polyline.getLatLngs(), { color: 'blue' }).addTo(directionsDisplay);
                map.fitBounds(route.getBounds());
            } else {
                console.log('No se pudo calcular la ruta:', status);
            }
        });
    })


})

function getCoordinates(address, callback) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, function(results, status) {
        if (status === 'OK' && results.length > 0) 
        {
            let location = results[0].geometry.location;
            callback({ lat: location.lat(), lon: location.lng() });
        } 
        else 
        {
            console.log('No se encontraron coordenadas para la dirección:', address);
        }
    });
}

function verificarDatos()
{
    console.log('Bienvenidos a todos')

    systemInfo = {
        I011_TipoServicio: 12,
        destinoLatitud: -12.0687255,
        destinoLongitud: -77.0781351,
        dirDestino: "Av. Universitaria 1801, San Miguel 15088, Peru",
        dirOrigen: "Las Cascadas 355, Lima 15024, Peru",
        idEmpresa: 1,
        idTipoPago: 2,
        origenLatitud: -12.1005893,
        origenLongitud: -76.94766369999999,
        tipoServicio: 12
    }



    fetch('https://pedidos.3555555satelital.com/integration/api/tarifa/consultar',{
        method:"POST",
        headers:
        {
            "Content-Type":"application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        body:JSON.stringify(systemInfo)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
}

function getUberData()
{
    console.log('Obteniendo los datos de uber')
    systemInfo = {
        operationsName:'Products',
        query:"query Products($destinations: [InputCoordinate!]!, $includeClassificationFilters: Boolean = false, $pickup: InputCoordinate!, $pickupFormattedTime: String, $targetProductType: EnumRVWebCommonTargetProductType) {\n  products(\n    destinations: $destinations\n    includeClassificationFilters: $includeClassificationFilters\n    pickup: $pickup\n    pickupFormattedTime: $pickupFormattedTime\n    targetProductType: $targetProductType\n  ) {\n    ...ProductsFragment\n    __typename\n  }\n}\n\nfragment ProductsFragment on RVWebCommonProductsResponse {\n  classificationFilters {\n    ...ClassificationFiltersFragment\n    __typename\n  }\n  defaultVVID\n  productsUnavailableMessage\n  renderRankingInformation\n  tiers {\n    ...TierFragment\n    __typename\n  }\n  __typename\n}\n\nfragment ClassificationFiltersFragment on RVWebCommonClassificationFilters {\n  filters {\n    ...ClassificationFilterFragment\n    __typename\n  }\n  hiddenVVIDs\n  standardProductVVID\n  __typename\n}\n\nfragment ClassificationFilterFragment on RVWebCommonClassificationFilter {\n  currencyCode\n  displayText\n  fareDifference\n  icon\n  vvid\n  __typename\n}\n\nfragment TierFragment on RVWebCommonProductTier {\n  products {\n    ...ProductFragment\n    __typename\n  }\n  title\n  __typename\n}\n\nfragment ProductFragment on RVWebCommonProduct {\n  capacity\n  cityID\n  currencyCode\n  description\n  detailedDescription\n  discountPrimary\n  displayName\n  estimatedTripTime\n  etaStringShort\n  fare\n  hasPromo\n  hasRidePass\n  id\n  is3p\n  isAvailable\n  legalConsent {\n    ...ProductLegalConsentFragment\n    __typename\n  }\n  meta\n  preAdjustmentValue\n  productImageUrl\n  productUuid\n  reserveEnabled\n  __typename\n}\n\nfragment ProductLegalConsentFragment on RVWebCommonProductLegalConsent {\n  header\n  image {\n    url\n    width\n    __typename\n  }\n  description\n  enabled\n  ctaUrl\n  ctaDisplayString\n  buttonLabel\n  showOnce\n  __typename\n}\n",
        variables:{
            destinations: [{
                latitude: -12.0687255,
                longitude: -77.0781351,
            }],
            pickup:{
                latitude: -12.1005893,
                longitude: -76.94766369999999,
            },
            includeClassificationFilters:true,
        }
    }

    fetch('https://m.uber.com/go/graphql',{
        method:"POST",
        headers:
        {
            "Content-Type":"application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRFToken": getCookie("csrftoken"),
            "Origin":"https://m.uber.com",
        },
        body:JSON.stringify(systemInfo)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
}

function getCookie(name) 
{
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") 
    {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) 
        {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + "=")) 
            {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}