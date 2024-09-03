document.getElementById('form-vendedor').addEventListener('submit', function(event) {
    event.preventDefault();

    const vendedor = {
        codigo: document.getElementById('codigo').value,
        usuario: document.getElementById('usuario').value
    };

    let vendedores = JSON.parse(localStorage.getItem('vendedores')) || [];
    vendedores.push(vendedor);
    localStorage.setItem('vendedores', JSON.stringify(vendedores));
    alert('Vendedor salvo com sucesso!');
    document.getElementById('form-vendedor').reset();
});

document.getElementById('listar-vendedores').addEventListener('click', function() {
    let vendedores = JSON.parse(localStorage.getItem('vendedores')) || [];
    const listaVendedores = document.getElementById('lista-vendedores');
    listaVendedores.innerHTML = '';

    vendedores.sort((a, b) => a.usuario.localeCompare(b.usuario));

    vendedores.forEach(vendedor => {
        const li = document.createElement('li');
        li.textContent = `${vendedor.usuario} - Código: ${vendedor.codigo}`;
        listaVendedores.appendChild(li);
    });
});
