if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoading", ready)
}
else {
    ready()
}

function ready() {
    const deletebtn = document.getElementsByClassName("delete")
    for (var i = 0; i <deletebtn.length; i++) {
        let button = deletebtn[i]
        button.addEventListener("click", removeItem )
    }

  var quantityInput = document.getElementsByClassName("item-quantity")
  for (var i = 0; i <quantityInput.length; i++) {
      var input = quantityInput[i]
      input.addEventListener("change", quantityChange)
  }

  var addToCartBtn = document.getElementById("addCartBtn") 
  for (var i = 0; i <addToCartBtn.length; i++) {
      var button = addToCartBtn[i]
      button.addEventListener("click", addToCartClicked)  
  }
}  

  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }


function removeItem(event) {
    var btnClicked = event.target
    btnClicked.parentElement.parentElement.remove()
    updateTotal()
}

function quantityChange(event) {
    var input = event.target
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotal()
}
 
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement
    var title = shopItem.getElementsByClassName("product_title")[0].innerText
    console.log(title);
}

function updateTotal() {
    var dropDownContent = document.getElementsByClassName("dropdown-content")[0]
     var cartItems = dropDownContent.getElementsByClassName("cart-item")
     var total = 0
     for (var i = 0; i <cartItems.length; i++) {
        var cartItem = cartItems[i] 
        var priceElement = cartItem.getElementsByClassName("item-price")[0]
        var quantityElement = cartItem.getElementsByClassName("item-quantity")[0]
        var price = parseFloat(priceElement.innerText.replace("kr", ""))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    } 
     document.getElementsByClassName("total-price")[0].innerText = total + "kr"
} 