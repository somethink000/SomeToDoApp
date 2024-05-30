
// var taskboxes = [
//     {
//         title : 'fps',
//         tasks : [
//             {done: false, current: false, text: 'сделать те самые штуки'},
//             {done: false, current: false, text: 'сделать те самые штуки и те ещё и те'},
//         ]

//     },
//     {
//         title : 'tommorow',
//         tasks : [
//             {done: false, current: false, text: 'приготовить плоф'},
//             {done: false, current: true, text: 'покушоть'},
//         ]
//     },
//     {
//         title : 'Todo',
//         tasks : [
//             {done: true, current: false, text: 'скибиди доп доп '},
//         ]
        
//     },
// ];



function addTaskBox(taskbox, index) {

    let div = document.createElement('div');
    div.setAttribute('class', 'task-block bl-box main-border');
    div.setAttribute('ondrop', "drop(event)");
    div.setAttribute('ondragover', "allowDrop(event)");
    div.setAttribute('draggable', "true");
    div.setAttribute('ondragstart', "drag(event)");
    div.setAttribute('id', "taskbox"+index);
    div.innerHTML = `
        <div class="task-block-name">
            <p class="title">${taskbox.title}</p>
        </div>

        <div class="baseline"><div class="baseline_line"></div></div>
    `;
    

    tasks_place.append(div);


    taskbox.tasks.forEach((taskdata, index) => {

        addTask(taskdata, index, div);
    });

}

function addTask(taskdata, index, taskbox) {
    let task = document.createElement('div');
    task.setAttribute('class', "task main-border");
    task.setAttribute('draggable', "true");
    task.setAttribute('ondragstart', "drag(event)");
    task.setAttribute('id', index);
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
        taskbox.append(task);
    }
}


function checkTask(event){
    let parentTask = event.target.parentNode
    
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

    
    var takdata = taskboxes[0].tasks.push({done: false, current: curr, boxid: 0, text: title});
    console.log(taskboxes[0].tasks[takdata - 1]);
    addTask(taskboxes[0].tasks[takdata - 1], takdata, document.getElementById("taskbox"+0))
}