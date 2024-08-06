var content1 = document.getElementById("content-1");
var content2 = document.getElementById("content-2");
var statusSwitch = document.getElementById("statuscheckbox")
var historySwitch = document.getElementById("historycheckbox")

historySwitch.innerHTML = '<span style="color:#fff"> History </span>';
content1.hidden = false
content2.hidden = true

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

function normalPopup(msg) {
    document.getElementById("normalPopup").style.display = "block";
    document.getElementById("normalPopupMessage").innerHTML = msg
}
function normalPopupClose() {
    document.getElementById("normalPopup").style.display = "none";
    location.reload()

}

function confirmationPopup(id, approval) {
    document.getElementById("confirmationPopup").style.display = "block";
    localStorage.setItem('userID', id)
    localStorage.setItem('userApproval', approval)
}
function confirmationPopupClose() {
    document.getElementById("confirmationPopup").style.display = "none";
    localStorage.removeItem('userID')
    localStorage.removeItem('userApproval')
}
async function confirmationPopupOpen() {
    try {
        const id = localStorage.getItem('userID')
        console.log(id);
        const approval = localStorage.getItem('userApproval')
        console.log(approval);
        const user = await fetch(`/approvals/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                approval: approval,
                confirmation: approval
            }),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            }
        })
        if (!user.ok) {
            const { msg } = await user.json()
            localStorage.removeItem('userID')
            localStorage.removeItem('userApproval')
            throw Error(msg)
        }
        else {
            const data = await user.json()
            localStorage.removeItem('userID')
            localStorage.removeItem('userApproval')
            location.reload()

        }
    } catch (error) {
        console.log(error);
        normalPopup(error)
    }
}
async function approveUser(id, approval, refer) {
    try {
        const user = await fetch(`/approvals/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                refer: refer,
                approval: approval
            }),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            }
        })
        if (!user.ok) {
            const { msg } = await user.json()
            throw Error(msg)
        }
        else {
            const data = await user.json()

            console.log(data)

        }
    } catch (error) {
        console.log(error);
    }
    location.reload()
}
async function approveUserHOD(id, approval) {
    try {
        const user = await fetch(`/approvals/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                approval: approval
            }),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            }
        })
        if (!user.ok) {
            const { msg } = await user.json()
            throw Error(msg)
        }
        else {
            const data = await user.json()

            console.log(data)

        }
    } catch (error) {
        console.log(error);
    }
    location.reload()
}
async function approveUserHead(id, approval) {
    try {
        const user = await fetch(`/approvals/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                approval: approval
            }),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            }
        })
        if (!user.ok) {
            const { msg } = await user.json()
            throw Error(msg)
        }
        else {
            const data = await user.json()

            console.log(data)

        }
    } catch (error) {
        console.log(error);
    }
    location.reload()
}
var UserDesignation = localStorage.getItem('UserDesignation')
const getLeaveApprovals = async () => {
    try {
        const user = await fetch('/approvals', {
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
            var approval_link = document.querySelector(".approval");
            approval_link.classList.add("active");
            const { hits, data } = await user.json()
            const appliedTable = document.querySelector('.userAppliedTable')
            const defaultApprovingText = document.querySelector('#defaultApprovingText')
            defaultApprovingText.hidden = true
            if (hits == 0) {
                var trHOD = document.createElement('tr')
                trHOD.style = `text-align: center;font-size: 25px;`
                trHOD.innerHTML = `<th colspan="12">No Leaves Yet...</th>`
                appliedTable.append(trHOD)
            }
            else {
                if (UserDesignation == 'HOD') {
                    let num = 1
                    data.forEach(element => {
                        var fromDate = new Date(element.from_date).toDateString()
                        var toDate = new Date(element.to_date).toDateString()
                        var tr = document.createElement('tr')
                        ihtml = `<td>${num}</td>
                        <td >${element.employee_name}</td>
                        <td >${element.leave_type}</td>
                        <td >${fromDate}</td>
                        <td >${toDate}</td>
                        <td >${element.discription}</td>`
                        if (element.HOD_approval == true) {
                            ihtml += `<td> <span type="button" onclick="approveUserHOD('${element._id}','true')" class="btn btn-success mb-2 col-lg-11">Accepted</span>`
                            ihtml += `<span type="button" onclick="approveUserHOD('${element._id}','false')" class="btn btn-outline-danger col-lg-11">Reject</span></td>`

                        }
                        else if (element.HOD_approval == false) {
                            ihtml += `<td> <span type="button" onclick="approveUserHOD('${element._id}','false')" class="btn btn-danger mb-2 col-lg-11">Rejected</span>`
                            ihtml += `<span type="button" onclick="approveUserHOD('${element._id}','true')" class="btn btn-outline-success  col-lg-11">Accept</span></td>`
                        }
                        else {
                            ihtml += `<td>
                            <span type="button" onclick="approveUserHOD('${element._id}','true')" class="btn btn-outline-success mb-2 col-lg-11">Accept</span>
                            <span type="button" onclick="approveUserHOD('${element._id}','false')" class="btn btn-outline-danger col-lg-11">Reject</span>
                            </td>`
                        }
                        ihtml += `<td></td>`
                        tr.innerHTML = ihtml
                        appliedTable.append(tr)
                        num++;
                    });
                }
                if (UserDesignation == 'principal') {
                    const { HodLeave, facultyLeave, nonTechLeave } = data
                    let num = 1
                    if (HodLeave.hits > 0) {

                        var trHOD = document.createElement('tr')
                        trHOD.style = `text-align: center;font-size: 25px;`
                        trHOD.innerHTML = `<th colspan="12">HOD Leaves</th>`
                        appliedTable.append(trHOD)
                        HodLeave.data.forEach(element => {
                            var fromDate = new Date(element.from_date).toDateString()
                            var toDate = new Date(element.to_date).toDateString()
                            var tr = document.createElement('tr')
                            ihtml = `<td>${num}</td>
                    <td >${element.employee_name}</td>
                    <td >${element.leave_type}</td>
                    <td >${fromDate}</td>
                    <td >${toDate}</td>
                    <td >${element.discription}</td>`
                            if (element.principal_approval == true) {
                                ihtml += `<td> <span type="button" onclick="confirmationPopup('${element._id}','true')" class="btn btn-success mb-2 col-lg-11">Accepted</span>`
                                ihtml += `<span type="button" onclick="confirmationPopup('${element._id}','false')" class="btn btn-outline-danger col-lg-11">Reject</span></td>`

                            }
                            else if (element.principal_approval == false) {
                                ihtml += `<td> <span type="button" onclick="confirmationPopup('${element._id}','false')" class="btn btn-danger mb-2 col-lg-11">Rejected</span>`
                                ihtml += `<span type="button" onclick="confirmationPopup('${element._id}','true')" class="btn btn-outline-success  col-lg-11">Accept</span></td>`
                            }
                            else {
                                ihtml += `<td>
                        <span type="button" onclick="confirmationPopup('${element._id}','true')" class="btn btn-outline-success mb-2 col-lg-11">Accept</span>
                        <span type="button" onclick="confirmationPopup('${element._id}','false')" class="btn btn-outline-danger col-lg-11">Reject</span>
                        </td>`
                            }
                            ihtml += `<td></td>`
                            tr.innerHTML = ihtml
                            appliedTable.append(tr)
                            num++;
                        });
                    }
                    if (facultyLeave.hits > 0) {

                        var trHOD = document.createElement('tr')
                        trHOD.style = `text-align: center;font-size: 25px;`
                        trHOD.innerHTML = `<th colspan="12">Faculty Leaves</th>`
                        appliedTable.append(trHOD)
                        facultyLeave.data.forEach(element => {
                            var fromDate = new Date(element.from_date).toDateString()
                            var toDate = new Date(element.to_date).toDateString()
                            var tr = document.createElement('tr')
                            ihtml = `<td>${num}</td>
                    <td >${element.employee_name}</td>
                    <td >${element.leave_type}</td>
                    <td >${fromDate}</td>
                    <td >${toDate}</td>
                    <td >${element.discription}</td>`
                            if (element.principal_approval == true) {
                                ihtml += `<td> <span type="button" onclick="confirmationPopup('${element._id}','true')" class="btn btn-success mb-2 col-lg-11">Accepted</span>`
                                ihtml += `<span type="button" onclick="confirmationPopup('${element._id}','false')" class="btn btn-outline-danger col-lg-11">Reject</span></td>`

                            }
                            else if (element.principal_approval == false) {
                                ihtml += `<td> <span type="button" onclick="confirmationPopup('${element._id}','false')" class="btn btn-danger mb-2 col-lg-11">Rejected</span>`
                                ihtml += `<span type="button" onclick="confirmationPopup('${element._id}','true')" class="btn btn-outline-success  col-lg-11">Accept</span></td>`
                            }
                            else {
                                ihtml += `<td>
                        <span type="button" onclick="confirmationPopup('${element._id}','true')" class="btn btn-outline-success mb-2 col-lg-11">Accept</span>
                        <span type="button" onclick="confirmationPopup('${element._id}','false')" class="btn btn-outline-danger col-lg-11">Reject</span>
                        </td>`
                            }
                            ihtml += `<td></td>`
                            tr.innerHTML = ihtml
                            appliedTable.append(tr)
                            num++;
                        });
                    }
                    if (nonTechLeave.hits > 0) {

                        var trHOD = document.createElement('tr')
                        trHOD.style = `text-align: center;font-size: 25px;`
                        trHOD.innerHTML = `<th colspan="12">Non-Tech Leave</th>`
                        appliedTable.append(trHOD)
                        nonTechLeave.data.forEach(element => {
                            var fromDate = new Date(element.from_date).toDateString()
                            var toDate = new Date(element.to_date).toDateString()
                            var tr = document.createElement('tr')
                            ihtml = `<td>${num}</td>
                    <td >${element.employee_name}</td>
                    <td >${element.leave_type}</td>
                    <td >${fromDate}</td>
                    <td >${toDate}</td>
                    <td >${element.discription}</td>`
                            if (element.principal_approval == true) {
                                ihtml += `<td> <span type="button" onclick="confirmationPopup('${element._id}','true')" class="btn btn-success mb-2 col-lg-11">Accepted</span>`
                                ihtml += `<span type="button" onclick="confirmationPopup('${element._id}','false')" class="btn btn-outline-danger col-lg-11">Reject</span></td>`

                            }
                            else if (element.principal_approval == false) {
                                ihtml += `<td> <span type="button" onclick="confirmationPopup('${element._id}','false')" class="btn btn-danger mb-2 col-lg-11">Rejected</span>`
                                ihtml += `<span type="button" onclick="confirmationPopup('${element._id}','true')" class="btn btn-outline-success  col-lg-11">Accept</span></td>`
                            }
                            else {
                                ihtml += `<td>
                        <span type="button" onclick="confirmationPopup('${element._id}','true')" class="btn btn-outline-success mb-2 col-lg-11">Accept</span>
                        <span type="button" onclick="confirmationPopup('${element._id}','false')" class="btn btn-outline-danger col-lg-11">Reject</span>
                        </td>`
                            }
                            ihtml += `<td></td>`
                            tr.innerHTML = ihtml
                            appliedTable.append(tr)
                            num++;
                        });
                    }
                }
                if (UserDesignation == 'faculty') {
                    const { HOD, first, second, third, fourth } = data
                    let num = 1
                    if (HOD.hits > 0) {

                        var trHOD = document.createElement('tr')
                        trHOD.style = `text-align: center;font-size: 25px;`
                        trHOD.innerHTML = `<th colspan="12">Hod</th>`
                        appliedTable.append(trHOD)
                        HOD.hod.forEach(element => {
                            var fromDate = new Date(element.from_date).toDateString()
                            var toDate = new Date(element.to_date).toDateString()
                            var tr = document.createElement('tr')
                            ihtml = `<td>${num}</td>
                    <td >${element.employee_name}</td>
                    <td >${element.leave_type}</td>
                    <td >${fromDate}</td>
                    <td >${toDate}</td>
                    <td >${element.discription}</td>`
                            if (element.reference.approved == true) {
                                ihtml += `<td> <span type="button" onclick="approveUserHOD('${element._id}','true','1')" class="btn btn-success mb-2 col-lg-11">Accepted</span>`
                                ihtml += `<span type="button" onclick="approveUserHOD('${element._id}','false','1')" class="btn btn-outline-danger col-lg-11">Reject</span></td>`

                            }
                            else if (element.reference.approved == false) {
                                ihtml += `<td> <span type="button" onclick="approveUserHOD('${element._id}','false','1')" class="btn btn-danger mb-2 col-lg-11">Rejected</span>`
                                ihtml += `<span type="button" onclick="approveUserHOD('${element._id}','true','1')" class="btn btn-outline-success  col-lg-11">Accept</span></td>`
                            }
                            else {
                                ihtml += `<td>
                        <span type="button" onclick="approveUserHOD('${element._id}','true','1')" class="btn btn-outline-success mb-2 col-lg-11">Accept</span>
                        <span type="button" onclick="approveUserHOD('${element._id}','false','1')" class="btn btn-outline-danger col-lg-11">Reject</span>
                        </td>`

                            }
                            ihtml += `<td></td>`
                            tr.innerHTML = ihtml
                            appliedTable.append(tr)
                            num++;
                        });
                    }
                    if (first.hits > 0) {

                        var trHOD = document.createElement('tr')
                        trHOD.style = `text-align: center;font-size: 25px;`
                        trHOD.innerHTML = `<th colspan="12">First Year</th>`
                        appliedTable.append(trHOD)
                        first.firstYear.forEach(element => {
                            var fromDate = new Date(element.from_date).toDateString()
                            var toDate = new Date(element.to_date).toDateString()
                            var tr = document.createElement('tr')
                            ihtml = `<td>${num}</td>
                    <td >${element.employee_name}</td>
                    <td >${element.leave_type}</td>
                    <td >${fromDate}</td>
                    <td >${toDate}</td>
                    <td >${element.discription}</td>`

                            if (element.reference1.approved == true) {
                                ihtml += `<td> <span type="button" onclick="approveUser('${element._id}','true','1')" class="btn btn-success mb-2 col-lg-11">Accepted</span>`
                                ihtml += `<span type="button" onclick="approveUser('${element._id}','false','1')" class="btn btn-outline-danger col-lg-11">Reject</span></td>`

                            }
                            else if (element.reference1.approved == false) {
                                ihtml += `<td> <span type="button" onclick="approveUser('${element._id}','false','1')" class="btn btn-danger mb-2 col-lg-11">Rejected</span>`
                                ihtml += `<span type="button" onclick="approveUser('${element._id}','true','1')" class="btn btn-outline-success  col-lg-11">Accept</span></td>`
                            }
                            else {
                                ihtml += `<td>
                                <span type="button" onclick="approveUser('${element._id}','true','1')" class="btn btn-outline-success mb-2 col-lg-11">Accept</span>
                                <span type="button" onclick="approveUser('${element._id}','false','1')" class="btn btn-outline-danger col-lg-11">Reject</span>
                                </td>`
                            }
                            ihtml += `<td></td>`
                            tr.innerHTML = ihtml
                            appliedTable.append(tr)
                            num++;
                        });
                    }
                    if (second.hits > 0) {

                        var trHOD = document.createElement('tr')
                        trHOD.style = `text-align: center;font-size: 25px;`
                        trHOD.innerHTML = `<th colspan="12">Second Year</th>`
                        appliedTable.append(trHOD)
                        second.secondYear.forEach(element => {
                            var fromDate = new Date(element.from_date).toDateString()
                            var toDate = new Date(element.to_date).toDateString()
                            var tr = document.createElement('tr')
                            ihtml = `<td>${num}</td>
                    <td >${element.employee_name}</td>
                    <td >${element.leave_type}</td>
                    <td >${fromDate}</td>
                    <td >${toDate}</td>
                    <td >${element.discription}</td>`
                            if (element.reference2.approved == true) {
                                ihtml += `<td> <span type="button" onclick="approveUser('${element._id}','true','2')" class="btn btn-success mb-2 col-lg-11">Accepted</span>`
                                ihtml += `<span type="button" onclick="approveUser('${element._id}','false','2')" class="btn btn-outline-danger col-lg-11">Reject</span></td>`

                            }
                            else if (element.reference2.approved == false) {
                                ihtml += `<td> <span type="button" onclick="approveUser('${element._id}','false','2')" class="btn btn-danger mb-2 col-lg-11">Rejected</span>`
                                ihtml += `<span type="button" onclick="approveUser('${element._id}','true','2')" class="btn btn-outline-success  col-lg-11">Accept</span></td>`
                            }
                            else {
                                ihtml += `<td>
                        <span type="button" onclick="approveUser('${element._id}','true','2')" class="btn btn-outline-success mb-2 col-lg-11">Accept</span>
                        <span type="button" onclick="approveUser('${element._id}','false','2')" class="btn btn-outline-danger col-lg-11">Reject</span>
                        </td>`
                            }
                            ihtml += `<td></td>`
                            tr.innerHTML = ihtml
                            appliedTable.append(tr)
                            num++;
                        });
                    }
                    if (third.hits > 0) {

                        var trHOD = document.createElement('tr')
                        trHOD.style = `text-align: center;font-size: 25px;`
                        trHOD.innerHTML = `<th colspan="12">Third Year</th>`
                        appliedTable.append(trHOD)
                        third.thirdYear.forEach(element => {
                            var fromDate = new Date(element.from_date).toDateString()
                            var toDate = new Date(element.to_date).toDateString()
                            var tr = document.createElement('tr')
                            ihtml = `<td>${num}</td>
                    <td >${element.employee_name}</td>
                    <td >${element.leave_type}</td>
                    <td >${fromDate}</td>
                    <td >${toDate}</td>
                    <td >${element.discription}</td>`
                            if (element.reference3.approved == true) {
                                ihtml += `<td> <span type="button" onclick="approveUser('${element._id}','true','3')" class="btn btn-success mb-2 col-lg-11">Accepted</span>`
                                ihtml += `<span type="button" onclick="approveUser('${element._id}','false','3')" class="btn btn-outline-danger col-lg-11">Reject</span></td>`

                            }
                            else if (element.reference3.approved == false) {
                                ihtml += `<td> <span type="button" onclick="approveUser('${element._id}','false','3')" class="btn btn-danger mb-2 col-lg-11">Rejected</span>`
                                ihtml += `<span type="button" onclick="approveUser('${element._id}','true','3')" class="btn btn-outline-success  col-lg-11">Accept</span></td>`
                            }
                            else {
                                ihtml += `<td>
                        <span type="button" onclick="approveUser('${element._id}','true','3')" class="btn btn-outline-success mb-2 col-lg-11">Accept</span>
                        <span type="button" onclick="approveUser('${element._id}','false','3')" class="btn btn-outline-danger col-lg-11">Reject</span>
                        </td>`
                            }
                            ihtml += `<td></td>`
                            tr.innerHTML = ihtml
                            appliedTable.append(tr)
                            num++;
                        });
                    }
                    if (fourth.hits > 0) {

                        var trHOD = document.createElement('tr')
                        trHOD.style = `text-align: center;font-size: 25px;`
                        trHOD.innerHTML = `<th colspan="12">Fourth Year</th>`
                        appliedTable.append(trHOD)
                        fourth.fourthYear.forEach(element => {
                            var fromDate = new Date(element.from_date).toDateString()
                            var toDate = new Date(element.to_date).toDateString()
                            var tr = document.createElement('tr')
                            ihtml = `<td>${num}</td>
                    <td >${element.employee_name}</td>
                    <td >${element.leave_type}</td>
                    <td >${fromDate}</td>
                    <td >${toDate}</td>
                    <td >${element.discription}</td>`
                            if (element.reference4.approved == true) {
                                ihtml += `<td> <span type="button" onclick="approveUser('${element._id}','true','4')" class="btn btn-success mb-2 col-lg-11">Accepted</span>`
                                ihtml += `<span type="button" onclick="approveUser('${element._id}','false','4')" class="btn btn-outline-danger col-lg-11">Reject</span></td>`

                            }
                            else if (element.reference4.approved == false) {
                                ihtml += `<td> <span type="button" onclick="approveUser('${element._id}','false','4')" class="btn btn-danger mb-2 col-lg-11">Rejected</span>`
                                ihtml += `<span type="button" onclick="approveUser('${element._id}','true','4')" class="btn btn-outline-success  col-lg-11">Accept</span></td>`
                            }
                            else {
                                ihtml += `<td>
                        <span type="button" onclick="approveUser('${element._id}','true','4')" class="btn btn-outline-success mb-2 col-lg-11">Accept</span>
                        <span type="button" onclick="approveUser('${element._id}','false','4')" class="btn btn-outline-danger col-lg-11">Reject</span>
                        </td>`
                            }
                            ihtml += `<td></td>`
                            tr.innerHTML = ihtml
                            appliedTable.append(tr)
                            num++;
                        });
                    }
                }
                if (UserDesignation == 'non-tech-head') {
                    let num = 1
                    data.forEach(element => {
                        var fromDate = new Date(element.from_date).toDateString()
                        var toDate = new Date(element.to_date).toDateString()
                        var tr = document.createElement('tr')
                        ihtml = `<td>${num}</td>
                        <td >${element.employee_name}</td>
                        <td >${element.leave_type}</td>
                        <td >${fromDate}</td>
                        <td >${toDate}</td>
                        <td >${element.discription}</td>`
                        if (element.head_approval == true) {
                            ihtml += `<td> <span type="button" onclick="approveUserHead('${element._id}','true')" class="btn btn-success mb-2 col-lg-11">Accepted</span>`
                            ihtml += `<span type="button" onclick="approveUserHead('${element._id}','false')" class="btn btn-outline-danger col-lg-11">Reject</span></td>`

                        }
                        else if (element.head_approval == false) {
                            ihtml += `<td> <span type="button" onclick="approveUserHead('${element._id}','false')" class="btn btn-danger mb-2 col-lg-11">Rejected</span>`
                            ihtml += `<span type="button" onclick="approveUserHead('${element._id}','true')" class="btn btn-outline-success  col-lg-11">Accept</span></td>`
                        }
                        else {
                            ihtml += `<td>
                            <span type="button" onclick="approveUserHead('${element._id}','true')" class="btn btn-outline-success mb-2 col-lg-11">Accept</span>
                            <span type="button" onclick="approveUserHead('${element._id}','false')" class="btn btn-outline-danger col-lg-11">Reject</span>
                            </td>`
                        }
                        ihtml += `<td></td>`
                        tr.innerHTML = ihtml
                        appliedTable.append(tr)
                        num++;
                    });
                }
                off()
            }
        }
    }
    catch (error) {
        console.log(error);
        off()
    }

}
const getLeaveApproved = async () => {
    try {
        const user = await fetch('/approved', {
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
            const { hits, data } = await user.json()
            const approvedTable = document.querySelector('.ApproveduserAppliedTable')
            const defaultApprovedText = document.querySelector('#defaultApprovedText')
            defaultApprovedText.hidden = true
            if (hits == 0) {
                var trHOD = document.createElement('tr')
                trHOD.style = `text-align: center;font-size: 25px;`
                trHOD.innerHTML = `<th colspan="12">No Leaves Yet...</th>`
                approvedTable.append(trHOD)
            }
            else {
                if (UserDesignation == 'HOD') {
                    let num = 1
                    data.forEach(element => {
                        var fromDate = new Date(element.from_date).toDateString()
                        var toDate = new Date(element.to_date).toDateString()
                        var tr = document.createElement('tr')
                        ihtml = `<td>${num}</td>
                        <td >${element.employee_name}</td>
                        <td >${element.leave_type}</td>
                        <td >${fromDate}</td>
                        <td >${toDate}</td>
                        <td >${element.discription}</td>`
                        tr.innerHTML = ihtml
                        approvedTable.append(tr)
                        num++;
                    });
                }
                if (UserDesignation == 'principal') {
                    const { HodLeave, facultyLeave, nonTechLeave } = data
                    let num = 1
                    if (HodLeave.hits > 0) {

                        var trHOD = document.createElement('tr')
                        trHOD.style = `text-align: center;font-size: 25px;`
                        trHOD.innerHTML = `<th colspan="12">HOD Leaves</th>`
                        approvedTable.append(trHOD)
                        HodLeave.data.forEach(element => {
                            var fromDate = new Date(element.from_date).toDateString()
                            var toDate = new Date(element.to_date).toDateString()
                            var tr = document.createElement('tr')
                            ihtml = `<td>${num}</td>
                    <td >${element.employee_name}</td>
                    <td >${element.leave_type}</td>
                    <td >${fromDate}</td>
                    <td >${toDate}</td>
                    <td >${element.discription}</td>`

                            tr.innerHTML = ihtml
                            approvedTable.append(tr)
                            num++;
                        });
                    }
                    if (facultyLeave.hits > 0) {

                        var trHOD = document.createElement('tr')
                        trHOD.style = `text-align: center;font-size: 25px;`
                        trHOD.innerHTML = `<th colspan="12">Faculty Leaves</th>`
                        approvedTable.append(trHOD)
                        facultyLeave.data.forEach(element => {
                            var fromDate = new Date(element.from_date).toDateString()
                            var toDate = new Date(element.to_date).toDateString()
                            var tr = document.createElement('tr')
                            ihtml = `<td>${num}</td>
                    <td >${element.employee_name}</td>
                    <td >${element.leave_type}</td>
                    <td >${fromDate}</td>
                    <td >${toDate}</td>
                    <td >${element.discription}</td>`
                            tr.innerHTML = ihtml
                            approvedTable.append(tr)
                            num++;
                        });
                    }
                    if (nonTechLeave.hits > 0) {

                        var trHOD = document.createElement('tr')
                        trHOD.style = `text-align: center;font-size: 25px;`
                        trHOD.innerHTML = `<th colspan="12">Non-Tech Leave</th>`
                        approvedTable.append(trHOD)
                        nonTechLeave.data.forEach(element => {
                            var fromDate = new Date(element.from_date).toDateString()
                            var toDate = new Date(element.to_date).toDateString()
                            var tr = document.createElement('tr')
                            ihtml = `<td>${num}</td>
                    <td >${element.employee_name}</td>
                    <td >${element.leave_type}</td>
                    <td >${fromDate}</td>
                    <td >${toDate}</td>
                    <td >${element.discription}</td>`
                            
                            tr.innerHTML = ihtml
                            approvedTable.append(tr)
                            num++;
                        });
                    }
                }
                if (UserDesignation == 'faculty') {
                    const { HOD, first, second, third, fourth } = data
                    let num = 1
                    if (HOD.hits > 0) {

                        var trHOD = document.createElement('tr')
                        trHOD.style = `text-align: center;font-size: 25px;`
                        trHOD.innerHTML = `<th colspan="12">Hod</th>`
                        approvedTable.append(trHOD)
                        HOD.hod.forEach(element => {
                            var fromDate = new Date(element.from_date).toDateString()
                            var toDate = new Date(element.to_date).toDateString()
                            var tr = document.createElement('tr')
                            ihtml = `<td>${num}</td>
                    <td >${element.employee_name}</td>
                    <td >${element.leave_type}</td>
                    <td >${fromDate}</td>
                    <td >${toDate}</td>
                    <td >${element.discription}</td>`
                         
                            tr.innerHTML = ihtml
                            approvedTable.append(tr)
                            num++;
                        });
                    }
                    if (first.hits > 0) {

                        var trHOD = document.createElement('tr')
                        trHOD.style = `text-align: center;font-size: 25px;`
                        trHOD.innerHTML = `<th colspan="12">First Year</th>`
                        approvedTable.append(trHOD)
                        first.firstYear.forEach(element => {
                            var fromDate = new Date(element.from_date).toDateString()
                            var toDate = new Date(element.to_date).toDateString()
                            var tr = document.createElement('tr')
                            ihtml = `<td>${num}</td>
                    <td >${element.employee_name}</td>
                    <td >${element.leave_type}</td>
                    <td >${fromDate}</td>
                    <td >${toDate}</td>
                    <td >${element.discription}</td>`
                            tr.innerHTML = ihtml
                            approvedTable.append(tr)
                            num++;
                        });
                    }
                    if (second.hits > 0) {

                        var trHOD = document.createElement('tr')
                        trHOD.style = `text-align: center;font-size: 25px;`
                        trHOD.innerHTML = `<th colspan="12">Second Year</th>`
                        approvedTable.append(trHOD)
                        second.secondYear.forEach(element => {
                            var fromDate = new Date(element.from_date).toDateString()
                            var toDate = new Date(element.to_date).toDateString()
                            var tr = document.createElement('tr')
                            ihtml = `<td>${num}</td>
                    <td >${element.employee_name}</td>
                    <td >${element.leave_type}</td>
                    <td >${fromDate}</td>
                    <td >${toDate}</td>
                    <td >${element.discription}</td>`
                            tr.innerHTML = ihtml
                            approvedTable.append(tr)
                            num++;
                        });
                    }
                    if (third.hits > 0) {

                        var trHOD = document.createElement('tr')
                        trHOD.style = `text-align: center;font-size: 25px;`
                        trHOD.innerHTML = `<th colspan="12">Third Year</th>`
                        approvedTable.append(trHOD)
                        third.thirdYear.forEach(element => {
                            var fromDate = new Date(element.from_date).toDateString()
                            var toDate = new Date(element.to_date).toDateString()
                            var tr = document.createElement('tr')
                            ihtml = `<td>${num}</td>
                    <td >${element.employee_name}</td>
                    <td >${element.leave_type}</td>
                    <td >${fromDate}</td>
                    <td >${toDate}</td>
                    <td >${element.discription}</td>`
                            tr.innerHTML = ihtml
                            approvedTable.append(tr)
                            num++;
                        });
                    }
                    if (fourth.hits > 0) {

                        var trHOD = document.createElement('tr')
                        trHOD.style = `text-align: center;font-size: 25px;`
                        trHOD.innerHTML = `<th colspan="12">Fourth Year</th>`
                        approvedTable.append(trHOD)
                        fourth.fourthYear.forEach(element => {
                            var fromDate = new Date(element.from_date).toDateString()
                            var toDate = new Date(element.to_date).toDateString()
                            var tr = document.createElement('tr')
                            ihtml = `<td>${num}</td>
                    <td >${element.employee_name}</td>
                    <td >${element.leave_type}</td>
                    <td >${fromDate}</td>
                    <td >${toDate}</td>
                    <td >${element.discription}</td>`
                            tr.innerHTML = ihtml
                            approvedTable.append(tr)
                            num++;
                        });
                    }
                }
                if (UserDesignation == 'non-tech-head') {
                    let num = 1
                    data.forEach(element => {
                        var fromDate = new Date(element.from_date).toDateString()
                        var toDate = new Date(element.to_date).toDateString()
                        var tr = document.createElement('tr')
                        ihtml = `<td>${num}</td>
                        <td >${element.employee_name}</td>
                        <td >${element.leave_type}</td>
                        <td >${fromDate}</td>
                        <td >${toDate}</td>
                        <td >${element.discription}</td>`
                        tr.innerHTML = ihtml
                        approvedTable.append(tr)
                        num++;
                    });
                }
                off()
            }
        }
    }
    catch (error) {
        console.log(error);
        off()
    }

}
if (token) {
    getLeaveApprovals()
    getLeaveApproved()
    off()
}
