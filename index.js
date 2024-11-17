const tabella = document.getElementById("tabella");
const precendente = document.getElementById("precedente");
const successiva = document.getElementById("successiva");
let starDay = 0;
const navbar = document.getElementById("navbar");
const formElement = document.getElementById("form");

import { tableComponent } from './componenti/tabella.js';
import { NavBarComponent } from './componenti/navbar.js';
import { createForm } from './componenti/form.js';
import { generateFetchComponent } from './componenti/fetch_componenti.js';
import { createMap } from './componenti/mappa.js';

fetch("conf.json")
    .then((r) => r.json())
    .then((conf) => {
        const table1 = tableComponent();
        const navBarComp = NavBarComponent(conf);
        const compFetch = generateFetchComponent();
        const Map = createMap();

        // Controllo se Map contiene il metodo `add`
        if (typeof Map.add !== 'function') {
            console.error('Il metodo "add" non è definito nell\'oggetto Map.');
        }

        // Configura e renderizza la mappa
        Map.render();

        // Crea la form, passando l'oggetto Map
        const form = createForm(formElement, Map);

        console.log('Oggetto Map:', Map);
        console.log('Oggetto form:', form);

        // Carica i dati di configurazione
        compFetch.caricaDati(conf);

        // Configura e renderizza la form
        form.render(table1, compFetch, Map);

        // Recupera i dati e popola i componenti
        compFetch.getData().then((data) => {
            form.setLabels(data);
            table1.setData(data); // Imposta i dati nella tabella
            table1.setParentElement(tabella);
            table1.render(starDay); // Renderizza la tabella
        });

        // Gestione dei pulsanti per la navigazione della tabella
        precendente.onclick = () => {
            starDay -= 7;
            table1.start(starDay);
            table1.render();
        };

        successiva.onclick = () => {
            starDay += 7;
            table1.start(starDay);
            table1.render();
        };

        // Configura e renderizza la barra di navigazione
        navBarComp.setParentElement(navbar);
        navBarComp.render(form, table1);
    })
    .catch((error) => {
        console.error("Errore nel caricamento della configurazione:", error);
    });
