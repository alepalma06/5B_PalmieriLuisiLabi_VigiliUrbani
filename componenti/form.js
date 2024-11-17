export const createForm = (parentElement, Map,tableComponent) => {
    let dato_lista = [];
    let callback = null;

    return {
        setLabels: (labels) => {
            dato_lista = labels;
        },
        onsubmit: (callbackInput) => {
            callback = callbackInput;
        },
        render: (table1, compFetch, mappe) => {
            parentElement.innerHTML =
                `<div>Indirizzo<br/><input id="indirizzo" type="text" class="form-label form-control"/></div>` +
                `<div>Targa 1(obbligatorio)<br/><input id="targa1" type="text" class="form-label form-control"/></div>` +
                `<div>Targa 2<br/><input id="targa2" type="text" class="form-label form-control"/></div>` +
                `<div>Targa 3<br/><input id="targa3" type="text" class="form-label form-control"/></div>` +
                `<div>Data<br/><input id="data_incidente" type="date" class="form-label form-control"/></div>` +
                `<div>Ora<br/><input id="ora" type="time" class="form-label form-control"/></div>` +
                `<div>Numero Feriti<br/><input id="numeroferiti" type="number" class="form-label form-control"/></div>` +
                `<div>Numero Vittime<br/><input id="numerovittime" type="number" class="form-label form-control"/></div>` +
                `<div id="outputform"></div>` 

            document.querySelector("#Aggiungi").onclick = () => {
                const indirizzo = document.querySelector("#indirizzo").value;
                const targa1 = document.querySelector("#targa1").value;
                let targa2 = document.querySelector("#targa2").value;
                let targa3 = document.querySelector("#targa3").value;
                const data_incidente = document.querySelector("#data_incidente").value;
                const ora = document.querySelector("#ora").value;
                const numeroferiti = document.querySelector("#numeroferiti").value;
                const numerovittime = document.querySelector("#numerovittime").value;
                const outputform = document.getElementById("outputform");
                const oggi = new Date();
                const giorno = oggi.getDate();
                const mese = oggi.getMonth() + 1; 
                const anno = oggi.getFullYear();
                const dataOdierna = `${anno}-${mese}-${giorno}`;
                if (indirizzo === "" || targa1 === "" || data_incidente === "" || ora === "" || numeroferiti === "" || numerovittime === "") {
                    outputform.innerHTML = "KO - Campi obbligatori mancanti";
                } else if (data_incidente > dataOdierna) {
                    outputform.innerHTML = "KO - La data non può essere futura";
                } else {
                    if (targa2===""){
                        targa2="Non segnalata";
                    }
                    if (targa3===""){
                        targa3="Non segnalata";
                    }
                    Map.add(indirizzo, targa1, targa2, targa3, data_incidente, ora, numeroferiti, numerovittime);
                    const dato = {
                        "Indirizzo": indirizzo,
                        "Targa 1": targa1,
                        "Targa 2": targa2,
                        "Targa 3": targa3,
                        "Data": data_incidente,
                        "Ora": ora,
                        "Numero Feriti": numeroferiti,
                        "Numero Vittime": numerovittime
                    };
                    dato_lista.push(dato);
                    compFetch.setData(dato_lista).then(data => {
                        compFetch.getData().then(data=>{
                            dato_lista=data;
                            table1.setData(dato_lista)
                            table1.render()
                            Map.render(dato_lista)
                        })
                    })}
                    tableComponent.setData(dato_lista);  
                    tableComponent.render();
                    compFetch.setData(dato_lista)
                    outputform.innerHTML = "OK";
                    document.querySelector("#indirizzo").value = "";
                    document.querySelector("#targa1").value = "";
                    document.querySelector("#targa2").value = "";
                    document.querySelector("#targa3").value = "";
                    document.querySelector("#data_incidente").value = "";
                    document.querySelector("#ora").value = "";
                    document.querySelector("#numeroferiti").value = "";
                    document.querySelector("#numerovittime").value = "";

                }
                

                // Resetta i campi
                document.querySelector("#indirizzo").value = "";
                document.querySelector("#targa1").value = "";
                document.querySelector("#targa2").value = "";
                document.querySelector("#targa3").value = "";
                document.querySelector("#data_incidente").value = "";
                document.querySelector("#ora").value = "";
                document.querySelector("#numeroferiti").value = "";
                document.querySelector("#numerovittime").value = "";
            }
        }
    };
;
