const uploadBtn = document.querySelector("#uploadBtn");
const addTitle = document.querySelector("#add_title");
const addInfo = document.querySelector("#add_info");
const addPrice = document.querySelector("#add_price");
const productDiv = document.querySelector("#products .productlist");

// Array som allt sparas i

let PRODUCT_LIST = [];
let balance = 0;

//För delete och edit knappar 

const DELETE = "delete", EDIT = "edit";

//eventlistener för knappar

uploadBtn.addEventListener("click" , newProduct);

// Function för att pusha allt till array när uploadknappen är klickad
function newProduct(e){ 
  e.preventDefault();
  //if statement för att alla fält måste vara ifyllda
if(!addTitle.value || !addInfo.value || !addPrice.value) return;
  // spara allt i PRODUCT_LIST
  let product = {
      title : addTitle.value,
      description : addInfo.value,
      price : addPrice.value
  }
  PRODUCT_LIST.push(product);

  updateUI();
  clearInput( [addTitle, addInfo, addPrice] );

}

function updateUI(){

  balance = calculateTotal;

  clearElement( [productDiv] ) ;

  //index för att få id på varje produkt
  PRODUCT_LIST.forEach( (product, index) => {
    showproduct(productDiv, product.title, product.description, product.price, index)

  })

}

function showproduct(div, title, description, price, id){

  const product = `<div id = "${id}" class="product-card">
                <img class="product_img" src="/images/pic1.jpg" alt="painting">
                <div class="product_title">${title}</div>
                <div class="product_description">${description}</div>
                <div class="product_price">${price} :-</div>
                <button id="addCartBtn">Lägg till i varukorg</button>
                <i id="edit" class="far fa-edit"></i>
                <i id="delete" class="fas fa-trash-alt"></i>
  
  
  
                 </div>`;

  const position = "afterbegin";

  div.insertAdjacentHTML(position, product);
}

function clearElement(elements){
  elements.forEach ( element => {
    element.innerHTML = "";

  })
}

function calculateTotal(form){
  let sum = 0;

  form.forEach( product => {
    sum += product.price;
  })

  return sum;
}

function clearInput(inputs){
  inputs.forEach( input => {
    input.value = "";
  })
}









