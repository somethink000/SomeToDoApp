


const func = async () => {
    const response = await window.tasksDataController.get();
    console.log(response) // prints out 'pong'

    var taskboxes = response;
    const tasks_place = document.getElementById('tasks_place')

    taskboxes.forEach((taskbox, index) => {
        addTaskBox(taskbox, index);
    });
}

func()


function updateData() {
    
    globalThis.tasksDataController.update(taskboxes).then(() => {
        
    }); 
}


