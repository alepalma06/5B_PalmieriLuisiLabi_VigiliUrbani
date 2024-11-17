export const tableComponent = () => {
    let data = []; 
    let filteredData = [];  // Variabile per memorizzare i dati filtrati
    let parentElement;

    // Funzione per controllare se c'è una corrispondenza nell'indirizzo
    const controlloindirizzo = (str, substr) => {
        if (str === "" || substr === "") {
            return false;
        }
        str = str.toLowerCase();
        substr = substr.toLowerCase();

        for (let i = 0; i <= str.length - substr.length; i++) {
            let trovato = true;

            for (let j = 0; j < substr.length; j++) {
                if (str[i + j] !== substr[j]) {
                    trovato = false;
                    break;
                }
            }

            if (trovato) {
                return true;
            }
        }

        return false;
    };

    return {
        // Impostazione dei dati
        setData: (dato) => {
            data.push(dato);
            filteredData = data;  // I dati filtrati inizialmente sono uguali ai dati originali
        },

        // Impostazione dell'elemento principale dove renderizzare la tabella
        setParentElement: (pr) => {
            parentElement = pr;  
        },

        // Funzione per filtrare i dati in base al valore di ricerca
        filterRows: function (filterValue) {
            filteredData = data.filter(row =>
                controlloindirizzo(row["Indirizzo"], filterValue)
            );
            this.renderFilteredResults();  // Renderizza i risultati filtrati
        },

        // Funzione di rendering della tabella completa
        render: ()=> {
            const listacolonne = ["Indirizzo", "Targa 1", "Targa 2", "Targa 3", "Data", "Ora", "Numero Feriti", "Numero Vittime"];
            let html = "<table class='table'>";
            
            html += "<tr>";
            listacolonne.forEach(colonna => {
                html += `<th>${colonna}</th>`;
            });
            html += "</tr>";
            
            data.forEach(elemento => {
                let row = "<tr class='tbl1'>";
                listacolonne.forEach(riga => {
                    row += "<td>" + elemento[riga] + "</td>";  
                });
                row += "</tr>";
                html += row;
            });

            html += "</table>";

            parentElement.innerHTML = html;  
        },

        // Funzione di rendering per visualizzare solo i dati filtrati
        renderFilteredResults:()=> {
            const listacolonne = ["Indirizzo", "Targa 1", "Targa 2", "Targa 3", "Data", "Ora", "Numero Feriti", "Numero Vittime"];
            let html = "<table class='table'>";
            
            html += "<tr>";
            listacolonne.forEach(colonna => {
                html += `<th>${colonna}</th>`;
            });
            html += "</tr>";

            // Se ci sono risultati filtrati
            if (filteredData.length > 0) {
                filteredData.forEach(elemento => {
                    let row = "<tr class='tbl1'>";
                    listacolonne.forEach(riga => {
                        row += "<td>" + elemento[riga] + "</td>";
                    });
                    row += "</tr>";
                    html += row;
                });
            } else {
                // Se non ci sono risultati, mostriamo un messaggio
                html = "<p>Nessun risultato trovato.</p>";
            }

            parentElement.innerHTML = html;
        }
    };
};
