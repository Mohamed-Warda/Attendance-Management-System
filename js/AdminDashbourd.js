
$(".nav").click(function () {
    $("#mySidenav").css('width', '70px');
    $("#main").css('margin-left', '70px');
    $(".logo").css('visibility', 'hidden');
    $(".logo span").css('visibility', 'visible');
    $(".logo span").css('margin-left', '-10px');
    $(".icon-a").css('visibility', 'hidden');
    $(".icons").css('visibility', 'visible');
    $(".icons").css('margin-left', '-8px');
    $(".nav").css('display', 'none');
    $(".nav2").css('display', 'block');
});

$(".nav2").click(function () {
    $("#mySidenav").css('width', '300px');
    $("#main").css('margin-left', '300px');
    $(".logo").css('visibility', 'visible');
    $(".icon-a").css('visibility', 'visible');
    $(".icons").css('visibility', 'visible');
    $(".nav").css('display', 'block');
    $(".nav2").css('display', 'none');
});




if (document.cookie.split("=", 3)[2] == 'admin') {



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



    ///****************************************************************************************///
    ///***********************************Monthly Reports Functions****************************///
    ///****************************************************************************************///


    function monthlyReport() {
        //document.getElementById('secondDay').valueAsDate = new Date();

        fetch(`http://localhost:3000/users?flag=1`)
            .then((respond) => {

                return respond.json();
            })
            .then((dataFlag1) => {
                dataFlag1.forEach(userFlag1 => {


                    $("#monthlybody").empty(); // empty the table before adding 


                    fetch(`http://localhost:3000/users/${userFlag1.id}?_embed=attendance`)
                        .then((respond) => {

                            return respond.json();
                        }).then((userMonthly) => {


                            for (let i = 0; i < userMonthly.attendance.length; i++) {
                                $("#monthlybody").append(`<tr class="mTr"><td data-title="ID">${userMonthly.id}</td><td data-title="Full Name">${userMonthly.fname} ${userMonthly.lname}</td><td data-title="Job Title">${userMonthly.JobTitle}</td><td data-title="User Name">${userMonthly.userName}</td><td data-title="Arrival Time">${userMonthly.attendance[i].arrivalTime}</td><td data-title="Departure Time"> ${userMonthly.attendance[i].departureTime}</td><td data-title="Date">${userMonthly.attendance[i].Date}</td><td  data-title="Status">${userMonthly.attendance[i].Status}</td><td  data-title="Late Time">   ${userMonthly.attendance[i].lateTime}</td> </tr>`);

                            }// end of for loop

                        })//end of fetch userMonthly

                    $('#secondDay').change(function (e) {


                        changeDateFormat($('#firstDay').val())

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
                            fetch(`http://localhost:3000/users/${userFlag1.id}/attendance?Date_gte=${firstDay}&Date_lte=${secondDay}`)
                                .then((respond) => {

                                    return respond.json();
                                }).then((myDates) => {

                                    //  console.log(userFlag1.id)
                                    myDates.forEach(date => {
                                        $("#monthlybody").append(`<tr class="mTr" ><td data-title="ID">${userFlag1.id}</td><td data-title="Full Name">${userFlag1.fname} ${userFlag1.lname}</td><td data-title="Job Title">${userFlag1.JobTitle}</td><td data-title="User Name">${userFlag1.userName}</td><td data-title="Arrival Time">${date.arrivalTime}</td><td data-title="Departure Time"> ${date.departureTime}</td><td data-title="Date">${date.Date}</td><td data-title="Status">${date.Status}</td><td data-title="Late Time">   ${date.lateTime}</td> </tr>`);

                                    })


                                })

                        }


                    })


                })//end of forEach for dataFlag1




            })//end of fetch flag1


        // seach function
        $("#userNameMonthly").keyup(function () {
            let userName = $(this).val();

            $(".mTr").each(function (i, el) {
                let text = $(el).children()[3].innerText
                if (text.indexOf(userName) != -1) {
                    $(this).show(700)



                }
                else {
                    $(this).hide(700)


                }
            })// end of each 
        })// end of search userNameMonthly



    }







    ///******************************************************************************************///
    ///*****************************************Daily Reports Functions*************************///
    ///****************************************************************************************///
    function dailyReport() {

        document.getElementById('day').valueAsDate = new Date();


        let x = 0;
        //let myDate = changeDateFormat()
        fetch(`http://localhost:3000/users?flag=1`)
            .then((respond) => {

                return respond.json();
            })
            .then((dataFlag1) => {
                dataFlag1.forEach(userFlag1 => {


                    $("#dailyTbody").empty(); // empty the table before adding 


                    fetch(`http://localhost:3000/users/${userFlag1.id}?_embed=attendance`)
                        .then((respond) => {

                            return respond.json();
                        }).then((userDaily) => {
                            let index = userDaily.attendance.length - 1


                            $("#dailyTbody").append(`<tr><td data-title="ID">${userDaily.id}</td><td data-title="Full Name">${userDaily.fname} ${userDaily.lname}</td><td data-title="Job Title">${userDaily.JobTitle}</td><td data-title="User Name">${userDaily.userName}</td><td data-title="Arrival Time">${userDaily.attendance[index].arrivalTime}</td><td data-title="Departure Time"> ${userDaily.attendance[index].departureTime}</td><td data-title="Status">${userDaily.attendance[index].Status}</td><td data-title="Late Time">   ${userDaily.attendance[index].lateTime}</td> </tr>`);


                        })//end of fetch userDaily
                        .then((data) => {
                            $('#day').change(function (e) {
                                fetch(`http://localhost:3000/users/${userFlag1.id}?_embed=attendance`)
                                    .then((respond) => {

                                        return respond.json();
                                    }).then((userDailyWithDate) => {
                                        // $("#dailyTbody").empty(); // empty the table before adding 
                                        let dateEntered = changeDateFormat(e.target.value);
                                        for (let i = 0; i < userDailyWithDate.attendance.length; i++) {

                                            if (dateEntered == userDailyWithDate.attendance[i].Date) {
                                                $("#error").hide();
                                                $("#dailyTbody").append(`<tr><td data-title="ID">${userDaily.id}</td><td data-title="Full Name">${userDaily.fname} ${userDaily.lname}</td><td data-title="Job Title">${userDaily.JobTitle}</td><td data-title="User Name">${userDaily.userName}</td><td data-title="Arrival Time">${userDaily.attendance[index].arrivalTime}</td><td data-title="Departure Time"> ${userDaily.attendance[index].departureTime}</td><td data-title="Status">${userDaily.attendance[index].Status}</td><td data-title="Late Time">   ${userDaily.attendance[index].lateTime}</td> </tr>`);


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

                })//end of forEach for dataFlag1




            })//end of fetch flag1


    }





    ///***************************************************************************///
    ///******************************Dispaly Pending Request*********************///
    ///*************************************************************************///
    function getPendingData() {

        fetch("http://localhost:3000/users?flag=0")
            .then((respond) => {

                return respond.json();
            })
            .then((data) => {
                data.forEach(function (dataObj) {

                    $("#pendingTbody").append(`<tr><td data-title="ID">${dataObj.id}</td><td data-title="Full Name">${dataObj.fname} ${dataObj.lname}</td><td data-title="Job Title">${dataObj.JobTitle}</td><td data-title="User Name">${dataObj.userName}</td><td data-title="Email">${dataObj.email}</td><td data-title="Address"> ${dataObj.address}</td><td data-title="Age">${dataObj.age}</td><td data-title="Accept">   <img class="approve" src="../img/yes.png" alt=""></td><td data-title="Remove"> <img class="remove" src="../img/no.png" alt=""></td> </tr>`);


                }) // end of forEach





                //Remove Function
                $(".remove").click(function () {
                    let id = $(this).closest("tr")[0].firstChild.innerText

                    /////
                    swal({
                        title: "Are you sure?",
                        text: "You will not be able to recover the Data!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes, delete it!",
                        cancelButtonText: "No, cancel !",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                        function (isConfirm) {
                            if (isConfirm) {
                                fetch(`http://localhost:3000/users/${id}`, {
                                    method: 'DELETE',
                                })

                                swal("Deleted!", "The Person was Deleted.", "success");
                            } else {
                                swal("Cancelled", " :)", "error");
                            }
                        });



                    ///
                })//end of Remove 


                //Approve Function
                $(".approve").click(function () {
                    let id = $(this).closest("tr")[0].firstChild.innerText

                    swal({
                        title: "Are you sure?",
                        text: "Do You Want to Accept the request!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes, Accept !",
                        cancelButtonText: "No, cancel !",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                        function (isConfirm) {
                            if (isConfirm) {
                                fetch(`http://localhost:3000/users/${id}`, {
                                    headers: {
                                        Accept: "application/json",
                                        "Content-Type": "application/json"
                                    },
                                    method: "PATCH",

                                    // Fields that to be updated are passed
                                    body: JSON.stringify({
                                        flag: 1
                                    })
                                })

                                swal("Accepted!", "The Request was Accepted.", "success");
                            } else {
                                swal("Cancelled", " :)", "error");
                            }
                        });





                })//end of approve
            }) // end of then
            .then(() => {
                //    $("#monthlyReportsTable").dataTable({ searching: false });
            })
    }; //end of  getPendingData




    function getEmpData() {

        fetch("http://localhost:3000/users?flag=1")
            .then((respond) => {

                return respond.json();
            })
            .then((data) => {
                data.forEach(function (dataObj) {

                    $("#empTbody").append(`<tr><td data-title="ID">${dataObj.id}</td><td  data-title="Full Name" class="d-none d-md-block">${dataObj.fname} ${dataObj.lname}</td><td data-title="Job Title">${dataObj.JobTitle}</td><td data-title="User Name">${dataObj.userName}</td><td data-title="Email ">${dataObj.email}</td><td data-title="Address"> ${dataObj.address}</td><td data-title="Age">${dataObj.age}</td><td data-title="Password">${dataObj.password} </td><td data-title="Remove"> <img class="remove" src="../img/no.png" alt=""></td> </tr>`);


                }) // end of forEach

                $(".remove").click(function () {
                    let id = $(this).closest("tr")[0].firstChild.innerText

                    /////
                    swal({
                        title: "Are you sure?",
                        text: "You will not be able to recover the Data!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes, delete it!",
                        cancelButtonText: "No, cancel !",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                        function (isConfirm) {
                            if (isConfirm) {
                                fetch(`http://localhost:3000/users/${id}`, {
                                    method: 'DELETE',
                                })

                                swal("Deleted!", "The Person was Deleted.", "success");
                            } else {
                                swal("Cancelled", " :)", "error");
                            }
                        });



                    ///
                })//end of Remove 



            })

    }; //end of  getEmpData





    $("#divPending").hide();
    $("#empTable").show()
    $("#divDaily").hide()
    $("#inputMonthly").hide()
    $("#divMonthly").hide()
    getPendingData();
    getEmpData();
    monthlyReport();
    $("#pending").click(function () {
        $("#divPending").show()
        $("#empTable").hide()
        $("#divDaily").hide()
        $("#divMonthly").hide()
        $("#inputMonthly").hide()

    })//end of click
    $("#employees").click(function () {
        $("#divDaily").hide()
        $("#divPending").hide();
        $("#divMonthly").hide();
        $("#empTable").show()
        $("#inputMonthly").hide()
    })//end of click
    $("#dReports").click(function () {
        dailyReport()
        $("#divPending").hide();
        $("#empTable").hide()
        $("#divMonthly").hide()
        $("#inputMonthly").hide()
        $("#divDaily").show()
    })//end of click
    $("#mReports").click(function () {
        dailyReport()
        $("#divPending").hide();
        $("#empTable").hide()
        $("#divMonthly").show()
        $("#userNameMonthly").show()
        $("#divDaily").hide()
        $("#inputMonthly").show()
    })//end of click

















    let button = document.getElementById("button")
    button.addEventListener("click", function () {
        let cookieData = document.cookie;
        let fetchedUserName = document.cookie.split("=", 2)[0]

        document.cookie = cookieData + ";expires=Thu, 01 Jan 2020 00:00:00 UTC; path=/;";
        // document.cookie = `${fetchedUserName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

        window.open("../index.html", '_self');


    })//end of click button
}//end of if for checking the admin account
else {
    window.open("../index.html", '_self');

}



