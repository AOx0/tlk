let activeBin = ""
let activeHTML = ""


async function getServerResponse(ccgen = false) {
    let fetch = setInterval(function () {
        const response = document.querySelector("body > iframe").contentDocument.querySelector("body > h1")
        if (response && (!ccgen || response.innerHTML.startsWith(activeBin) === true )) {
            document.querySelector("#r").innerHTML = response.innerHTML
            activeHTML = document.querySelector("#r").innerHTML
            clearInterval(fetch)
        }
    }, 10)
}

document.onkeypress = function (e) {
    switch (e.key) {
        case "Enter":
            if (document.querySelector('#generar-cc')) {
                document.querySelector('#generar-cc').dispatchEvent(new Event("click"))
            } else if (document.querySelector('#generar-extra')) {

                if (document.getElementById('cc1').value !== "" && document.getElementById('cc2').value === "") {
                    document.getElementById('cc2').focus()
                    document.getElementById('cc2').select()
                } else if (document.getElementById('cc1').value !== "" && document.getElementById('cc2').value !== "") {
                    document.querySelector('#generar-extra').dispatchEvent(new Event("click"))
                }
            }
    }
};



