document.addEventListener('DOMContentLoaded', function() {
    // Dados das montadoras e seus modelos de veículos
    const montadorasModelos = {
        'Toyota': ['Corolla', 'Camry', 'Hilux'],
        'Ford': ['Focus', 'Fiesta', 'Ranger'],
        'Honda': ['Civic', 'Accord', 'CR-V'],
        // Adicione aqui outras montadoras e seus modelos
    };

    // Função para preencher o select de montadoras
    function carregarMontadoras() {
        const montadoraSelect = document.getElementById('montadora');
        let montadoras = JSON.parse(localStorage.getItem('montadoras')) || [];
        
        montadoraSelect.innerHTML = '<option value="">Selecione a montadora</option>';

        montadoras.forEach(montadora => {
            const option = document.createElement('option');
            option.value = montadora.nome;
            option.textContent = montadora.nome;
            montadoraSelect.appendChild(option);
        });
    }

    function atualizarModelos() {
        const montadoraSelect = document.getElementById('montadora');
        const modeloSelect = document.getElementById('modelo-veiculo');
        const montadoraSelecionada = montadoraSelect.value;
        modeloSelect.innerHTML = '<option value="">Selecione o modelo</option>'; // Limpar modelos existentes

        if (montadoraSelecionada && montadorasModelos[montadoraSelecionada]) {
            const modelos = montadorasModelos[montadoraSelecionada];
            
            modelos.forEach(modelo => {
                const option = document.createElement('option');
                option.value = modelo;
                option.textContent = modelo;
                modeloSelect.appendChild(option);
            });
        }
    }

    carregarMontadoras();

    document.getElementById('montadora').addEventListener('change', atualizarModelos);

    // Lógica para salvar o pedido no localStorage
    document.getElementById('form-pedido').addEventListener('submit', function(event) {
        event.preventDefault();

        const pedido = {
            numero: document.getElementById('numero-pedido').value,
            data: document.getElementById('data-pedido').value,
            montadora: document.getElementById('montadora').value,
            modeloVeiculo: document.getElementById('modelo-veiculo').value,
            quantidade: document.getElementById('quantidade').value
        };

        let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
        pedidos.push(pedido);
        localStorage.setItem('pedidos', JSON.stringify(pedidos));
        alert('Pedido salvo com sucesso!');
        document.getElementById('form-pedido').reset();
        atualizarModelos(); // Atualizar a lista de modelos após o envio
    });

    // Lógica para listar os pedidos
    document.getElementById('listar-pedidos').addEventListener('click', function() {
        let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
        const listaPedidos = document.getElementById('lista-pedidos');
        listaPedidos.innerHTML = '';

        pedidos.forEach(pedido => {
            const li = document.createElement('li');
            li.textContent = `Número: ${pedido.numero}, Data: ${pedido.data}, Montadora: ${pedido.montadora}, Modelo: ${pedido.modeloVeiculo}, Quantidade: ${pedido.quantidade}`;
            listaPedidos.appendChild(li);
        });
    });
});
