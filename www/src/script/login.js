

/*--------- Get all things in document ----------- */

document.addEventListener( "DOMContentLoaded",function(){
    
    
    /*------------- Getters of document  -----------------*/
    const loginForm =document.getElementById("formlogin");
    let loginStatus = document.getElementById("login-status");
    let formFields = document.getElementById("formFields");
    let logout = document.getElementById("logout");


    /*------- Check if user is logged --------------- */
    if(localStorage.getItem("isLoggedIn") === "true"){
        loginStatus.innerText = localStorage.getItem("firstname")+" Connecté en tant que "+ localStorage.getItem("username");
        formFields.style.display = "none";
        logout.style.display = "inline-block";
    }
    



    /*---------------------get items from formular of login ----------- */

    // verrify if loginForm exist
    if(loginForm){
        
        
        //check the even on submit
        loginForm.addEventListener("submit",
            
            //if submit, use this function
            function(event){
                
                //catch the event of html and negate it
                event.preventDefault(); //

                    //get username & password in document
                    let username = document.getElementById("usernamelogin");
                    let password = document.getElementById("passwordlogin");
    
    
    
    
    
    
    
                    //create a new XMLHttpRequest object needed to send messages (could use fetch too)
                    let xhr = new XMLHttpRequest();

                    //check the adress and say that we want to post, "true" is by default
                    xhr.open("POST","../htbin/login.py","true");

                    //specify the type of data we will send
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    
                    //send the data to the adress set before
                    xhr.send("username="+username.value+"&userpwd="+password.value);
    
                    
                    //check if state is ok or not
                    xhr.onreadystatechange = function(){

                        //if ok, states gonna say "4"
                        if(xhr.readyState ==4 ){
                            console.log("reponse brute :"+xhr.responseText);

                            //check the status, if 200 it s ok
                            if(xhr.status == 200){
                                
                                //define a variable to treats the response
                                const response =xhr.responseText.trim();
                                
                                //if the response start with "bonjour", we split the response with space in it
                                if(response.startsWith("Bonjour")){
                                    let splited = response.split(" ");
                                    let firstname  = splited[1];

                                    //and we save the tab in the local storage with key value to save username,firstname and if your logged
                                    localStorage.setItem("firstname",firstname);
                                    localStorage.setItem("isLoggedIn","true");
                                    localStorage.setItem("username",username.value);


                                    //if all ok we changed the field of the form to display none (invisible) and change the message
                                    const usernameLocal = localStorage.getItem("username");
                                    loginStatus.innerText = firstname+" Connecté en tant que " + usernameLocal;
                                    formFields.style.display = "none";

                                    //change the display of the logout button
                                    logout.style.display = "inline-block";

                                }
                                else{
                                    //if problem, print the message in the login box, in red
                                    loginStatus.style.color= "red";
                                    loginStatus.innerText ="Erreur : " + xhr.responseText;

                                }

                            }else {
                                //if status not ok print an error servor in the console and errorbox
                                console.log("Connexion Servor error");
                                loginStatus.style.color= "red";
                                loginStatus.innerText ="Connexion Servor error";
                            }
    
                        }
                    };
                


                
            });
    } 
    else {
        console.log("Error finding form");
    }


});



/*--------------------- If Logged In and want to disconnect ----------- */

//if you press the logout
if(logout){
    logout.addEventListener("click",function(event){
        
        //negate the HTML action
        event.preventDefault();
        
        //remove from local the username, the firstname and the isLoggedIn keys
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("firstname");
        localStorage.removeItem("username")


        //force the login-status to be update as unlogged
        let loginStatus = document.getElementById("login-status");

        if(formFields){
            formFields.style.display="block";
            loginStatus.innerText = "Déconnecté";
            logout.style.display = "none";
        }
    })
}