let myToken="";
fetch("conf.json").then(r => r.json()).then(conf => {
    myToken = conf.cacheToken;
});

export const createLogin = () => {
    const inputName = document.querySelector("#name");
    const inputPassword = document.querySelector("#password");
    const loginButton = document.querySelector("#login");
    const divPrivate = document.querySelector("#private");
    const divLogin = document.querySelector("#login");
  
    divPrivate.classList.add("hidden");
    let isLogged = sessionStorage.getItem("Logged") || false;
  
    const login = (username, password) => {
      return new Promise((resolve, reject) => {
        fetch("http://ws.cipiaceinfo.it/credential/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "key": myToken,
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        })
          .then((r) => r.json())
          .then((r) => {
            resolve(r.result);
          })
          .catch((error) => {
            reject(error);
          });
      });
    };
  
    loginButton.onclick = () => {
      login(inputName.value, inputPassword.value) 
        .then((result) => {
          if (result) {
            isLogged = true;
            sessionStorage.setItem("Logged", true);
            divPrivate.classList.remove("hidden");
            divPrivate.classList.add("visible");
          }
        })
        .catch((error) => {
          console.error("Errore durante il login:", error);
        });
    };
  
    return {
      isLogged: () => isLogged,
    };
  };
  