const pdf = new jsPDF();
const shoppingDiv = document.querySelector("#shoppingItem");
const data = localStorage.getItem("cartList")
const DELETECART = "cart_delete";
const totalSpan = document.querySelector("#totalSumma")


function renderItems(){
  const parsedData = JSON.parse(data)
  
  // mappar igenom parsad data från localstorage och visar i itemContainer, index för att få id på produkten
  parsedData.map((item , index) => {

    shoppingDiv.innerHTML += `
      <div id="${index}" class="cart-item>
      <h1 class="dinaVaror" hej hej hej </h1>
      <img class="cart_product_img" src="${item.img}"><br><br><br>
      <span class="cart_product_title">${item.title}</span>
      <span class="cart_product_price">${item.price}</span>
      <i id="cart_delete" class="fas fa-minus-circle"></i>
  </div>`;
 
  })
}

renderItems();

// För deleteknapparna på produkter i varukorgen

shoppingDiv.addEventListener("click", deleteCart);

// Väljer rätt produkt som körs i removeProduct
function deleteCart (event){
  const targetbtnCart = event.target;
  
  const product = targetbtnCart.parentNode;
  
  if(targetbtnCart.id == DELETECART ){
    removeProduct(product);
   } 

}

function removeProduct(product){
  CART_LIST = JSON.parse(localStorage.getItem("cartList"));           //Hämtar parsad cartList från localstorage
  CART_LIST.splice( product.id, 1);                                   // Splicear med hjälp av produkt ID rött produkt ur arrayen.
   
   localStorage.setItem("cartList" , JSON.stringify (CART_LIST));       //Sparar listan igen
   location.reload();                                                   //Location Reload för att visa rätt i varukorgen
}


function countTotal() {
  const totalproducts = JSON.parse(localStorage.getItem("cartList"));
  
  let cartItemPrice = Object.values(totalproducts).map(item => item.price)
  let total = 0;  

    for (let i=0; i < cartItemPrice.length; i++){
      let totalPrice = cartItemPrice[i];
    
      total = total + totalPrice;
    }
    totalSpan.innerHTML = total + "  " + "kr";

} 

countTotal(); 


const elements = {
  fnamn: document.getElementsByClassName("fname"),
  enamn: document.getElementsByClassName("enamn"),
  adress: document.getElementsByClassName("adress"),
  stad: document.getElementsByClassName("stad"),
  lan: document.getElementsByClassName("lan"),
  post: document.getElementsByClassName("post"),
  kknr: document.getElementsByClassName("kknr"),
  kkdatum: document.getElementsByClassName("kkdatum"),
  kkcvc: document.getElementsByClassName("kkcvc"),
  slutforPDF: document.getElementById("slutforPDF"),
}


let form = {
  fname: "",
  enamn: "",
  adress: "",
  stad: "",
  lan: "",
  post: "",
  kknr: "",
  kkdatum: "",
  kkcvc: "",
}

function assignValue(property, newValue) {
  form[property] = newValue
}

function validateForm() {
  const formIsValid = form.fname.length > 0 
  && form.enamn.length > 0
  && form.adress.length > 0
  && form.stad.length > 0
  && form.lan.length > 0
  && form.post.length > 0
  && form.kknr.length > 0
  && form.kkdatum.length > 0
  && form.kkcvc.length > 0

  console.log(form)

if(formIsValid) {
  elements.slutforPDF.disabled = false;
} else {
  elements.slutforPDF.disabled = true;
}

}



document.querySelectorAll(".fname, .enamn, .adress, .stad, .lan, .post, .kknr, .kkdatum, .kkcvc, #slutforPDF").forEach(item => {
  console.log(item)
  item.addEventListener('change', event => {
    console.log(event.target.name, event.target.value)
    assignValue(event.target.name, event.target.value)
    validateForm()
  })
})



        

let buttonPDF = document.querySelector("#slutforPDF");
let inputPDF = document.querySelector("input");
let info = document.querySelector("#wrapper");
let information = document.querySelectorAll(".fname, .enamn, .adress, .stad, .lan, .post, .kknr, .kkdatum, .kkcvc ")

buttonPDF.addEventListener("click", (event) => printPDF(event) ) 

function printPDF(event) {
 
  event.preventDefault()

  const parsedData = JSON.parse(data)


    pdf.setFontSize(40)
    pdf.text(50, 25, ` Tack för ditt köp!` );


    pdf.setFontSize(20)
    pdf.text(10, 50, ` Detta är vad din beställning består utav :` );


    parsedData.map((item, index) => {
      const pos = index +10 
      pdf.text(10, 90 + (pos * index) , ` ${item.title} ${item.price}  ` );
   })
 

   pdf.setFontSize(10)
   pdf.text(10, 160, ` -------------------------------------------------------------------------------------------------------------------------------------------------------------------` );


    pdf.setFontSize(15)
    pdf.text(10, 170, ` Dina uppgifter : ` );
    pdf.text(10, 180, ` Förnamn: ${form.fname} ` );
    pdf.text(10, 190, ` Efternamn: ${form.enamn} ` );
    pdf.text(10, 200, ` Gata: ${form.adress} ` );
    pdf.text(10, 210, ` Stad: ${form.stad} ` );
    pdf.text(10, 220, ` Län: ${form.lan} ` );
    pdf.text(10, 230, ` Postkod: ${form.post} ` );
    pdf.text(10, 240, ` Kreditkortsnummer: ${form.kknr} ` );
    pdf.text(10, 250, ` Utgångsdatum: ${form.kkdatum} ` );
    pdf.text(10, 260, ` CCV: ${form.kkcvc} ` );
    pdf.save("Affordable_art_online_kvitto");

}
