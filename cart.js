
//Toggling the cart info
(function() {
    var cartButtonHolder = document.getElementsByClassName('nav')[0]
    var cartButton = cartButtonHolder.getElementsByClassName('cart-btn')[0]
    var cart = document.getElementsByClassName('cart-container')[0]

    cartButton.addEventListener('click', function() {
        cart.classList.toggle('show-cart-container')
    })
})();

//Toggling the cart info in small view
(function() {
    var cartButton = document.getElementById('cart-btn')
    var cart = document.getElementsByClassName('cart-container')[0]

    cartButton.addEventListener('click', function() {
        cart.classList.toggle('show-cart-container')
    })
})();

//The remove button
(function(){
    var removeButton = document.getElementsByClassName('item-delete')
    for (var i = 0; i < removeButton.length; i++) {
        var btn = removeButton[i]
        btn.addEventListener('click', function(event) {
            removeCartItem()
        })
    }
})();
function removeCartItem() {
        var buttonClicked = event.target
        buttonClicked.parentElement.remove()
        updateCartTotal()
}


//Restricting the quantity input
var qttInputs = document.getElementsByClassName('item-input')
for (var i = 0; i < qttInputs.length; i++) {
    qttinput = qttInputs[i]
    qttinput.addEventListener('change', function(){
        var qtt = event.target
        if (qtt.value <= 0 || isNaN(qtt.value)) {
            qtt.value = 1
        }
        updateCartTotal()
    })
}


//Updating the cart total
function updateCartTotal() {
    var itemContainer = document.getElementsByClassName('cart-container')[0]
    var itemrows = itemContainer.getElementsByClassName('item')
    var total = 0
    for (var i = 0; i < itemrows.length; i++) {
        var itemrow = itemrows[i]
        var qttElement = itemrow.getElementsByClassName('item-input')[0]
        var amountElement = itemrow.getElementsByClassName('item-cost')[0]

        var qtt = parseFloat(qttElement.value)
        var amount = parseFloat(amountElement.innerText.replace('Kshs.', ''))

        total = total + (amount * qtt)
        total = Math.round(total)
    }
    var ttamount = document.getElementsByClassName('total-amount')[0]
    ttamount.innerText = 'Kshs.' + total
}


// Making the buy button functional
var addToCartBtns = document.getElementsByClassName('buy-btn')
for (var i = 0; i < addToCartBtns.length; i++) {
    var addToCartBtn = addToCartBtns[i]
    addToCartBtn.addEventListener('click', addItemToCartClicked)
}
function addItemToCartClicked(event) {
     btn = event.target
     var item = btn.parentElement.parentElement
     var itemName = item.getElementsByClassName('item-name')[0].innerText
     var itemCost = item.getElementsByClassName('price')[0].innerText
     var itemImg = item.getElementsByClassName('gal-img')[0].src
     addItemsToCart(itemName, itemCost, itemImg)
     updateCartTotal()
}
function addItemsToCart(itemName, itemCost, itemImg) {
    var item = document.createElement('div')
    item.classList.add('item')
    var cartContainer = document.getElementsByClassName('cart-container')[0]
    var cartItemNames = cartContainer.getElementsByClassName('item-name')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == itemName) {
            alert("Item already added to cart")
            return
        }

    }
    var itemContent = `
    	<img class="item-image" src="${itemImg}">
		<span class="item-name">${itemName}</span>
		<input class="item-input" value="1" type="number" min="1">
		<span class="item-cost">${itemCost}</span>
        <button type="button" class="item-delete">Remove</button>
        `
    item.innerHTML = itemContent
    cartContainer.append(item)
    item.getElementsByClassName('item-delete')[0].addEventListener('click', removeCartItem)
    item.getElementsByClassName('item-input')[0].addEventListener('change', updateCartTotal)
}

//making the checkout button functional
document.getElementsByClassName('checkout-btn')[0].addEventListener('click', purchaseClicked)
function purchaseClicked() {
    alert('Thank you for making your purchase')
    var cartContainer = document.getElementsByClassName('cart-container')[0]
    var theItems = cartContainer.getElementsByClassName('item')
while (theItems.length > 0) {
    theItems[0].parentNode.removeChild(theItems[0])
}
    updateCartTotal()
}

