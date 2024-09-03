document.getElementById('form-veiculo').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('foto');
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onloadend = function() {
        const veiculo = {
            chassi: document.getElementById('chassi').value,
            placa: document.getElementById('placa').value,
            marca: document.getElementById('marca').value,
            modelo: document.getElementById('modelo').value,
            anoFabricacao: document.getElementById('ano-fabricacao').value,
            anoModelo: document.getElementById('ano-modelo').value,
            cor: document.getElementById('cor').value,
            valor: document.getElementById('valor').value,
            foto: reader.result // Base64 encoded image
        };

        let veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
        veiculos.push(veiculo);
        localStorage.setItem('veiculos', JSON.stringify(veiculos));
        alert('Veículo registrado com sucesso!');
        document.getElementById('form-veiculo').reset();
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

document.getElementById('listar-veiculos').addEventListener('click', function() {
    const veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
    const listaVeiculos = document.getElementById('lista-veiculos');
    listaVeiculos.innerHTML = '';

    veiculos.forEach((veiculo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>Chassi:</strong> ${veiculo.chassi}<br>
            <strong>Placa:</strong> ${veiculo.placa}<br>
            <strong>Marca:</strong> ${veiculo.marca}<br>
            <strong>Modelo:</strong> ${veiculo.modelo}<br>
            <strong>Ano de Fabricação:</strong> ${veiculo.anoFabricacao}<br>
            <strong>Ano do Modelo:</strong> ${veiculo.anoModelo}<br>
            <strong>Cor:</strong> ${veiculo.cor}<br>
            <strong>Valor:</strong> ${veiculo.valor}<br>
            <strong>Foto:</strong><br>
            <img src="${veiculo.foto}" alt="Foto do Veículo" style="max-width: 200px; height: auto;"><br>
            <button class="excluir-veiculo" data-index="${index}" style="color: red;">&#128465; Excluir</button><br><br>
        `;
        listaVeiculos.appendChild(li);
    });

    // Adiciona o evento de exclusão a cada botão de exclusão
    document.querySelectorAll('.excluir-veiculo').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            excluirVeiculo(index);
        });
    });
});

function excluirVeiculo(index) {
    let veiculos = JSON.parse(localStorage.getItem('veiculos')) || [];
    veiculos.splice(index, 1);
    localStorage.setItem('veiculos', JSON.stringify(veiculos));
    alert('Veículo excluído com sucesso!');
    document.getElementById('listar-veiculos').click(); // Recarrega a lista de veículos
}
