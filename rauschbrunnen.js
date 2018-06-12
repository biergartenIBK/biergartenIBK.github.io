let karte = L.map("map", {
    fullscreenControl: true,
});

// Layer für Etappe12 und Start- Zielmarker hinzufügen
let etappe12group = L.featureGroup().addTo(karte);
let overlayMarker = L.featureGroup().addTo(karte);

// Grundkartenlayer mit OSM, basemap.at, Elektronische Karte Tirol (Sommer, Winter, Orthophoto jeweils mit Beschriftung)
const myLayers = {
    osm: L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            subdomains: ["a","b","c"],
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
    ),
    eKarte_Tirol_Sommer: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_base_summer/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
        attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>eKarte Tirol</a>",
    }
    ),
    eKarte_Tirol_Ortho: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_ortho/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80", {
        attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>eKarte Tirol</a>",
    }
    ),
    bmapgrau: L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: "Datenquelle: <a href='https://www.basemap.at'>basemap.at</a>",
    }
    ),
    gdi_nomenklatur: L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_nomenklatur/GoogleMapsCompatible/{z}/{x}/{y}.png8", {
            attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>eKarte Tirol</a>",
            pane: "overlayPane",
    }
    ),
}

// Layergruppen für die Elektronische Karte Tirol definieren
const tirisSommer = L.layerGroup([
    myLayers.eKarte_Tirol_Sommer,
    myLayers.gdi_nomenklatur
]);
const tirisOrtho = L.layerGroup([
    myLayers.eKarte_Tirol_Ortho,
    myLayers.gdi_nomenklatur
]);

// Baselayer control für OSM, basemap.at, Elektronische Karte Tirol hinzufügen
let karteControl = L.control.layers({
    "Openstreetmap": myLayers.osm,
    "basemap.at grau": myLayers.bmapgrau,
    "Elektronische Karte Tirol - Sommer": tirisSommer,
    "Elektronische Karte Tirol - Orthophoto": tirisOrtho,
}, {
        "Innsbruck - Rauschbrunnen": rauschbrunnen,
        "Start / Ziel": overlayMarker,
    });

karte.addControl(karteControl);
karte.addLayer(myLayers.osm);
karte.setView([47.2688921, 11.3855037],13);

let hoehenProfil = L.control.elevation({
    position : "topright",
    theme : "steelblue-theme",
    collapsed : true, 
}).addTo(karte);

let gpxTrack = new L.GPX('data/rauschbrunnen.gpx', {
    async : true,
    marker_options : {
        startIconUrl : null,
        endIconUrl : null,
        shadowUrl : null,
    }
}).addTo(etappe12group);

let gpxTrack2 = new L.GPX('data/rauschbrunnen2.gpx', {
    async : true,
    polyline_options : {
        color : "yellow",
    },
    marker_options : {
        startIconUrl : null,
        endIconUrl : null,
        shadowUrl : null,
    }
}).addTo(etappe12group);

let gpxTrack3 = new L.GPX('data/rauschbrunnen3.gpx', {
    async : true,
    polyline_options : {
        color : "green",
    },
    marker_options : {
        startIconUrl : null,
        endIconUrl : null,
        shadowUrl : null,
    }
}).addTo(etappe12group);

gpxTrack.on("loaded", function(evt) {
    let laenge = evt.target.get_distance().toFixed(0);
    document.getElementById("laenge").innerHTML = laenge;
    let tiefster_Punkt = evt.target.get_elevation_min().toFixed(0);
    document.getElementById("tiefster_Punkt").innerHTML = tiefster_Punkt;
    let hoechster_Punkt = evt.target.get_elevation_max().toFixed(0);
    document.getElementById("hoechster_Punkt").innerHTML = hoechster_Punkt;
    let aufstieg = evt.target.get_elevation_gain().toFixed(0);
    document.getElementById("aufstieg").innerHTML = aufstieg;
    let abstieg = evt.target.get_elevation_loss().toFixed(0);
    document.getElementById("abstieg").innerHTML = abstieg;

    //karte.fitBounds(evt.target.getBounds());
});

gpxTrack.on('addline', function(evt){
    hoehenProfil.addData(evt.line)});

// Maßstabsleiste metrisch
L.control.scale({           
    maxWidth : 200,        
    metric : true,          
    imperial : false,      
    position : "bottomleft" 
}).addTo(karte);

// Start- und Endpunkte der Route als Marker mit Popup, Namen, Wikipedia Link und passenden Icons für Start/Ziel von https://mapicons.mapsmarker.com/
L.marker([47.26913,11.39044],{
    icon : L.icon({
        iconUrl : 'images/start.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).addTo(overlayMarker).bindPopup(
    `<h3>Innkeller</h3><img src="images/innkeller.jpg"/>
    <p>Bild entnommen aus: <a href="https://all-inn.at/nachtleben-bars-pub-clubs-innsbruck/bar-pub-club-in-innsbruck/innkeller/">Bildquelle Foto</a></p>`
);

L.marker([47.26963,11.36874],{
    icon : L.icon({
        iconUrl : 'images/start.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).addTo(overlayMarker).bindPopup(
    `<h3>Sadrachstraße</h3><img src="images/sadrachstrasse.jpg"/>
    <p>Bild entnommen aus: <a href="https://www.outdooractive.com/de/wanderung/innsbruck-und-umgebung/sadrachstrasse-nach-rauschbrunnen/105317789/">Bildquelle Foto</a></p>`
);

L.marker([47.273098000,11.327927000],{
    icon : L.icon({
        iconUrl : 'images/start.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).addTo(overlayMarker).bindPopup(
    `<h3>Innsbruck Kranebitten</h3><img src="images/klammstrasseunterfuehrung.jpg"/>
    <p>Bild entnommen aus: <a href="https://www.bergfex.at/sommer/tirol/touren/wanderung/104430,kranebitter-klamm--nasse-wand--rauschbrunnen/">Bildquelle Foto</a></p>`
);

L.marker([47.27898,11.34689],{
    icon : L.icon({
        iconUrl : 'images/beergarden.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).bindPopup(
    `<h3>Rauschbrunnen</h3><img src="images/rauschbrunnen.jpg"/>
    <p>Bild entnommen aus: <a href="https://www.mountaineers.at/files/styles/mega/public/images/wanderung/rauschbrunnen/rauschbrunnenWandern-1.jpg?itok=yVoXVmsv">Bildquelle Foto</a></p>`
).addTo(overlayMarker);

karte.fitBounds(overlayMarker.getBounds());