
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then( States => {
        for(const state of States){
            ufSelect.innerHTML += `<option value ="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML =""
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then(cities => {
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}
 

document.querySelector("select[name=uf]")
    .addEventListener("change", getCities) 

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const colletedItems = document.querySelector("input[name=items]")

let SelectedItems =[]

function handleSelectedItem(event){

    const itemLi = event.target
    // adcionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id


    // verificar se exitem itens selecionados, se sim
    // pegar os itens selecionados

    const alreadySelected = SelectedItems.findIndex(item => {
        const itemFound = item === itemId
        return itemFound
    })

    // se ja estiver selecionado
    if (alreadySelected >=0){
        const filteredItems = SelectedItems.filter(item =>{
            const itemIsDifferent = item != itemId
            return itemIsDifferent
            
        })

        SelectedItems = filteredItems
    }else{
        // se não estiver selecionado
        // adicionar à seleção
        SelectedItems.push(itemId)
    }

    console.log(SelectedItems)
    // atualizar o campo escondido com os itens selecionados
    colletedItems.value = SelectedItems

}


