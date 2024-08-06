
const UserDesignation = localStorage.getItem('UserDesignation')
function leaveApplingError(status,msg){
    document.getElementById("leaveApplingError").style.display="block"
    document.getElementById("leaveApplingErrorMsg").innerHTML=msg
    document.getElementById("leaveApplingErrorStatus").innerHTML=status
}
function leaveApplingErrorClose(){
    document.getElementById("leaveApplingError").style.display="none"
}

const getReferenceUser = async () => {
    try {
        const getRefUser = await fetch('/getReferenceUser', {
            headers: {
                'Authorization': `Bearer ${token}`
            }

        })
        if (!getRefUser.ok) {
            const status = getRefUser.status
            const { msg } = await getRefUser.json()
            var arraryError = []
            arraryError.push(status)
            arraryError.push(msg)
            errorHandler(arraryError)
        }
        else {
            var applyleavesidebar_link = document.querySelector(".applyleavesidebar");
            applyleavesidebar_link.classList.add("active");
            const ref1 = document.querySelector('.reference1')
            const ref2 = document.querySelector('.reference2')
            const ref3 = document.querySelector('.reference3')
            const ref4 = document.querySelector('.reference4')
            const ref = document.querySelector('.reference')
            
            if (UserDesignation === 'HOD') {
                const {data, hits } = await getRefUser.json()
                if (hits == 0) {
                    var opt = document.createElement('option')
                    opt.innerHTML = `--empty--`
                    ref.append(opt)
                }
                else {
                    for (item of data) {
                        var opt = document.createElement('option')
                        opt.innerHTML = `${item.name}`
                        ref.append(opt)

                    }
                }
            }
            if (UserDesignation === 'faculty') {
                const {refUserFirstYearHits,dataFirstYear,data, hits } = await getRefUser.json()
                if (refUserFirstYearHits==0) {
                    var opt1 = document.createElement('option')
                    opt1.innerHTML = `--empty--`
                }
                else{
                    for (item of dataFirstYear) {
                        var opt1 = document.createElement('option')
                        opt1.innerHTML = `${item.name}`
                        ref1.append(opt1)
                    }
                }
                if (hits == 0) {
                    var opt2 = document.createElement('option')
                    opt2.innerHTML = `--empty--`
                    var opt3 = document.createElement('option')
                    opt3.innerHTML = `--empty--`
                    var opt4 = document.createElement('option')
                    opt4.innerHTML = `--empty--`
                    ref1.append(opt1)
                    ref2.append(opt2)
                    ref3.append(opt3)
                    ref4.append(opt4)
                }
                else {
                    for (item of data) {
                        var opt2 = document.createElement('option')
                        opt2.innerHTML = `${item.name}`
                        var opt3 = document.createElement('option')
                        opt3.innerHTML = `${item.name}`
                        var opt4 = document.createElement('option')
                        opt4.innerHTML = `${item.name}`
                        ref2.append(opt2)
                        ref3.append(opt3)
                        ref4.append(opt4)

                    }
                }
            }
        }
        off()
    }
    catch (error) {
        console.log(error)
    }
}
if (UserDesignation == 'HOD') {
    const hodLeaveApply = document.querySelector("#ref_hide_hod")
    hodLeaveApply.hidden = false
    getReferenceUser()

}
if (UserDesignation == 'faculty') {
    const facultyLeaveApply = document.querySelector("#All_ref_hide")
    facultyLeaveApply.hidden = false
    getReferenceUser()
}
if (UserDesignation == 'principal') {
    console.log(`its running`);
}


const contactno = document.querySelector('.mob_no')
const fromdate = document.querySelector('.fromdate')
const todate = document.querySelector('.todate')
const totaldays = document.querySelector('.totaldays')
const dayDiscription = document.querySelector('#dayDiscription')
const reference1 = document.querySelector('.reference1')
const reference2 = document.querySelector('.reference2')
const reference3 = document.querySelector('.reference3')
const reference4 = document.querySelector('.reference4')
const leave_type = document.querySelector('.leavetype')
const reason = document.querySelector('.reason')

dayDiscription.addEventListener("input", () => {
    if (dayDiscription.value == 'true') {
        totaldays.value = 0.5;
    } else {
        totaldays.value = 1;
    }
})
todate.addEventListener("input", () => {
    if (fromdate.value) {
        const date2 = new Date(fromdate.value)
        const date1 = new Date(todate.value)
        let totalday = (((date1 - date2) / (1000 * 60 * 60 * 24)) + 1)

        totaldays.value = totalday;
        if (totalday == `1`) {
            const dayDiscribe = document.querySelector('#halfDayORfullDay')
            const leaveTypeDiscription = document.querySelector('#leaveTypeDiscription')
            dayDiscribe.hidden = false
            leaveTypeDiscription.removeAttribute('class')
            leaveTypeDiscription.classList.remove(`col-md-12`)
            leaveTypeDiscription.classList.add(`col-md-6`)
        }
        else {
            const dayDiscribe = document.querySelector('#halfDayORfullDay')
            const leaveTypeDiscription = document.querySelector('#leaveTypeDiscription')
            dayDiscribe.hidden = true
            leaveTypeDiscription.classList.add(`col-md-12`)
        }
    }
    else {
        totaldays.value = 0;
    }
})
fromdate.addEventListener("input", () => {
    if (todate.value) {
        const date2 = new Date(fromdate.value)
        const date1 = new Date(todate.value)
        let totalday = (((date1 - date2) / (1000 * 60 * 60 * 24)) + 1)

        totaldays.value = totalday;
        if (totalday == `1`) {
            const dayDiscribe = document.querySelector('#halfDay$fullDay')
            const leaveTypeDiscription = document.querySelector('#leaveTypeDiscription')
            dayDiscribe.hidden = false
            leaveTypeDiscription.removeAttribute('class')
            leaveTypeDiscription.classList.remove(`col-md-12`)
            leaveTypeDiscription.classList.add(`col-md-6`)
        }
        else {
            const dayDiscribe = document.querySelector('#halfDayORfullDay')
            const leaveTypeDiscription = document.querySelector('#leaveTypeDiscription')
            dayDiscribe.hidden = true
            leaveTypeDiscription.classList.add(`col-md-12`)


        }
    }
    else {
        totaldays.value = 0;
    }
})

if (UserDesignation == 'faculty') {
    reference1.required = true
    reference2.required = true
    reference3.required = true
    reference4.required = true
}

const button_apply = document.querySelector('.btn_apply')

button_apply.addEventListener('click', async (e) => {
    if (!contactForm.checkValidity()) {
        return;
    }
    e.preventDefault()
    try {
        const contactnoData = contactno.value
        const fromdateData = fromdate.value
        const todateData = todate.value
        const reference1Data = reference1.value
        const reference2Data = reference2.value
        const reference3Data = reference3.value
        const reference4Data = reference4.value
        const leave_typeData = leave_type.value
        const reasonData = reason.value

        //for Hod
        const reference = document.querySelector('.reference').value

        const dayDiscription = document.querySelector('#dayDiscription').value

        const date2 = new Date(fromdateData)
        const date1 = new Date(todateData)
        let totaldays = (((date1 - date2) / (1000 * 60 * 60 * 24)) + 1)
        let dateNow = Date.now()
        
        var result=((date2 - dateNow)+(1000*60*60*24))
        if (result<0) {
            leaveApplingError(401,`From date must be greater or equal to your application date ${new Date().toDateString()}`)
            throw Error(`From date must be greater`)
        }
        if (totaldays == 1 && dayDiscription == 'true') {
            totaldays = 0.5
        }

        const token = localStorage.getItem('token')
        if (!token) {
        }
        const fetcher = await fetch('http://localhost:4000/applyLeave', {

            method: 'POST',

            body: JSON.stringify({
                contect_no: contactnoData,
                from_date: fromdateData,
                to_date: todateData,
                total_days: totaldays,
                reference: { name: reference },
                reference1: { name: reference1Data },
                reference2: { name: reference2Data },
                reference3: { name: reference3Data },
                reference4: { name: reference4Data },
                leave_type: leave_typeData,
                discription: reasonData,
            }),

            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }

        })
        if (!fetcher.ok) {
            const { msg } = await fetcher.json()
            off()
            leaveApplingError(fetcher.status,msg)
            throw Error(`${msg}`)
        }
        else {
            off()
            const { leave, status } = await fetcher.json()
            leave_applied()
        }
        off()
    } catch (error) {
        console.log(error)
        off()

    }
})

function leave_applied() {
    document.getElementById("popup4").style.display = "block";

}
function close_popup() {
    document.getElementById("popup4").style.display = "none";
    location.replace("status.html")

}


