let requestURL = 'https://api.github.com/users';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = () => {
    let usersList = request.response;
    avatar(usersList);
    account(usersList);
    link(usersList);
};

let header = document.querySelector('.profile_1');
const account = (jsonObj) => {
  let type = document.createElement('h2');
  type.textContent = jsonObj[0]['type'];
  header.appendChild(type);
};
