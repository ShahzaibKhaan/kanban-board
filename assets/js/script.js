let tasksData = {};

const todo = document.querySelector('#pending');
const progress = document.querySelector('#progress');
const complete = document.querySelector('#complete');
const colom = [todo, progress, complete];
let dragElement = null;

if (localStorage.getItem("tasks")) {

    const data = JSON.parse(localStorage.getItem("tasks"));
    console.log(data);

    for (const col in data) {
        const colom = document.querySelector(`#${col}`);
        data[col].forEach(task => {
            const div = document.createElement("div")
            div.classList.add("task");
            div.setAttribute("draggable", "true")
            div.innerHTML = `<h3>${task.title}</h3>
                            <p>${task.desc}</p>
                            <button>Delete</button>
                        `

            colom.appendChild(div);
            div.addEventListener("drag", (e) => {
                dragElement = div;
            })
        })
        const tasks = colom.querySelectorAll(".task");
        const count = colom.querySelector(".right");
        count.innerHTML = tasks.length;
    }
}

const task = document.querySelectorAll('.task')
task.forEach(task => {
    task.addEventListener("drag", (e) => {
        dragElement = task;
    })
})
function addDragEventOnColumn(column) {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    })
    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
    })
    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    })
    column.addEventListener("drop", (e) => {
        e.preventDefault();
        console.log("Dropped", dragElement, column);

        column.appendChild(dragElement)
        column.classList.remove("hover-over");



        colom.forEach(col => {
            let tasks = col.querySelectorAll(".task");
            let count = col.querySelector(".right");

            tasksData[col.id] = Array.from(tasks).map(t => {
                return {
                    title: t.querySelector("h3").innerHTML,
                    desc: t.querySelector("p").innerHTML
                }
            })
            localStorage.setItem("tasks", JSON.stringify(tasksData));


            count.innerHTML = tasks.length;
        })
    })
}
addDragEventOnColumn(todo);
addDragEventOnColumn(progress);
addDragEventOnColumn(complete);

// add new button

const btn = document.querySelector('.add-new');
function addCustom(custom) {
    custom.addEventListener("click", () => {

    })
}

const openPopupBtn = document.getElementById('openPopupBtn');
const closePopupBtn = document.getElementById('closePopupBtn');
const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');
const inpt = document.querySelector('input.popup-header');
function openPopup() {
    popup.style.display = 'block';
    overlay.style.display = 'block';
}
function closePopup() {
    popup.style.display = 'none';
    overlay.style.display = 'none';
}

openPopupBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);

// Optional: Close popup when clicking outside (on the overlay)
overlay.addEventListener('click', closePopup);

// add new task

const newTask = document.getElementById('new-task');
const nameInput = document.querySelector('.title');
const discriptionInput = document.querySelector('#discription');
const inputSect = document.querySelector('popup-header')

newTask.addEventListener('click', function () {

    const name = nameInput.value;
    const discription = discriptionInput.value;

    if (name.trim() === '' || discription.trim() === '') {
        alert('Please fill in all fields.');
        return;
    }
    const div = document.createElement("div")
    div.classList.add("task");
    div.setAttribute("draggable", "true")
    div.innerHTML = `<h3>${name}</h3>
                        <p>${discription}</p>
                        <button id="remove-btn" >Delete</button>
                    `

    todo.appendChild(div);


    colom.forEach(col => {
        let tasks = col.querySelectorAll(".task");
        let count = col.querySelector(".right");

        tasksData[col.id] = Array.from(tasks).map(t => {
            return {
                title: t.querySelector("h3").innerHTML,
                desc: t.querySelector("p").innerHTML
            }
        })
        localStorage.setItem("tasks", JSON.stringify(tasksData));


        count.innerHTML = tasks.length;
    })

    const dlt = document.querySelector('.task');
    const removeBtn = document.querySelector('#remove-btn')
    function deleteBox(box) {
        box.addEventListener("click", () => {
            dlt.remove("task");
        })
    }

    // delete buttton

    deleteBox(removeBtn);
    div.addEventListener("drag", (e) => {
        dragElement = div;
    })
});