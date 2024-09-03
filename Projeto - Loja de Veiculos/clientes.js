document.getElementById('form-cliente').addEventListener('submit', function(event) {
    event.preventDefault();

    const cliente = {
        cpf: document.getElementById('cpf').value,
        nome: document.getElementById('nome').value,
        endereco: document.getElementById('endereco').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        telefone: document.getElementById('telefone').value,
        celular: document.getElementById('celular').value,
        renda: document.getElementById('renda').value
    };

    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes.push(cliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    alert('Cliente salvo com sucesso!');
    document.getElementById('form-cliente').reset();
});

document.getElementById('listar-clientes').addEventListener('click', function() {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const listaClientes = document.getElementById('lista-clientes');
    listaClientes.innerHTML = '';

    clientes.sort((a, b) => a.nome.localeCompare(b.nome));

    clientes.forEach(cliente => {
        const li = document.createElement('li');
        li.textContent = `${cliente.nome} - ${cliente.cpf} - ${cliente.cidade}/${cliente.estado} - ${cliente.celular}`;
        listaClientes.appendChild(li);
    });
});
