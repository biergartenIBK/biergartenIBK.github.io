// eine neue Leaflet Karte definieren
let karte = L.map("map", {
    fullscreenControl: true,
});
// Layer für GPX und Start- Zielmarker hinzufügen
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
        "Aufstiege zu den einzelnen Almen": etappe12group,
        "Start / Ziel": overlayMarker,
    });

karte.addControl(karteControl);
karte.addLayer(myLayers.osm);
//karte.setView([47.2688921, 11.3855037],13);

let gpxTrack = new L.GPX("data/arzleralm.gpx", {
    async : true,
    polyline_options :{
        color : "red",
    },
    marker_options : {
        startIconUrl : null,
        endIconUrl : null,
        shadowUrl : null,
    }
}).addTo(etappe12group);
let gpxTrack1 = new L.GPX("data/bodensteinalm.gpx", {
    async : true,
    polyline_options :{
        color : "blue",
    },
    marker_options : {
        startIconUrl : null,
        endIconUrl : null,
        shadowUrl : null,
    }
}).addTo(etappe12group);
let gpxTrack2 = new L.GPX("data/umbrueggleralm.gpx", {
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
let gpxTrack3 = new L.GPX("data/hoettingeralm.gpx", {
    async : true,
    polyline_options : {
        color : "orange",
    },
    marker_options : {
        startIconUrl : null,
        endIconUrl : null,
        shadowUrl : null,
    }
}).addTo(etappe12group);
let gpxTrack4 = new L.GPX("data/rauschbrunnen.gpx", {
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
let gpxTrack5 = new L.GPX("data/rumrumeralm.gpx", {
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
let gpxTrack6 = new L.GPX("data/rumenzianhuette.gpx", {
    async : true,
    polyline_options : {
        color : "brown",
    },
    marker_options : {
        startIconUrl : null,
        endIconUrl : null,
        shadowUrl : null,
    }
}).addTo(etappe12group);

gpxTrack.bindPopup(
`<p><a href="innsbruck_arzleralm.html">Wegbeschreibung</a></p>`); 

gpxTrack1.bindPopup(
`<p><a href="innsbruck_bodensteinalm.html">Wegbeschreibung</a></p>`);

gpxTrack2.bindPopup(
`<p><a href="innsbruck_umbrueggleralm.html">Wegbeschreibung</a></p>`); 

gpxTrack3.bindPopup(
`<p><a href="innsbruck_hoettingeralm.html">Wegbeschreibung</a></p>`); 

gpxTrack4.bindPopup(
`<p><a href="innsbruck_rauschbrunnen.html">Wegbeschreibung</a></p>`); 

gpxTrack5.bindPopup(
`<p><a href="innsbruck_rumeralm.html">Wegbeschreibung</a></p>`); 

gpxTrack6.bindPopup(
`<p><a href="innsbruck_enzianhuette.html">Wegbeschreibung</a></p>`); 

// Maßstabsleiste metrisch
L.control.scale({           
    maxWidth : 200,        
    metric : true,          
    imperial : false,      
    position : "bottomleft" 
}).addTo(karte);

// Start- und Endpunkte der Route als Marker mit Popup, Namen, Wikipedia Link und passenden Icons für Start/Ziel von https://mapicons.mapsmarker.com/
// Arzler Alm
L.marker([47.286434,11.398509],{
    icon : L.icon({
        iconUrl : 'images/start.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).addTo(overlayMarker).bindPopup(
    `<h3>Hungerburg Parkplatz</h3><img src="images/hungerburgparkplatz.jpg"/>
    <p>Bild entnommen aus: <a href="http://www.skiresort.de/typo3temp/_processed_/da/a0/05/5f/3160c11116.jpg">Bildquelle Foto</a></p>`
);

L.marker([47.296362,11.403082],{
    icon : L.icon({
        iconUrl : 'images/beergarden.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).bindPopup(
    `<h3>Arzler Alm</h3><img src="images/arzleralm.jpg"/>
    <p>Bild entnommen aus: <a href="http://www.arzleralm.at/data.cfm?vpath=teaserbilder/sommer-west2&dimensions=664x9999&cropmode=keepratio&noenlargement=no">Bildquelle Foto</a></p>`
).addTo(overlayMarker);
// Bodensteinalm
L.marker([47.28138,11.40589],{
    icon : L.icon({
        iconUrl : 'images/start.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).addTo(overlayMarker).bindPopup(
    `<h3>Mühlauer Brücke</h3><img src="images/muehlauer_bruecke.jpg"/>
    <p>Bild entnommen aus: <a href="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Muehlauer_Bruecke_01.jpg/300px-Muehlauer_Bruecke_01.jpg">Bildquelle Foto</a></p>`
);

L.marker([47.30331,11.38748],{
    icon : L.icon({
        iconUrl : 'images/beergarden.png',
        iconAnchor : [8,37],
        popupAnchor : [0,-37],
    })
}).bindPopup(
    `<h3>Bodensteinalm</h3><img src="images/bodensteinalm.jpg"/>
    <p>Bild entnommen aus: <a href="https://www.innsbruck.info/emobilder/1000cx550c/30393/Bodensteinalm.jpg">Bildquelle Foto</a></p>`
).addTo(overlayMarker);
// Höttinger Alm
L.marker([47.28657,11.39928],{
    icon : L.icon({
        iconUrl : 'images/start.png',
        iconAnchor : [24,37],
        popupAnchor : [0,-37],
    })
}).addTo(overlayMarker).bindPopup(
    `<h3>Hungerburg Parkplatz</h3><img src="images/hungerburgparkplatz.jpg"/>
    <p>Bild entnommen aus: <a href="http://www.skiresort.de/typo3temp/_processed_/da/a0/05/5f/3160c11116.jpg">Bildquelle Foto</a></p>`
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
// Rauschbrunnen
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
// Rumer Alm
L.marker([47.29166,11.44211],{
    icon : L.icon({
        iconUrl : 'images/start.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).bindPopup(
    `<h3>Karwendelparkplatz Rum</h3><img src="images/karwendelparkplatz.jpg"/>
    <p>Bild entnommen aus: <a href="https://www.innsbruck.info/infrastruktur/detail/infrastruktur/parkplatz-alpenpark-karwendel-rum.html">Bildquelle Foto</a></p>`
).addTo(overlayMarker);

L.marker([47.30282,11.42091],{
    icon : L.icon({
        iconUrl : 'images/beergarden.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).bindPopup(
    `<h3>Rumer Alm</h3><img src="images/rumeralm.jpg"/>
    <p>Bild entnommen aus: <a href="https://www.almenrausch.at/uploads/tx_wctrip/DSC_0082_02.jpg">Bildquelle Foto</a></p>`
).addTo(overlayMarker);
// Umbrüggler Alm
L.marker([47.286124,11.400198],{
    icon : L.icon({
        iconUrl : 'images/start.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).addTo(overlayMarker).bindPopup(
    `<h3>Hungerburg Parkplatz</h3><img src="images/hungerburgparkplatz.jpg"/>
    <p>Bild entnommen aus: <a href="http://www.skiresort.de/typo3temp/_processed_/da/a0/05/5f/3160c11116.jpg">Bildquelle Foto</a></p>`
);
L.marker([47.292205,11.379444],{
    icon : L.icon({
        iconUrl : 'images/beergarden.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).bindPopup(
    `<h3>Umbrüggleralm</h3><img src="images/umbrueggleralm.jpg"/>
    <p>Bild entnommen aus: <a href="https://www.almenrausch.at/uploads/tx_wctrip/header_5e89c4.jpg">Bildquelle Foto</a></p>`
).addTo(overlayMarker);
// Enzianhütte
L.marker([47.29140000,11.44103000],{
    icon : L.icon({
        iconUrl : 'images/start.png',
        iconAnchor : [16,37],
        popupAnchor : [0,-37],
    })
}).addTo(overlayMarker).bindPopup(
    `<h3>Karwendelparkplatz Rum</h3><img src="images/karwendelparkplatz.jpg"/>
    <p>Bild entnommen aus: <a href="https://www.innsbruck.info/infrastruktur/detail/infrastruktur/parkplatz-alpenpark-karwendel-rum.html">Bildquelle Foto</a></p>`
);


    L.marker([47.29791000,11.41766000],{
        icon : L.icon({
            iconUrl : 'images/beergarden.png',
            iconAnchor : [16,37],
            popupAnchor : [0,-37],
        })
    }).bindPopup(
        `<h3>Enzianhütte</h3><img src="images/enzianhuette.jpg"/>
        <p>Bild entnommen aus: <a href="https://www.karwendel-urlaub.de/fileadmin/user_upload/Enzianhuette_Innsbruck_Karwendel.JPG">Bildquelle Foto</a></p>`
    ).addTo(overlayMarker);
    
karte.fitBounds(overlayMarker.getBounds());