document.addEventListener("DOMContentLoaded", function () {




    const chatForm = document.getElementById("chatsend");
    const chatInput = document.getElementById("chatInput");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    var errorBox = document.getElementById("errorBox");



    const messagesDiv = document.createElement("div");
    messagesDiv.id = "messages";
    messagesDiv.style = "height: 400px; width = auto; border: 1px solid #ccc; margin-top: 10px; padding: 5px;";
    
    chatForm.parentNode.insertBefore(messagesDiv, chatForm); // insert messages above form
  
    /**
     * test pour verrifier si 
     */
    if (!isLoggedIn) {
        // désactiver le champ + bouton
        chatInput.disabled = true;
        chatForm.querySelector("button[type='submit']").disabled = true;
      
        // message d'alerte
        errorBox.innerText = "Vous devez être connecté pour envoyer un message.";
        errorBox.style = "color: red; font-weight: bold; margin-top: 10px;";

    }
    else{
        errorBox.style= "display: none;"
    }


    /**
     * @description Fonction qui lit les messages sur chat.dat
     */
    function loadMessages() {

        //on envoie le message avec fetch


        fetch("../htbin/chatget.py")


            //on analyse la reponse

            //on recupere les données de réponse que l'on transforme en JSON
            .then((res) => res.json())

            //les data recuperer on va les écrire dans un paragraphe
            .then((data) => {

                //on va creer une nouvelle balise de type strong et pour chaque nouvel élément on va créer un 
                //paragraphe p et a l'interieur une balise strong, celle-ci servira a mettre en avant les noms des personnes qui écrient

                //ici on crée un élément, innerHTML permet de décrire l'élément qu'on veut creer et ses descendant
                messagesDiv.innerHTML = "";

                //pour chaque message on crée un paragraphe
                data.forEach((msg) => {
                const p = document.createElement("p");

                //le paragraphe contient une balise <strong> et on récupère les données de data: time/user/msg (Merci Mr Barrel, c'est votre solution qui m'a mit
                // la puce a l'oreille de pouvoir traiter le message ainsi)
                p.innerHTML = `<strong>[${msg.time}] ${msg.user} :</strong> ${msg.msg}`;

                //puis on ajoute les nouveaux paragraphes à la div contenant les messages qui a été crée en haut
                messagesDiv.append(p);
            });

            //si trop de message il fallait qu'on puiisse scroll
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
            });
    }
  
  
    /**
     *
     */
    chatForm.addEventListener("submit", function (event) {


        //on cancel le submit de base car on ne veut pas envoyer 2 fois
        event.preventDefault();

        //on crée uin objet clé-valeur (msg: "message")
        let data = {msg : chatInput.value.trim()};
    
        //on envoie le message dans data
        fetch("../htbin/chatsend.py", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: JSON.stringify(data)
        })

        //on analyse les reponses comme au dessus
        .then((res) => res.json())

        //si tout c est bien passé la réponse doit etre égale a 0
        .then((res) => {
            if (res.num === 0) {
                //on vide la value de chatInput sinon l'utilisateur devra le faire à la main
                chatInput.value = "";
                //puis on recharge les messages
                loadMessages();

            //si on obtient un probleme on l'affiche dans la balise ErrorBox prévue à cet effet
            } else {
                errorBox.innerText = "Erreur : " + res.msg ;
            }
            });
    });

    //on lit les messages en ouverture de pages ET tout les certains temps (ici 3000 milliseconde)
    loadMessages();
    setInterval(loadMessages, 3000);


  });
  