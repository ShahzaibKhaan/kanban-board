const todo = document.querySelector('#pending');
const progress = document.querySelector('#progress');
const complete = document.querySelector('#complete');

let dragElement =null;
console.log(
    complete, todo,progress
)
const task = document.querySelectorAll('.task')
task.forEach(task => {
    task.addEventListener("drag", (e) => {
        // console("dragging", e)
        dragElement= task;

    })
})
function addDragEventOnColumn(column){
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    })
    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
    })
    column.addEventListener("dragover", (e) =>{
        e.preventDefault();
    })
    column.addEventListener("drop", (e) =>{
        e.preventDefault();
        console.log("Dropped",dragElement, column );
        
        column.appendChild(dragElement)
        column.classList.remove("hover-over");
    })
}
addDragEventOnColumn(todo);
addDragEventOnColumn(progress);
addDragEventOnColumn(complete);


