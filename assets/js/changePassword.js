// Show the popup when the button is clicked
function showPopup(msg) {
    if (!form.checkValidity()) {
        return;
    }
    myPopup.style.display = "block";
    document.querySelector('#resetPasswordMsg').innerHTML = msg
}

// Hide the popup when the close button is clicked
function hidePopup() {
    myPopup.style.display = "none";
}

const resetPasswordBtn = document.querySelector('#resetPasswordBtn')

if (resetPasswordBtn) {
    resetPasswordBtn.addEventListener('click', async (e) => {
        e.preventDefault()
        if (document.querySelector('#resetPasswordEmail')) {
            const forgotPasswordEmail = document.querySelector('#resetPasswordEmail').value
            localStorage.setItem('forgetEmail', forgotPasswordEmail)
        }
        const forgotPassEmail = localStorage.getItem('forgetEmail')
        if (forgotPassEmail) {
            try {
                const forgotPassData = await fetch(`/forgotPassword`, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: forgotPassEmail
                    }),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                if (!forgotPassData.ok) {
                    const status = forgotPassData.status
                    const { msg } = await forgotPassData.json()
                    localStorage.removeItem('forgetEmail')
                    throw Error(`${status} ${msg}`)

                }
                else {
                    const { userid, msg } = await forgotPassData.json()
                    localStorage.setItem('userID', userid)
                    showPopup(msg)
                    setTimeout(() => {
                        location.replace("verifyOTP.html")
                    }, 2000);
                }

            } catch (error) {
                showPopup(error)
            }
        }
    })
}

const OtpVerification = document.querySelector('#OtpVerification')
if (OtpVerification) {
    OtpVerification.addEventListener('click', async (e) => {
        e.preventDefault()
        try {
            const userID = localStorage.getItem('userID')
            const resetPasswordOTP = document.querySelector('#resetPasswordOTP').value
            console.log(resetPasswordOTP);
            const verifyOTPData = await fetch(`/forgotPassword/verifyOTP`, {
                method: 'POST',
                body: JSON.stringify({
                    id: userID,
                    OTP: resetPasswordOTP
                }),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            if (!verifyOTPData.ok) {
                const status = verifyOTPData.status
                const { msg } = await verifyOTPData.json()
                localStorage.removeItem('userID')
                localStorage.removeItem('forgetEmail')
                throw Error(`${status} ${msg}`)

            }
            else {
                localStorage.removeItem('userID')
                const { token, msg } = await verifyOTPData.json()
                showPopup(msg)
                localStorage.setItem('token', token)
                setTimeout(() => {
                    localStorage.removeItem('forgetEmail')
                    location.replace("changePassword.html")
                }, 2000);
            }
        } catch (error) {
            showPopup(error)
            setTimeout(() => {
                localStorage.removeItem('forgetEmail')
                location.replace("sentOTP.html")
            }, 5000);

        }
    })
}

const changePassword = document.querySelector('#changePassword')
if (changePassword) {
    changePassword.addEventListener('click', async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const resetPassword = document.querySelector('#resetPassword').value
            const resetPasswordConfirm = document.querySelector('#resetPasswordConfirm').value
            if (resetPassword == resetPasswordConfirm) {
                const resetPasswordData = await fetch(`/forgotPassword/resetPass`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        password: resetPasswordConfirm
                    }),
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (!resetPasswordData.ok) {
                    const status = resetPasswordData.status
                    const { msg } = await resetPasswordData.json()
                    localStorage.removeItem('token')
                    localStorage.removeItem('forgetEmail')
                    throw Error(`${status} ${msg}`)
                }
                else {
                    localStorage.removeItem('token')
                    localStorage.removeItem('forgetEmail')
                    const { msg } = await resetPasswordData.json()
                    showPopup(msg)
                    location.replace("login.html")
                }
            } else {
                throw Error(`Passwords are not matching...`)
            }

        } catch (error) {
            showPopup(error)
            setTimeout(() => {
                location.replace("sentOTP.html")
            }, 5000);
        }
    })
}


window.onload = function () {
    document.getElementById('loading-screen').style.display = 'block';
};
function off() {
    document.getElementById('loading-screen').hidden = 'true';
}
off()