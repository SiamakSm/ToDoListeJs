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

(function () {
    inputSearch = document.getElementById("inputSearch");
    suggestions = document.getElementById("suggestions");
    taskSelected = document.getElementById("taskSelected");

    inputSearch.addEventListener("input", autoCompleteChange);
    suggestions.addEventListener("click", selectItem);

    function autoCompleteChange({ target }) {
        let data = target.value;
        suggestions.innerHTML = ``;
        if (data.length !== 0) {
            let autoCompleteValues = autoComplete(data);
            autoCompleteValues.forEach(value => addItem(value.text));
        };
    };

    function autoComplete(inputValue) {
        return tasks.filter(task =>
            task.text.toLowerCase().includes(inputValue.toLowerCase())
        );
    }


    function addItem(inputValue) {
        const li = document.createElement("li");
        li.textContent = inputValue;
        suggestions.appendChild(li);
    };


    function selectItem({ target }) {
        let r = tasks.find(task => task.text.toLowerCase() === target.textContent.toLowerCase());
        suggestions.textContent = `You have ${r.status} the task ${r.text}`;

    };

})();

