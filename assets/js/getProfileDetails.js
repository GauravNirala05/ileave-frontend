const token = localStorage.getItem('token')
const main = document.querySelector(".main-content")
const sidebar = document.querySelector("#sidebar")
const pop2 = document.querySelector("#popup2")
const footer = document.querySelector("#footer")
const statusmsg = document.querySelector("#statuserror")
const statusmsgtext = document.querySelector("#statuserrortext")
const errormsg = document.querySelector("#msgerror")

const getUserDetails = async () => {
    try {
        const user = await fetch('/getUserData', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if (!user.ok) {
            const status = user.status

            console.log(status);
            console.log(user.statusText);
            const { msg } = await user.json()

            pop2.hidden = false
            main.hidden = true
            sidebar.hidden = true
            statusmsg.innerHTML = status
            statusmsgtext.innerHTML = user.statusText
            errormsg.innerHTML = msg
            if (status == 400) {
                statusmsgtext.innerHTML = `Token Not Found`
                errormsg.innerHTML = `Go to Login`
            }
            openPopup2()
            localStorage.removeItem('token');
            localStorage.removeItem('UserDesignation');
            document.getElementById('loading-screen').hidden = true;
            footer.style.opacity = "0";
        }
        else {
            const { data } = await user.json()
            if (data.profileCompleted == false) {
                openmodal()

                ihtml =
                    `<img class="rounded-circle mt-5 imgnew" src="images/profile.png">
                    <span class="" style="color:black;"> ${data.email}</span>`

                document.getElementById("profile").innerHTML = ihtml
            }
            else {
                if (data.designation == 'principal') {
                    if (document.querySelector("#allusersidebar")) {
                        document.querySelector("#allusersidebar").hidden = false
                    }
                    if (document.querySelector("#resetAllLeaveByPrincipal")) {
                        document.querySelector("#resetAllLeaveByPrincipal").hidden = false
                    }
                    if (document.querySelector("#applyleavesidebar")) {
                        document.querySelector("#applyleavesidebar").hidden = true
                    }
                    if (document.querySelector("#statussidebar")) {
                        document.querySelector("#statussidebar").hidden = true
                    }
                    document.querySelector("#linkname").innerHTML = ` 
                        <span class="fa fa-user"></span>
                        <span>All User</span>
                    `
                }
                localStorage.setItem('UserDesignation', data.designation)
                document.querySelector("#userName").innerHTML = data.name
                document.querySelector("#userDepartment").innerHTML = data.department
                document.querySelector("#userDesignation").innerHTML = data.designation
                document.querySelector("#userEmail").innerHTML = data.email

                document.querySelector("#userGreet").innerHTML = data.title

                if (document.querySelector(".applyLeaveCasual")) {
                    document.querySelector(".applyLeaveCasual").innerHTML = data.leave_type.casual_leave
                    document.querySelector(".applyLeaveEarned").innerHTML = data.leave_type.earned_leave
                    document.querySelector(".applyLeaveMedical").innerHTML = data.leave_type.medical_leave
                    document.querySelector(".applyLeaveOrdinary").innerHTML = data.leave_type.ordinary_leave
                    document.querySelector(".applyLeaveTotal").innerHTML = data.leave_type.ordinary_leave + data.leave_type.medical_leave + data.leave_type.earned_leave + data.leave_type.casual_leave
                }

            }
        }
        off()
    } catch (error) {
        console.log(error);
        document.getElementById('loading-screen').hidden = true;
        off()
    }

}


if (token == null) {
    pop2.hidden = false
    main.hidden = true
    sidebar.hidden = true
    footer.style.opacity = "0";
    statusmsg.innerHTML = `Token not found`
    statusmsgtext.innerHTML = ``
    errormsg.innerHTML = `You Need to Login First`
    openPopup2()
    document.getElementById('loading-screen').hidden = true;

}
else {
    getUserDetails()
    off()
}
function login() {
    location.replace("login.html")
}
function completeprofile() {
    location.replace("complete_profile.html")
}

function openmodal() {
    document.getElementById("popup3").style.display = "block";
}
function closePopup() {
    document.getElementById("popup3").style.display = "none";
}

function openPopup() {
    document.getElementById("popup").style.display = "block";
}
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function openPopup2() {
    document.getElementById("popup2").style.display = "block";
}


function confirm_logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('UserDesignation');
    localStorage.removeItem('alluserdetails');
    localStorage.removeItem('allusertoken');
    location.replace("index.html")
}

const error_popup = document.getElementById("popupError")
function openerrorPopup() {
    error_popup.classList.add("open-popup")
}
function closeerrorPopup() {
    error_popup.classList.remove("open-popup")
}

window.onload = function () {
    document.getElementById('loading-screen').style.display = 'block';
};
function off() {
    document.getElementById('loading-screen').style.display = 'none';

}
