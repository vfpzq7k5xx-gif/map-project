var map = L.map('map').setView([48.5, 67.5], 5); // центр Казахстана

// Подложка карты
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Цвета для типов лицензий
function getColor(type) {
    if (type.includes("добычу")) return "#ff4d4d";     // красный
    if (type.includes("разведку")) return "#4d79ff";    // синий
    return "#ffa64d";                                   // оранжевый — геология
}

// Загрузка GeoJSON
fetch('licenses.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: function(feature) {
                return {
                    color: getColor(feature.properties.work_type),
                    weight: 2,
                    fillOpacity: 0.3
                };
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup(
                    "<b>Компания:</b> " + feature.properties.company + "<br>" +
                    "<b>Лицензия:</b> " + feature.properties.license + "<br>" +
                    "<b>Тип работ:</b> " + feature.properties.work_type + "<br>" +
                    "<b>Дата выдачи:</b> " + feature.properties.date + "<br>" +
                    "<b>Регион:</b> " + feature.properties.region
                );
            }
        }).addTo(map);
    });
