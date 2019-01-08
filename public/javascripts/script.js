(function () {
    /* Déclare une fonction annonyme*/
    var httpRequest;
    /* On déclare httpRequest */

/* DELETE */
        document.querySelectorAll('.delete-button').forEach(function (element) {
        element.addEventListener('click', function () {
            console.log(this.getAttribute('data-id'))
            /* data-id à la valeur de l'id de mon todos */
            makeRequest(this.getAttribute('data-id'), 'DELETE');
        
        })
    });

/* UPDATE */
    document.querySelectorAll('.done-button').forEach(function (element) {
        element.addEventListener('click', function () {
            console.log(this.getAttribute('data-id'))
            makeRequest(this.getAttribute('data-id'), 'PUT');
        })
    });


  function makeRequest(id, method) {
            httpRequest = new XMLHttpRequest();
    //   On crée une instance de l'objet XMLHTTPRequest

        if (!httpRequest) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
      }
      httpRequest.onreadystatechange = alertContents;
      httpRequest.open(method, `/api/${id}`, true);
      
      /*  On spécifie la méthode de transmission des données, 
      l'URL et le mode de transmission de la requête (true = asynchrone).
      ${var} Pour concatener une variable avec mon URI */
      httpRequest.send();
      /* On execute la requête*/
    }
  
  function alertContents() {
    if (httpRequest.readyState === 4) {
        /* Si la requête est terminée (4) */
        if (httpRequest.status === 200) {
        /* Si la requête est un succé alors on affiche une alerte*/
            alert(httpRequest.responseText);
        } else {
            // console.log(httpRequest.readyState);
            console.log(httpRequest.status);
            alert('There was a problem with the request.');
        }
      }
    }
  })();
