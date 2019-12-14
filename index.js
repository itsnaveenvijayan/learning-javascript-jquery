import './style.css';
import $ from "jquery";

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

const logoutForm = document.getElementById('logoutform');
logoutForm.onsubmit = (event)=>{
  event.preventDefault();
  $('#loginform').show()
  $('#logoutform').hide()
  $('#message').empty();
}

var showSuccess = (xhr) => {   
   $('#logoutform').show();
   $('#loginform').hide()
   $('#message').html(xhr.responseText).css('color','green');
   listUsers();
}

var showError = (xhr) => {
  $('#logoutform').hide();
  $('#loginform').show();
  $('#message').html(xhr.responseText).css('color','red');
}

var listUsers = () => {
  $.ajax({
    type: 'GET',
    url: 'https://reqres.in/api/users',
    contentType: 'application/json',
    success: (data) => {
      
      let _html = "<tr>";
      $.each(data.data[0], (val) => {
        _html += `<th>`+val+`</th>`;
      })
      _html += '</tr>'

      console.log(data.data);
      $.each(data.data, (i, val) => {
        _html += "<tr>"
        console.log(val);
        $.each(val, (j, val2) => {
          if (val2.toString().indexOf('.jpg') == -1)
          {
              _html += `<td>`+val2+`</td>`;
          }
          else{
              _html += `<td><img src="`+val2+`" alt="Smiley face" height="42" width="42"></td>`;
          }        
        });
        _html += '</tr>'
      });
      
      $('#users-table').html(_html)
    },
    error: (xhr) => {
      alert(xhr.responseText);
    }
  });
}


