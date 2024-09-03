document.getElementById('form-montadora').addEventListener('submit', function(event) {
    event.preventDefault();

    const montadora = {
        codigo: document.getElementById('codigo-montadora').value,
        nome: document.getElementById('nome-montadora').value,
        cidade: document.getElementById('cidade-montadora').value,
        estado: document.getElementById('estado-montadora').value
    };

    let montadoras = JSON.parse(localStorage.getItem('montadoras')) || [];
    montadoras.push(montadora);
    localStorage.setItem('montadoras', JSON.stringify(montadoras));
    alert('Montadora salva com sucesso!');
    document.getElementById('form-montadora').reset();
});

document.getElementById('listar-montadoras').addEventListener('click', function() {
    let montadoras = JSON.parse(localStorage.getItem('montadoras')) || [];
    const listaMontadoras = document.getElementById('lista-montadoras');
    listaMontadoras.innerHTML = '';

    montadoras.sort((a, b) => a.nome.localeCompare(b.nome));

    montadoras.forEach(montadora => {
        const li = document.createElement('li');
        li.textContent = `${montadora.nome} - ${montadora.cidade}/${montadora.estado}`;
        listaMontadoras.appendChild(li);
    });
});
