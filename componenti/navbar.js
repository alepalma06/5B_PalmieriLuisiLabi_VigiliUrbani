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
                    <input type="text" id="indirizzofiltro" class="form-control" placeholder="Inserisci un indirizzo">
                    <button id="bottonefiltro" class="btn btn-primary mt-2">Filtra</button>
                </div>
            `;
            parentElement.innerHTML = html;

            // Eventi sul pulsante di filtro
            document.getElementById("bottonefiltro").onclick = () => {
                const filtrovalore = document.getElementById("indirizzofiltro").value.toLowerCase();
                console.log(filtrovalore)
                table1.filterRows(filtrovalore);
                table1.render();
                document.querySelector("#indirizzofiltro").value = "";
            };
            

        },
    };
};