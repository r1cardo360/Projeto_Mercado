function menuOnClick() {
    document.getElementById("menu-bar").classList.toggle("change");
    document.getElementById("nav").classList.toggle("change");
    document.getElementById("menu-bg").classList.toggle("change-bg");
  }

  function enviarUsuario(){
    document.getElementById("cadastroUsuario").addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome_usuario = document.getElementById("nome_usuario").value;

        const response = await fetch('/usuarios',{
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({nome_usuario})
        });

        document.getElementById("nome_usuario").value = '';

        if(response.ok){
            const data = await response.json();
            alert(data.message);
        }else{
            const errorData = await response.json();
            alert(errorData.error);
        }

    })
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