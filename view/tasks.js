var tasks = [
    {done: false, current: false, boxid: 0, text: 'сделать те самые штуки'},
    {done: false, current: false, boxid: 1, text: 'сделать те самые штуки и те ещё и те'},
    {done: false, current: false, boxid: 0, text: 'приготовить плоф'},
    {done: false, current: true, boxid: 0, text: 'покушоть'},
    {done: true, current: false, boxid: 0, text: 'скибиди доп доп '},
];


function addTask(taskdata, index){

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
        document.getElementById("taskbox"+taskdata.boxid).append(task);
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

    tasks.push({done: true, current: curr, boxid: box, text: title});
    addTask(taskdata, index)
}