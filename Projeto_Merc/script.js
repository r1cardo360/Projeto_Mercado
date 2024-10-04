function menuOnClick() {
    document.getElementById("menu-bar").classList.toggle("change");
    document.getElementById("nav").classList.toggle("change");
    document.getElementById("menu-bg").classList.toggle("change-bg");
  }

function loadComponent(id, file){
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.log("Erro ao carregar o componente: ", error));

        if(file == "cadastro_usuario.html"){
            const form = document.getElementById('cadastroUsuario');
        }

}

loadComponent("navbar", "navbar.html");
loadComponent("content", "carrinho.html");