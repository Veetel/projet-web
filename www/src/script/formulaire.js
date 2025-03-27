
const submit = document.getElementById("sub");
sub.addEventListener("click",get);





function get(event){

    /*------------ Regex for the formular ----------------*/
   
    let regexDate =/^0[1-9]|[1-2][0-9]|3[0-1]\/0[1-9]|1[0-2]\/\d{4}$/;
    let regexPwd =/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-_;:!?./*&$]).{12,}$/;
    let regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    
    event.preventDefault();
    




    /*--------- Initialisation from the document --------*/
    let firstname = document.getElementById("Prenom");
    let lastname = document.getElementsByName("Nom")[0];
    let birthdate = document.getElementById("birthday");
    let userpwd = document.getElementById("passwordform");
    let useremail = document.getElementById("email");
    let username = document.getElementById("usernameform");
    let errorBox = document.getElementById("errorBox");
    


    /*--------------- Convert the birthdate and test ------------*/


    let birthdateValue=birthdate.value;
    if(!regexDate.test(birthdateValue)){
        errorBox.textContent =
        " La date ne correspond pas au format dd/mm/yyyy.";
    }


    const birthTab = birthdateValue.split("/");
    let birthdateNew = birthTab[2]+'-'+birthTab[1]+'-'+birthTab[0];

    let bdParse = Date.parse(birthdateNew);
    birthdateNew = "" +birthTab[2]+'-'+birthTab[1]+'-'+birthTab[0]
    

    if(bdParse == birthdateNew){
    }


    /*--------- Check of the birthday is ok in the console -------*/

    let birthdatecheck = birthTab[0] + '/' + birthTab[1]+'/'+birthTab[2];

    console.log(birthdatecheck);

    birthTab.forEach((element)=> console.log(element));

    if(isNaN(bdParse)){

        console.log("date non valide");

        console.log("Date invalide");

    }

    console.log(bdParse);
    console.log(birthdateNew);








    







    if(firstname.value == "" || lastname.value =="" || birthdate.value == "" ){
        console.log("le prenom, la date ou le nom ou le prenom est vide")
        return;
    }

    if(!regexPwd.test(userpwd.value)){
        errorBox.textContent = "Format du mot de passe invalide"

        console.log("mot de passe invalide");
    }



    if(!regexMail.test(useremail.value) ){
        console.log("Email invalide");
    }
   

    let formData =  new URLSearchParams();
    formData.append("username", username.value);
    formData.append("userpwd", userpwd.value);
    formData.append("firstname", firstname.value);
    formData.append("lastname", lastname.value);
    
    formData.append("useremail", useremail.value);
    formData.append("birthdate", birthdate.value);



    fetch("../htbin/register.py",{ 
        method: "POST",

        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },

        body: formData.toString()
    })

    .then((response) =>{
        
        if(response.ok){
            errorBox.style.color ="green";
            errorBox.textContent= "Merci pour l'enregistrement, vous allez être redirigé sur la page d'accueil dans 5s"
            setTimeout( function (){
                window.location.href ="../index.html";
            },5000);



        }
        else {
            console.log("Une erreur est survenue");
        }})

    .catch(error => {console.error("Error :", error)});


}

