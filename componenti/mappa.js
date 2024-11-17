export const createMap = () => {
    let places = []; // Lista di tutti i luoghi già aggiunti

    const map = L.map('map').setView([45.4639102, 9.1906426], 12);

    let token_mappe = "";

    fetch("conf.json").then(r => r.json()).then(conf => {
        token_mappe = conf.token;
    });

    return {
        render: () => {
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            // Aggiungi i marcatori per tutti i luoghi
            places.forEach((place) => {
                const marker = L.marker(place.coords).addTo(map);
                marker.bindPopup(`
                    <b>${place.name}</b><br>
                    Targa 1: ${place.numero_targa1}<br>
                    Targa 2: ${place.numero_targa2}<br>
                    Targa 3: ${place.numero_targa3}<br>
                    Data: ${place.data_accaduto}<br>
                    Ora: ${place.ora_accaduto}<br>
                    Numero Feriti: ${place.num_fer}<br>
                    Numero Vittime: ${place.num_vit}
                `);
            });
        },

        add: (indirizzo, targa1, targa2, targa3, data_incidente, ora, numeroferiti, numerovittime) => {
            const template = "https://us1.locationiq.com/v1/search?key=%TOKEN&q=%LUOGO&format=json&";
            let url = template.replace("%LUOGO", indirizzo).replace("%TOKEN", token_mappe);
            
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const coords = [data[0].lat, data[0].lon];
                    const marker = L.marker(coords).addTo(map);
                    marker.bindPopup(`
                        <b>Indirizzo: ${indirizzo}</b><br>
                        Targa 1: ${targa1}<br>
                        Targa 2: ${targa2}<br>
                        Targa 3: ${targa3}<br>
                        Data: ${data_incidente}<br>
                        Ora: ${ora}<br>
                        Numero Feriti: ${numeroferiti}<br>
                        Numero Vittime: ${numerovittime}
                    `);

                    places.push({
                        name: indirizzo,
                        coords: coords,
                        numero_targa1: targa1,
                        numero_targa2: targa2,
                        numero_targa3: targa3,
                        data_accaduto: data_incidente,
                        ora_accaduto: ora,
                        num_fer: numeroferiti,
                        num_vit: numerovittime
                    });
                });
        }
    };
};
