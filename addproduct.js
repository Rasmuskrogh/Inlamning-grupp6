// Globala queryselectors
const uploadBtn = document.querySelector("#uploadBtn");
const addTitle = document.querySelector("#add_title");
const addInfo = document.querySelector("#add_info");
const addPrice = document.querySelector("#add_price");
const adminProductDiv = document.querySelector("#adminProducts .adminProductlist");
// Array som produkterna sparas i
let PRODUCT_LIST = [];
//För delete och edit knappar 
const DELETE = "delete", EDIT = "edit";
//eventlistener för knappar
adminProductDiv.addEventListener("click", deleteEdit);
uploadBtn.addEventListener("click" , newProduct);

//api funktion för bilder
async function searchPhotos(e) {
  e.preventDefault();
  let accessKey = "zezTGXrl1WoKFEPFjbTOknYNWy0Im-5v_XUkLheIxR4";         // accesskey till unsplash
  let query = document.getElementById("search").value;                   // sparar inputen i sökfältet som let query
  let url = "https://api.unsplash.com/photos/?client_id=" + accessKey + "&query="+query;   // request url med vår accesskey och dynamisk query
  // request till api som returnerar json data
  let apiArray = []
  // fetchar data och konverterar den till json
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
  return apiArray[randomNum];
} 

// funktion som returnerar ett random nummer mellan min och max
function getRandom (min , max){
  return Math.floor(Math.random()*(max-min))+min;
}   
  
//Funktion för att skapa en ny produkt, måste vara async för att api ska fungera, preventdefault för att den ligger i en form tag
let productItem = {};
  
async function newProduct(e){ 
  e.preventDefault();
  //if statement för att alla fält måste vara ifyllda
  if(!addTitle.value || !addInfo.value || !addPrice.value) return;
  //Hämtar url som returneras från searchphotos funktionen
  let imgUrl = await searchPhotos(e);
        
  productItem.img = imgUrl;
  productItem.title = addTitle.value;
  productItem.description = addInfo.value;
  productItem.price = parseInt(addPrice.value);    //parseInt för att få price till Number
  
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

// Delete och edit funktioner
function deleteEdit(event){
  const targetBtn = event.target;
  const product = targetBtn.parentNode;
    
  if ( targetBtn.id == DELETE ){
    deleteProduct(product);
  
  }else if(targetBtn.id == EDIT ){
    editProduct(product);
  }
}

function deleteProduct(product){
  PRODUCT_LIST = JSON.parse(localStorage.getItem("productList"));
  PRODUCT_LIST.splice( product.id, 1);
     
  localStorage.setItem("productList" , JSON.stringify (PRODUCT_LIST));
  location.reload();
}

//edit function som gör att man kan ändra alla inputs och tar bort produkten man vill ändra
function editProduct(product){
  // läsa localstorage 
  const editProd = JSON.parse(localStorage.getItem("productList"))
  // find funktion på parsad localstorage, för att välja rätt produkt att redigera  
  const ex=  editProd.find( (item , index)=> index == product.id)
  // redigera 
  addTitle.value = ex.title;
  addInfo.value = ex.description;
  addPrice.value = ex.price;
  // pusha in den i localstorage igen
  localStorage.setItem("productList" , JSON.stringify (editProd));
  // tabort produkten som har redigerats
  deleteProduct(product);
}

// showProduct function
function showProduct(){
  const productData = localStorage.getItem("productList")
  const parsedProductData = JSON.parse(productData)
  // mappar igenom parsad data från localstorage och visar i productDiv, index för att få id på produkten
  Object.values(parsedProductData).map((item , index) => {
        adminProductDiv.innerHTML += `
                          <div id="${index}" class="product-card">
                          <img class="product_img" src="${item.img}" alt="painting">
                          <h2 class="product_title">${item.title}</h2>
                          <p class="product_description">${item.description}</p>
                          <p class="product_price">${item.price}</p>
                          <span class="product_kr">kr</span>
                          <button id="edit">Ändra produkt</button>
                          <button id="delete">Radera produkt</button>
                          </div>`;
  })
} 
  
// Används i newProduct för att rensa inputfälten
function clearInput(inputs){
  inputs.forEach( input => {
  input.value = "";
  })
}

//If statement som bara kör showProduct om det finns en produkt sparad i localstorage.
let products = JSON.parse(localStorage.getItem("productList"))
if(products.length>0){
showProduct();
}
