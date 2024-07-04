
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

function attachTask( task, target, isload ) {

    let targ;
        
    if (targ = target.querySelector('.task_block_list')) {

        //attaching task after validate & before task features for correct sort
        targ.appendChild(task);

        globalThis.tasksDataController.getTask(task.id).then((response) => {

            let taskData = response[0];

            if (target.id.slice(7, 8) > 0) {

                if (taskData.current) {
                    
                    taskData.current = false;
                    task.innerHTML = getBoxedTaskHtml(taskData.text);
                }
                let taskboxid = target.id.slice(7, 8);
                if (taskData.taskBoxId != taskboxid) {
                    taskData.taskBoxId = taskboxid;
                }
                
            } else {
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
            }
            
            // globalThis.tasksDataController.updateTask(taskData).then(() => {
                if (targ && !isload) {
                    
                    syncTasksSort(task);
                    
                    globalThis.tasksDataController.updateTask(taskData).then((res) => {
                        console.log(taskData)
                    });
                }
            // });

        });
    }

    

}





function dragTask(event) {
    // Adding dragging class to task after a delay
    // if (event.target.classList.contains("task")) {
        setTimeout(() => event.target.classList.add("dragging"), 0);
    // }
}

function dragendTask(event) {
    
    let taskList;
    let task = event.target;

    task.classList.remove("dragging");

    syncTasksSort(task);

    if (taskList = task.parentNode.parentNode) {
        
        globalThis.tasksDataController.getTask(task.id).then((response) => {

            let taskData = response[0];
            // console.log(taskList);
            if (taskList.id.slice(7, 8) > 0) {

                if (taskData.current) {

                    taskData.current = false;
                    task.innerHTML = getBoxedTaskHtml(taskData.text);
                }
                let taskboxid = taskList.id.slice(7, 8);
                if (taskData.taskBoxId != taskboxid) {
                    taskData.taskBoxId = taskboxid;
                }
                
            } else {
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
            }
            
            globalThis.tasksDataController.updateTask(taskData).then((res) => {

            });
            
        });
    }
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
    if (!draggingtask.classList.contains("task")) return;
  
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
