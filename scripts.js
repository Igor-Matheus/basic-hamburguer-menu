const list = document.querySelector('ul')
const buttonShowAll = document.querySelector('.show-all')
const buttonDiscount = document.querySelector('.discount')
const buttonTotal = document.querySelector('.total')
const buttonShowFilter = document.querySelector('.filter-vegan')

const discountPercentage = {
    TEN: 0.9
}

// arrow function para limpar a tela de listagem
const eraseList = () => list.innerHTML = ''

// formatar como a moeda é exibida no site
function formatCurrency(value) {
    const newValue = value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

    return newValue
}

// mostrar todos os produtos
function showAll(productsArray) {
    let newLi = ''
    eraseList()

    productsArray.forEach((product) => {
        newLi += `
            <li>
                <img src=${product.src}>
                <p>${product.name}</p>
                <p class="item-price">${formatCurrency(product.price)}</p> 
            </li>
        `
    })

    list.innerHTML = newLi
}

// dar 10% de desconto em todos os produtos
function giveDiscount() {
    const newPrices = menuOptions.map((product) => ({
        ...product, // Spread Opeartor, para mudar só o price
        price: (product.price * discountPercentage.TEN),
    }))

    showAll(newPrices)
}

// somar o preço de todos os produtos SEM DESCONTO
function calculateSum(productsArray) {
    //eraseList()

    const sum = productsArray.reduce((acc, item) => {
        return acc + item.price
    }, 0)

    list.innerHTML = `
        <li>
            <p>A soma de todos os itens do menu é: ${formatCurrency(sum)}</p>
        </li>
    `
}

// filtrar, mostrando apenas as opções de lanches veganos
function showFilter() {
    // só se o item tem "vegan: true" é que vai aparecer
    const filterLi = menuOptions.filter((item) => item.vegan)

    showAll(filterLi)
}

// Só irá chamar a função showAll quando clicar no botão. Basta adicionar uma função anônima quando houver parâmetros no EventListener
buttonShowAll.addEventListener('click', () => showAll(menuOptions))

buttonDiscount.addEventListener('click', giveDiscount)
buttonTotal.addEventListener('click', () => calculateSum(menuOptions))

buttonShowFilter.addEventListener('click', showFilter)