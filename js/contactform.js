$(function () {
"use strict";




// function för att validera Email, retunerar true om det lyckas i alla andra fall false
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// function för att validera mobilnummret, det får max vara 10 siffror och inga bokstäver.
// retunerar true om det lyckas i alla andra fall false
function validateNumber(number) {
  var re = /^\d{10}$/;
  if (!re.test(number)) {
    return false;
  }

  var re2 = /^\d+$/;
  if (!re2.test(number)) {
    return false;
  }

  return true;
}

$("#validateBtn").on("click", function(){


    // medelandet som vi bygger upp.
    var errormessage = "";
    // sätter att allt är ok från början och ändrar till false när validerigen misslyckas.
    var success = true;


  // $('.error').hide();

  //check name
  if (document.getElementById("contactName").value == "") {
    errormessage += "Fill in the box for first name \n";
    document.getElementById("contactName").style.borderColor = "red";
    success = false;
  }
    //check email
    var email = document.getElementById("contactEmail").value;
    if (email == "") {
      errormessage += "Fill in the box for E-mail \n";
      document.getElementById("contactEmail").style.borderColor = "red";
      success = false;
    } else {
      // validera mail,
      if (!validateEmail(email)) {
        errormessage += "Fill in correct E-mail \n";
        success = false;
      }
    }

  //check phone
  var number = document.getElementById("contactPhone").value;
  if (number == "") {
    errormessage += "Fill in the box for number\n";
    document.getElementById("contactPhone").style.borderColor = "red";
    success = false;
  } else {
    // validear nummret. måste vara minst 10 siffror.
    if (!validateNumber(number)) {
      errormessage += "Enter 10 digit number \n";
      success = false;
    }
  }

  //check message
  if (document.getElementById("contactMessage").value == "") {
    errormessage += "Fill in the box for textarea \n";
    document.getElementById("contactMessage").style.borderColor = "red";
    success = false;
  }

  if (!success) {
    alert(errormessage);
  return errorsFields;
  } else {
  // alert("Grattis du har änligen lyckats Skicka iväge contaktformuläret!!!");
     window.location.href = "thankyoupagecontact.html";
}



$("#contactForm").on("click", createNewContact);
  function createNewContact(){
/*Det finns inga "classer" i JS. Det går att skapar en constructor function för att skapa nya object med egenskaper.
Använs stor bokstav - som i JS inbyggda object som tex Data och Array. */
function Contact(contactName, contactEmail, contactPhone, contactMessage) {
  //properties med parametrar
    this.ContactName = contactName;
    this.ContactEmail = contactEmail;
    this.ContactPhone = contactPhone;
    this.ContactMessage = contactMessage;
}


  /*Skapa ny kontakt och validera det innan de sänds till localstorage och tacksida*/


//Hämtar upp lista från localstorage
var contacts = JSON.parse(localStorage.getItem("contacts"));

//Skapa variablar för Namn
var contactName = document.getElementById("contactName").value;

//Skapa variablar för Email
var contactEmail = document.getElementById("contactEmail").value;

//Skapa variablar för Telefon
var contactPhone = document.getElementById("contactPhone").value;

//Skapa variablar för Medelande
var contactMessage = document.getElementById("contactMessage").value;


//Här skapar vi en ny variabel från Contact constructorn från ovan
var contact =  new Contact(contactName, contactEmail, contactPhone, contactMessage);

// Skapa en variabel som innehåller en lista
var contacts = [];

  //Hämtar upp lista från localstorage
  if (localStorage.getItem("contacts") != null) {
  contacts = JSON.parse(localStorage.getItem("contacts"));
  }
//lägger den längst bak i listan
contacts.push(contact);

localStorage.setItem("contacts", JSON.stringify(contacts));


} //end function validateForm
});//Slut creataNewContact
  // auto();
});//Slut ready funtion
