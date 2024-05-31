


async function loadPage() {

    const tasks_place = document.getElementById('tasks_place')
    const taskBoxes = await window.tasksDataController.taskBoxes();
    taskBoxes.forEach((taskbox) => {
        addTaskBox(taskbox);
    });

    const tasks = await window.tasksDataController.tasks();
    tasks.forEach((taskdata) => {
        addTask(taskdata, taskdata.taskBoxId)
    });
    
}

loadPage()


// function updateData() {
    
//     globalThis.tasksDataController.update(taskboxes).then(() => {
        
//     }); 
// }


