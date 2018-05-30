let karte = L.map("map", {
    fullscreenControl: true,
});

//let bgdLayer = L.featureGroup();
//let aldLayer = L.featureGroup();
const bgdLayer = L.markerClusterGroup().addTo(karte)
const aldLayer = L.markerClusterGroup().addTo(karte)

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
const tirisSommer = L.layerGroup([
    myLayers.eKarte_Tirol_Sommer,
    myLayers.gdi_nomenklatur
]);
//const tirisWinter = L.layerGroup([
  //  myLayers.eKarte_Tirol_Winter,
  //  myLayers.gdi_nomenklatur
//]);
const tirisOrtho = L.layerGroup([
    myLayers.eKarte_Tirol_Ortho,
    myLayers.gdi_nomenklatur
]);

// Baselayer control für OSM, basemap.at, Elektronische Karte Tirol hinzufügen
let karteControl = L.control.layers({
    "Openstreetmap": myLayers.osm,
    "basemap.at Grundkarte": myLayers.geolandbasemap,
    "basemap.at grau": myLayers.bmapgrau,
    "basemap.at highdpi": myLayers.bmaphidpi,
    "basemap.at Orthofoto": myLayers.bmaporthofoto30cm,
    "Elektronische Karte Tirol - Sommer": tirisSommer,
    "Elektronische Karte Tirol - Orthophoto": tirisOrtho,
}, {
    "Biergärten Innsbruck": bgdLayer,
    "Almen Nordkette bei Innsbruck": aldLayer,
        //"Start / Ziel": overlayMarker,
    });
    karte.addControl(karteControl);
    karte.addLayer(myLayers.geolandbasemap);
    karte.setView([47.2688921, 11.3855037],13);

    L.control.scale({           
        maxWidth : 200,        
        metric : true,          
        imperial : false,      
        position : "bottomleft" 
    }).addTo(karte);

    for (let bgd of biergartendata) {
        L.marker([bgd.lat, bgd.lng])
            .bindPopup(
            `<h1>${bgd.name}</h1>
            <p>${bgd.adresse}</p>
            <p><a href='${bgd.link}'>Information</a></p>`
        ).addTo(bgdLayer);
      }
    // Frage nach bind.popups
    
    for (let ald of almendata) {
        L.marker([ald.lat, ald.lng])
        .bindPopup(`<h1>${ald.name}</h1>
            <p><a href='${ald.link}'>Information</a></p>
            `)
          .addTo(aldLayer);
    };

    karte.fitBounds(bgdLayer.getBounds());