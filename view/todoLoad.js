

function getCurrentTaskHtml(prefix, text) {

    return `
        <p class="txt taskcat">${prefix}</p>
        <p class="txt">${text}</p>
        <div class="task_acts">
            <img class="circle_image_button" src="./assets/cross.png" width="16" onclick="removeTask(event)"/>
            <img class="circle_image_button" src="./assets/check.png" width="16" onclick="checkTask(event)"/>
        </div>
    `;
}

function getBoxedTaskHtml(text) {
    return `
        <p class="txt">${text}</p>
        <div class="task_acts">
            <img class="circle_image_button" src="./assets/cross.png" width="16" onclick="removeTask(event)"/>
            <img class="circle_image_button" src="./assets/left.png" width="16" onclick="forceCurrent(event)"/>
            <img class="circle_image_button" src="./assets/check.png" width="16" onclick="checkTask(event)"/>
        </div>
    `;
}

// <li class="item" draggable="true">
// <div class="details">
//     <img src="images/img-1.jpg">
//     <span>Kristina Zasiadko</span>
// </div>
// <i class="uil uil-draggabledots"></i>
// </li>

function addTaskBox(taskbox) {

    let div = document.createElement('div');
    div.setAttribute('class', 'task-block bl-box main-border');
    // div.setAttribute('ondrop', "drop(event)");
    // div.setAttribute('', "allowDrop(event)");
    // div.setAttribute('draggable', "true");
    // div.setAttribute('ondragstart', "drag(event)");
    div.setAttribute('id', "taskbox" + taskbox.id);
    div.innerHTML = `
        <div class="task-block-name">
            <p class="title">${taskbox.title}</p>
            <img class="circle_image_button" src="./assets/dots.png" width="20" onclick="removeTaskBox(event)"/>
        </div>

        <div class="baseline"><div class="baseline_line"></div></div>

        <ul class="task_block_list" ondragover="dragOverTasklist(event)" ondragenter="dragEnterTasklist(event)"> 

        </ul>
    `;


    tasks_place.append(div);

}

function addTask(taskdata, boxid) {
    let task = document.createElement('li');
    task.setAttribute('class', "task main-border");
    task.setAttribute('draggable', "true");
    task.setAttribute('ondragstart', "dragTask(event)");
    task.setAttribute('ondragend', "dragendTask(event)");
    task.setAttribute('id', taskdata.id); 

    task.innerHTML = getBoxedTaskHtml(taskdata.text);

    if (taskdata.done) {
        task.classList.add('taskcomplete')
    }

    if (taskdata.current || boxid == 0) {
        attachTask(task, document.getElementById("current-task-block"))
    } else {
        attachTask(task, document.getElementById("taskbox" + boxid))
    }
}


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





