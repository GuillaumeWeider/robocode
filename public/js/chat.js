document.addEventListener("DOMContentLoaded", function(event) {

  /* VARIABLES */

  var user;
  var key;

  var refreshInterval;
  var refreshTiming = 1000;

  /* FUNCTIONS */

  function refresh() {
    var date = new Date();
    var timeStamp = date.getTime() - refreshTiming;
    var xhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        afficherMessage(data.general);
        afficherMessagePrive(data.user);
        afficherUsers(data.users);
      }
    }
    xhttp.open("get", "/chat/" + user + "/" + key + "/" + timeStamp);
    xhttp.send();
  }

  function afficherMessage(tab_message) {
    for (var i in tab_message) {
      var liste = document.createElement("li");
      var horaire = getHour(tab_message[i].when);
      if (tab_message[i].from == null) {
        liste.style.color = "red";
        var text = document.createTextNode(horaire + " - (Système) : " + tab_message[i].text);
      } else {
        if (tab_message[i].from == user) {
          liste.style.color = "green";
        }
        var text = document.createTextNode(horaire + " - " + tab_message[i].from + " : " + tab_message[i].text);
      }
      liste.appendChild(text);
      document.getElementById("messages").appendChild(liste);
    }
  }

  function afficherMessagePrive(tab_message) {
    for (var i in tab_message) {
      var liste = document.createElement("li");
      if (tab_message[i].from == user) {
        liste.style.color = "green";
      }
      var text = document.createTextNode(getHour(tab_message[i].when) + " - " + tab_message[i].from + " : " + tab_message[i].text);
      liste.appendChild(text);
      document.getElementById("messages").appendChild(liste);
    }
  }

  function afficherUsers(tab_users) {
    while (users.firstChild) {
      users.removeChild(users.firstChild);
    }
    for (var i in tab_users) {
      var liste = document.createElement("li");
      var text = document.createTextNode(tab_users[i]);
      liste.appendChild(text);
      document.getElementById("users").appendChild(liste);
    }
  }

  function getHour(timeStamp) {
    var dt = new Date(timeStamp);
    h = dt.getHours();
    m = dt.getMinutes();
    s = dt.getSeconds();
    if (h < 10) {
      h = "0" + h;
    }
    if (m < 10) {
      m = "0" + m;
    }
    if (s < 10) {
      s = "0" + s;
    }
    return h + ":" + m + ":" + s;
  }

  /* EVENT */

  validerConnexion.addEventListener("click", function(event) {
    var pseudo = document.getElementById('pseudo').value;
    var xhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        user = data.user;
        key = data.key;
        document.getElementById('connexion').style.display = "none";
        document.getElementById('salon').style.display = "block";
        var title = document.createTextNode("Chat de Robocode - utilisateur : " + user);
        document.getElementById('title').appendChild(title);
        refresh();
        refreshInterval = setInterval(refresh, refreshTiming);
      }
    }
    xhttp.open("post", "/chat/" + pseudo);
    xhttp.send();

  })

  quitter.addEventListener("click", function(event) {
    var xhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhttp.open("delete", "/chat/" + user + "/" + key);
    xhttp.send();
    clearInterval(refreshInterval);
    document.getElementById('connexion').style.display = "block";
    document.getElementById('salon').style.display = "none";
  })

  envoyerMessage.addEventListener("click", function(event) {
    var message = document.getElementById('textMessage').value;
    var xhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    var dest = message.substring(0, 4);
    if (dest == "/to:") { // message prive
      var to = "";
      for (var i = 4; i < message.length; i++) {
        var caractere = message.charAt(i);
        if (caractere != ' ') {
          to = to + message.charAt(i);
        } else {
          break;
        }
      }
      message = message.substring(4 + to.length);
      xhttp.open("put", "/chat/" + user + "/" + key + "/" + to);
    } else { // message global
      xhttp.open("put", "/chat/" + user + "/" + key);
    }
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("message=" + message);
    document.getElementById('textMessage').value = "";
  })

  window.addEventListener("beforeunload", function(e) {
    clearInterval(refreshInterval);
    var xhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhttp.open("delete", "/chat/" + user + "/" + key);
    xhttp.send();
  }, false);


});
