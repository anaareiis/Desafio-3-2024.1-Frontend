document.addEventListener('DOMContentLoaded', function () {
    const ufInput = document.getElementById('ufInput');
    const municipios = document.getElementById('municipios');

    function fetchMunicipios() {
        const uf = ufInput.value.trim().toUpperCase();
        if (uf) {
            fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Não foi possível obter os municípios.');
                    }
                    return response.json();
                })
                .then(data => {
                    municipios.innerHTML = '';
                    data.forEach(municipio => {
                        const li = document.createElement('li');
                        li.textContent = municipio.nome;
                        municipios.appendChild(li);
                    });
                });
        } else {
            alert('Digite a sigla de um estado.');
        }
    }

    ufInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            fetchMunicipios();
        }
    });
});
