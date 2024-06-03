
function attachTask(task, target) {
    let targ;
    globalThis.tasksDataController.getTask(task.id).then((response) => {
        let taskData = response[0];

        if (targ = target.closest("#current-task-block")) {

            taskData.current = true;

            if (taskData.taskBoxId != 0) {
                if (taskData.done) {
                    taskData.done = false;
                    task.classList.remove('taskcomplete')
                }

                
                globalThis.tasksDataController.getTaskBox(taskData.taskBoxId).then((response) => {
                    task.innerHTML = getCurrentTaskHtml(response[0].title.slice(0, 3), taskData.text);

                });
            }

        } else if (targ = target.closest(".task-block").querySelector('.task_block_list')) {


            if (taskData.current) {

                taskData.current = false;
                task.innerHTML = getBoxedTaskHtml(taskData.text);
            }
            let taskboxid = targ.id.slice(7, 8);
            if (taskData.taskBoxId != taskboxid) {
                taskData.taskBoxId = taskboxid;
            }
        }



        globalThis.tasksDataController.updateTask(taskData).then(() => {
            if (targ) {
                targ.appendChild(task);
            }
        });

    });
}



function dragTask(event) {
    // Adding dragging class to task after a delay
    setTimeout(() => event.target.classList.add("dragging"), 0);
}

function dragendTask(event) {
    event.target.classList.remove("dragging");
}

function dragOverTasklist(event) {
    event.preventDefault();
    const draggingtask = document.querySelector(".dragging");
    // Getting all tasks except currently dragging and making array of them
    let siblings = [...event.target.querySelectorAll(".task:not(.dragging)")];

    // Finding the sibling after which the dragging task should be placed
    let nextSibling = siblings.find(sibling => {
        return event.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });
    // Inserting the dragging task before the found sibling
    event.target.insertBefore(draggingtask, nextSibling);
}

function dragEnterTasklist(event) {
    e.preventDefault()
}
