


async function loadPage() {
    const taskBoxes = await window.tasksDataController.taskBoxes();
    
    const tasks_place = document.getElementById('tasks_place')

    taskBoxes.forEach((taskbox) => {
        // addTaskBox(taskbox, index);
        console.log(taskbox);
    });


    const tasks = await window.tasksDataController.tasks();

}

loadPage()


// function updateData() {
    
//     globalThis.tasksDataController.update(taskboxes).then(() => {
        
//     }); 
// }


