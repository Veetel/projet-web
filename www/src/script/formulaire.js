
const submit = document.getElementById("sub");
sub.addEventListener("click",get);




/**
 * @description get elements from the formular and treats it to know if they re ok or not
 * @param {*} event is the event on click
 * 
 */
function get(event){

    /*------------ Regex for the formular ----------------*/
   
    let regexDate =/^0[1-9]|[1-2][0-9]|3[0-1]\/0[1-9]|1[0-2]\/\d{4}$/;
    let regexPwd =/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-_;:!?./*&$]).{12,}$/;
    let regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    
    //stop the default HTML submit
    event.preventDefault();
    




    /*--------- Initialisation from the document --------*/
    let firstname = document.getElementById("Prenom");
    let lastname = document.getElementsByName("Nom")[0];
    let birthdate = document.getElementById("birthday");
    let userpwd = document.getElementById("passwordform");
    let useremail = document.getElementById("email");
    let username = document.getElementById("usernameform");
    let errorBox = document.getElementById("errorBox");
    errorBox.style.color= "red";

    let hasAnError = false;
    


    /*--------------- Convert the birthdate and test ------------*/


    let birthdateValue=birthdate.value;
    if(!regexDate.test(birthdateValue)){
        errorBox.textContent =
        " La date ne correspond pas au format dd/mm/yyyy.";
        hasAnError = true;
    }


    //we split it in a table
    const birthTab = birthdateValue.split("/");

    //we format it 
    let birthdateNew = `${birthTab[2]}-${birthTab[1]}-${birthTab[0]}`;

    //we use Date.parse to see if the date is ok or not, if the date doesn't exist, bdParse == NaN
    let bdParse = Date.parse(birthdateNew);

   
    



    /*--------- Check of the birthday is ok in the console -------*/

    let birthdatecheck = birthTab[0] + '/' + birthTab[1]+'/'+birthTab[2];

    console.log(birthdatecheck);

    birthTab.forEach((element)=> console.log(element));

    //verrify if bdparse == Nan
    if(isNaN(bdParse)){

        console.log("date non valide");
        errorBox.innerText +="Date invalide\n";
        hasAnError = true;
    }

    console.log(bdParse);
    console.log(birthdateNew);








    






/*------------------------------- Verrify if firstname + lastename + birthdate + username are not empty ---------------------------*/
    if(firstname.value == "" || lastname.value =="" || birthdate.value == "" || username.value == ""){
        console.log("le prenom, la date ou le nom ou le prenom est vide");
        errorBox.innerText += "le prenom, la date ou le nom ou le prenom est vide\n";
        hasAnError = true;


    }

    if(!regexPwd.test(userpwd.value)){

        errorBox.innerText += "Format du mot de passe invalide\n";
        hasAnError = true;
        console.log("mot de passe invalide");
    }



    if(!regexMail.test(useremail.value) ){
        console.log("Email invalide");
        hasAnError = true;
        errorBox.innerText += "Email Invalide\n";

    }
   


    /*------------------------------- Start to send  ------------------*/

    //check if we had error before
    if(hasAnError) return;


    //create an object formdata wich use URLSearch params object, it s manipulated like a table (simple to use)
    let formData =  new URLSearchParams();

    //add key:value for each formular inputs
    formData.append("username", username.value);
    formData.append("userpwd", userpwd.value);
    formData.append("firstname", firstname.value);
    formData.append("lastname", lastname.value);
    
    formData.append("useremail", useremail.value);
    formData.append("birthdate", birthdate.value);


    //fetch register.py
    fetch("../htbin/register.py",{ 

        //say the method
        method: "POST",

        //say wich type of content (not needed normally but I had bad experiences)
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        //transform formData in string, similar to formdata = "username = ***** " etc... (too long)
        body: formData.toString()
    })

    //listen the response
    .then((response) =>{
        
        //if response ok send the user to the index page and to be sure, print something in lime green to warn him
        if(response.ok){
            errorBox.style.color ="lime";
            errorBox.textContent= "Merci pour l'enregistrement, vous allez être redirigé sur la page d'accueil dans 5s"
            setTimeout( function (){
                window.location.href ="../index.html";
            },5000);



        }
        //if response not ok , error box say the error and console too
        else {
            errorBox.innerText += "Une erreur est survenue\n";
            console.log("Une erreur est survenue",response);
        }})

    

    
    
        // if impossible to fetch catch the error and print in console + error box
    .catch(error => {
        console.error("Error :", error);
        errorBox.innerText = "Erreur Connection";    
    
    });


}

