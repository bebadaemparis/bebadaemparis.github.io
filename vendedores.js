document.addEventListener('DOMContentLoaded', function () {
    // Função para gerar código de vendedor automaticamente
    function gerarCodigoVendedor() {
        const vendedores = JSON.parse(localStorage.getItem('vendedores')) || [];
        return vendedores.length ? vendedores[vendedores.length - 1].codigo + 1 : 1;
    }

    // Função para salvar um novo vendedor
    document.getElementById('form-vendedor').addEventListener('submit', function (event) {
        event.preventDefault();

        const codigo = document.getElementById('codigo').value || gerarCodigoVendedor();
        const vendedor = {
            codigo: parseInt(codigo, 10),
            nome: document.getElementById('usuario').value // Alterado de 'usuario' para 'nome' para consistência
        };

        let vendedores = JSON.parse(localStorage.getItem('vendedores')) || [];
        const index = vendedores.findIndex(v => v.codigo === vendedor.codigo);

        if (index >= 0) {
            // Atualiza vendedor existente
            vendedores[index] = vendedor;
            alert('Vendedor alterado com sucesso!');
        } else {
            // Adiciona novo vendedor
            vendedores.push(vendedor);
            alert('Vendedor salvo com sucesso!');
        }

        localStorage.setItem('vendedores', JSON.stringify(vendedores));
        document.getElementById('form-vendedor').reset();
        document.getElementById('codigo').value = '';
        listarVendedores(); // Atualizar a lista de vendedores
    });

    // Função para listar vendedores
    function listarVendedores() {
        let vendedores = JSON.parse(localStorage.getItem('vendedores')) || [];
        const listaVendedores = document.getElementById('lista-vendedores');
        listaVendedores.innerHTML = '';

        if (vendedores.length === 0) {
            listaVendedores.innerHTML = '<li>Nenhum vendedor registrado.</li>';
            return;
        }

        vendedores.sort((a, b) => a.nome.localeCompare(b.nome));

        vendedores.forEach(vendedor => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${vendedor.nome} - Código: ${vendedor.codigo}
                <button onclick="editarVendedor(${vendedor.codigo})">Editar</button>
                <button onclick="excluirVendedor(${vendedor.codigo})">Excluir</button>
            `;
            listaVendedores.appendChild(li);
        });
    }

    // Função para editar um vendedor
    window.editarVendedor = function (codigo) {
        let vendedores = JSON.parse(localStorage.getItem('vendedores')) || [];
        const vendedor = vendedores.find(v => v.codigo === codigo);

        if (vendedor) {
            document.getElementById('codigo').value = vendedor.codigo;
            document.getElementById('usuario').value = vendedor.nome; // Alterado de 'nome' para 'usuario' para consistência
        }
    };

    // Função para excluir um vendedor
    window.excluirVendedor = function (codigo) {
        let vendedores = JSON.parse(localStorage.getItem('vendedores')) || [];
        vendedores = vendedores.filter(v => v.codigo !== codigo);
        localStorage.setItem('vendedores', JSON.stringify(vendedores));
        alert('Vendedor excluído com sucesso!');
        listarVendedores(); // Atualizar a lista de vendedores
    };

    // Inicializar a lista de vendedores ao carregar a página
    listarVendedores();
});
