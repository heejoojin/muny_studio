function init() {
    var mapOptions = {                                 // Set up the map options
      center: new google.maps.LatLng(35.238209,129.219593),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoom: 17,
      styles: CustomMapStyles
      
    };
    var venueMap;                                      // Map() draws a map
    venueMap = new google.maps.Map(document.getElementById('map'), mapOptions);
  }
  
  function loadScript() {
    var script = document.createElement('script');     // Create <script> element
    script.src = 'http://maps.googleapis.com/maps/<%= process.env.Google_Map %>/js?sensor=false&callback=init';
    document.body.appendChild(script);                 // Add element to page
  }
  
  window.onload = loadScript;                          // on load call loadScript()