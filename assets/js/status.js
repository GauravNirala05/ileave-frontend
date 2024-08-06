var content1 = document.getElementById("content-1");
var content2 = document.getElementById("content-2");
var statusSwitch = document.getElementById("statuscheckbox")
var historySwitch = document.getElementById("historycheckbox")

statusSwitch.style.color = "#fff"
historySwitch.innerHTML = '<span style="color:#fff"> History </span>';
content1.hidden = false
content2.hidden = true

function confirmationPopup(id) {
  document.getElementById("confirmationPopup").style.display = "block";
  localStorage.setItem('leaveID', id)
}
function confirmationPopupClose() {
  document.getElementById("confirmationPopup").style.display = "none";
  localStorage.removeItem('leaveID')
}
function normalPopup(msg) {
  document.getElementById("normalPopup").style.display = "block";
  document.getElementById("normalPopupMessage").innerHTML = msg
}
function normalPopupClose() {
  document.getElementById("normalPopup").style.display = "none";
  location.reload()

}
async function confirmationPopupOpen() {
  try {
    const leaveID = localStorage.getItem('leaveID')
    console.log(leaveID);
    console.log(token);
    if (leaveID) {
      const deleteLeaveData = await fetch(`/deleteLeave/${leaveID}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'Application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if (!deleteLeaveData.ok) {
        const LeaveData = await deleteLeaveData.json()
        console.log(LeaveData);
        localStorage.removeItem('leaveID')
        throw Error(LeaveData.msg)
      }
      else {
        const { msg } = await deleteLeaveData.json()
        localStorage.removeItem('leaveID')
        normalPopup(msg)

      }
    }
  } catch (error) {
    normalPopup(error)

  }
}
function toggleContent() {
  if (content1.hidden == false) {
    content1.hidden = true
    content2.hidden = false
    statusSwitch.style.color = "#000"
    historySwitch.style.color = "#fff"

  }
  else {
    content1.hidden = false
    content2.hidden = true
    statusSwitch.style.color = "#fff"
  }
}

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
      const userData = await user.json()
      throw Error(userData.msg)
    }
    var statussidebar_link = document.querySelector(".statussidebar");
    statussidebar_link.classList.add("active");
    const { data, hits } = await user.json()
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
      // const data1 = data.filter((element) => {
      //   const dateNow = Date.now()
      //   const toDate = new Date(element.from_date)
      //   const filterComponent = ((toDate - dateNow) + (1000 * 60 * 60 * 24))
      //   if (filterComponent > 0) {
      //     return element
      //   }
      //   else {
      //     return
      //   }
      // })
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
        tr.innerHTML = ihtml
        pendingLeaveBody.append(tr)
        counter++
      });
    }
    off()
  } catch (error) {
    console.log(error);
  }
}
const getleaveHistory = async () => {
  try {
    const user = await fetch('/leaveHistory', {
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
    if (hits == 0) {
      const table = document.querySelector('#leaveHistory')
      table.innerHTML = `<tr style="text-align: center;font-size: 30px;font-weight: 100;">
      <th>No Leaves applied yet...</th>
      </tr>`
    }
    else {
      const pendingLeaveBody = document.querySelector('#historyLeaveBody')
      const defaultPendingLeave = document.querySelector('#defaultHistoryLeave')
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
          const historyLeaveReference = document.querySelector('#historyLeaveReference')
          const historyLeaveHead = document.querySelector('#historyLeaveHead')
          historyLeaveHead.innerHTML = `Head approval`
          historyLeaveReference.hidden = true
          if (element.head_approval) {
            if (element.head_approval === true) {
              ihtml += `<td><i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i></td>`
            }
            if (element.head_approval === false) {
              ihtml += `<td><i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i></td>`
            }
          }
          else {
            ihtml += `<td>Pending</td>`
          }
          if (element.principal_approval) {
            if (element.principal_approval === true) {
              ihtml += `<td><i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i></td>`
            }
            if (element.principal_approval === false) {
              ihtml += `<td><i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i></td>`
            }
          }
          else {
            ihtml += `<td>Pending</td>`
          }
          ihtml += `<td>${element.status}</td>`
        }
        else {
          if (element.reference) {
            const historyLeaveHead = document.querySelector('#historyLeaveHead')
            historyLeaveHead.hidden = true
            ihtml += `<td>${element.reference.name}`
            if (element.reference.approved === true) {
              ihtml += `<i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i>`
              ihtml += `</td>`
            }
            if (element.reference.approved === false) {
              ihtml += `<i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i>`
              ihtml += `</td>`
            }
            else {
              ihtml += `</td>`
            }
          }
          else {
            ihtml += `<td><div>${element.reference1.name}`
            if (element.reference1.approved === true) {
              ihtml += `<i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i>`
            }
            if (element.reference1.approved === false) {
              ihtml += `<i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i>`
            }
            ihtml += `</div>
          <div>${element.reference2.name}`
            if (element.reference2.approved === true) {
              ihtml += `<i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i>`
            }
            if (element.reference2.approved === false) {
              ihtml += `<i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i>`
            }
            ihtml += `</div>
          <div>${element.reference3.name}`
            if (element.reference3.approved === true) {
              ihtml += `<i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i>`
            }
            if (element.reference3.approved === false) {
              ihtml += `<i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i>`
            }
            ihtml += `</div>
          <div>${element.reference4.name}`
            if (element.reference4.approved === true) {
              ihtml += `<i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i>`
            }
            if (element.reference4.approved === false) {
              ihtml += `<i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i>`
            }
            ihtml += `</div>
        </td>`
            if (element.HOD_approval) {
              if (element.HOD_approval === true) {
                ihtml += `<td><i class="fa fa-check-circle-o " style="color: green;" aria-hidden="true"></i></td>`
              }
              if (element.HOD_approval === false) {
                ihtml += `<td><i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i></td>`
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
            if (element.principal_approval === false) {
              ihtml += `<td><i class="fa fa-times-circle-o " style="color: red;" aria-hidden="true"></i></td>`
            }
          }
          else {
            ihtml += `<td>Pending</td>`
          }
          ihtml += `<td>${element.status}`
          var fromDate = new Date(element.from_date)
          var nowDate = Date.now()
          var status = element.status
          var result = fromDate < nowDate
          if (status == 'rejected' && result) {
            ihtml += `
          <div onclick="confirmationPopup('${element._id}')" class="btn btn-danger">
            <i class="fa fa-trash-o fa-lg"></i> Delete
          </div>
                    </td>`
          }
          else {
            ihtml += `</td>`
          }
        }
        tr.innerHTML = ihtml
        pendingLeaveBody.append(tr)
        counter++
      });
    }
    off()


  } catch (error) {
    console.log(error);

  }

}
if (token == null) {
  pop2.hidden = false
  main.hidden = true
  f.innerHTML = `You Need to Login First`
  sidebar.hidden = true
  openPopup2()
}
else {
  getleavestatus()
  getleaveHistory()
}



function toggleDropdown() {
  var dropdown = document.getElementById("myDropdown");
  if (dropdown.style.display === "none") {
    dropdown.style.display = "block";
  } else {
    dropdown.style.display = "none";
  }
}



window.onload = function () {
  document.getElementById('loading-screen').style.display = 'block';
};
function off() {
  document.getElementById('loading-screen').style.display = 'none';
};

function tgl() {
  var t = document.getElementById("myBtn");
  if (t.value == "ON") {
    t.value = "OFF";
  }
  else if (t.value == "OFF") {
    t.value = "ON";
  }
}