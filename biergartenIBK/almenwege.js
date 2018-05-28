/*
    Vorbereitung: GPX Track herunterladen und nach GeoJSON konvertieren
    -------------------------------------------------------------------
    Datenquelle https://www.data.gv.at/suche/?search-term=bike+trail+tirol&searchIn=catalog
    Download Einzeletappen / Zur Ressource ...
    Alle Dateien im unterverzeichnis data/ ablegen
    Die .gpx Datei der eigenen Etappe als etappe00.gpx speichern
    Die .gpx Datei über https://mapbox.github.io/togeojson/ in .geojson umwandeln und als etappe00.geojson speichern
    Die etappe00.geojson Datei in ein Javascript Objekt umwandeln und als etappe00.geojson.js speichern

    -> statt 00 natürlich die eigene Etappe (z.B. 01,02, ...25)
*/

// eine neue Leaflet Karte definieren
//let myMap = L.map("map");
let karte = L.map("map", {
    fullscreenControl: true,
});
// Layer für Etappe12 und Start- Zielmarker hinzufügen
let etappe12group = L.featureGroup().addTo(karte);
//let overlayMarker = L.featureGroup().addTo(karte);
const overlayMarker = L.markerClusterGroup().addTo(karte)

// Grundkartenlayer mit OSM, basemap.at, Elektronische Karte Tirol (Sommer, Winter, Orthophoto jeweils mit Beschriftung)
const myLayers = {
    osm: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            subdomains: ["a","b","c"],
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    ),
    geolandbasemap: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>",
    }
    ),
    bmapoverlay: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>",
    }
    ),
   // eKarte_Tirol_Sommer: L.tileLayer(
     //   "http://wmts.kartetirol.at/wmts/gdi_base_summer/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
       // attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>eKarte Tirol</a>",
   // }
   // ),
   // eKarte_Tirol_Winter: L.tileLayer(
   //     "http://wmts.kartetirol.at/wmts/gdi_base_winter/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
   //     attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>eKarte Tirol</a>",
   // }
   // ),
   // eKarte_Tirol_Ortho: L.tileLayer(
    //    "http://wmts.kartetirol.at/wmts/gdi_ortho/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
    //    attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>eKarte Tirol</a>",
    //}
    //),
    bmapgrau: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>",
    }
    ),
    //gdi_nomenklatur: L.tileLayer(
    //    "http://wmts.kartetirol.at/wmts/gdi_nomenklatur/GoogleMapsCompatible/{z}/{x}/{y}.png8", {
    //        attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>eKarte Tirol</a>",
    //        pane: "overlayPane",
    //}
    //),
    bmaphidpi: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>",
    }
    ),
    bmaporthofoto30cm: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>",
    }
    ),
}

// Layergruppen für die Elektronische Karte Tirol definieren
//const tirisSommer = L.layerGroup([
  //  myLayers.eKarte_Tirol_Sommer,
  //  myLayers.gdi_nomenklatur
//]);
//const tirisWinter = L.layerGroup([
  //  myLayers.eKarte_Tirol_Winter,
  //  myLayers.gdi_nomenklatur
//]);
//const tirisOrtho = L.layerGroup([
  //  myLayers.eKarte_Tirol_Ortho,
  //  myLayers.gdi_nomenklatur
//]);

// Baselayer control für OSM, basemap.at, Elektronische Karte Tirol hinzufügen
let karteControl = L.control.layers({
    "Openstreetmap": myLayers.osm,
    "basemap.at Grundkarte": myLayers.geolandbasemap,
    "basemap.at grau": myLayers.bmapgrau,
    "basemap.at highdpi": myLayers.bmaphidpi,
    "basemap.at Orthofoto": myLayers.bmaporthofoto30cm,
   // "Elektronische Karte Tirol - Sommer": tirisSommer,
   // "Elektronische Karte Tirol - Winter": tirisWinter,
   // "Elektronische Karte Tirol - Orthophoto": tirisOrtho,
}, {
        "Aufstiege zu den einzelnen Almen": etappe12group,
        "Start / Ziel": overlayMarker,
    });

karte.addControl(karteControl);
karte.addLayer(myLayers.geolandbasemap);
//karte.setView([47.2688921, 11.3855037],13);

let gpxTrack = new L.GPX("data/arzleralm.gpx", {
    async : true,
    polyline_options :{
        color : "red",
    }
}).addTo(etappe12group);
let gpxTrack1 = new L.GPX("data/bodensteinalm.gpx", {
    async : true,
    polyline_options :{
        color : "blue",
    }
}).addTo(etappe12group);
let gpxTrack2 = new L.GPX("data/umbrüggleralm.gpx", {
    async : true,
    polyline_options : {
        color : "green",
    }
}).addTo(etappe12group);
let gpxTrack3 = new L.GPX("data/hoettingeralm.gpx", {
    async : true,
    polyline_options : {
        color : "orange",
    }
}).addTo(etappe12group);
let gpxTrack4 = new L.GPX("data/rauschbrunnen.gpx", {
    async : true,
    polyline_options : {
        color : "black",
    }
}).addTo(etappe12group);
let gpxTrack5 = new L.GPX("data/Rum-rumeralm.gpx", {
    async : true,
    polyline_options : {
        color : "yellow",
    }
}).addTo(etappe12group);
//gpxTrack.on("loaded", function(evt) {
  //  console.log("get_distance",evt.target.get_distance().toFixed(0))
  //  console.log("get_elevation_min",evt.target.get_elevation_min().toFixed(0))
  //  console.log("get_elevation_max",evt.target.get_elevation_max().toFixed(0))
  //  console.log("get_elevation_gain",evt.target.get_elevation_gain().toFixed(0))
  //  console.log("get_elevation_loss",evt.target.get_elevation_loss().toFixed(0))
  //  let laenge = evt.target.get_distance().toFixed(0);
  //  document.getElementById("laenge").innerHTML = laenge;
  //  let tiefster_Punkt = evt.target.get_elevation_min().toFixed(0);
  //  document.getElementById("tiefster_Punkt").innerHTML = tiefster_Punkt;
  //  let hoechster_Punkt = evt.target.get_elevation_max().toFixed(0);
  //  document.getElementById("hoechster_Punkt").innerHTML = hoechster_Punkt;
  //  let aufstieg = evt.target.get_elevation_gain().toFixed(0);
  //  document.getElementById("aufstieg").innerHTML = aufstieg;
  //  let abstieg = evt.target.get_elevation_loss().toFixed(0);
  //  document.getElementById("abstieg").innerHTML = abstieg;

    //myMap.fitBounds(evt.target.getBounds());
//});
// myMap.fitBounds(etappe12group,getBounds()); //funktioniert nicht!!! Klaus fragen
// Maßstabsleiste metrisch
L.control.scale({           
    maxWidth : 200,        
    metric : true,          
    imperial : false,      
    position : "bottomleft" 
}).addTo(karte);

// Start- und Endpunkte der Route als Marker mit Popup, Namen, Wikipedia Link und passenden Icons für Start/Ziel von https://mapicons.mapsmarker.com/
L.marker([47.286434,11.398509],{
    icon : L.icon({
        iconUrl : 'images/start.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).addTo(overlayMarker);

L.marker([47.296362,11.403082],{
    icon : L.icon({
        iconUrl : 'images/finish.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).addTo(overlayMarker);

L.marker([47.28138,11.40589],{
    icon : L.icon({
        iconUrl : 'images/start.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).addTo(overlayMarker);

L.marker([47.30331,11.38748],{
    icon : L.icon({
        iconUrl : 'images/finish.png',
        iconAnchor : [8,37],
        popupAnchor : [0,-37],
    })
}).addTo(overlayMarker);

L.marker([47.28657,11.39928],{
    icon : L.icon({
        iconUrl : 'images/start.png',
        iconAnchor : [24,37],
        popupAnchor : [0,-37],
    })
}).addTo(overlayMarker);

L.marker([47.29846,11.36704],{
    icon : L.icon({
        iconUrl : 'images/finish.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).addTo(overlayMarker);

L.marker([47.26963,11.36874],{
    icon : L.icon({
        iconUrl : 'images/start.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).addTo(overlayMarker);

L.marker([47.27898,11.34689],{
    icon : L.icon({
        iconUrl : 'images/finish.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).addTo(overlayMarker);

L.marker([47.29166,11.44211],{
    icon : L.icon({
        iconUrl : 'images/start.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).addTo(overlayMarker);

L.marker([47.30282,11.42091],{
    icon : L.icon({
        iconUrl : 'images/finish.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).addTo(overlayMarker);

L.marker([47.286124,11.400198],{
    icon : L.icon({
        iconUrl : 'images/start.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).addTo(overlayMarker);

L.marker([47.292205,11.379444],{
    icon : L.icon({
        iconUrl : 'images/finish.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).addTo(overlayMarker);
karte.fitBounds(overlayMarker.getBounds());
// GeoJSON Track als Linie in der Karte einzeichnen und auf Ausschnitt zoomen
//let geojsonTrack = L.geoJSON(etappe12data).addTo(etappe12group);
