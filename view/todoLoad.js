

function getCurrentTaskHtml(prefix, text) {

    return `
        <p class="txt taskcat">${prefix}</p>
        <p class="txt">${text}</p>
        <div class="task_acts">
            <img class="circle_image_button" src="./assets/cross.png" width="16" onclick="removeTask(event)" ondragstart="event.preventDefault(); event.stopPropagation();"/>
            <img class="circle_image_button" src="./assets/check.png" width="16" onclick="checkTask(event)" ondragstart="event.preventDefault(); event.stopPropagation();"/>
        </div>
    `;
}

function getBoxedTaskHtml(text) {
    return `
        <p class="txt">${text}</p>
        <div class="task_acts">  
            <img class="circle_image_button" src="./assets/cross.png" width="16" onclick="removeTask(event)" ondragstart="event.preventDefault(); event.stopPropagation();"/>
            <img class="circle_image_button" src="./assets/left.png" width="16" onclick="forceCurrent(event)" ondragstart="event.preventDefault(); event.stopPropagation();"/>
            <img class="circle_image_button" src="./assets/check.png" width="16" onclick="checkTask(event)" ondragstart="event.preventDefault(); event.stopPropagation();"/>
        </div>
    `;
}
//<img class="circle_image_button" src="./assets/cross.png" width="16" onclick="removeTask(event)"/>


function addTaskBox(taskbox) {

    let div = document.createElement('li');
    div.setAttribute('class', 'task-block bl-box main-border');
    div.setAttribute('draggable', "true");
    div.setAttribute('ondragstart', "dragTaskBox(event)");
    div.setAttribute('ondragend', "dragendTaskBox(event)");
    div.setAttribute('id', "taskbox" + taskbox.id);
    div.innerHTML = `
        <div class="task-block-name">
            <p class="title">${taskbox.title}</p>

            <div class="dropdown">

                <img class="circle_image_button" src="./assets/dots.png" width="20"/>

                <div class="dropdown-content">
                    <a href="#" onclick="removeTaskBox(event)">Delete</a>
                    <a href="#" onclick="createTaskWindow(event)">NewTask</a>
                </div>
            </div>

            
        </div>

        <div class="baseline"><div class="baseline_line"></div></div>

        <ul class="task_block_list" ondragover="dragOverTasklist(event)" ondragenter="dragEnterTasklist(event)"> 

        </ul>
    `;


    tasks_place.append(div);
    
}

function addTask(taskdata, boxid, init) {
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

    
    attachTask( task, document.getElementById("taskbox" + boxid), true )
   

    
}

function loadTasks(boxid){
     
    
    globalThis.tasksDataController.tasksByBlock( boxid ).then((res) => {
          
        res.sort(function(a, b) { 
            return a.sortId - b.sortId;
        });

        for (var i = 0; i < res.length; ++i) {
            let taskdata = res[i];
            
            if (taskdata.current == 1) {
                addTask(taskdata, 0, true)
            }else{
                addTask(taskdata, taskdata.taskBoxId, true)
            }
            
        }
        
    });
}


async function loadPage() {

    const tasks_place = document.getElementById('tasks_place')

    var taskBoxes = await window.tasksDataController.taskBoxes();

    taskBoxes.sort(function(a, b) { 
        return a.sortId - b.sortId;
    });

    loadTasks(0)

    taskBoxes.forEach((taskbox) => {
        addTaskBox(taskbox);
        loadTasks(taskbox.id)
    });
    
}

loadPage()





