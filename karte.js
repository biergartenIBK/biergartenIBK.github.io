// eine neue Leaflet Karte definieren und mit der Fullscreen Funktion versehen
let karte = L.map("map", {
    fullscreenControl: true,
});

// zwei Layergruppen definieren und mit der markerCluster Funktion versehen
const bgdLayer = L.markerClusterGroup().addTo(karte)
const aldLayer = L.markerClusterGroup().addTo(karte)

// Grundkartenlayer erstellen (OSM, basemapgrau, tiris_sommer, tiris_ortho)
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
    "Biergärten Innsbruck": bgdLayer,
    "Almen Nordkette bei Innsbruck": aldLayer,
    });
    karte.addControl(karteControl);
    karte.addLayer(myLayers.osm);
    karte.setView([47.2688921, 11.3855037],13);
    // Maßstabsleiste metrisch hinzufügen
    L.control.scale({           
        maxWidth : 200,        
        metric : true,          
        imperial : false,      
        position : "bottomleft" 
    }).addTo(karte);
    // Marker aufgrund der Datenbank lat lngs hinzufügen und mit eigenem Icon versehen
    for (let bgd of biergartendata) {
        L.marker([bgd.lat, bgd.lng], {
            icon : L.icon ({
                iconUrl : "images/beergarden.png",
                iconAnchor : [16,37],
                popupAnchor : [0,-37],
            })
        })// Popup mit Informationen aus der Datenbank alle in einem Layer
            .bindPopup(
            `<h1>${bgd.name}</h1>
            <p>${bgd.adresse}</p>
            <p><a href='${bgd.link}'>Information</a></p>
            <p><img src='${bgd.bild}'></p>
            <p>Bild entnommen aus: <a href='${bgd.bildquelle}'>Bildquelle Foto</a></p>`
        ).addTo(bgdLayer);
      }
    
    for (let ald of almendata) {
        L.marker([ald.lat, ald.lng], {
            icon : L.icon ({
                iconUrl : "images/beergarden.png",
                iconAnchor : [16,37],
                popupAnchor : [0,-37],
            })
        })
        .bindPopup(`<h1>${ald.name}</h1>
            <p><a href='${ald.link}'>Information</a></p>
            <p><img src='${ald.bild}'></p>
            <p>Bild entnommen aus: <a href='${ald.bildquelle}'>Bildquelle Foto</a></p>`
        ).addTo(aldLayer);
    };
    // Kartengrenze festlegen
    karte.fitBounds(bgdLayer.getBounds());