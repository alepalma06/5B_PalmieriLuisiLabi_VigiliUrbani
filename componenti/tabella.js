export const tableComponent = () => {
    let data = [];
    let templateRow = `
        <tr class="tbl1">
            <td>#D1</td>
            <td>#D2</td>
            <td>#D3</td>
            <td>#D4</td>
            <td>#D5</td>
            <td>#D6</td>
            <td>#D7</td>
            <td >#D8</td>
        </tr>
    `;
    let parentElement;

    return {
        setData: (datomappa) => {
            data = datomappa; 
        },
        addData: (datomappa) => {
            data.push(datomappa);  // Aggiungi un nuovo dato
        },
        setParentElement: (pr) => {
            parentElement = pr;  
        },
        render: () => {

            // Crea intestazione della tabella
            let html = `
                <table class="tbl1">
                    <thead>
                        <tr class="border">
                            <th>Indirizzo</th>
                            <th>Targa 1</th>
                            <th>Targa 2</th>
                            <th>Targa 3</th>
                            <th>Data</th>
                            <th>Ora</th>
                            <th>Feriti</th>
                            <th>Morti</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            // Aggiungi i dati nella tabella
            data.forEach((elemento) => {
                    let row = templateRow
                        .replace("#D1", elemento.name.indirizzo)
                        .replace("#D2", elemento.name.targa1)
                        .replace("#D3", elemento.name.targa2)
                        .replace("#D4", elemento.name.targa3)
                        .replace("#D5", elemento.name.data)
                        .replace("#D6", elemento.name.ora)
                        .replace("#D7", elemento.name.numeroferiti)
                        .replace("#D8", elemento.name.numerovittime);
                    html += row;
            });

            // Completa la tabella
            html += `</tbody></table>`;

            // Inserisce l'HTML nella pagina
            parentElement.innerHTML = html;
        },
    };
};
