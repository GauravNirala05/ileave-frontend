
function errorCompletPopup(status,msg) {  
  document.getElementById("errorPopup").style.display = "block";
  document.getElementById("statuserrortext").innerHTML = status;
  document.getElementById("errorPopupMsg").innerHTML = msg;
}
function errorPopupClose() {
  document.getElementById("errorPopup").style.display = "none";
}
const complete_profile = document.querySelector('.save')
const update_contact = document.querySelector('.phone_no')
const update_name = document.querySelector('#name')
const update_gender = document.querySelector('#gender')
const update_title = document.querySelector('#userTitle')
const update_designation = document.querySelector('.designation')
const update_department = document.querySelector('.department')
const update_contract_type = document.querySelector('.contract_type')
complete_profile.addEventListener('click', async (e) => {
  e.preventDefault()
  
  const token = localStorage.getItem('token')
  const contact_no = update_contact.value
  const contract_type = update_contract_type.value
  const desig = update_designation.value
  const depart = update_department.value
  const name = update_name.value
  const gender = update_gender.value
  const title=update_title.value
  // const img = previewImage.value

  try {
    const fetcher = await fetch('/completeProfile', {
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        gender: gender,
        mob_no: contact_no,
        contect_type: contract_type,
        department: depart,
        designation: desig,
        title:title
      }),
      headers: {
        'Content-Type': `application/json`,
        'Authorization': `Bearer ${token}`
      }
    })
    if (!fetcher.ok) {
      const status = fetcher.status
      const { msg } = await fetcher.json()
      errorCompletPopup(status,msg)
      throw Error(`${msg}`)
    }
    const {status, msg } = await fetcher.json()
    // profile_completed()
    // alert(`${msg}`)
    // openerrorPopup(status,msg)
    setTimeout(() => {
      location.replace("dashboard.html")
    }, 2000);
    update_designation.value = ``
    update_department.value = ``
    update_contact.value = ``
    update_contract_type.value = ``

  } catch (error) {
    console.log(error)

  }
})

function openPopup() {
  document.getElementById("popup").style.display = "block";
}
function closePopup() {
  document.getElementById("popup").style.display = "none";
}
function profile_completed(msg) {
  document.getElementById("popup3").style.display = "block";
  // document.getElementById("updateMessage").innerText=msg
}
function close_completepopup() {
  document.getElementById("popup3").style.display = "none";
  location.replace('dashboard.html')
  // location.reload()

}

