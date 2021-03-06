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
        "Innsbruck - Höttinger Alm": etappe12group,
        "Start / Ziel": overlayMarker,
    });

karte.addControl(karteControl);
karte.addLayer(myLayers.osm);
karte.setView([47.2688921, 11.3855037],12);

let hoehenprofil = L.control.elevation({
    position : "topright",
    theme : "steelblue-theme",
    collapsed: true,
}).addTo(karte);

let gpxTrack = new L.GPX("data/hoettingeralm.gpx", {
    async : true,
    marker_options : {
        startIconUrl : null,
        endIconUrl : null,
        shadowUrl : null,
    }
}).addTo(etappe12group);

let gpxTrack3 = new L.GPX("data/hoettingeralm3.gpx", {
    async : true,
    polyline_options : {
        color : "red",
    },
    marker_options : {
        startIconUrl : null,
        endIconUrl : null,
        shadowUrl : null,
    }
}).addTo(etappe12group);

let gpxTrack2 = new L.GPX("data/hoettingeralm2.gpx", {
    async : true,
    polyline_options : {
        color : "black",
    },
    marker_options : {
        startIconUrl : null,
        endIconUrl : null,
        shadowUrl : null,
    }
}).addTo(etappe12group);

let gpxTrack5 = new L.GPX("data/hoettingeralm5.gpx", {
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

let gpxTrack4 = new L.GPX("data/hoettingeralm4.gpx", {
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
    hoehenprofil.addData(evt.line);
});
// Maßstabsleiste metrisch
L.control.scale({           
    maxWidth : 200,        
    metric : true,          
    imperial : false,      
    position : "bottomleft" 
}).addTo(karte);

// Start- und Endpunkte der Route als Marker mit Popup, Namen, Wikipedia Link und passenden Icons für Start/Ziel von https://mapicons.mapsmarker.com/
L.marker([47.2866,11.39928],{
    icon : L.icon({
        iconUrl : 'images/start.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).addTo(overlayMarker).bindPopup(
    `<h3>Hungerburg Parkplatz</h3><img src="images/hungerburgparkplatz.jpg"/>
    <p>Bild entnommen aus: <a href="http://www.skiresort.de/typo3temp/_processed_/da/a0/05/5f/3160c11116.jpg">Bildquelle Foto</a></p>`
);

L.marker([47.275150,11.374910],{
    icon : L.icon({
        iconUrl : 'images/start.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).addTo(overlayMarker).bindPopup(
    `<h3>Planötzenhof</h3><img src="images/planoetzenhof.jpg"/>
    <p>Bild entnommen aus: <a href="http://www.planoetzenhof.at/uploads/media/planoetzenhof_aussen_02.jpg">Bildquelle Foto</a></p>`
);

L.marker([47.306206,11.379365],{
    icon : L.icon({
        iconUrl : 'images/start.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).addTo(overlayMarker).bindPopup(
    `<h3>Seegrube</h3><img src="images/seegrube.jpg"/>
    <p>Bild entnommen aus: <a href="http://static2.bergfex.com/images/downsized/c0/6b1bf0eb4f4e75c0_5449ae654d5d4fe9.jpg">Bildquelle Foto</a></p>`
);

L.marker([47.28917,11.42767],{
    icon : L.icon({
        iconUrl : 'images/start.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).addTo(overlayMarker).bindPopup(
    `<h3>Schießstand Arzl</h3><img src="images/schiessstandarzl.jpg"/>
    <p>Bild entnommen aus: <a href="https://www.almenrausch.at/uploads/tx_wctrip/DSC_9005_15959_01.jpg">Bildquelle Foto</a></p>`
);

L.marker([47.29846,11.36704],{
    icon : L.icon({
        iconUrl : 'images/beergarden.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).bindPopup(
    `<h3>Höttinger Alm</h3><img src="images/hoettingeralm.jpg"/>
    <p>Bild entnommen aus: <a href="https://www.almenrausch.at/uploads/tx_wctrip/Hoettingeralm_7748.jpg">Bildquelle Foto</a></p>`
).addTo(overlayMarker);

karte.fitBounds(etappe12group.getBounds());