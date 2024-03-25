const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")


let cart = [];



// Abrir o modal do carrinho
cartBtn.addEventListener("click", function() {
    cartModal.style.display = "flex"
})

// Fechar modal quando clicar fora
cartModal.addEventListener("click", function(event) {
    if(event.target === cartModal) {
        cartModal.style.display = "none"
    }
})

// sair quando apertar Fechar
closeModalBtn.addEventListener("click", function(){
    cartModal.style = "none"
})

menu.addEventListener("click", function(event){
    //console.log(event.target)
    let parenButton = event.target.closest(".add-to-cart-btn")

    if(parenButton){
        const name = parenButton.getAttribute("data-name")
        const price = parseFloat(parenButton.getAttribute("data-price"))
        
        //Adicionar no carrinho
        addToCart(name, price)
    }
} )

//Função para adicionar no carrinho
function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
        existingItem.quantify += 1 ;
    }else {
        cart.push({
            name,
            price,
            quantify: 1
        })
    }

    updateCartModal()
}

//Atualiza o carrinho
function updateCartModal(){
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");

        cartItemElement.innerHTML = `
        <div>
            <div>
                <p>${item.name}</p>
                <p>${item.quantify}</p>
                <p>R$${item.price}</p>
            </div>
            <div>
                <button>
                  Remover
                </button>
            </div>
        </div>
        `

        cartItemsContainer.appendChild(cartItemElement)
    })
}