
let tasks = [];
displayTasks();

function displayTasks() {
    let recovTasks = localStorage.getItem("Tasks");
    tasks = recovTasks ? JSON.parse(recovTasks) : [];
    let ul = document.getElementById("myListe");
    ul.innerHTML = "";
    tasks.forEach((task, index) => {
        let newLi = document.createElement("li");
        newLi.textContent = `${index + 1}. ${task.text}  =  ${task.status} --> `;

        let deleteBtn = document.createElement("button");
        let doneBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        doneBtn.textContent = "✅";

        deleteBtn.addEventListener("click", function () {
            tasks = tasks.filter(t => t.id !== task.id);
            localStorage.setItem("Tasks", JSON.stringify(tasks));
            displayTasks();
        });
        doneBtn.addEventListener("click", function () {
            task.status = task.status === "Done" ? "Not done" : "Done";
            localStorage.setItem("Tasks", JSON.stringify(tasks));
            displayTasks();
        });

        newLi.appendChild(deleteBtn);
        newLi.appendChild(doneBtn);

        ul.appendChild(newLi);
        if (task.status === "Done") {
            newLi.style.color = "gray";
        }
    });
    document.getElementById("input").focus();
};

document.getElementById("buttonAdd").addEventListener("click", function () {
    let input = document.getElementById("input").value.trim();
    if (input == "") {
        alert("New task not found!");
    } else {
        let exists = tasks.some(t => t.text.toLowerCase() === input.toLowerCase());
        if (exists) {
            alert("Task already exists!");
            document.getElementById("input").value = "";
            return;
        };
        tasks.push({ id: Date.now(), text: input, status: "Not done" });
        localStorage.setItem("Tasks", JSON.stringify(tasks));
        displayTasks();
        document.getElementById("input").value = "";
    };
});








