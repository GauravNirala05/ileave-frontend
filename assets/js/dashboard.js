const getleavestatus = async () => {
  const stat = []
  stat.push('applied')
  stat.push('rejected')
  try {
    const user = await fetch('/leaveStatus', {
      method: 'POST',
      body: JSON.stringify({
        status: stat
      }),
      headers: {
        'Content-type': 'Application/json',
        'Authorization': `Bearer ${token}`
      },
    })

    if (!user.ok) {
      const status = user.status
      const { msg } = await user.json()
      var arraryError = []
      arraryError.push(status)
      arraryError.push(msg)
      errorHandler(arraryError)
    }
    const { data, hits } = await user.json()
    console.log();
    if (hits == 0) {
      const table = document.querySelector('#leavePending')
      table.innerHTML = `<tr style="text-align: center;font-size: 30px;font-weight: 100;">
      <th>No Leaves applied yet...</th>
      </tr>`
    }
    else {
      const pendingLeaveBody = document.querySelector('#pendingLeaveBody')
      const defaultPendingLeave = document.querySelector('#defaultPendingLeave')
      defaultPendingLeave.hidden = true
      let counter = 1
      data.forEach(element => {
        dateCreated = new Date(element.createdAt).toDateString()
        dateFrom = new Date(element.from_date).toDateString()
        dateTo = new Date(element.to_date).toDateString()
        var ihtml = ``
        var tr = document.createElement('tr')
        ihtml += `<td>${counter}</td>
        <td>${dateCreated}</td>
        <td>${element.leave_type}</td>
        <td>${dateFrom}</td>
        <td>${dateTo}</td>
        <td>${element.total_days}</td>`

        if (element.employee_dep == 'non-tech') {
          const pendingLeaveReference = document.querySelector('#pendingLeaveReference')
          const pendingLeaveHead = document.querySelector('#pendingLeaveHead')
          pendingLeaveHead.innerHTML = `Head approval`
          pendingLeaveReference.hidden = true
          if (element.head_approval) {
            if (element.head_approval == true) {

              ihtml += `<i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i>`
            }
            else {
              ihtml += `<i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i>`
            }
          }
          else {
            ihtml += `<td>Pending</td>`
          }

          if (element.principal_approval) {
            if (element.principal_approval === true) {
              ihtml += `<td><i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i></td>`
            }
            else {
              ihtml += `<td><i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i></td>`
            }
          }
          else {
            ihtml += `<td>Pending</td>`
          }
          ihtml += `<td>${element.status}</td>`
          if (element.status == 'applied') {
            ihtml += `<td>
            <div onclick="confirmationPopup('${element._id}')" class="btn btn-danger">
              <i class="fa fa-trash-o fa-lg"></i> Delete
            </div>
                      </td>`
          } else {
            const deleteLeaveStatus = document.querySelector('#deleteLeaveStatus')
            deleteLeaveStatus.hidden = true
          }
        }
        else {
          if (element.reference) {
            const pendingLeaveHead = document.querySelector('#pendingLeaveHead')
            pendingLeaveHead.hidden = true
            ihtml += `<td>${element.reference.name}`
            if (element.reference.approved == true) {
              ihtml += `<i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i>`
              ihtml += `</td>`
            }
            else if (element.reference.approved == false) {
              ihtml += `<i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i>`
              ihtml += `</td>`
            }
            else {
              ihtml += `</td>`
            }
          }
          else {
            ihtml += `<td><div>${element.reference1.name}`
            if (element.reference1.approved == true) {
              ihtml += `<i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i>`
            }
            if (element.reference1.approved == false) {
              ihtml += `<i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i>`
            }
            ihtml += `</div><div>${element.reference2.name}`
            if (element.reference2.approved == true) {
              ihtml += `<i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i>`
            }
            if (element.reference2.approved == false) {
              ihtml += `<i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i>`
            }
            ihtml += `</div><div>${element.reference3.name}`
            if (element.reference3.approved == true) {
              ihtml += `<i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i>`
            }
            if (element.reference3.approved == false) {
              ihtml += `<i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i>`
            }
            ihtml += `</div><div>${element.reference4.name}`
            if (element.reference4.approved == true) {
              ihtml += `<i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i>`
            }
            if (element.reference4.approved == false) {
              ihtml += `<i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i>`
            }
            ihtml += `</div></td>`
            if (element.HOD_approval) {
              if (element.HOD_approval == true) {

                ihtml += `<i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i>`
              }
              else {
                ihtml += `<i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i>`
              }
            }
            else {
              ihtml += `<td>Pending</td>`
            }
          }



          if (element.principal_approval) {
            if (element.principal_approval === true) {
              ihtml += `<td><i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i></td>`
            }
            else {
              ihtml += `<td><i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i></td>`
            }
          }
          else {
            ihtml += `<td>Pending</td>`
          }
          ihtml += `<td>${element.status}</td>`
          // if (element.status == 'applied') {
          //   ihtml += `<td>
          //   <div onclick="confirmationPopup('${element._id}')" class="btn btn-danger">
          //     <i class="fa fa-trash-o fa-lg"></i> Delete
          //   </div>
          //             </td>`
          // } else {
          //   const deleteLeaveStatus = document.querySelector('#deleteLeaveStatus')
          //   deleteLeaveStatus.hidden = true
          // }
        }
        tr.innerHTML = ihtml
        pendingLeaveBody.append(tr)
        counter++
      });
      console.log(data)
    }

  } catch (error) {
    console.log(error);

  }

}

async function delete_account() {
  const userId = localStorage.getItem(`deleteId`)

  try {
    const deleteuser = await fetch(`/deleteProfile/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (!deleteuser.ok) {
      deletePopupClose()
      const status = deleteuser.status
      const { msg } = await deleteuser.json()
      var arraryError = []
      arraryError.push(status)
      arraryError.push(msg)
      errorHandler(arraryError)
    }
    else {
      const data = await deleteuser.json()
      deletePopupClose()
      location.reload()
      // alert(`${data.name} you account is successfully Deleted`)
    }

  } catch (error) {
    console.log(error);
    alert(error)
  }
}
const alluserByPrincipal = async () => {
  try {
    const alluserdata = await fetch('/alluser', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (!alluserdata.ok) {
      const status = user.status
      const { msg } = await user.json()
      var arraryError = []
      arraryError.push(status)
      arraryError.push(msg)
      errorHandler(arraryError)
      off()
    }
    else {
      const { data } = await alluserdata.json()
      let num = 1
      tr = ``
      let data_user = ""
      data.forEach(element => {
        data_user += element;
        tr += `<tr>
        <td class="pl-4">${num}</td>
        <td>
          <h5 class="font-medium mb-0">${element.name}</h5>
        </td>
        <td>
          <span class="text-muted">${element.designation}</span><br>
          <span class="text-muted">${element.department}</span>
        </td>
        <td>
          <span class="text-muted">${element.email}</span>
        </td>
        <td>
          <span class="text-muted">${element.mob_no}</span>
        </td>
        <td>
          <button class="btn btn-outline-danger btn-circle btn-lg btn-circle ml-2"><i
              class="fa fa-edit"></i> </button>
          <button onclick="deletePopup('${element._id}')"  class="btn btn-outline-danger btn-circle btn-lg btn-circle ml-2"><i
              class="fa fa-trash"></i> </button>
        </td>
        </tr>`
        num += 1
      })
      const cs_user = document.querySelector('#csuserdetail')
      localStorage.setItem("alluserdetails", JSON.stringify(data))
      document.querySelector("#alluserdetail").innerHTML = tr
    }
  }
  catch (error) {
    console.log(error);
  }
}

const getuser = async () => {
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
      off()
    }
    else {
      const { data } = await user.json()
      if (data.profileCompleted == false) {
        throw Error('profile not completed')
      }
      else {
        var dashboard_link = document.querySelector(".dashboard");
        dashboard_link.classList.add("active");
        if (data.designation == "principal") {
          alluserByPrincipal()
          document.querySelector("#Leave-Balance").hidden = true
          document.querySelector("#Leave-Pending").hidden = true
          document.querySelector("#Only_pri").hidden = false
          document.querySelector("#all-user").hidden = false
          document.querySelector("#headname").innerHTML = "All User"
        }
        else {
          document.querySelector(".casual").innerHTML = data.leave_type.casual_leave
          document.querySelector(".earned").innerHTML = data.leave_type.earned_leave
          document.querySelector(".medical").innerHTML = data.leave_type.medical_leave
          document.querySelector(".ordinary").innerHTML = data.leave_type.ordinary_leave
          getleavestatus()
          off()
        }
        if (data.designation == "HOD") {
          alluserByPrincipal()
          document.querySelector("#all-user").hidden = false
          document.querySelector('#dephead').innerHTML = data.department
          getleavestatus()
          off()
        }
      }
    }
  }
  catch (error) {
    console.log(error);
    off()
  }
}
if (token) {
  getuser()
  off()
}

function alluserdetailsbyDep(dep) {
  var alluserdetails = localStorage.getItem('alluserdetails');
  alluserdetail_DEP = document.querySelector("#alluserdetail")
  alluserdetails = JSON.parse(alluserdetails)

  const dep_head = document.querySelector('#dephead')
  dep_head.innerHTML = dep

  tr = ``
  num = 0
  dep_head.scrollIntoView()

  alluserdetails.forEach(element => {
    if (element.department == dep) {
      num += 1
      tr += `<tr>
                  <td class="pl-4">${num}</td>
                  <td>
                    <h5 class="font-medium mb-0">${element.name}</h5>
                  </td>
                  <td>
                    <span class="text-muted">${element.designation}</span><br>
                    <span class="text-muted">${element.department}</span>
                  </td>
                  <td>
                    <span class="text-muted">${element.email}</span>
                  </td>
                  <td>
                    <span class="text-muted">${element.mob_no}</span>
                  </td>
                  <td>
                    <button class="btn btn-outline-danger btn-circle btn-lg btn-circle ml-2"><i
                        class="fa fa-edit"></i> </button>
                    <button class="btn btn-outline-danger btn-circle btn-lg btn-circle ml-2"><i
                        class="fa fa-trash"></i> </button>
                  </td>
                  </tr>`
    }
    else if (dep == 'All User') {
      alluserByPrincipal()
      return
    }
  })
  if (tr == ``) {
    alluserdetail_DEP.style = `text-align: center;font-size: 20px;`
    alluserdetail_DEP.innerHTML = `<th colspan="12">No Users Yet...</th>`
  } else {
    alluserdetail_DEP.innerHTML = tr
  }
}


let popup = document.getElementById("loginModal")

function openCompletePopup() {
  document.getElementById("popup3").style.display = "none";
  document.getElementById("loginModal").style.display = "block";
}
function closeerrorPopup() {
  document.getElementById("loginModal").style.display = "none";
  profile_completed()
}

function deletePopup(id) {
  document.getElementById("deleteProfilePopup").style.display = "block";
  localStorage.setItem(`deleteId`, id)
}
function deletePopupOpen() {
  delete_account()
}
function deletePopupClose() {
  document.getElementById("deleteProfilePopup").style.display = "none";
  localStorage.removeItem(`deleteId`)
}
function on() {
  document.getElementById("loginModal").style.display = "block";
}

