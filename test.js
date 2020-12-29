const pdf = new jsPDF();
const shoppingDiv = document.querySelector("#shoppingItem");


function renderItems(){
  const data = localStorage.getItem("cartList")
  const parsedData = JSON.parse(data)
  
  // mappar igenom parsad data från localstorage och visar i itemContainer, index för att få id på produkten
  Object.values(parsedData).map((item , index) => {
    shoppingDiv.innerHTML += `
      <div id="${index}" class="cart-item>
      <img class="cart_product_img" src="${item.img}">
      <span class="cart_product_title">${item.title}</span>
      <span class="cart_product_price">${item.price}</span>
      <input class="cart-quantity-input" type="number" value="1">
      <button id="cart_delete" type="button">REMOVE</button>
  </div>`;
 
  })
}

renderItems();

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

buttonPDF.addEventListener("click", printPDF) 

function printPDF() {
  console.log("test")
}

function printPDF() {
 

    pdf.setFontSize(40)
    pdf.text(50, 25, ` Tack för ditt köp!` );


    pdf.setFontSize(20)
    pdf.text(10, 50, ` Detta är vad din beställning består utav :` );


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

