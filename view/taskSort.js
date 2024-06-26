
function syncTasksSort(task){

    globalThis.tasksDataController.getTask( task.id ).then((res) => {
        let taskData = res[0];
        let list;
        let taskes;

       

        list = document.getElementById('taskbox'+taskData.taskBoxId)//.querySelector('.task_block_list')
        taskes = list.getElementsByTagName("li");
        
        for (var i = 0; i < taskes.length; ++i) {

            globalThis.tasksDataController.updateTaskSort( taskes[i].id, i ).then((res) => {
            
            });
        }


        let parentList = task.parentNode;
        // console.log(task.parentNode);
        if (taskData.taskBoxId != parentList.parentNode.id.slice(7, 8)) {

            taskes = parentList.getElementsByTagName("li");
            
            for (var i = 0; i < taskes.length; ++i) {

                globalThis.tasksDataController.updateTaskSort( taskes[i].id, i ).then((res) => {
                    
                });
            }
        } 
        

    });

}

function syncTasksAttach(taskBeforeBox){

    globalThis.tasksDataController.getTask( task.id ).then((res) => {
        let taskData = res[0];
        let list;
        let taskes;

       

        list = document.getElementById('taskbox'+taskData.taskBoxId)//.querySelector('.task_block_list')
        taskes = list.getElementsByTagName("li");
        
        for (var i = 0; i < taskes.length; ++i) {

            globalThis.tasksDataController.updateTaskSort( taskes[i].id, i ).then((res) => {
            
            });
        }


        let parentList = task.parentNode;
        // console.log(task.parentNode);
        if (taskData.taskBoxId != parentList.parentNode.id.slice(7, 8)) {

            taskes = parentList.getElementsByTagName("li");
            
            for (var i = 0; i < taskes.length; ++i) {

                globalThis.tasksDataController.updateTaskSort( taskes[i].id, i ).then((res) => {
                    
                });
            }
        } 
        

    });
}

function attachTask(task, target, init) {
    let targ;
    globalThis.tasksDataController.getTask(task.id).then((response) => {
        let taskData = response[0];
        
        if (targ = target.closest("#current-task-block")) {
            targ = targ.querySelector('.task_block_list')
            taskData.current = true;

            if (taskData.taskBoxId != 0) {
                if (taskData.done) {
                    taskData.done = false;
                    task.classList.remove('taskcomplete')
                }

                
                globalThis.tasksDataController.getTaskBox(taskData.taskBoxId).then((response) => {
                    task.innerHTML = getCurrentTaskHtml(response[0].title.slice(0, 3), taskData.text);

                });
            }else {
                task.innerHTML = getCurrentTaskHtml(" ", taskData.text);
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
                targ.append(task);
                if (!init){
                    syncTasksSort(task);
                }
                
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
    syncTaskPlaceSort(event.target);
}

function dragOverTasklist(event) {
    event.preventDefault();
    const draggingtask = document.querySelector(".dragging");
    // Getting all tasks except currently dragging and making array of them
    let siblings = [...event.target.querySelectorAll(".task:not(.dragging)")];

    // Finding the sibling after which the dragging task should be placed
    let nextSibling = siblings.find(sibling => {
        // console.log();
        return event.clientY + event.target.scrollTop <= sibling.offsetTop + sibling.offsetHeight / 4;
    });

    // let taskbox = (event.target.closest(".task-block"))

    if (nextSibling) {
        event.target.insertBefore(draggingtask, nextSibling);
    }else if (event.target.classList.contains("task_block_list")) {
        // taskbox.querySelector('.task_block_list')
        event.target.appendChild(draggingtask, nextSibling);
    }


}

function dragEnterTasklist(event) {
    event.preventDefault()
}
