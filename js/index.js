var map;
var markers = [];
var infoWindow;
var locationSelect;

function initMap() {
  var baseLocation = { lat: 34.06338, lng: -118.35808 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: baseLocation,
    zoom: 11,
    mapTypeId: "roadmap",
  });
  infoWindow = new google.maps.InfoWindow();

  showStoreMarkers();
}

function showStoreMarkers() {
  var bounds = new google.maps.LatLngBounds();
  stores.forEach(function (store, index) {
    var latlng = new google.maps.LatLng(
      store.coordinates.latitude,
      store.coordinates.longitude)

    var name = store.name;
    var address = store.addressLines[0];
    createMarker(latlng,name,address,index)
    bounds.extend(latlng);
  });

  map.fitBounds(bounds);
  
}

function createMarker(latlng, name, address, index) {
  var html = "<b>" + name + "</b> <br/>" + address;
  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    label: `${index+1}`
  });
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
  markers.push(marker);
}
