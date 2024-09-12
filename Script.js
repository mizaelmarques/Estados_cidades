const selectCidades = document.querySelector("#uf");
const selectMunicipios = document.querySelector("#cidade");

function Estados() {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
    .then(res => res.json())
    .then(estados => {
        estados.map(estado => {
            const option = document.createElement("option");
            option.setAttribute('value', estado.id);  
            option.textContent = estado.nome;  
            selectCidades.appendChild(option);
        });
    })
}
function Municipios(sigla) {
    selectMunicipios.disabled = true; 
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${sigla}/municipios`)
    .then(res => res.json())
    .then(cidades => {
        selectMunicipios.innerHTML = '<option value="">Selecione uma cidade</option>';  
        cidades.map(cidade => {
            const option = document.createElement("option");
            option.setAttribute('value', cidade.id);  
            option.textContent = cidade.nome;  
            selectMunicipios.appendChild(option);
        });
        selectMunicipios.disabled = false; 
    })
}
selectCidades.addEventListener("change", (event) => {
    const sigla = event.target.value;
    if (sigla) {
        Municipios(sigla);
    } else {
        selectMunicipios.disabled = true;
    }
});
Estados();