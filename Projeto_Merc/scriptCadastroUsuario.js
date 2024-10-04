document.getElementById("cadastroUsuario").addEventListener('submit', async (event) => {
    console.log("teste");
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