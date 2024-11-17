export const tableComponent = () => {
    let data={}
    //let tipo="Cardiologia";
    let PrecedenteSuccessiva=0
    let templateGiorni = `
        <tr class="tbl1">
            <td></td>
            <td>#D</td>
            <td>#D</td>
            <td>#D</td>
            <td>#D</td>
            <td>#D</td>
        </tr>
    `;
    let parentElement;

    return {
        setData: (dato) =>{data=dato},
        setParentElement: (pr) => {
            parentElement = pr;
        },
        start:(startday)=> {PrecedenteSuccessiva=startday},
        setTipo: (tip)=>{tipo=tip;},
        render: () => {
            const exportData = (date) => {
                // FUNZIONE CHE FORMATTA LA DATA
                let d = date.getDate().toString().padStart(2, '0'); // SE LEN MINORE DI 2 AGGIUNGE "0"
                let m = (date.getMonth() + 1).toString().padStart(2, '0');
                let y = date.getFullYear();
                return y + "-" + m + "-" + d;
            };

            const lisSett = ["Indirizzo", "Targa 1", "targa 2", "Targa 3", "Data", "Ora", "Numero Feriti", "Numero Vittime"];
            let html = templateGiorni;
            let date = new Date();
            let giornoCorrente = date.getDay() - PrecedenteSuccessiva; // serve per i bottoni precendente e successivo

            
            lisSett.forEach((day, index) => {
                //CAMBIO HTML
                let giornoTab = day + "<br>" + exportData(date);
                html = html.replace("#D", giornoTab);

                date.setDate(date.getDate() + 1);  //GIORNO DOPO

                //AGGIUNGI CHIAVE
            });
            date.setDate(date.getDate() + -5); 
            ore.forEach(ora => {
                html += `<tr class ="tbl1">`+"<td>"+ ora +"</td>";
                for (let i = 0; i < lisSett.length; i++) {
                    let giorno=exportData(date).split("-").join("");
                    let chiave= tipo +"-"+giorno+"-"+ora;
                    if (chiave in data) {
                        // se fa parte del dizionario stampa
                        html += `<td class="table-info">` + data[chiave]+ "</td>"; // Inserisci il nome della prenotazione
                    } else {
                        // cella vuota
                        html += `<td></td>`; // Celle vuote o con contenuto da aggiungere
                    }
                    date.setDate(date.getDate() + 1);
                }
                date.setDate(date.getDate() + -5); 
                html += `</tr>`;
            });
            
            parentElement.innerHTML = html;
        }
    }
};