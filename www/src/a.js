
const submit = document.getElementById("sub");
sub.addEventListener("click",get);



function get(){


    let regexMail = /^\S+@\S+\.\S+$/;




    let prenom = document.getElementById("Prenom");
    let nom = document.getElementsByName("Nom")[0];
    let date = document.getElementsByName("Date")[0];
    let password = document.getElementById("password");
    let mail = regexMail.match(document.getElementsByName("mail")[0].value);
    
  
    

    if(prenom.value == "" || nom.value =="" || date.value == "" ){
        alert("le prenom, la date ou le nom ou le prenom est vide")
    }

    if(password.length < 12 || password.value == ""){
        alert("mot de passe trop court");
    }

    if(regexMail.mail.value){

    }
   

    console.log(password);
    alert(password);

}