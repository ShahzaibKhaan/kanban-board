const todo = document.querySelector('#pending');
const progress = document.querySelector('#progress');
const complete = document.querySelector('#complete');

let dragElement = null;
console.log(
    complete, todo, progress
)
const task = document.querySelectorAll('.task')
task.forEach(task => {
    task.addEventListener("drag", (e) => {
        // console("dragging", e)
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

        [todo, progress, complete].forEach (col =>{
            const tasks = col.querySelectorAll(".task");
            const count = col.querySelector(".right");

            
             count.innerHTML= tasks.length;
        })
    })
}
addDragEventOnColumn(todo);
addDragEventOnColumn(progress);
addDragEventOnColumn(complete);


const dlt = document.querySelector('.task');
const removeBtn = document.getElementById('remove-btn')
function deleteBox(box) {
    box.addEventListener("click", () => {
        dlt.remove("task");
    })
}

deleteBox(removeBtn);

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
    const dlt = document.querySelector('.task');
    const removeBtn = document.querySelector('#remove-btn')
    function deleteBox(box) {
        box.addEventListener("click", () => {
            dlt.remove("task");
        })
    }
    [todo, progress, complete].forEach (col =>{
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelectorAll(".right");

         count.innerHTML= tasks.length;
    })
    deleteBox(removeBtn);
    div.addEventListener("drag" ,(e) =>{
        dragElement =div;
    })
});