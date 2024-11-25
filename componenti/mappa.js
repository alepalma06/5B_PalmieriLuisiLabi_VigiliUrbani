export const createMap = () => {
    let places = []; // Lista di tutti i luoghi aggiunti

    // Inizializza la mappa centrata su Milano
    const map = L.map('map').setView([45.4639102, 9.1906426], 12);

    // Aggiungi i tile alla mappa
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    return {
        setData: (datomappa) => {
            places = datomappa; // Aggiorna la lista dei luoghi
        },
        render: () => {
            places.forEach(place => {
                const marker = L.marker(place.coords).addTo(map);
                marker.bindPopup(`
                    <b>${place.name.indirizzo}</b><br>
                    Targa 1: ${place.name.targa1}<br>
                    Targa 2: ${place.name.targa2}<br>
                    Targa 3: ${place.name.targa3}<br>
                    Data: ${place.name.data}<br>
                    Ora: ${place.name.ora}<br>
                    Numero Feriti: ${place.name.numeroferiti}<br>
                    Numero Vittime: ${place.name.numerovittime}
                `);
            });
        },
        add: (datomappa) => {
            places.push(datomappa);
            const marker = L.marker(datomappa.coords).addTo(map);
            marker.bindPopup(`
                <b>${datomappa.name.indirizzo}</b><br>
                Targa 1: ${datomappa.name.targa1}<br>
                Targa 2: ${datomappa.name.targa2}<br>
                Targa 3: ${datomappa.name.targa3}<br>
                Data: ${datomappa.name.data}<br>
                Ora: ${datomappa.name.ora}<br>
                Numero Feriti: ${datomappa.name.numeroferiti}<br>
                Numero Vittime: ${datomappa.name.numerovittime}
            `);
        }
    };
};
