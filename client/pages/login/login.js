
function clearError() {
    errors = document.getElementsByClassName("formerror");
    for (item of errors) {
        item.innerHTML = "";
    }

}
function seterror(id, error) {
    ele = document.getElementById(id);
    ele.getElementsByClassName("formerror")[0].innerHTML = error;
    
}
function validateForm(event) {
    event.preventDefault()
    var returnvalue = true;
    clearError();

   

   

    const email = document.forms['myForm']['Email'].value;
    if (email.length == 0) {
        seterror("email", "*Field is empty");
        returvalue = false;
    }
    const regularExpressionEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.length > 0 && !regularExpressionEmail.test(email)) {
        seterror("email", "*Please enter valid email address");
        returvalue = false;
    }


    const password = document.forms['myForm']['Password'].value;
    if (password.length == 0) {
        seterror("password", "*Field is empty");
        returvalue = false;
    }
    else if (password.length > 0 && password.length < 6) {
        seterror("password", "*minimum 6 character");
        returvalue = false;
    }
    const regularExpressionPassword = /^[a-zA-Z0-9]{6,16}$/;
    if (password.length > 0 && password.length > 6 && !regularExpressionPassword.test(password)) {
        seterror("password", "*Must have a number and alphabet");
        returvalue = false;
    }

    



    return returnvalue;
}