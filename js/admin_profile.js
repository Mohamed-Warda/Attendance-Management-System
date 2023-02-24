let empName = document.getElementById("name")
let empUserName = document.getElementById("userName")
let empRole = document.getElementById("role")
let cardUserName = document.getElementById("cardUserName")
let cardEmail = document.getElementById("cardEmail")
let cardAddress = document.getElementById("cardAddress")
let cardAge = document.getElementById("cardAge")
let imgProfile = document.getElementById("imgProfile")


$("#divDaily").hide()
$("#divMonthly").hide()
document.getElementById('day').valueAsDate = new Date();

$("#logOut").click(function () {

    let cookieData = document.cookie;
    let fetchedUserName = cookieData.split("=", 4)[0]
    document.cookie = cookieData + "=;expires=Thu, 01 Jan 2020 00:00:00 UTC; path=/;";
    window.open("../index.html", '_self');


})//end of click button



// Function to change input Date format
function changeDateFormat(val) {
    const myArray = val.split("-");

    let year = myArray[0];
    let month = myArray[1];
    let day = myArray[2];

    let date = day + "-" + month + "-" + year;
    let formatteddate = date.replace(/-0+/g, '-')
    return formatteddate;
}




(function getData() {

    fetch("http://localhost:3000/users")
        .then((respond) => {

            return respond.json();
        })
        .then((data) => {
            data.forEach(function (dataObj) {

                let cookieData = document.cookie;
                let fetchedUserName = cookieData.split("=", 2)[1]
                if (dataObj.userName == fetchedUserName) {
                    empName.innerText = dataObj.fname + ' ' + dataObj.lname;
                    empUserName.innerText = dataObj.userName;
                    cardUserName.innerText = dataObj.userName;
                    empRole.innerText = dataObj.role;
                    cardEmail.innerText = dataObj.email;
                    cardAddress.innerText = dataObj.address;
                    cardAge.innerText = dataObj.age;


                    if (dataObj.gender == "male") {
                        imgProfile.src = "../img/Male.jpg";
                    }
                    else {
                        imgProfile.src = "../img/Female.jpg";
                    }

                }
            })
        })
})()


//document.getElementById('day').valueAsDate = new Date();
let id = document.cookie.split("=", 4)[3]

///******************************************************************************************///
///*****************************************Daily Reports Functions*************************///
///****************************************************************************************///
$("#dReport").click(function () {
    $("#divMonthly").hide()
    $("#divDaily").show()
    $("#dailyTbody").empty(); // empty the table before adding 


    fetch(`http://localhost:3000/users/${id}?_embed=attendance`)
        .then((respond) => {

            return respond.json();
        }).then((userDaily) => {
            let index = userDaily.attendance.length - 1
            $("#dailyTbody").append(`<tr class="bg-light" ><td>${userDaily.attendance[index].arrivalTime}</td><td> ${userDaily.attendance[index].departureTime}</td><td>${userDaily.attendance[index].Status}</td><td>   ${userDaily.attendance[index].lateTime}</td> </tr>`);


        })//end of fetch userDaily
        .then((data) => {
            $('#day').change(function (e) {
                $("#dailyTbody").empty(); // empty the table before adding 
                fetch(`http://localhost:3000/users/${id}?_embed=attendance`)
                    .then((respond) => {

                        return respond.json();
                    }).then((userDailyWithDate) => {
                        $("#dailyTbody").empty(); // empty the table before adding 
                        let dateEntered = changeDateFormat(e.target.value);
                        for (let i = 0; i < userDailyWithDate.attendance.length; i++) {

                            if (dateEntered == userDailyWithDate.attendance[i].Date) {
                                $("#error").hide();
                                $("#dailyTbody").append(`<tr class="bg-light" ><td>${userDailyWithDate.attendance[i].arrivalTime}</td><td> ${userDailyWithDate.attendance[i].departureTime}</td><td>${userDailyWithDate.attendance[i].Status}</td><td>   ${userDailyWithDate.attendance[i].lateTime}</td> </tr>`);


                            }
                            else if ($('#dailyTbody:empty').length) {
                                $("#dailyTbody").empty(); // empty the table before adding 
                                $("#dailyTbody").append(" <tr id='error' class='bg-light text-black'><td class='text-info fs-5' colspan='8'> No Data Available For The Specified Date &nbsp; <i class='fa-solid fa-exclamation'></i></td></tr > ")
                            }


                        }

                    })


                $("#dailyTbody").empty(); // empty the table before adding 


            })


        })
})//end of daily Button



///***************************************************************************///
///******************************Dispaly Monthly Reports*********************///
///*************************************************************************///
$("#mReport").click(function () {
    $("#divMonthly").show()
    $("#monthlybody").empty(); // empty the table before adding 

    $("#divDaily").hide()

    fetch(`http://localhost:3000/users/${id}?_embed=attendance`)
        .then((respond) => {

            return respond.json();
        }).then((userMonthly) => {


            for (let i = 0; i < userMonthly.attendance.length; i++) {
                $("#monthlybody").append(`<tr  class="bg-light" ><td>${userMonthly.attendance[i].arrivalTime}</td><td> ${userMonthly.attendance[i].departureTime}</td><td>${userMonthly.attendance[i].Date}</td><td>${userMonthly.attendance[i].Status}</td><td>   ${userMonthly.attendance[i].lateTime}</td> </tr>`);

            }// end of for loop

        })//end of fetch userMonthly

    $('#secondDay').change(function (e) {

        console.log("hey")


        let firstDay = changeDateFormat($('#firstDay').val())
        let secondDay = changeDateFormat($('#secondDay').val())
        console.log(firstDay)
        //check if he choose first day date
        if ($('#firstDay').val() == '') {
            swal({
                title: "Note",
                text: "Please Select First Day First",
                type: "info",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Ok!",
            })
        }
        else {
            $("#monthlybody").empty()
            fetch(`http://localhost:3000/users/${id}/attendance?Date_gte=${firstDay}&Date_lte=${secondDay}`)
                .then((respond) => {

                    return respond.json();
                }).then((myDates) => {

                    //  console.log(userFlag1.id)
                    myDates.forEach(date => {
                        $("#monthlybody").append(`<tr  class="bg-light"><td>${date.arrivalTime}</td><td> ${date.departureTime}</td><td>${date.Date}</td><td>${date.Status}</td><td>   ${date.lateTime}</td> </tr>`);
                    })
                })
        }
    })


})