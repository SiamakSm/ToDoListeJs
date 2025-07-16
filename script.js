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
});

