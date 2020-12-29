// Globala queryselectors

const uploadBtn = document.querySelector("#uploadBtn");
const addTitle = document.querySelector("#add_title");
const addInfo = document.querySelector("#add_info");
const addPrice = document.querySelector("#add_price");
const productDiv = document.querySelector("#products .productlist");
const cartItems = document.querySelector("#cart-items");
const clearCartBtn = document.querySelector("#deleteCart");
const loginBtn = document.querySelector("#loginBtn");
// Array som prudukter i shoppingcart sparas i

let SHOPPING_CART = [];

//För add to cart och delete cart knapparna 

const ADDTOCART = "addCartBtn", DELETECART = "cart_delete";

//eventlistener för knappar

productDiv.addEventListener("click", addDeleteCart);
cartItems.addEventListener("click", deleteCart); 
clearCartBtn.addEventListener("click" , clearCart);
loginBtn.addEventListener("click" , login);

//Login funktion för att visa addproduct sidan
function login(e){
  e.preventDefault();
  const userNameValue = document.querySelector("#username").value;   
  const passwordValue = document.querySelector("#password").value;
  const username = "123";
  const password = "123";
  const footerItems = document.querySelectorAll(".footer_item");     // väljer alla länkar i footer_right
  
  if(userNameValue == username && passwordValue == password){
    footerItems[1].classList.remove("hidden");                        // Om användarnamn och password stämmer, ta bort klassen hidden från addProduct länken 

  }else{
    alert("Fel lösenord");                                           // Alert, fel lösenord.
  }

}

//För add to cart och delete produkt i cart, kollar efter vilket id som stämmer och väljer parentnode som har knappen

function addDeleteCart(event){
  const targetBtn = event.target;
  
  const product = targetBtn.parentNode;
  
  if(targetBtn.id == ADDTOCART ){
    localStorageCart(product);
  }

}


function deleteCart (event){
  const targetbtnCart = event.target;
  
  const product = targetbtnCart.parentNode;
  
  if(targetbtnCart.id == DELETECART ){
    deleteVarukorg(product);
   } 

}


// För deleteknapparna på produkter i varukorgen

function deleteVarukorg(product){
  CART_LIST = JSON.parse(localStorage.getItem("cartList"));           //Hämtar parsad cartList från localstorage
  CART_LIST.splice( product.id, 1);                                   // Splicear med hjälp av produkt ID rött produkt ur arrayen.
   
   localStorage.setItem("cartList" , JSON.stringify (CART_LIST));       //Sparar listan igen
   location.reload();                                                   //Location Reload för att visa rätt i varukorgen
}

// ClearCart funktion för att rensa varukorgen

function clearCart(){
  localStorage.removeItem("cartList");
  location.reload();
}

//För att lägga till producter i lokalstorage cart

let cartItem={}

function localStorageCart(product){
  
  let productTitle = product.querySelector(".product_title");
  let productPrice = product.querySelector(".product_price");
  let productImg = product.querySelector(".product_img");
  
  cartItem.img = productImg.src;
  cartItem.title = productTitle.innerHTML
  cartItem.price = parseInt(productPrice.innerHTML)
  
  //Pushar cartItem objektet till SHOPPING_CART
  SHOPPING_CART.push(cartItem);
  
  //Kolla om det finns produkter i localstorage, om det finns concat array annars lägg till i SHOPPING_CART
  const localData = localStorage.getItem("cartList");

  const existingData = JSON.parse(localData);

  const cleanedData = existingData ? existingData.concat(SHOPPING_CART) : SHOPPING_CART ;
  
  const cartList = JSON.parse(localStorage.getItem("cartList"))
  // om localstorage är tom
  if(cartList == null) {
    localStorage.setItem("cartList", JSON.stringify(cleanedData)); 
    location.reload();
 
    // om local storage INTE är tom
  } else {
 
    let cartItemTitles = Object.values(cartList).map(item => item.title)
    console.log(cartItemTitles)
 
    // kolla om titeln finns
    if(cartItemTitles.includes(productTitle.innerText)) {
      console.log("finns redan")
      // annars lägg till
    } else {
      localStorage.setItem("cartList", JSON.stringify(cleanedData)); 
      location.reload();
    }
 
  }
 
  // location reload för att uppdatera sidan så att localstorage fungerar
 
  location.reload();
  
}

// showProduct function
 
function showProduct(){
  
  const productData = localStorage.getItem("productList")
  const parsedProductData = JSON.parse(productData)
  // mappar igenom parsad data från localstorage och visar i productDiv, index för att få id på produkten
  Object.values(parsedProductData).map((item , index) => {
    productDiv.innerHTML += `
                        <div id="${index}" class="product-card">
                        <img class="product_img" src="${item.img}" alt="painting">
                        <h2 class="product_title">${item.title}</h2>
                        <p class="product_description">${item.description}</p>
                        <p class="product_price">${item.price}</p>
                        <span class="product_kr">kr</span>
                        <button id="addCartBtn">Lägg till</button>
                        </div>`;
  })
} 


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
 
  var cart = document.querySelector("#myDropdown");
  /*  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  } */
}

// Showcart funktion för att visa cartitems i varukorg, körs om if statement längst ner i js stämmer
function showCart() {
  const data = localStorage.getItem("cartList")
  const parsedData = JSON.parse(data)
  //allt nytt
  // let itemNames = cartItems.querySelectorAll(".cart_product_title")
  // let localStorageItems = JSON.parse(localStorage.getItem("cartList"))
  // let cartProductTitle = document.getElementsByClassName("product_title")
  // console.log(localStorageItems)
 
    // let cartItemTitles = Object.values(parsedData).map(item => 
  //   item.title
  // )
 
  // if(!cartItemTitles.includes("dd")) {
  //   console.log("finns redan")
  // } else {}
  
  // mappar igenom parsad data från localstorage och visar i itemContainer, index för att få id på produkten
  Object.values(parsedData).map((item , index) => {
    cartItems.innerHTML += `
      <div id="${index}" class="cart-item>
      <img class="cart_product_img" src="${item.img}">
      <span class="cart_product_title">${item.title}</span>
      <span class="cart_product_price">${item.price} kr</span>
      <i id="cart_delete" class="fas fa-minus-circle"></i>
  </div>`;
 
  })

  // for (var i = 0; i < itemNames.length; i++) {
  //   if (itemNames[i].innerText == item.title) {
  //     alert("Denna vara finns redan i varukorgen")
  //     return
  //   }
  // }
}

//If statement som bara kör showProduct om det finns en produkt sparad i localstorage.

let products = JSON.parse(localStorage.getItem("productList"))
if(products.length>0){
showProduct();
}

//If statement som bara kör addToCart om det finns en produkt sparad i localstorage.

let productsInCart = JSON.parse(localStorage.getItem("cartList"))
if(productsInCart.length>0){
  showCart();
}