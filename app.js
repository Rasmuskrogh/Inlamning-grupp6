// Globala queryselectors

const uploadBtn = document.querySelector("#uploadBtn");
const addTitle = document.querySelector("#add_title");
const addInfo = document.querySelector("#add_info");
const addPrice = document.querySelector("#add_price");
const productDiv = document.querySelector("#products .productlist");
const cartItems = document.querySelector(".cart-items")

// Arrayer som allt sparas i

let PRODUCT_LIST = [];
let SHOPPING_CART = [];

//För delete och edit knappar 

const DELETE = "delete", EDIT = "edit", ADDTOCART = "addCartBtn";

//eventlistener för knappar

productDiv.addEventListener("click", deleteEditCart);
uploadBtn.addEventListener("click" , newProduct);

//api funktion för bilder


 async function searchPhotos(e) {
  e.preventDefault();
  let accessKey = "zezTGXrl1WoKFEPFjbTOknYNWy0Im-5v_XUkLheIxR4";
  let query = document.getElementById("search").value;
  let url = "https://api.unsplash.com/photos/?client_id=" + accessKey + "&query="+query;
  
  // request till api som returnerar json data

  let apiArray = []

  await fetch(url)
  .then(function (data) {
      return data.json();
  })
  .then(function(data) {
      
     //mappar igenom json data och pushar upp 10st url's i apiarrayen
     data.map(photo => {
         
          let result = `${photo.urls.small}`;
          
          apiArray.push(result);
           
      });
      
  });
  // Använder getRandom funktionen för att välja en random url i arrayen och returnera den, så att vi kan använda den i newProduct funktionen
  let randomNum = getRandom(0,9);
  console.log(apiArray[randomNum]);
  return apiArray[randomNum];
  
}  

// funktion som returnerar ett random nummer mellan min och max

function getRandom (min , max){
  return Math.floor(Math.random()*(max-min))+min;
}   

// Funktion för att skapa en ny produkt, måste vara async för att api ska fungera, preventdefault för att den ligger i en form tag
let productItem = {};

async function newProduct(e){ 
  e.preventDefault();
  console.log(e);
  //if statement för att alla fält måste vara ifyllda
if(!addTitle.value || !addInfo.value || !addPrice.value) return;
  //parseInt för att få price till Number
  let imgUrl = await searchPhotos(e);
  
      productItem.img = imgUrl;
      productItem.title = addTitle.value;
      productItem.description = addInfo.value;
      productItem.price = parseInt(addPrice.value);
  
  //Pusha productItem objectet till PRODUCT_list    
  PRODUCT_LIST.push(productItem);

  //Kolla om det finns produkter i localstorage, om det finns concat array annars lägg till i PRODUCT_LIST
  const localProductData = localStorage.getItem("productList");

  const existingProductData = JSON.parse(localProductData);

  const cleanedProductData = existingProductData ? existingProductData.concat(PRODUCT_LIST) : PRODUCT_LIST ;

  localStorage.setItem("productList", JSON.stringify(cleanedProductData)); 

  //Rensa inputfälten
  clearInput( [addTitle, addInfo, addPrice] );
  //Uppdatera sidan för att localstorage ska visas och api ska fungera
  location.reload();
  
}



//delete or edit function, kollar efter vilket id som stämmer och väljer parentnode som har knappen

function deleteEditCart(event){
  const targetBtn = event.target;

  const product = targetBtn.parentNode;
  
  if ( targetBtn.id == DELETE ){
    deleteProduct(product);

  }else if(targetBtn.id == EDIT ){
    editProduct(product);
  }else if(targetBtn.id == ADDTOCART ){
    localStorageCart(product);
  }

}


// delete och edit och addToCart funktioner


//delete function för att tabort rätt product i localstorage, väljer efter id och sparar sen igen. Location reload för att uppdatera sidan.
function deleteProduct(product){
  PRODUCT_LIST = JSON.parse(localStorage.getItem("productList"));
  PRODUCT_LIST.splice( product.id, 1);
   
   localStorage.setItem("productList" , JSON.stringify (PRODUCT_LIST));
   location.reload();
}

//edit function som gör att man kan ändra alla inputs och tar bort produkten man vill ändra
function editProduct(product){
  let PRODUCT = PRODUCT_LIST[product.id];

  addTitle.value = PRODUCT.title;
  addInfo.value = PRODUCT.description;
  addPrice.value = PRODUCT.price;

  deleteProduct(product);
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

  localStorage.setItem("cartList", JSON.stringify(cleanedData)); 


  // location reload för att uppdatera sidan så att localstorage fungerar

  location.reload();
  
}


// showProduct function
 
function showProduct(){
  
  const productData = localStorage.getItem("productList")
  const parsedProductData = JSON.parse(productData)
  Object.values(parsedProductData).map((item , index) => {
    productDiv.innerHTML += `
                        <div id="${index}" class="product-card">
                        <img class="product_img" src="${item.img}" alt="painting">
                        <h2 class="product_title">${item.title}</h2>
                        <p class="product_description">${item.description}</p>
                        <p class="product_price">${item.price}</p>
                        <span class="product_kr">kr</span>
                        <button id="addCartBtn">Lägg till i varukorg</button>
                        <button id="edit">edit</button>
                        <button id="delete">delete</button>
                        </div>`;
  })
} 

// Anvönds i newProduct för att rensa inputfälten
function clearInput(inputs){
    inputs.forEach( input => {
      input.value = "";
    })
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function showCart() {
  const data = localStorage.getItem("cartList")
  const parsedData = JSON.parse(data)
  const itemContainer = document.querySelector(".cart-items")
  Object.values(parsedData).map((item , index) => {
    itemContainer.innerHTML += `
      <div id="${index}" class="cart-item>
      <img class="cart_product_img" src="${item.img}">
      <span class="cart_product_title">${item.title}</span>
      <span class="cart_product_price">${item.price}</span>
      <input class="cart-quantity-input" type="number" value="1">
      <button class="cart_delete" type="button">REMOVE</button>
  </div>`
 
  })
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