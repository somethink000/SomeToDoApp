
function createNewTask(title, curr, box) {

    globalThis.tasksDataController.createTask(title, curr, box).then(() => {

        globalThis.tasksDataController.getLastTask().then((responce) => {
            let newtask = responce[0]
            addTask(newtask, newtask.taskBoxId);
        });
    });
}
  

function forceCurrent( event ) {
    let parentTask = event.target.parentNode.parentNode
    attachTask(parentTask, document.getElementById("taskbox0"), false)
}


function checkTask(event) {
    let parentTask = event.target.parentNode.parentNode
    
    globalThis.tasksDataController.getTask(parentTask.id).then((response) => {

        let taskData = response[0];

        if (taskData.done) {
            
            taskData.done = false;
            parentTask.classList.remove('taskcomplete')
            
            globalThis.tasksDataController.updateTask(taskData).then(() => {
                
            });

        } else {

            taskData.done = true;
            parentTask.classList.add('taskcomplete')

            globalThis.tasksDataController.updateTask(taskData).then(() => {

                if (taskData.current) {
                    
                    if (taskData.taskBoxId != 0) {
                        attachTask(parentTask, document.getElementById("taskbox" + taskData.taskBoxId), false)
                    }
                }

            });

            
        }

    });


}



function removeTask(event) {
    let parentTask = event.target.parentNode.parentNode

    globalThis.tasksDataController.removeTask(parentTask.id).then(() => {
        parentTask.remove();
    });

}






