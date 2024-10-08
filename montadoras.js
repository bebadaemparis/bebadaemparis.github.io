document.addEventListener('DOMContentLoaded', function() {
    // Dados dos estados e cidades
    const estados = {
        'AC': 'Acre', 'AL': 'Alagoas', 'AP': 'Amapá', 'AM': 'Amazonas',
        'BA': 'Bahia', 'CE': 'Ceará', 'DF': 'Distrito Federal', 'ES': 'Espírito Santo',
        'GO': 'Goiás', 'MA': 'Maranhão', 'MT': 'Mato Grosso', 'MS': 'Mato Grosso do Sul',
        'MG': 'Minas Gerais', 'PA': 'Pará', 'PB': 'Paraíba', 'PR': 'Paraná',
        'PE': 'Pernambuco', 'PI': 'Piauí', 'RJ': 'Rio de Janeiro', 'RN': 'Rio Grande do Norte',
        'RS': 'Rio Grande do Sul', 'RO': 'Rondônia', 'RR': 'Roraima', 'SC': 'Santa Catarina',
        'SP': 'São Paulo', 'SE': 'Sergipe', 'TO': 'Tocantins'
    };

    const cidades = {
        'AC': ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira'],
        'AL': ['Maceió', 'Arapiraca', 'Palmeira dos Índios'],
        'AP': ['Macapá', 'Santana', 'Laranjal do Jari'],
        'AM': ['Manaus', 'Parintins', 'Itacoatiara'],
        'BA': ['Salvador', 'Feira de Santana', 'Vitória da Conquista'],
        'CE': ['Fortaleza', 'Caucaia', 'Juazeiro do Norte'],
        'DF': ['Brasília', 'Gama', 'Taguatinga'],
        'ES': ['Vitória', 'Vila Velha', 'Serra'],
        'GO': ['Goiânia', 'Anápolis', 'Rio Verde'],
        'MA': ['São Luís', 'Imperatriz', 'Caxias'],
        'MT': ['Cuiabá', 'Várzea Grande', 'Rondonópolis'],
        'MS': ['Campo Grande', 'Dourados', 'Três Lagoas'],
        'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem'],
        'PA': ['Belém', 'Ananindeua', 'Santarém'],
        'PB': ['João Pessoa', 'Campina Grande', 'Santa Rita'],
        'PR': ['Curitiba', 'Londrina', 'Maringá'],
        'PE': ['Recife', 'Olinda', 'Jaboatão dos Guararapes'],
        'PI': ['Teresina', 'Parnaíba', 'Picos'],
        'RJ': ['Rio de Janeiro', 'Niterói', 'Campos dos Goytacazes'],
        'RN': ['Natal', 'Mossoró', 'Caicó'],
        'RS': ['Porto Alegre', 'Caxias do Sul', 'Pelotas'],
        'RO': ['Porto Velho', 'Ji-Paraná', 'Rolim de Moura'],
        'RR': ['Boa Vista', 'Rorainópolis', 'Caracaraí'],
        'SC': ['Florianópolis', 'Joinville', 'Blumenau'],
        'SP': ['São Paulo', 'Campinas', 'São Bernardo do Campo'],
        'SE': ['Aracaju', 'Lagarto', 'Itabaiana'],
        'TO': ['Palmas', 'Araguaína', 'Gurupi']
    };

    // Dados das montadoras
    const montadoras = [
        'Toyota', 'Ford', 'Honda', 'Chevrolet', 'BMW', 'Mercedes-Benz',
        'Volkswagen', 'Audi', 'Nissan', 'Hyundai', 'Kia', 'Subaru',
        'Mazda', 'Jaguar', 'Land Rover', 'Porsche', 'Lexus', 'Fiat',
        'Renault', 'Peugeot', 'Citroën', 'Infiniti', 'Acura', 'Tesla',
        'Volvo', 'Dodge', 'Chrysler', 'Jeep', 'Mitsubishi', 'Buick',
        'Cadillac', 'Lincoln', 'Alfa Romeo', 'Maserati', 'Ferrari',
        'Lamborghini', 'Aston Martin', 'Rolls-Royce', 'Bentley', 'Pagani',
        'Lotus', 'Koenigsegg', 'Fisker', 'Rivian', 'Polestar', 'Genesis',
        'Ram', 'Smart', 'GAC', 'BYD'
    ];

    // Função para preencher a lista de estados
    const estadoSelect = document.getElementById('estado-montadora');
    const cidadeSelect = document.getElementById('cidade-montadora');
    const nomeMontadoraSelect = document.getElementById('nome-montadora');

    for (const [sigla, nome] of Object.entries(estados)) {
        const option = document.createElement('option');
        option.value = sigla;
        option.textContent = nome;
        estadoSelect.appendChild(option);
    }

    montadoras.forEach(montadora => {
        const option = document.createElement('option');
        option.value = montadora;
        option.textContent = montadora;
        nomeMontadoraSelect.appendChild(option);
    });

    estadoSelect.addEventListener('change', function() {
        const estadoSelecionado = estadoSelect.value;
        cidadeSelect.innerHTML = '<option value="">Selecione a cidade</option>';

        if (estadoSelecionado) {
            const cidadesList = cidades[estadoSelecionado] || [];
            cidadesList.forEach(cidade => {
                const option = document.createElement('option');
                option.value = cidade;
                option.textContent = cidade;
                cidadeSelect.appendChild(option);
            });
        }
    });

    // Lógica para salvar a montadora no localStorage
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
        document.getElementById('estado-montadora').value = '';
        document.getElementById('cidade-montadora').innerHTML = '<option value="">Selecione a cidade</option>'; // Limpar cidades
    });

    // Lógica para listar as montadoras
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
});
