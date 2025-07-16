messageVide();

document.getElementById("button").addEventListener("click", function () {
    let input = document.getElementById("input").value.trim();
    if (input == "") {
        alert("New task not found!");
    } else {
        let ul = document.getElementById("myListe");
        let nLi = document.createElement("li");
        nLi.textContent = input;
        ul.appendChild(nLi);
        document.getElementById("input").value = "";
    };
    messageVide();
});


function messageVide() {
    if (document.getElementById("myListe").children.length == 0) {
        document.getElementById("messageV").textContent = "Not Any Tasks Yet !";
    } else {
        document.getElementById("messageV").textContent = "";
    };
};



document.getElementById("myListe").addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        event.target.remove();
    }
    messageVide();

});

