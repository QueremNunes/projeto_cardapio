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
    updateCartModal();
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
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-bold">${item.name}</p>
                <p>Qtd: ${item.quantify}</p>
                <p class="font-medium mt-2" >R$${item.price.toFixed(2)}</p>
            </div>

            <button class="remove-from-cart-btn" data-name="${item.name}" >
                Remover
            </button>
        </div>
        `

        total += item.price * item.quantify;

        cartItemsContainer.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length;
    console.log(cartCounter)
}

cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")
    }
})