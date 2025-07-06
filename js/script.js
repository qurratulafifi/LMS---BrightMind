// let toggleBtn = document.getElementById('toggle-btn');
// let body = document.body;
// let darkMode = localStorage.getItem('dark-mode');
//
// const enableDarkMode = () =>{
//    toggleBtn.classList.replace('fa-sun', 'fa-moon');
//    body.classList.add('dark');
//    localStorage.setItem('dark-mode', 'enabled');
// }
//
// const disableDarkMode = () =>{
//    toggleBtn.classList.replace('fa-moon', 'fa-sun');
//    body.classList.remove('dark');
//    localStorage.setItem('dark-mode', 'disabled');
// }
//
// if(darkMode === 'enabled'){
//    enableDarkMode();
// }
//
// toggleBtn.onclick = (e) =>{
//    darkMode = localStorage.getItem('dark-mode');
//    if(darkMode === 'disabled'){
//       enableDarkMode();
//    }else{
//       disableDarkMode();
//    }
// }
//
// let profile = document.querySelector('.header .flex .profile');
//
// document.querySelector('#user-btn').onclick = () =>{
//    profile.classList.toggle('active');
//    search.classList.remove('active');
// }
//
// let search = document.querySelector('.header .flex .search-form');
//
// document.querySelector('#search-btn').onclick = () =>{
//    search.classList.toggle('active');
//    profile.classList.remove('active');
// }
//
// let sideBar = document.querySelector('.side-bar');
//
// document.querySelector('#menu-btn').onclick = () =>{
//    sideBar.classList.toggle('active');
//    body.classList.toggle('active');
// }
//
// document.querySelector('#close-btn').onclick = () =>{
//    sideBar.classList.remove('active');
//    body.classList.remove('active');
// }
//
// window.onscroll = () => {
//    profile.classList.remove('active');
//    search.classList.remove('active');
//
//    if (window.innerWidth < 1200) {
//       sideBar.classList.remove('active');
//       body.classList.remove('active');
//    }
// }
// document.getElementById('loginForm').addEventListener('submit', async function(e) {
//    e.preventDefault();
//    const email = document.getElementById('email').value;
//    const password = document.getElementById('password').value;
//
//    try {
//       const response = await fetch('http://localhost:8080/api/user/login', {
//          method: 'POST',
//          headers: { 'Content-Type': 'application/json' },
//          body: JSON.stringify({ email, password })
//       });
//
//       if (response.ok) {
//          const user = await response.json();
//          localStorage.setItem('user_id', user.id);
//          localStorage.setItem('user_name', user.name);
//          alert('Login successful!');
//          window.location.href = 'home.html';
//       } else {
//          alert('Invalid credentials.');
//       }
//    } catch (error) {
//       alert('Login failed.');
//       console.error(error);
//    }
// });
// /*
// const response = await fetch(`http://localhost:8080/api/register`, {
//    method: 'POST',
//    headers: { 'Content-Type': 'application/json' },
//    body: JSON.stringify({ name, email, password })
// });
// */
// // Exit notification panel
// document.getElementById('exitBtn').addEventListener('click', function () {
//    document.querySelector('.max-w-md').style.display = 'none';
// });
//
// // "View Thread" button alert
// document.querySelectorAll('button').forEach(button => {
//    if (button.textContent.includes("View Thread")) {
//       button.addEventListener('click', function () {
//          alert("Opening group message thread...");
//       });
//    }
// });
//
//
let toggleBtn = document.getElementById('toggle-btn');
let body = document.body;
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () =>{
   toggleBtn.classList.replace('fa-sun', 'fa-moon');
   body.classList.add('dark');
   localStorage.setItem('dark-mode', 'enabled');
}

const disableDarkMode = () =>{
   toggleBtn.classList.replace('fa-moon', 'fa-sun');
   body.classList.remove('dark');
   localStorage.setItem('dark-mode', 'disabled');
}

if(darkMode === 'enabled'){
   enableDarkMode();
}

toggleBtn.onclick = (e) =>{
   darkMode = localStorage.getItem('dark-mode');
   if(darkMode === 'disabled'){
      enableDarkMode();
   }else{
      disableDarkMode();
   }
}

let profile = document.querySelector('.header .flex .profile');
let search = document.querySelector('.header .flex .search-form');
let sideBar = document.querySelector('.side-bar');

document.querySelector('#user-btn').onclick = () =>{
   profile.classList.toggle('active');
   search.classList.remove('active');
}

document.querySelector('#search-btn').onclick = () =>{
   search.classList.toggle('active');
   profile.classList.remove('active');
}

document.querySelector('#user-btn').onclick = () => {
   if (profile && search) {
      profile.classList.toggle('active');
      search.classList.remove('active');
   }
}

document.querySelector('#menu-btn').onclick = () => {
   if (sideBar) {
      sideBar.classList.toggle('active');
      body.classList.toggle('active');
   }
}

let closeBtn = document.querySelector('#close-btn');
if (closeBtn) {
   closeBtn.onclick = () => {
      sideBar.classList.remove('active');
      body.classList.remove('active');
   }
}

window.onscroll = () => {
   if (profile) profile.classList.remove('active');
   if (search) search.classList.remove('active');

   if (window.innerWidth < 1200 && sideBar) {
      sideBar.classList.remove('active');
      body.classList.remove('active');
   }
}

window.onload = function() {
   // your button handling JS here
}

document.getElementById('loginForm').addEventListener('submit', async function(e) {
   e.preventDefault();
   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;

   try {
      const response = await fetch('http://localhost:8080/api/user/login', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ email, password })
      });

      if (response.ok) {
         const user = await response.json();
         localStorage.setItem('user_id', user.id);
         localStorage.setItem('user_name', user.name);
         alert('Login successful!');
         window.location.href = 'home.html';
      } else {
         alert('Invalid credentials.');
      }
   } catch (error) {
      alert('Login failed.');
      console.error(error);
   }
});
