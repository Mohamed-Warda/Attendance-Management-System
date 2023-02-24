window.addEventListener('load', function () {
    check1.addEventListener('click', function () {
        this.classList.toggle("checkRed");
        if (this.classList.contains("checkRed")) {
            mainBranchSection.style.display = 'block';
        }
        else {
            mainBranchSection.style.display = 'none';
        }

    })
    check2.addEventListener('click', function () {
        this.classList.toggle("checkBlue")
        if (this.classList.contains("checkBlue")) {
            for (var i = 1; i < document.getElementsByTagName("section").length; i++) {
                if (!document.getElementsByTagName("section")[i].classList.contains("mainBranchSection")) {
                    document.getElementsByTagName("section")[i].style.display = 'block';
                }
            }
        }
        else {
            for (var i = 1; i < document.getElementsByTagName("section").length; i++) {
                if (!document.getElementsByTagName("section")[i].classList.contains("mainBranchSection")) {
                    document.getElementsByTagName("section")[i].style.display = 'none';
                }
            }
        }
    })
})
