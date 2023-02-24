const validName = /^[a-zA-Z_ ]{3,100}$/;
const validAge = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
//const validAddress = /^[a-zA-Z]-[a-zA-Z]-[a-zA-Z]$/;
const validAddress = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
const reSpaces = /^\S*$/;
const validEmail = /^([a-zA-Z0-9_\-?\.?]){3,}@([a-zA-Z]){3,}\.([a-zA-Z]){2,5}$/;

document.querySelector('#email').addEventListener('blur', validateEmail);



document.querySelector('#password').addEventListener('blur', validatePassword);

document.querySelector('#firstName').addEventListener('blur', validateFirstName);
document.querySelector('#lastName').addEventListener('blur', validateLastName);
document.querySelector('#age').addEventListener('blur', validateAge);
document.querySelector('#jobTitle').addEventListener('blur', validateJobTitle);
document.querySelector('#address').addEventListener('blur', validAddress);
const email = document.querySelector('#email');
const age = document.querySelector('#age');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const jobTitle = document.querySelector('#jobTitle');
const gender = document.querySelector('#gender');
const password = document.querySelector('#password');
const address = document.querySelector('#address');




function userNameGenrator(email) {
  let userName = email.value.split("@", 2)[0] + Math.floor(Math.random().toFixed(2) * 100);
  return userName;

}

// validation functions
/*
function getData() {

  fetch(`http://localhost:3000/users?email=${email.value}`)
    .then((respond) => {

      return respond.json();
    })
    .then((data) => {
      retur(data)
      if (data.length == 0) {

        return true;


      }
      else {

        return false;
      }

    })
  return false

}

*/



function postData(myNewObj) {

  fetch('http://localhost:3000/users', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(myNewObj),
  })
}


function validateAge(e) {

  if (validAge.test(Number(age.value))) {
    age.classList.remove('is-invalid');
    age.classList.add('is-valid');

    return true;
  } else {
    age.classList.remove('is-valid');
    age.classList.add('is-invalid');
    return false;
  }
}

function validateFirstName(e) {

  if (validName.test(firstName.value)) {
    firstName.classList.remove('is-invalid');
    firstName.classList.add('is-valid');
    return true;
  } else {
    firstName.classList.remove('is-valid');

    firstName.classList.add('is-invalid');
    return false;
  }


}
function validateJobTitle(e) {

  if (validName.test(jobTitle.value)) {
    jobTitle.classList.remove('is-invalid');
    jobTitle.classList.add('is-valid');
    return true;
  } else {
    jobTitle.classList.remove('is-valid');

    jobTitle.classList.add('is-invalid');
    return false;
  }


}



function validateLastName(e) {
  if (validName.test(lastName.value)) {
    lastName.classList.remove('is-invalid');
    lastName.classList.add('is-valid');
    return true;
  } else {
    lastName.classList.remove('is-valid');

    lastName.classList.add('is-invalid');
    return false;
  }

}

function validateEmail(e) {

  if (reSpaces.test(email.value) && validEmail.test(email.value)) {
    email.classList.remove('is-invalid');
    email.classList.add('is-valid');

    return true;
  } else {
    email.classList.add('is-invalid');
    email.classList.remove('is-valid');

    return false;
  }
}

function validatePassword() {
  const re = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})(?=.*[!@#$%^&*])/;
  if (re.test(password.value) && reSpaces.test(password.value)) {
    password.classList.remove('is-invalid');
    password.classList.add('is-valid');

    return true;
  } else {
    password.classList.add('is-invalid');
    password.classList.remove('is-valid');

    return false;
  }
}
function validateAddress() {

  if (validAddress.test(address.value)) {
    address.classList.remove('is-invalid');
    address.classList.add('is-valid');

    return true;
  } else {
    address.classList.add('is-invalid');
    address.classList.remove('is-valid');

    return false;
  }
}



function sendEmail() {

  let userN = userNameGenrator(email)
  return emailjs.send("service_xaobhn8", "template_ve7yc84", {
    fname: firstName.value,
    lname: lastName.value,
    username: userN,
    email: email.value,
    password: password.value,
  });


}



let form =document.getElementById('newform')




    form.addEventListener(
      'submit',
      function (event) {
      
        event.preventDefault();
        if (
         
          !validateFirstName() ||
          !validateEmail() ||
          !validateJobTitle() ||

          !validateLastName() ||
          !validateAge() ||
          !validatePassword()
        ) {


          event.preventDefault();
          event.stopPropagation();

        } else {

          fetch(`http://localhost:3000/users?email=${email.value}`)
          .then((respond) => {
      
            return respond.json();
          })
          .then((data) => {
          
            if (data.length == 0) {
      
              let myNewObj = {
                id: "", "fname": firstName.value, "lname": lastName.value, "userName": userNameGenrator(email), "JobTitle": jobTitle.value,
                "address": address.value, "role": "employee"
    
    
                , "age": age.value, "email": email.value, "gender": gender.value, "password": password.value, "flag": 0,
              };
              sendEmail().then(() => {
                postData(myNewObj)
              })
    
    
              form.classList.add('was-validated');
      
      
            }
            else{
           //   alert("hey")
              event.preventDefault();
              event.stopPropagation();
             
              Swal.fire(
                'Error',
                'Email Already Exists! ',
                'error'
            )
            }
        }  )
          



        }})




