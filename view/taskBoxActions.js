

function createTaskBox(event) {
    var input = document.getElementById("newTaskBoxInput");

    globalThis.tasksDataController.createTaskBox(input.value, 0).then(() => {

        globalThis.tasksDataController.getLastTaskBox().then((response) => {

            let lastTaskBox = response[0]
            event.target.closest(".createTaskbox").remove()
            addTaskBox(lastTaskBox)
            syncTaskBoxesSort()
        });
    });
}


function removeTaskBox(event) {
    let parentTaskbox = event.target.parentNode.parentNode.parentNode.parentNode
    let taskBoxId = parentTaskbox.id.slice(7, 8)

    globalThis.tasksDataController.removeTasksByBox(taskBoxId).then(() => {
        globalThis.tasksDataController.removeTaskBox(taskBoxId).then(() => {
            parentTaskbox.remove();
        });
    });


}


function createTaskForBox(event) {
    
    var input = document.getElementById("newTaskBoxInput");
    var taskBox = event.target.closest(".createTaskbox")
    
    createNewTask(input.value, false, taskBox.id)
    taskBox.remove();
}


function closeCreateTaskBox(event) {
    
    event.target.closest(".createTaskbox").remove();
}

function forseCreateTask(event){
    
    if (event.key === "Enter") {
        var input = event.target
        var parent = input.parentNode;
        event.preventDefault();


        if (parent.id == 0 ){
            createNewTask(input.value, true, parent.id);
            input.value = "";
        }else{
            createNewTask(input.value, false, parent.id);
            parent.remove();
        }
        
    }
}

function createTaskWindow(event) {
    let parentTaskbox = event.target.parentNode.parentNode.parentNode.parentNode
    let taskBoxId = parentTaskbox.id.slice(7, 8)
    
    

    let taskInput = document.createElement('div');
    taskInput.setAttribute('class', "task_form main-border");
    taskInput.setAttribute('id', taskBoxId);

    taskInput.innerHTML = `
            <input class="task_input" type="text" id="forceTask" placeholder="New task" onkeypress="forseCreateTask(event)">
    `;
   
    parentTaskbox.querySelector(".task-block-name").insertBefore(taskInput, parentTaskbox.querySelector(".dropdown"));
    
}