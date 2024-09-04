document.addEventListener('DOMContentLoaded', function() {
    // Função para carregar os estados
    const estados = {
        'AC': 'Acre', 'AL': 'Alagoas', 'AP': 'Amapá', 'AM': 'Amazonas',
        'BA': 'Bahia', 'CE': 'Ceará', 'DF': 'Distrito Federal', 'ES': 'Espírito Santo',
        'GO': 'Goiás', 'MA': 'Maranhão', 'MT': 'Mato Grosso', 'MS': 'Mato Grosso do Sul',
        'MG': 'Minas Gerais', 'PA': 'Pará', 'PB': 'Paraíba', 'PR': 'Paraná',
        'PE': 'Pernambuco', 'PI': 'Piauí', 'RJ': 'Rio de Janeiro', 'RN': 'Rio Grande do Norte',
        'RS': 'Rio Grande do Sul', 'RO': 'Rondônia', 'RR': 'Roraima', 'SC': 'Santa Catarina',
        'SP': 'São Paulo', 'SE': 'Sergipe', 'TO': 'Tocantins'
    };

    const estadoSelect = document.getElementById('estado');
    const cidadeSelect = document.getElementById('cidade');

    for (const [sigla, nome] of Object.entries(estados)) {
        const option = document.createElement('option');
        option.value = sigla;
        option.textContent = nome;
        estadoSelect.appendChild(option);
    }

    estadoSelect.addEventListener('change', function() {
        const estadoSelecionado = estadoSelect.value;
        cidadeSelect.innerHTML = '<option value="">Selecione a cidade</option>';

        if (estadoSelecionado) {
            fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`)
                .then(response => response.json())
                .then(cidades => {
                    cidades.forEach(cidade => {
                        const option = document.createElement('option');
                        option.value = cidade.nome;
                        option.textContent = cidade.nome;
                        cidadeSelect.appendChild(option);
                    });
                });
        }
    });

    // Adicionar clientes ao carregar a página
    listarClientes();
});

document.getElementById('form-cliente').addEventListener('submit', function(event) {
    event.preventDefault();

    const cliente = {
        id: Date.now(),  // Gera um ID único baseado no timestamp
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        endereco: document.getElementById('endereco').value,
        estado: document.getElementById('estado').value,
        cidade: document.getElementById('cidade').value,
        cpf: document.getElementById('cpf').value,
        foto: ''
    };

    const fotoInput = document.getElementById('foto-cliente');
    if (fotoInput.files && fotoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            cliente.foto = e.target.result;
            salvarCliente(cliente);
        };
        reader.readAsDataURL(fotoInput.files[0]);
    } else {
        salvarCliente(cliente);
    }
});

function salvarCliente(cliente) {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes.push(cliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    alert('Cliente registrado com sucesso!');
    document.getElementById('form-cliente').reset();
    document.getElementById('estado').value = '';
    document.getElementById('cidade').innerHTML = '<option value="">Selecione a cidade</option>'; // Limpar cidades
    listarClientes(); // Atualiza a lista de clientes
}

function listarClientes() {
    const listaClientesDiv = document.getElementById('lista-clientes');
    listaClientesDiv.innerHTML = '';

    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    clientes.forEach(function(cliente) {
        const clienteDiv = document.createElement('div');
        clienteDiv.classList.add('cliente-item');

        clienteDiv.innerHTML = `
            ${cliente.foto ? `<img src="${cliente.foto}" class="foto-cliente" alt="Foto do Cliente">` : ''}
            <h3>${cliente.nome}</h3>
            <p><strong>Email:</strong> ${cliente.email}</p>
            <p><strong>Telefone:</strong> ${cliente.telefone}</p>
            <p><strong>Endereço:</strong> ${cliente.endereco}, ${cliente.cidade} - ${cliente.estado}</p>
            <p><strong>CPF:</strong> ${cliente.cpf}</p>
            <button onclick="editarCliente(${cliente.id})">Editar</button>
            <button onclick="excluirCliente(${cliente.id})">Excluir</button>
        `;

        listaClientesDiv.appendChild(clienteDiv);
    });
}

function excluirCliente(id) {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes = clientes.filter(cliente => cliente.id !== id);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    listarClientes(); // Atualiza a lista após exclusão
}

function editarCliente(id) {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const cliente = clientes.find(cliente => cliente.id === id);

    if (cliente) {
        document.getElementById('nome').value = cliente.nome;
        document.getElementById('email').value = cliente.email;
        document.getElementById('telefone').value = cliente.telefone;
        document.getElementById('endereco').value = cliente.endereco;
        document.getElementById('estado').value = cliente.estado;
        document.getElementById('cidade').value = cliente.cidade;
        document.getElementById('cpf').value = cliente.cpf;
        document.getElementById('preview-foto-cliente').src = cliente.foto || '';

        // Remove o cliente atual para que ele seja atualizado no salvamento
        excluirCliente(id);
    }
}
