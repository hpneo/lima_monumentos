Parse.initialize("bKJEt4w4QEPl16AZe9gaXsuNmeHpD7wp2A7zpsN0", "f4FueALMWVgvPv7r6SCZcWEDZhseOhP2VVYzvRSR");

var map = new GMaps({
  el: '#map',
  lat: -12.045746309051966,
  lng: -77.03053241139217,
  zoom: 17,
  disableDefaultUI: true,
  zoomControl: true
});

var InfoAside = Parse.View.extend({
  el: '#info',
  render: function() {
    $('#name').text(this.model.get('espacio') + ' ' + this.model.get('nombre'));

    if (this.model.has('trazado')) {
      $('#year').text(this.model.get('trazado'));
    }
  }
});

var infoAside = new InfoAside();

function hideInfoAside() {
  $('#map').removeClass('with_info');
  $('#info').removeClass('expanded');
}

function toggleInfoAside(e) {
  if (infoAside.model === undefined) {
    $('#map').addClass('with_info');
    $('#info').addClass('expanded');
  }
  else {
    if (infoAside.model === e.details) {
      $('#map').toggleClass('with_info');
      $('#info').toggleClass('expanded');
    }
  }

  infoAside.model = e.details;
  infoAside.render();

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

$(document).on('click', '#see_360', function(e) {
  var streetView = map.getStreetView();
  streetView.setPosition(map.getCenter())
  streetView.setVisible(true);
});

$(document).on('click', '#close_info', function(e) {
  hideInfoAside();
});