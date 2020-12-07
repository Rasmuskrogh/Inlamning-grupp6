function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  const deletebtn = document.getElementsByClassName("delete")
for (var i = 0; i <deletebtn.length; i++) {
    let button = deletebtn[i]
    button.addEventListener("click", function() {
        var btnClicked = event.target
        btnClicked.parentElement.parentElement.remove()
        updateCartTotal()
    })
}
 
function updateCartTotal() {
    var dropDownContent = document.getElementsByClassName("dropdown-content")[0]
     var cartItems = dropDownContent.getElementsByClassName("cart-item")
     for (var i = 0; i <cartItems.length; i++) {
        var cartItem = cartItems[i] 
        var priceElement = cartItem.getElementsByClassName("item-price")[0]
        var quantityElement = cartItem.getElementsByClassName("item-quantity")[0]
        var price = parseFloat(priceElement.innerText.replace("kr", ""))
        
    } 
    
} 