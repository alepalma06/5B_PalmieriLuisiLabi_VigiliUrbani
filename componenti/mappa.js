export const createMap = () => {
   let places = [
       { name: "Piazza del Duomo", coords: [45.4639102, 9.1906426] }
   ];

   let zoom = 12;
   let maxZoom = 19;
   let map = L.map('map').setView(places[0].coords, zoom);
   let token_mappe="";
   fetch("conf.json").then(r => r.json()).then(conf => {
      token_mappe=conf.token;
   });
   return{
      // Funzione per rendere la mappa e i marker
      render: () => {
         L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: maxZoom,
            attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
         }).addTo(map);
         /*places.forEach((place) => {
            const marker = L.marker(place.coords).addTo(map);
            marker.bindPopup(`<b>${place.name}</b>`);
         });*/
      },

      // Funzione per aggiungere un marker
      add: (indirizzo, targa1, targa2, targa3, data, ora, numeroferiti, numerovittime) => {
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
                Data: ${data}</b><br>
                Ora: ${ora}<br>
                Numero Feriti: ${numeroferiti}<br>
                Numero Vittime: ${numerovittime}
            `);

            // Aggiorna l'array `places`
            places.push({ name: indirizzo, coords: coords });
        });
}


   }
};
