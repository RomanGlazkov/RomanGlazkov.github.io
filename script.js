var since = [0];
var getId;
var per_page = 9;
var requestURL = 'https://api.github.com/users?since=' + since[0] + '&per_page=' + per_page;
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
var next = 0;
request.onload = function() {
  var users = request.response;
  userCard(users);
};

function userCard(jsonObj) {
  var container = document.querySelector('.container');
  container.innerHTML = '';
  getId = jsonObj[per_page - 1]['id'];
  if (next === since.length - 1) {
    since.push(getId); 
  }
  for (var i = 0; i < per_page; i += 1) {
    var div = document.createElement('div');
    div.classList.add('cards');
    container.appendChild(div);
    var img = document.createElement('img');
    var avatarUrl = jsonObj[i]['avatar_url'];
    img.setAttribute('src', avatarUrl);
    img.setAttribute('height', '150');
    img.setAttribute('width', '150');
    img.setAttribute('alt', 'avatar');
    div.appendChild(img);
    var type = document.createElement('p');
    type.classList.add('types');
    type.innerHTML = `Тип учетной записи:<br/>${jsonObj[i]['type']}`;
    div.appendChild(type);
    var ref = document.createElement('a');
    var userPage = jsonObj[i]['html_url'];
    ref.setAttribute('href', userPage);
    ref.innerHTML = `Открыть профиль`
    div.appendChild(ref);
  }; 
};

var buttonBack = document.querySelector("#buttonBack");
buttonBack.disabled = true;
var buttonNext = document.querySelector("#buttonNext");

buttonNext.onclick = function() {
  next = next + 1;
  buttonBack.disabled = false;
  var requestURL = 'https://api.github.com/users?since=' + since[next] + '&per_page=' + per_page;
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    var users = request.response;
    userCard(users);
  };
};

buttonBack.onclick = function() {
  if (next === 1) {
    buttonBack.disabled = true;
  };
  next = next - 1;
  next = Math.max(next, 0)
  var requestURL = 'https://api.github.com/users?since=' + since[next] + '&per_page=' + per_page;
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    var users = request.response;
    userCard(users);
  };
};
