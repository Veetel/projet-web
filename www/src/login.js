document.addEventListener( "DOMContentLoaded",function(){const loginForm =document.getElementById("formlogin");



    let userpwd = document.getElementById("password");
    let username = document.getElementById("usernamelogin");

    if(loginForm){
        loginForm.addEventListener("submit",function(event){event.preventDefault(); //

            let username = document.getElementById("usernamelogin");
            let formData = new FormData(loginForm);
            console.log(formData);
            
            let xhr = new XMLHttpRequest();


            xhr.open("POST","../htbin/login.py",true);
            xhr.onreadystatechange = function(){
                if(xhr.readyState ==4 && xhr.status ===200){
                    console.log(xhr.response);

                }
                else {

                    console.log("Connexion Servor error");

                }
            }
            xhr.send(formData);
            document.getElementById("login-status").innerText = "Connecté"
        });
    } 
    else {
        console.log("Error finding form");
    }
});