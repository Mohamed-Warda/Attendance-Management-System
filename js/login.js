let userNameInput = document.querySelector('#userName');
let passwordInput = document.querySelector('#password');
let buttonInput = document.querySelector('#btn');



buttonInput.onclick = function () {
    getData();


}

function getData() {
    if (userNameInput.value == '') {
        console.log("empty")
    }
    else {
        fetch("http://localhost:3000/users")
            .then((respond) => {

                return respond.json();
            })
            .then((data) => {
                data.forEach(function (dataObj) {
                    if (dataObj.password == passwordInput.value && dataObj.userName == userNameInput.value && dataObj.role == "admin") {
                        console.log("admin")
                        userNameInput.classList.remove('is-invalid');
                        userNameInput.classList.add('is-valid');
                        document.cookie = "username=" + dataObj.userName + "=" + dataObj.role + "=" + dataObj.id + "";

                        window.open("html/AdminDashbourd.html", '_self');





                    }
                    else if (dataObj.password == passwordInput.value && dataObj.userName == userNameInput.value && dataObj.role == "employee") {
                        console.log("employee")
                        userNameInput.classList.remove('is-invalid');
                        userNameInput.classList.add('is-valid');
                        document.cookie = "username=" + dataObj.userName + "=" + dataObj.role + "=" + dataObj.id + "";
                        window.open("html/employee-profile.html", '_self');


                    }

                    else if (dataObj.password == passwordInput.value && dataObj.userName == userNameInput.value && dataObj.role == "sub-admin") {

                        userNameInput.classList.remove('is-invalid');
                        userNameInput.classList.add('is-valid');
                        document.cookie = "username=" + dataObj.userName + "=" + dataObj.role + "=" + dataObj.id + "";
                        window.open("html/sub-admin-Profile.html", '_self');


                    }
                    else if (dataObj.password != passwordInput.value || dataObj.userName != userNameInput.value) {

                        userNameInput.classList.add('is-invalid');
                        userNameInput.classList.remove('is-valid');




                    }
                })

            })


    }
}



(function () {
    const forms = document.querySelectorAll('.needs-validation');

    for (let form of forms) {
        form.addEventListener(
            'submit',
            function (event) {
                if (
                    !form.checkValidity()



                ) {
                    event.preventDefault();
                    event.stopPropagation();


                } else {
                    form.classList.add('was-validated');

                }
            },
            false
        );
    }
})();

