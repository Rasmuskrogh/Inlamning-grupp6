const uploadBtn = document.querySelector("#uploadBtn");
const addTitle = document.querySelector("#add_title");
const addInfo = document.querySelector("#add_info");
const addPrice = document.querySelector("#add_price");
const productDiv = document.querySelector("#homepage .products");

// Array som allt sparas i

let PRODUCT_LIST = [];
let balance = 0;

//För delete och edit knappar 

const DELETE = "delete", EDIT = "edit";

//eventlistener för knappar

uploadBtn.addEventListener("click" , newProduct);

// Function för att pusha allt till array när uploadknappen är klickad
function newProduct(){
  //if statement för att alla fält måste vara ifyllda
if(!addTitle.value || !addInfo.value || !addPrice.value) return;
  // spara allt i PRODUCT_LIST
  let product = {
      title : addTitle.value,
      description : addInfo.value,
      price : parseInt(addPrice.value)   //parseInt för att göra price till number
  }
  PRODUCT_LIST.push(product);
}








