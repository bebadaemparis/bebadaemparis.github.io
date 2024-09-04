document.addEventListener('DOMContentLoaded', function () {
    // Função para gerar número de venda automaticamente
    function gerarNumeroVenda() {
        const vendas = JSON.parse(localStorage.getItem('vendas')) || [];
        return vendas.length + 1; // O número da venda será o próximo número sequencial
    }

    // Popular os selects com carros, clientes e vendedores cadastrados
    function popularSelects() {
        const carros = JSON.parse(localStorage.getItem('veiculos')) || [];
        const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        const vendedores = JSON.parse(localStorage.getItem('vendedores')) || [];

        const selectCarro = document.getElementById('veiculo-venda');
        const selectCliente = document.getElementById('cliente-venda');
        const selectVendedor = document.getElementById('vendedor-venda');

        carros.forEach(carro => {
            const option = document.createElement('option');
            option.value = carro.chassi;
            option.textContent = `${carro.marca} ${carro.modelo} (${carro.placa})`;
            selectCarro.appendChild(option);
        });

        clientes.forEach(cliente => {
            const option = document.createElement('option');
            option.value = cliente.cpf; // Usamos CPF como valor
            option.textContent = `${cliente.nome} (${cliente.cpf})`;
            selectCliente.appendChild(option);
        });

        vendedores.forEach(vendedor => {
            const option = document.createElement('option');
            option.value = vendedor.cpf; // Usamos CPF como valor
            option.textContent = `${vendedor.nome} (${vendedor.cpf})`;
            selectVendedor.appendChild(option);
        });
    }

    // Função para registrar a venda
    document.getElementById('form-venda').addEventListener('submit', function (event) {
        event.preventDefault();

        const venda = {
            numero: gerarNumeroVenda(), // Gera o número da venda automaticamente
            data: document.getElementById('data-venda').value,
            clienteCpf: document.getElementById('cliente-venda').value,
            vendedorCpf: document.getElementById('vendedor-venda').value,
            veiculoChassi: document.getElementById('veiculo-venda').value,
            valorEntrada: document.getElementById('valor-entrada').value,
            valorFinanciado: document.getElementById('valor-financiado').value,
            valorTotal: document.getElementById('valor-total').value
        };

        let vendas = JSON.parse(localStorage.getItem('vendas')) || [];
        vendas.push(venda);
        localStorage.setItem('vendas', JSON.stringify(vendas));
        alert('Venda registrada com sucesso!');
        document.getElementById('form-venda').reset();

        // Atualizar o número da próxima venda
        document.getElementById('numero-venda').value = gerarNumeroVenda();
    });

    // Função para listar as vendas realizadas
    document.getElementById('listar-vendas').addEventListener('click', function () {
        const listaVendasDiv = document.getElementById('lista-vendas');
        listaVendasDiv.innerHTML = ''; // Limpar lista antes de adicionar as vendas

        const vendas = JSON.parse(localStorage.getItem('vendas')) || [];
        const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        const carros = JSON.parse(localStorage.getItem('veiculos')) || [];
        const vendedores = JSON.parse(localStorage.getItem('vendedores')) || [];

        if (vendas.length === 0) {
            listaVendasDiv.innerHTML = '<p>Nenhuma venda registrada.</p>';
            return;
        }

        vendas.forEach(function (venda, index) {
            const cliente = clientes.find(c => c.cpf === venda.clienteCpf) || { nome: 'Desconhecido', cpf: 'Desconhecido' };
            const vendedor = vendedores.find(v => v.cpf === venda.vendedorCpf) || { nome: 'Desconhecido', cpf: 'Desconhecido' };
            const carro = carros.find(c => c.chassi === venda.veiculoChassi) || { marca: 'Desconhecido', modelo: 'Desconhecido', placa: 'Desconhecida' };

            const vendaDiv = document.createElement('div');
            vendaDiv.classList.add('venda-item');

            vendaDiv.innerHTML = `
                <h3>Venda ${venda.numero}</h3>
                <p><strong>Data:</strong> ${venda.data}</p>
                <p><strong>Cliente:</strong> ${cliente.nome} (${cliente.cpf})</p>
                <p><strong>Vendedor:</strong> ${vendedor.nome} (${vendedor.cpf})</p>
                <p><strong>Veículo:</strong> ${carro.marca} ${carro.modelo} (${carro.placa})</p>
                <p><strong>Valor da Entrada:</strong> ${venda.valorEntrada}</p>
                <p><strong>Valor Financiado:</strong> ${venda.valorFinanciado}</p>
                <p><strong>Valor Total:</strong> ${venda.valorTotal}</p>
                <button class="imprimir-venda" data-index="${index}">Imprimir</button>
                <hr>
            `;
            listaVendasDiv.appendChild(vendaDiv);
        });

        // Adicionar evento de clique para os botões de impressão
        document.querySelectorAll('.imprimir-venda').forEach(function (button) {
            button.addEventListener('click', function () {
                const vendaIndex = this.getAttribute('data-index');
                imprimirVenda(vendas[vendaIndex]);
            });
        });
    });

    function imprimirVenda(venda) {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Imprimir Venda</title>');
        printWindow.document.write('</head><body>');
        printWindow.document.write('<h2>Detalhes da Venda</h2>');
        printWindow.document.write(`<p><strong>Número da Venda:</strong> ${venda.numero}</p>`);
        printWindow.document.write(`<p><strong>Data:</strong> ${venda.data}</p>`);
        
        const cliente = JSON.parse(localStorage.getItem('clientes')).find(c => c.cpf === venda.clienteCpf) || { nome: 'Desconhecido', cpf: 'Desconhecido' };
        const vendedor = JSON.parse(localStorage.getItem('vendedores')).find(v => v.cpf === venda.vendedorCpf) || { nome: 'Desconhecido', cpf: 'Desconhecido' };
        const carro = JSON.parse(localStorage.getItem('veiculos')).find(c => c.chassi === venda.veiculoChassi) || { marca: 'Desconhecido', modelo: 'Desconhecido', placa: 'Desconhecida' };
        
        printWindow.document.write(`<p><strong>Cliente:</strong> ${cliente.nome} (${cliente.cpf})</p>`);
        printWindow.document.write(`<p><strong>Vendedor:</strong> ${vendedor.nome} (${vendedor.cpf})</p>`);
        printWindow.document.write(`<p><strong>Veículo:</strong> ${carro.marca} ${carro.modelo} (${carro.placa})</p>`);
        printWindow.document.write(`<p><strong>Valor da Entrada:</strong> ${venda.valorEntrada}</p>`);
        printWindow.document.write(`<p><strong>Valor Financiado:</strong> ${venda.valorFinanciado}</p>`);
        printWindow.document.write(`<p><strong>Valor Total:</strong> ${venda.valorTotal}</p>`);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }

    // Chamar as funções para popular os selects e gerar número de venda automaticamente
    popularSelects();
    document.getElementById('numero-venda').value = gerarNumeroVenda(); // Definir o número da venda no campo
});
