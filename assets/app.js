Parse.initialize("bKJEt4w4QEPl16AZe9gaXsuNmeHpD7wp2A7zpsN0", "f4FueALMWVgvPv7r6SCZcWEDZhseOhP2VVYzvRSR");

var map = new GMaps({
  el: '#map',
  lat: -12.045746309051966,
  lng: -77.03053241139217,
  zoom: 17
});

var InfoAside = Parse.View.extend({
  el: '#info',
  render: function() {}
});

var infoAside = new InfoAside();

function toggleInfoAside(e) {
  $('#map').toggleClass('with_info');
  $('#info').toggleClass('expanded');

  infoAside.model = e.details;

  setTimeout(function() {
    map.refresh();
    map.setCenter(e.getPosition().lat(), e.getPosition().lng());
  }, 350);
}

function populateList(collection) {
  collection.forEach(function(item) {
    map.addMarker({
      title: item.get('espacio') + ' ' + item.get('nombre'),
      lat: item.get('ubicacion').latitude,
      lng: item.get('ubicacion').longitude,
      icon: '/assets/modernmonument-blue.png',
      details: item,
      click: toggleInfoAside
    });
  });
}

var UrbanMonumentalEnvironment = Parse.Object.extend("UrbanMonumentalEnvironment");
var query = new Parse.Query(UrbanMonumentalEnvironment);

query.find().done(populateList);