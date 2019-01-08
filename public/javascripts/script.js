(function () {
    /* Déclare une fonction annonyme*/
    
    var httpRequest = new XMLHttpRequest();
    /* On crée une instance de l'objet XMLHTTPRequest */

/* DELETE */
        document.querySelectorAll('.delete-button').forEach(function (element) {
        element.addEventListener('click', function () {
            // console.log(this.getAttribute('data-id'));
            /* data-id à la valeur de l'id de mon todos */
            makeRequest(this.getAttribute('data-id'), 'DELETE', null, function(res){
                element.closest(".todo").remove();
            });
        })
    });

/* UPDATE */
    document.querySelectorAll('.done-button').forEach(function (element) {
        element.addEventListener('click', function () {
            var st = this.getAttribute('data-state') == "false";
            makeRequest(this.getAttribute('data-id'), 'PUT', {state:st}, function (res) {
                var span = document.createElement("span");
                span.innerHTML = res.response;
                element.closest(".todo").replaceWith(span.firstChild);
            });
        })
    });


    function makeRequest(id, method, datas, callback) {
        if (!httpRequest) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }
      httpRequest.onreadystatechange = function (){
          if (httpRequest.readyState === 4) {
              /* Si la requête est terminée (4) */
              if (httpRequest.status === 200) {
                  /* Si la requête est un succes alors on affiche une alerte*/
                  /*   alert(httpRequest.responseText); */
                  callback(JSON.parse(httpRequest.responseText));
              } else {
                //   console.log(httpRequest.readyState);
                  // console.log(httpRequest.status);
                  alert('There was a problem with the request.');
              }
          }
      }
      httpRequest.open(method, `/api/${id}`, true);
      /*  On spécifie la méthode de transmission des données, 
      l'URL et le mode de transmission de la requête (true = asynchrone).
      ${var} Pour concatener une variable avec mon URI */
      httpRequest.setRequestHeader('Content-Type', 'application/json');
      /* On spécifie qu'on veux un retour en JSON avec application/json */
      httpRequest.send(datas ? JSON.stringify(datas) : null);
      /* On execute la requête et on envois datas on spécifie qu'on l'envoi en string (stingify) et JSON*/
  
    // function alertContents() {
    //     if (httpRequest.readyState === 4) {
    //         /* Si la requête est terminée (4) */
    //         if (httpRequest.status === 200) {
    //         /* Si la requête est un succé alors on affiche une alerte*/
    //             alert(httpRequest.responseText);
    //             callback(httpRequest.responseJSON);
    //         } else {
    //             console.log(httpRequest.readyState);
    //             // console.log(httpRequest.status);
    //             alert('There was a problem with the request.');
    //         }
    //     }
    // }
  }
})();
