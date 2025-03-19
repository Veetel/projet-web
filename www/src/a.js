
const submit = document.getElementById("sub");
sub.addEventListener("click",get);





function get(){


    let regexMail =/^\S+@\S+.\S+$/;
    let regexPwd = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{12,}$/;
    
    



    let firstname = document.getElementById("Prenom");
    let lastname = document.getElementsByName("Nom")[0];
    let birthdate = document.getElementsByName("Date")[0];
    let userpwd = document.getElementById("password");
    let useremail = document.getElementsByName("mail")[0];
    let username = document.getElementById("username");
    

    let birthdateValue=birthdate.value;
    const test = String.prototype.split(birthdateValue,3);
    console.log(test);



    let a = Date.parse(birthdate.value);
    console.log(a);
    

    if(firstname.value == "" || lastname.value =="" || birthdate.value == "" ){
        alert("le prenom, la date ou le nom ou le prenom est vide")
        return;
    }

    if(!regexPwd.test(userpwd.value)){
        alert("mot de passe invalide");
    }

    if(isNaN(a)){

        console.log("date non valide");

        alert("Date invalide");

    }

    if(!regexMail.test(useremail.value) ){
        alert("Email invalide");
    }
   

    let formData = {
        username : username.value,
        firstname : firstname.value,
        useremail: useremail.value,
        userpwd: userpwd.value,
        lastname: lastname.value,
        birthdate: birthdate.value
    };


    fetch("../htbin/register.py",{ 
        method: "POST",
        
        body:JSON.stringify(formData)
    })

    .then((response) =>{
        
        if(response.ok){
            // window.location.href ="../index.html";

        }
        else {
            alert("Une erreur est survenue");
        }})

    .catch(error => {console.error("Error :", error)});

    console.log(Date.parse(birthdate.value));

}

