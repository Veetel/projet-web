

/*----------- Listen the document -----------*/

document.addEventListener("DOMContentLoaded", function () {

    /*--------- Get all things in document ----------- */

    //we get data from document
    // if const => we never change the value
    const chatForm = document.getElementById("chatsend");
    const chatInput = document.getElementById("chatInput");
    var errorBox = document.getElementById("errorBox");


    // créate a <div> to put messages
    const messagesDiv = document.createElement("div");
    messagesDiv.id = "messages";
    messagesDiv.style = "height: 400px; width = auto; border: 1px solid #ccc; margin-top: 10px; padding: 5px;";
    
    // insert messagesDiv before form
    chatForm.parentNode.insertBefore(messagesDiv, chatForm); 
  
   
    //  check if user is connected
    setTimeout(() => {const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

        if (!isLoggedIn) {
            // if he is not, it disabled the button and the input
            chatInput.disabled = true;
            chatForm.querySelector("button[type='submit']").disabled = true;
          
            // and it let a message to say he can t writte messages until he is connected
            errorBox.style.display = "block";
            errorBox.innerText = " Attention : Vous devez être connecté pour envoyer un message.";
            errorBox.style = "color: red; font-weight: bold; margin-top: 10px;";
    
        }
        else{
            //if he is logged, we change the erroBox to be sure he can't see it
            errorBox.style.display = "none";
        }
    },100);
    


    /*------------------------- Function to load messages ------------------------- */

    /**
     * @description function for reading messages and print them
     */
    function loadMessages() {

        //I prefer fetch than XMLHttpRequest so I used fetch


        fetch("../htbin/chatget.py")


            //analyse the response

            //transform the response in JSON
            .then((res) => res.json())

            //writte data in <p> paragraphe 
            .then((data) => {

                //So we create <strong> balises to highlight the username and the time when it was send
                //create a element, innerHTML is used to describe elements, here we don't specify (see below)
                messagesDiv.innerHTML = "";

                //for each message we create a <p> balise
                data.forEach((msg) => {
                const p = document.createElement("p");

                //here, <p> contain <strong> and we extract data from "data" variable: time/user/msg (Merci Mr Barrel, c'est votre solution qui m'a mit
                // la puce a l'oreille de pouvoir traiter le message ainsi)
                //here we can see a HTML code used with innerHTML, we will have something like this : [00:00] Username : "blablabla"
                //$ is used because we re in a template string (did not work when I did not use it)
                p.innerHTML = `<strong>[${msg.time}] ${msg.user} :</strong> ${msg.msg}`;

                //then we add new paragraphs in the div we had create for it
                //messagesDiv is now a table with HTML, written in string
                messagesDiv.append(p);
            });

            //if too much messages we need to scroll
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
            });
    }
  



    /*--------------- Listen the submit button --------------- */


    chatForm.addEventListener("submit", function (event) {


        //Negate the HTML submit 
        event.preventDefault();

        //Create the message from the input
        let message = chatInput.value.trim();
        //force the data to be key:value and ok with Content-type : "application/x-www-form-urlencoded"
        //we could use UrlSearchParams too
        let data = "msg="+encodeURIComponent(message);
    
        //we send our new data object
        fetch("../htbin/chatsend.py", {
            //specify the method
            method: "POST",
            //specify the content
            headers: { "Content-Type": "application/x-www-form-urlencoded" },

            //change the data in JSON
            body: data
        })

        //verrify the response
        .then((res) => res.json())

        //if all ok, response should be 0
        .then((res) => {
            if (res.num === 0) {
                //we remove text in
                chatInput.value = "";
                //then we reload Messages
                loadMessages();

            //if we get an Error we put it in ErrorBox 
            } else {
                errorBox.innerText = "Erreur : " + res.msg ;
            }
            });
    });

    //we read message in the start of the script and each 3000 millisecondes
    loadMessages();
    setInterval(loadMessages, 3000);


  });
  