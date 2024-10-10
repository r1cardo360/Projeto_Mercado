
const tabela = document.getElementById('tabela-principal');

tabela.addEventListener('click', function(e){
    const registro = e.target;
    const tr = registro.closest('tr');
    const idUsuario = tr.getAttribute('data-id');
    console.log(idUsuario);

    if(tr){
        const linhas = tabela.querySelectorAll('tbody tr');
        linhas.forEach(linha => {linha.classList.remove('table-active')});
    }

    tr.classList.add('table-active');

})

async function getUsuarios(){
    try{
        const response = await fetch('http://127.0.0.1:3001/api/getUsuarios');
        if(!response.ok){
            throw new Error('Houve algum erro ao buscar a API');
        }
        
        const data = await response.json();

        const tabela = document.getElementById('tabela-usuario')

        data.forEach(dados => {
            const tr = document.createElement('tr');
            tr.setAttribute('data-id', dados.id_usuario);

            const th = document.createElement('th');
            th.setAttribute('scope', 'row');
            th.textContent = dados.id_usuario;
            tr.appendChild(th);

            const td = document.createElement('td');
            td.textContent = dados.nome;
            tr.appendChild(td);

            tabela.appendChild(tr);
        });

    }catch(error){
        console.error('ocorreu um erro para buscar a API', error);
    }
}

function limparTabela(){
    const tabela = document.getElementById('tabela-usuario');
    tabela.innerHTML = ``;
}

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

    limparTabela();
    getUsuarios();

});

getUsuarios();
