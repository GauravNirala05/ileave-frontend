const usertoken = localStorage.getItem('token');

if (usertoken != null) {
    location.replace("dashboard.html")
}

function errorHandler(msg) {
    document.getElementById("error_warn").innerHTML = `${msg[0]}`
    document.getElementById("error_msg").innerHTML = `${msg[1]}`
    openerrorPopup()
}
const btn_log = document.querySelector('.btn_log')
const email_log = document.querySelector('.email_log')
const password_log = document.querySelector('.password_log')

btn_log.addEventListener('click', async (e) => {
    if (!LOGform.checkValidity()) {
        return;
    }
    e.preventDefault()
    document.getElementById("loginerrormsg").innerHTML = ``

    const email = email_log.value
    const password = password_log.value

    try {
        const loger = await fetch('http://localhost:4000/signin', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        if (!loger.ok) {
            const status = loger.status
            const { msg } = await loger.json()
            var arraryError = []
            arraryError.push(status)
            arraryError.push(msg)
            errorHandler(arraryError)
        }
        else {
            const { data, msg, token } = await loger.json()
            localStorage.setItem("token", token)
            location.replace("dashboard.html")
        }
    }
    catch (error) {
        console.log(error);
    }

})
let popup = document.getElementById("popupError")
function openerrorPopup() {
    document.getElementById("overlay").style.display = "block";
    popup.classList.add("open-popup")
}
function closeerrorPopup() {
    document.getElementById("overlay").style.display = "none";

    popup.classList.remove("open-popup")
}

const btn_regi = document.querySelector('.btn_regi')
const email_regi = document.querySelector('.email_regi')
const password_regi = document.querySelector('.password_regi')
const confirmPassword_regi = document.querySelector('.confirmPassword_regi')
var errorhtml = document.getElementById("errormsg").innerHTML;
const errorElement = document.getElementById("error")



btn_regi.addEventListener('click', async (e) => {
    if (!form.checkValidity()) {
        return;
    }
    e.preventDefault()
    // validateInputs();
    if (password_regi.value == confirmPassword_regi.value) {
        document.getElementById("errormsg").innerHTML = ``
        const email = email_regi.value
        const password = password_regi.value
        try {
            const fetcher = await fetch('http://localhost:4000/registration', {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/json',
                }

            })
            if (!fetcher.ok) {
                const status = fetcher.status
                const { msg } = await fetcher.json()
                var arraryError = []
                arraryError.push(status)
                arraryError.push(msg)
                errorHandler(arraryError)
            }
            const { msg } = await fetcher.json()
            document.querySelector("#emailid").innerHTML= email;
            showPopup()

        } catch (error) {
            console.log(error)
        }

    }
    else {
        console.log(`Password is not Matching`);
        document.getElementById("errormsg").innerHTML = `Password is not Matching`
    }

})
//for validation
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error")
    errorDisplay.innerText = message
    inputControl.classList.add("error")
    inputControl.classList.remove("success")
}
const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error")
    errorDisplay.innerText = ''
    inputControl.classList.add("success")
    inputControl.classList.remove("error")
}
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const validateInputs = () => {
    const email_regiValue = email_regi.value.trim()
    const password_regiValue = password_regi.value.trim()
    if (email_regiValue == '') {
        setError(email_regi, 'Email is required')
    } else {
        setSuccess(email_regi)
    }
    if (password_regiValue == '') {
        setError(password_regi, 'Password is required')
    } else if (password_regiValue.length < 8) {
        setError(password_regi, 'Password must be at least 8 character')
    } else {
        setSuccess(password_regi)
    }
}
//for validation
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// Get the popup and button elements
const myPopup = document.getElementById("myPopup");
const myButton = document.getElementById("myButton");
const closeButton = document.getElementById("closeButton");

function showPopup() {
    myPopup.style.display = "block";
    setTimeout(() => {
        hidePopup()
        location.reload()
    }, 5000);
}

// Hide the popup when the close button is clicked
function hidePopup() {
    myPopup.style.display = "none";
}

let error_popup = document.getElementById("popupError")
function openerrorPopup() {
    document.getElementById("overlay").style.display = "block";
    console.log("Running")
    error_popup.classList.add("open-popup")
    document.addEventListener('click',closeerrorPopup)
}
function closeerrorPopup() {
    document.getElementById("overlay").style.display = "none";
    error_popup.classList.remove("open-popup")
}
