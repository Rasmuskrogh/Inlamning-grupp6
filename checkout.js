const pdf = new jsPDF();
const shoppingDiv = document.querySelector("#shoppingItem");
const data = localStorage.getItem("cartList")
const DELETECART = "cart_delete";


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
      <button id="cart_delete" type="button">Ta bort</button>
  </div>`;
 
  })
}

renderItems();

// För deleteknapparna på produkter i varukorgen

shoppingDiv.addEventListener("click", removeProduct);

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
      pdf.text(10, 80, ` ${item.imgUrl} ` );
      pdf.text(10, 110 + (pos * index) , ` ${item.title} ${item.price}  ` );
   })
 


    pdf.setFontSize(15)
    pdf.text(10, 150, ` Dina uppgifter : ` );
    pdf.text(10, 160, ` Förnamn: ${form.fname} ` );
    pdf.text(10, 170, ` Efternamn: ${form.enamn} ` );
    pdf.text(10, 180, ` Gata: ${form.adress} ` );
    pdf.text(10, 190, ` Stad: ${form.stad} ` );
    pdf.text(10, 200, ` Län: ${form.lan} ` );
    pdf.text(10, 210, ` Postkod: ${form.post} ` );
    pdf.text(10, 220, ` Kreditkortsnummer: ${form.kknr} ` );
    pdf.text(10, 230, ` Utgångsdatum: ${form.kkdatum} ` );
    pdf.text(10, 240, ` CCV: ${form.kkcvc} ` );
    pdf.save("Affordable_art_online_kvitto");

}



