


document.addEventListener( "DOMContentLoaded",function(){
    
    
    const loginForm =document.getElementById("formlogin");
    let loginStatus = document.getElementById("login-status");
    let formFields = document.getElementById("formFields");
    let logout = document.getElementById("logout");


    if(localStorage.getItem("isLoggedIn") === "true"){
        loginStatus.innerText = localStorage.getItem("firstname")+" Connecté";
        formFields.style.display = "none";
        logout.style.display = "inline-block";
    }
    




    if(loginForm){
        
        
        
        loginForm.addEventListener("submit",
            
            
            function(event){
                
                event.preventDefault(); //

                    let username = document.getElementById("usernamelogin");
                    let password = document.getElementById("passwordlogin");
    
    
    
    
    
    
    
                    
                    let xhr = new XMLHttpRequest();
                    xhr.open("POST","../htbin/login.py","true");
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    
    
                    xhr.send("username="+username.value+"&userpwd="+password.value);
    
                    
    
                    xhr.onreadystatechange = function(){
                        if(xhr.readyState ==4 ){
                            console.log("reponse brute :"+xhr.responseText);

                            if(xhr.status == 200){
                                const response =xhr.responseText.trim();
                                
                                if(response.startsWith("Bonjour")){
                                    let splited = response.split(" ");
                                    let firstname  = splited[1];
                                    localStorage.setItem("firstname",firstname);
                                    localStorage.setItem("isLoggedIn","true");
                                    localStorage.setItem("username",username.value);
                                    loginStatus.innerText = firstname+" Connecté";
                                    formFields.style.display = "none";
                                    logout.style.display = "inline-block";

                                }
                                else{
                                    loginStatus.style.color= "red";
                                    loginStatus.style.width = ""
                                    loginStatus.innerText ="Erreur : " + xhr.responseText;

                                }

                            }else {
    
                                console.log("Connexion Servor error");
                            }
    
                        }
                    };
                


                
            });
    } 
    else {
        console.log("Error finding form");
    }


});

if(logout){
    logout.addEventListener("click",function(event){
        event.preventDefault();
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("firstname");
        let loginStatus = document.getElementById("login-status");

        if(formFields){
            formFields.style.display="block";
            loginStatus.innerText = "Déconnecté";
            logout.style.display = "none";
        }
    })
}