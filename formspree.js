window.addEventListener("DOMContentLoaded", function() {

    
    var form = document.getElementById("my-form");
    var button = document.getElementById("my-form-button");
    var status = document.getElementById("my-form-status");

    // sucess eller error funktion när formen är ifylld och skickad
    
    function success() {
      form.reset();
      button.style = "display: none ";
      status.innerHTML = "Tack, vi återkommer så fort som möjligt!";
    }

    function error() {
      status.innerHTML = "Oj, ett problem uppstod";
    }

    // hantera form eventen

    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      var data = new FormData(form);
      ajax(form.method, form.action, data, success, error);
    });
  });
  
  // helper function for sending an AJAX request

  function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        success(xhr.response, xhr.responseType);
      } else {
        error(xhr.status, xhr.response, xhr.responseType);
      }
    };
    xhr.send(data);
  }