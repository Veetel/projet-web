
const submit = document.getElementById("sub");
sub.addEventListener("click",get);



function get(){

    let prenom = document.getElementById("Prenom");
    let nom = document.getElementsByName("Nom")[0].value;
    let date = document.getElementsByName("Date")[0].value;
    let password = document.getElementById("password").value;
    let mail = document.getElementsByName("mail")[0].value;

    if(prenom.value == "" || nom =="" || date == "" ){
        alert("le prenom, la date ou le nom est vide")
    }

    if(password.length < 12){
        alert("mot de passe trop court");
    }

    console.log(password);
    alert(password);

}