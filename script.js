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
  var pagination = document.querySelector('.pagination');
  var notesOnPage = 6;
  var countOfPages = Math.ceil(jsonObj.length / notesOnPage);
  var items = [];
  for (var i = 1; i <= countOfPages; i += 1) {
    var li = document.createElement('li');
    li.innerHTML = i;
    pagination.appendChild(li);
    items.push(li);
  };
  
  showPage(items[0]);

  for (var item of items) {
    item.addEventListener('click', function() {
      showPage(this);
    })
  };

  function showPage(item) {
    var active = document.querySelector('.active');
    if (active) {
      active.classList.remove('active');
    };
    item.classList.add('active');
    var pageNum = +item.innerHTML;
    var start = (pageNum - 1) * notesOnPage;
    var end = start + notesOnPage;
    container.innerHTML = '';
    for (var i = start; i < end; i += 1) {
      if (i >= jsonObj.length) {
        break;
      };
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
      type.innerHTML = `Тип учетной записи:<br/>${jsonObj[i]['type']}`;
      div.appendChild(type);
      var ref = document.createElement('a');
      var userPage = jsonObj[i]['html_url'];
      ref.setAttribute('href', userPage);
      ref.innerHTML = `Открыть профиль`
      div.appendChild(ref);
    };
  }; 
};
