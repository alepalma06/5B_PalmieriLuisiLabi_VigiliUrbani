export const NavBarComponent = () => {
    let parentElement;

    return {
        setParentElement: (pr) => {
            // FUNZIONE CHE DETERMINA DOVE POSIZIONARE LA RENDER
            parentElement = pr;
        },
        render: (form, table1) => {
            // HTML con input text e pulsante
            const html = `
                <div class="filter-container">
                    <input type="text" id="addressFilter" class="form-control" placeholder="Inserisci un indirizzo">
                    <button id="filterButton" class="btn btn-primary mt-2">Filtra</button>
                </div>
            `;
            parentElement.innerHTML = html;

            // Eventi sul pulsante di filtro
            document.getElementById("filterButton").onclick = () => {
                const filterValue = document.getElementById("addressFilter").value.toLowerCase();
                table1.filterRows(filterValue);
                table1.render();
            };

        },
    };
};