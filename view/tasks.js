

function addTaskBox(taskbox) {
    
    let div = document.createElement('div');
    div.setAttribute('class', 'task-block bl-box main-border');
    div.setAttribute('ondrop', "drop(event)");
    div.setAttribute('ondragover', "allowDrop(event)");
    div.setAttribute('draggable', "true");
    div.setAttribute('ondragstart', "drag(event)");
    div.setAttribute('id', "taskbox"+taskbox.id);
    div.innerHTML = `
        <div class="task-block-name">
            <p class="title">${taskbox.title}</p>
        </div>

        <div class="baseline"><div class="baseline_line"></div></div>
    `;
    

    tasks_place.append(div);

}

function addTask(taskdata, boxid) {
    let task = document.createElement('div');
    task.setAttribute('class', "task main-border");
    task.setAttribute('draggable', "true");
    task.setAttribute('ondragstart', "drag(event)");
    task.setAttribute('id', taskdata.id);
    // task.addEventListener("click", checkTask);
    task.innerHTML = `
        <p class="txt">${taskdata.text}</p>
        <img class="circle_image_button" src="./assets/check.png" width="26" onclick="checkTask(event)"/>
    `;

    
    if (taskdata.done) {
        task.classList.add('taskcomplete')
    }

    if (taskdata.current) {
        document.getElementById("current-task-block").append(task);
    } else {
        document.getElementById("taskbox"+boxid).append(task);
    }
}


function checkTask(event){
    let parentTask = event.target.parentNode
    //updateData()
    let taskboxid = getTaskBoxId(parentTask.parentNode);
    if (tasks[parentTask.id].done){
        
        tasks[parentTask.id].done = false;
        parentTask.classList.remove('taskcomplete') 
    }else{
        
        tasks[parentTask.id].done = true;
        parentTask.classList.add('taskcomplete')
        
        if (tasks[parentTask.id].current){

            document.getElementById("taskbox"+tasks[parentTask.id].boxid).appendChild(parentTask);
            tasks[parentTask.id].current = false;
        }
    }
    
    // tasks[parentTask.id].done = ;
    
}

function createNewTask(title, curr, box){

    globalThis.tasksDataController.createTask( title, curr, box ).then((response) => {

        // let boxToAttach = document.getElementById("taskbox"+box);
        // if (box == 0) boxToAttach = document.getElementById("");

        globalThis.tasksDataController.getLastTask( ).then((response) => {

        }); 
            
        // getTask
        // addTask(takdata, box);
        
    }); 

    // window.tasksDataController.createTask();


    // var takdata = taskboxes[0].tasks.push({done: false, current: curr, boxid: 0, text: title});
    // console.log(taskboxes[0].tasks[takdata - 1]);
    
}