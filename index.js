// Import stylesheets
import './style.css';

const loginForm = document.getElementById('loginform');
loginForm.onsubmit = (event)=>{
  event.preventDefault();
  
  let xhr = new XMLHttpRequest();  
  xhr.onload = (e) => {
    if(xhr.readyState == 4 && xhr.status == 200){
      showSuccess(xhr)
    }
    else{
      showError(xhr);
    }
  }
  xhr.onerror = showError(xhr);

  xhr.open('POST','https://reqres.in/api/login',true);
  xhr.setRequestHeader('Content-Type','application/json');
  
  let formData = {
    "email" : event.target.email.value,
    "password": event.target.password.value
  }
  xhr.send(JSON.stringify(formData)); 
}

var showSuccess = (xhr) => {
   document.getElementById('error').innerHTML= '';
   document.getElementById("success").innerHTML = xhr.responseText;
}

var showError = (xhr) => {
  document.getElementById("success").innerHTML = '';
  document.getElementById('error').innerHTML= xhr.responseText;
}

