document.getElementById("updateform").style.display = 'none'
document.getElementById("profileform").style.display = 'block'
document.getElementById("round").style.display = 'none'

const editProfile = document.querySelector(".editProfile")
const div = document.getElementById("profileform")
editProfile.addEventListener('click', () => {
  div.parentNode.removeChild(div);
  document.getElementById("updateform").style.display = 'block'
  document.getElementById("round").style.display = 'block'


});
const update_profile = document.querySelector('.update')
const update_name = document.querySelector('.namee')
const update_contact = document.querySelector('.phone_no')
const update_email = document.querySelector('.email')
const update_designation = document.querySelector('.designation')
const update_department = document.querySelector('.department')
const update_contract_type = document.querySelector('.contract_type')

const userData = async () => {
  try {
    const user = await fetch('/getUserData', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (!user.ok) {
      const status = user.status
      const { msg } = await user.json()
      errorPopup(status,msg)
      throw Error(msg)
    }
    else {
      var setting_link = document.querySelector(".setting");
      setting_link.classList.add("active");
      const { data } = await user.json()
      document.getElementById("entered_name").innerHTML = data.name
      document.getElementById("entered_email").innerHTML = data.email
      document.getElementById("entered_phoneno").innerHTML = data.mob_no
      document.getElementById("entered_designation").innerHTML = data.designation
      document.getElementById("entered_department").innerHTML = data.department


      document.querySelector(".namee").value = data.name
      document.querySelector(".email").value = data.email
      document.querySelector(".phone_no").value = data.mob_no

      document.querySelector(".department").value = data.department
      document.querySelector(".designation").value = data.designation

      document.querySelector(".contract_type").value = data.contect_type
    }
  } catch (error) {
    console.log(error);
  }
}
userData()

update_profile.addEventListener('click', async (e) => {
  e.preventDefault()
  const name = update_name.value
  const contact_no = update_contact.value
  const contract_type = update_contract_type.value
  const desig = update_designation.value
  const depart = update_department.value
  try {
    const fetcher = await fetch('/updateProfile', {

      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        mob_no: contact_no,
        contect_type: contract_type,
        department: depart,
        designation: desig,
      }),
      headers: {
        'Content-Type': `application/json`,
        'Authorization': `Bearer ${token}`
      }
    })
    if (!fetcher.ok) {
      const status = fetcher.status
      const { msg } = await fetcher.json()
      errorPopup(status,msg)
      throw Error(msg)
    }
    const { msg } = await fetcher.json()
    profile_updated(msg)
    update_name.value = ``
    update_contact.value = ``
    update_designation.value = ``
    update_department.value = ``
    update_contact.value = ``
    update_contract_type.value = ``
  } catch (error) {
    console.log(error)
  }
})

const delete_account = document.querySelector('.delete')

delete_account.addEventListener('click', async (e) => {
  e.preventDefault()
  try {

    const user = await fetch('/getUserData', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (!user.ok) {
      const status = user.status
      const { msg } = await user.json()
      var arraryError = []
      arraryError.push(status)
      arraryError.push(msg)
      errorHandler(arraryError)
    }

    const { data } = await user.json()
    const userId = data._id
    console.log((userId));
    const deleteuser = await fetch(`/deleteProfile/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (!deleteuser.ok) {
      const status = deleteuser.status
      const { msg } = await deleteuser.json()
      var arraryError = []
      arraryError.push(status)
      arraryError.push(msg)
      errorHandler(arraryError)
    }
    else {
      const data = await deleteuser.json()
      console.log(data);
      localStorage.removeItem('token');
      localStorage.removeItem('UserDesignation');
      location.replace("index.html")
      // alert(`${data.name} you account is successfully Deleted`)
    }

  } catch (error) {
    console.log(error);
    alert(error)
  }
})
function openPopup() {
  main.hidden = true
  document.getElementById("popup").style.display = "block";
}
function closePopup() {
  main.hidden = false
  document.getElementById("popup").style.display = "none";
  document.getElementById("deletepopup").style.display = "none";

}
function resetLeavePopup() {
  document.getElementById("resetLeaveByPrincipal").style.display = "block"
}
function resetLeavePopupClose() {
  document.getElementById("resetLeaveByPrincipal").style.display = "none"
}
async function resetLeavePopupDone() {
  try {
    const user = await fetch(`/resetLeaves`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (!user.ok) {
      const status = user.status
      const { msg } = await user.json()
      var arraryError = []
      arraryError.push(status)
      arraryError.push(msg)
      errorHandler(arraryError)
    }
    else {

      const { data } = await user.json()
      console.log(data)
      document.getElementById("msgConfirmation").innerHTML = `All leaves are re-initialized...`
      setTimeout(() => {
        location.reload()
      }, 3000);
    }
  } catch (error) {
    console.log(error);
  }
}

function errorPopup(status,msg) {  
  document.getElementById("errorPopup").style.display = "block";
  document.getElementById("errorStatusCode").innerHTML = status;
  document.getElementById("errorPopupMsg").innerHTML = msg;
}
function errorPopupClose() {
  document.getElementById("errorPopup").style.display = "none";
}


function openPopup2() {
  document.getElementById("popup2").style.display = "block";
}

function deletepopup() {
  document.getElementById("deletepopup").style.display = "block";
}
function confirm_logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('UserDesignation');
  location.replace("index.html")
}
function login() {
  location.replace("login.html")
}

var loadFile = function (event) {
  var image = document.getElementById("output");
  image.src = URL.createObjectURL(event.target.files[0]);
};

function changepassword() {
  location.replace('changepassword.html')
}
window.onload = function () {
  document.getElementById('loading-screen').style.display = 'none';
};

function profile_updated(msg) {
  document.getElementById("popup4").style.display = "block";
  // document.getElementById("updateMessage").innerText=msg


}
function close_updatepopup() {
  document.getElementById("popup4").style.display = "none";
  location.reload()

}
