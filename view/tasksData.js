


const func = async () => {
    const response = await window.tasksDataController.getTasksData();
    console.log(response) // prints out 'pong'

    var taskboxes = response;
    const tasks_place = document.getElementById('tasks_place')

    taskboxes.forEach((taskbox, index) => {
        addTaskBox(taskbox, index);
    });
}

func()
