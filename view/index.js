

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {

    var targ; 
    var dragiable = document.getElementById(ev.dataTransfer.getData("text"));

    if (dragiable.classList.contains("task-block")) {
        
        targ = dragiable.parentNode;
    }else{

        if (targ = ev.target.closest("#current-task-block")) {
            tasks[dragiable.id].current = true;
            if (tasks[dragiable.id].done){
                tasks[dragiable.id].done = false;
                dragiable.classList.remove('taskcomplete')
            }
        } else if(targ = ev.target.closest(".task-block")) {
            if (tasks[dragiable.id].current) {
                tasks[dragiable.id].current = false;
            }
        } 
    }

    if (targ) {
        ev.preventDefault();
        targ.appendChild(dragiable);
    }
}



var input = document.getElementById("forceTask");


input.addEventListener("keypress", function(event) {
  
  if (event.key === "Enter") {
    
    event.preventDefault();
    
    createNewTask(input.value, true, 0)
    input.value = "";
  }
});






