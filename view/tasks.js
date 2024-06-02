
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
            <img class="circle_image_button" src="./assets/cross.png" width="16" onclick="removeTaskBox(event)"/>
            
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

    task.innerHTML = `
        
        <p class="txt">${taskdata.text}</p>
        <div class="task_acts">
            <img class="circle_image_button" src="./assets/cross.png" width="16" onclick="removeTask(event)"/>
            <img class="circle_image_button" src="./assets/check.png" width="16" onclick="checkTask(event)"/>
        </div>
    `;

    
    if (taskdata.done) {
        task.classList.add('taskcomplete')
    }

    if (taskdata.current || boxid == 0) {
        attachTask( task, document.getElementById("current-task-block") )
    } else {
        attachTask( task, document.getElementById("taskbox"+boxid) )
    }
}


function checkTask(event){
    let parentTask = event.target.parentNode.parentNode
    
    globalThis.tasksDataController.getTask( parentTask.id ).then((response) => {
       
        let taskData = response[0];
        
        if (taskData.done){
        
            taskData.done = false;
            parentTask.classList.remove('taskcomplete') 

            globalThis.tasksDataController.updateTask( taskData ).then(() => {
            
            }); 

        }else{
            
            taskData.done = true;
            parentTask.classList.add('taskcomplete')
            
            globalThis.tasksDataController.updateTask( taskData ).then(() => {
            
            }); 

            if (taskData.current){
                
                if (taskData.taskBoxId != 0){
                    attachTask( parentTask, document.getElementById("taskbox"+taskData.taskBoxId) )
                    // document.getElementById("taskbox"+taskData.taskBoxId).appendChild(parentTask);
                }
            }
        }
        
       
    
    }); 
    
    
}
function removeTask(event){
    let parentTask = event.target.parentNode.parentNode
    
    globalThis.tasksDataController.removeTask( parentTask.id ).then(() => {
        parentTask.remove();
    }); 
   
    
}


function createNewTask(title, curr, box){

    globalThis.tasksDataController.createTask( title, curr, box ).then(() => {

        // let boxToAttach = document.getElementById("taskbox"+box);
        // if (box == 0) boxToAttach = document.getElementById("");
        
        globalThis.tasksDataController.getLastTask().then((responce) => {
            let newtask = responce[0]
            addTask(newtask, newtask.taskBoxId);
        }); 
    }); 
}


function attachTask( task, target ){
    let targ;
    globalThis.tasksDataController.getTask( task.id ).then((response) => {
        let taskData = response[0];

        if (targ = target.closest("#current-task-block")) {

            taskData.current = true;
            
            if (taskData.taskBoxId != 0) {
                if (taskData.done){
                    taskData.done = false;
                    task.classList.remove('taskcomplete')
                }
                
               
                globalThis.tasksDataController.getTaskBox( taskData.taskBoxId ).then((response) => {
                    task.innerHTML = `
                        <p class="txt taskcat">${response[0].title.slice( 0, 3 )}</p>
                        <p class="txt">${taskData.text}</p>
                        <div class="task_acts">
                            <img class="circle_image_button" src="./assets/cross.png" width="16" onclick="removeTask(event)"/>
                            <img class="circle_image_button" src="./assets/check.png" width="16" onclick="checkTask(event)"/>
                        </div>
                    `;
                });
            }
           
        

        } else if(targ = target.closest(".task-block")) {

            if (taskData.current) {

                taskData.current = false;
                task.innerHTML = `
                    <p class="txt">${taskData.text}</p>
                    <div class="task_acts">
                        <img class="circle_image_button" src="./assets/cross.png" width="16" onclick="removeTask(event)"/>
                        <img class="circle_image_button" src="./assets/check.png" width="16" onclick="checkTask(event)"/>
                    </div>
                `;
            }
            let taskboxid = targ.id.slice(7, 8);
            if (taskData.taskBoxId != taskboxid){
                taskData.taskBoxId = taskboxid;
            }
        } 
        
        

        globalThis.tasksDataController.updateTask( taskData ).then(() => {
            if (targ) {
                targ.appendChild(task);
            }
        }); 
        
    });
}

function createTaskBox(event){
    var input = document.getElementById("newTaskBoxInput");

    globalThis.tasksDataController.createTaskBox( input.value ).then(() => {

        globalThis.tasksDataController.getLastTaskBox( ).then((response) => {
            
            let lastTaskBox = response[0]
            event.target.closest(".createTaskbox").remove()
            addTaskBox(lastTaskBox)
        }); 
    }); 
}


function removeTaskBox(event){
    let parentTask = event.target.parentNode.parentNode
    let taskBoxId = parentTask.id.slice(7,8)
    
    globalThis.tasksDataController.removeTasksByBox( taskBoxId ).then(() => {
        globalThis.tasksDataController.removeTaskBox( taskBoxId ).then(() => {
            parentTask.remove();
        });
    }); 
   
    
}