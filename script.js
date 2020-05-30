var requestURL = 'https://api.github.com/users';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
  var users = request.response;
  userCard(users);
};

var container = document.querySelector('.container');

function userCard(jsonObj) {
  for (var i = 0; i < jsonObj.length; i += 1) {
    var div = document.createElement('div');
    container.appendChild(div);
    var img = document.createElement('img');
    var avatarUrl = jsonObj[i]['avatar_url'];
    img.setAttribute('src', avatarUrl);
    img.setAttribute('height', '150');
    img.setAttribute('width', '150');
    img.setAttribute('alt', 'avatar');
    div.appendChild(img);
    var type = document.createElement('p');
    type.innerHTML = `Тип учетной записи:<br/>${jsonObj[i]['type']}`;
    div.appendChild(type);
    var ref = document.createElement('a');
    var userPage = jsonObj[i]['html_url'];
    ref.setAttribute('href', userPage);
    ref.innerHTML = `Открыть профиль`
    div.appendChild(ref);
  };
};
