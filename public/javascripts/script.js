(function () {
    /* Déclare une fonction annonyme*/
    
    var httpRequest = new XMLHttpRequest();
    /* On crée une instance de l'objet XMLHTTPRequest */

    
    var setDelete = function(element) {
        element.addEventListener('click', function(){
            makeRequest(this.getAttribute('data-id'), 'DELETE', null, function(res){
                alert("effacé");
                element.closest('.todo').remove();
            });
        })
        
    };
    
    var setUpdate = function (element) {
        element.addEventListener('click', function () {
            var st = this.getAttribute('data-state') == "false";
            /* data-state m'aide à selec mon status */
            makeRequest(this.getAttribute('data-id'), 'PUT', { state: st }, function (res) {
                var tbody = document.createElement("tbody");
                tbody.innerHTML = res.response;

                var buttonDelete = tbody.querySelector(".delete-button");
                setDelete(buttonDelete);
                var buttonUpdate = tbody.querySelector(".done-button");
                setUpdate(buttonUpdate);

                element.closest(".todo").replaceWith(tbody.firstChild);
                /* closest sélectionne l'enfant de l'élement qui a la classe .todo */
                /* replaceWhith va remplacer pour le premier enfant de tbody*/
            });
        })
    };

 /* POST */
    document.getElementById('addTodo').addEventListener('submit', function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
    
        var form = evt.target;
        var datas = {};
        form.querySelectorAll('[name]').forEach(function(el){
            datas[el.getAttribute('name')] = el.value
        });

        makeRequest('', form.getAttribute('method'), datas, function(res){
            var tbody = document.createElement("tbody");
            tbody.innerHTML = res.response;
            console.log(tbody);
            var buttonDelete = tbody.querySelector(".delete-button");
            setDelete(buttonDelete);
            var buttonUpdate = tbody.querySelector(".done-button");
            setUpdate(buttonUpdate);
            
            var container = document.getElementById("todoContainer"); 
            container.appendChild(tbody.firstChild);
            console.log(container);
        })
    })   

/* DELETE */
    document.querySelectorAll('.delete-button').forEach(setDelete); 
                
/* UPDATE */
    document.querySelectorAll('.done-button').forEach(setUpdate);
    
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
        
    }
    var el = document.getElementById('todoContainer');
    var sortable = Sortable.create(el, {
        group: "localStorage-example",
        store: {

        }
    })
})();
    