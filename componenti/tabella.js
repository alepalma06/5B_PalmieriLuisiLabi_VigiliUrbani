export const tableComponent = () => {
    let data = []; 
    let parentElement;

    return {
        setData: (dato) => {
            data.push(dato);
        },
        setParentElement: (pr) => {
            parentElement = pr;  
        },
        render: () => {
            // Colonne della tabella
            const listacolonne = ["Indirizzo", "Targa 1", "Targa 2", "Targa 3", "Data", "Ora", "Numero Feriti", "Numero Vittime"];
            let html = "<table class='table'>";
            //crea la prima riga
            html += "<tr>";
            listacolonne.forEach(colonna => {
                html += `<th>${colonna}</th>`;
            });
            html += "</tr>";
            //crea le righe
            data.forEach(elemento => {
                let row = "<tr class='tbl1'>";
                listacolonne.forEach(riga => {
                    row += "<td>" + elemento[riga] + "</td>";  
                });
                row += "</tr>";
                html += row;
            });

            html += "</table>"

            //mostra tabella
            parentElement.innerHTML = html;  
        }
    };
};
