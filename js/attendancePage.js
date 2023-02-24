
let button = document.getElementById("confirmButton");
$("#logOut").click(function () {

    let cookieData = document.cookie;
    let fetchedUserName = cookieData.split("=", 3)[0]

    document.cookie = cookieData + ";expires=Thu, 01 Jan 2023 00:00:00 UTC; path=/;";
    window.open("../index.html", '_self');
})//end of click button

if (document.cookie.split("=", 3)[2] == 'sub-admin') {
    // function to calculate the late time
    function getLateTime(arriveTime) {


        var s = "8:30".split(':');
        var e = arriveTime.split(':');

        var end = parseInt(e[0]) * 60 + parseInt(e[1]);
        var start = parseInt(s[0]) * 60 + parseInt(s[1]);

        var elapsedMs = end - start;
        var hours = parseInt(elapsedMs / 60) + " h " + elapsedMs % 60 + " m";
        return hours;

    }



    button.addEventListener("click", function () {
        let today = new Date();
        let startWorkingHours = new Date();
        startWorkingHours.setHours(8, 30, 0); // 8.30 am
        let endWorkingHours = new Date();
        endWorkingHours.setHours(15, 30, 0); // 3.30 pm




        let userName = document.getElementById("userName")
        fetch(`http://localhost:3000/users?userName=${userName.value}`)
            .then((respond) => {

                return respond.json();
            })
            .then((data) => {
                if (data.length == 0) {
                    Swal.fire(
                        'Not Found',
                        'The Username You Entered is not Registered',
                        'question'
                    )

                }
                else if (data[0].flag == 0) {
                    Swal.fire(
                        'Pending',
                        'The Username You Entered Still Waiting for Admin Approval! ',
                        'info'
                    )

                }


                // if we are in working hours form
                else if (today >= startWorkingHours && today < endWorkingHours) {


                    // we will make attendance Object for the user at the start of the day 
                    let today = new Date();
                    let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
                    let timeHours = today.getHours() + ":" + today.getMinutes()
                    let arrive = (today.getHours() * 60) + today.getMinutes()
                    let lateness = getLateTime(timeHours);


                    fetch(`http://localhost:3000/users/${data[0].id}/attendance/?Date=${date}`)
                        .then((respond) => {

                            return respond.json();
                        }).then((attendanceDate) => {

                            // still doing our first confirm of the day
                            if (attendanceDate.length == 0) {


                                // getting all the users
                                fetch(`http://localhost:3000/users?flag=1`)
                                    .then((respond) => {

                                        return respond.json();
                                    }).then((dataFlag1) => {                                    // Getting the new data
                                        // loop for every user and make an attendance object
                                        dataFlag1.forEach(userFlag1 => {

                                            attendanceObject = {
                                                "userId": userFlag1.id,
                                                "Date": date,
                                                "arrivalTime": "",
                                                "departureTime": "",
                                                "lateTime": "",
                                                "Status": "Abesnt",

                                                "leaveConfirm": 0
                                            }


                                            fetch('http://localhost:3000/attendance', {
                                                method: 'POST', // or 'PUT'
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify(attendanceObject),
                                            })

                                        }); // end of for each for -> "dataFlag1"
                                    })//end of fetch for flag 1

                                    .then(() => {
                                        if (540 <= arrive) {



                                            // make the confirm --> first emp
                                            fetch(`http://localhost:3000/users/${data[0].id}/attendance/?Date=${date}`)
                                                .then((respond) => {

                                                    return respond.json();
                                                }).then((firstConfirmUser) => {

                                                    alert("Welcome First Employee of the day")
                                                    fetch(`http://localhost:3000/attendance/${firstConfirmUser[0].id}`, {
                                                        headers: {
                                                            Accept: "application/json",
                                                            "Content-Type": "application/json"
                                                        },
                                                        method: "PATCH",

                                                        // Fields that to be updated are passed
                                                        body: JSON.stringify({
                                                            "arrivalTime": timeHours,
                                                            "departureTime": "",
                                                            "lateTime": lateness,
                                                            "Status": "Late",

                                                            "leaveConfirm": 1


                                                        })


                                                    })// end of update first user

                                                })

                                        }
                                        else {
                                            // make the confirm --> first emp
                                            fetch(`http://localhost:3000/users/${data[0].id}/attendance/?Date=${date}`)
                                                .then((respond) => {

                                                    return respond.json();
                                                }).then((firstConfirmUser) => {

                                                    alert("Welcome First Employee of the day")
                                                    fetch(`http://localhost:3000/attendance/${firstConfirmUser[0].id}`, {
                                                        headers: {
                                                            Accept: "application/json",
                                                            "Content-Type": "application/json"
                                                        },
                                                        method: "PATCH",

                                                        // Fields that to be updated are passed
                                                        body: JSON.stringify({
                                                            "arrivalTime": timeHours,
                                                            "departureTime": "",
                                                            "lateTime": "",
                                                            "Status": "OnTime",

                                                            "leaveConfirm": 1


                                                        })


                                                    })// end of update first user

                                                })


                                        }


                                    }) // end of first confirm








                            }// end of date fetch "attendanceDate"





                            else {///   

                                let today = new Date();
                                let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
                                let timeHours = today.getHours() + ":" + today.getMinutes()


                                fetch(`http://localhost:3000/attendance/${attendanceDate[0].id}`)
                                    .then((respond) => {

                                        return respond.json();
                                    }).then((dateObject) => {



                                        //Emp  arrived
                                        if (attendanceDate[0].leaveConfirm == 0) {
                                            if (540 <= arrive) {
                                                fetch(`http://localhost:3000/attendance/${attendanceDate[0].id}`, {
                                                    headers: {
                                                        Accept: "application/json",
                                                        "Content-Type": "application/json"
                                                    },
                                                    method: "PATCH",

                                                    // Fields that to be updated are passed
                                                    body: JSON.stringify({
                                                        "arrivalTime": timeHours,
                                                        "departureTime": "",
                                                        "lateTime": lateness,
                                                        "Status": "Late",

                                                        "leaveConfirm": 1
                                                    })


                                                })// end of update Arrival time
                                            }
                                            else {
                                                fetch(`http://localhost:3000/attendance/${attendanceDate[0].id}`, {
                                                    headers: {
                                                        Accept: "application/json",
                                                        "Content-Type": "application/json"
                                                    },
                                                    method: "PATCH",

                                                    // Fields that to be updated are passed
                                                    body: JSON.stringify({
                                                        "arrivalTime": timeHours,
                                                        "departureTime": "",
                                                        "lateTime": "",
                                                        "Status": "OnTime",

                                                        "leaveConfirm": 1
                                                    })


                                                })// end of update Arrival time
                                            }
                                        }
                                        else if (attendanceDate[0].leaveConfirm == 1) {
                                            fetch(`http://localhost:3000/attendance/${attendanceDate[0].id}`, {
                                                headers: {
                                                    Accept: "application/json",
                                                    "Content-Type": "application/json"
                                                },
                                                method: "PATCH",

                                                // Fields that to be updated are passed
                                                body: JSON.stringify({

                                                    "departureTime": timeHours,
                                                    "leaveConfirm": 2

                                                })


                                            })// end of update Arrival time
                                        }
                                        else {
                                            Swal.fire(
                                                'Note',
                                                'The Employee Already Submit Departure',
                                                'info'
                                            )

                                        }




                                    })






                            }// will Update the Date Object for the userName Entered

                        })



                    //Update the First Confirm /******************************************************* 



                }//end of else in check userName Existence
                else {


                    Swal.fire(
                        'Note!',
                        'Out of iTi Working Hours?',
                        'warning'
                    )
                }

            })// end of the first then


    })// end of Button Click


} else {
    window.open("../index.html", '_self');

}


// function that checks the time every 15 minute 
// if will  register departure for every Employee who  registered arrival 
window.setInterval(function () { // Set interval for checking
    let today = new Date();
    let endWorkingHours = new Date();
    endWorkingHours.setHours(15, 30, 0); // 3.30 pm
    let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();


    // if it was the end of the day
    if (today >= endWorkingHours) {
        fetch(`http://localhost:3000/attendance?Date=${date}`)
            .then((respond) => {

                return respond.json();
            }).then((dateObject) => {
                dateObject.forEach(obj => {


                    // if it submit arrival
                    if (obj.leaveConfirm == 1) {




                        fetch(`http://localhost:3000/attendance/${obj.id}`, {
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json"
                            },
                            method: "PATCH",

                            // Fields that to be updated are passed
                            body: JSON.stringify({

                                "departureTime": "15:30",
                                "leaveConfirm": 2

                            })


                        })// end of update Arrival time
                    }
                })//end of forEach

            })// end of fetch
    }// end of if


}, 900000); // Repeat every 900000 milliseconds (15 minute)

