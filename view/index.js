
var taskboxes = [
    {id : 0, title : 'fps'},
    {id : 1, title : 'tommorow'},
    {id : 2, title : 'Todo'},
    {id : 3, title : 'YD'},
];





// document.addEventListener('DOMContentLoaded', () => {
//     document.querySelector('.head-ctrl-box').addEventListener('click', e => {
//         let btmName = null;
//         if (e.target.classList.contains('btn')) {
//             btmName = e.target.getAttribute('class').substr(4);
//         } else if (e.target.parentNode.classList.contains('btn')) {
//             btmName = e.target.parentNode.getAttribute('class').substr(4);
//         }

//         if (btmName) {
//             globalThis.ctrls.wctrl(btmName).then((result) => {
//                 if (result.class === 'max-btn') {
//                     if (result.btn === 'MAX') {
//                         document.querySelector('.' + result.class).children[0].classList.remove('fa-window-maximize');
//                         document.querySelector('.' + result.class).children[0].classList.remove('fa-window-restore');
//                     } else if (result.btn === 'UNMAX') {
//                         document.querySelector('.' + result.class).children[0].classList.remove('fa-window-restore');
//                         document.querySelector('.' + result.class).children[0].classList.remove('fa-window-maximize');
//                     }
//                 }
//             });
//         }
//     });
// });


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


// function createForceTask(event){

//     console.log(event)
// }

var input = document.getElementById("forceTask");


input.addEventListener("keypress", function(event) {
  
  if (event.key === "Enter") {
    
    event.preventDefault();
    
    createNewTask(value, true)
    input.value = "";
  }
});


// document.querySelector('.head-ctrl-box').addEventListener('click', e => {
//     let btmName = null;
//     if (e.target.classList.contains('btn')) {
//         btmName = e.target.getAttribute('class').substr(4);
//     } else if (e.target.parentNode.classList.contains('btn')) {
//         btmName = e.target.parentNode.getAttribute('class').substr(4);
//     }
//     console.log(btmName);
//     if (btmName) {
//         globalThis.ctrls.wctrl(btmName).then((result) => {
//             // if (result.class === 'max-btn') {
//             //     if (result.btn === 'MAX') {
//             //         document.querySelector('.' + result.class).children[0].classList.remove('fa-window-maximize');
//             //         document.querySelector('.' + result.class).children[0].classList.remove('fa-window-restore');
//             //     } else if (result.btn === 'UNMAX') {
//             //         document.querySelector('.' + result.class).children[0].classList.remove('fa-window-restore');
//             //         document.querySelector('.' + result.class).children[0].classList.remove('fa-window-maximize');
//             //     }
//             // }
//         });
//     }
// });

// var arr = ['яблоко','груша','апельсин'];
// $(".fruits").text((i)=>arr[i]);


const tasks_place = document.getElementById('tasks_place')

taskboxes.forEach((taskbox, index) => {
    addTaskBox(taskbox, index);
});



tasks.forEach((taskdata, index) => {
    addTask(taskdata, index)
});






// document.addEventListener('DOMContentLoaded', () => {
//     document.querySelector('.head-ctrl-box').addEventListener('click', e => {
//         let btmName = null;
//         if (e.target.classList.contains('btn')) {
//             btmName = e.target.getAttribute('class').substr(4);
//         } else if (e.target.parentNode.classList.contains('btn')) {
//             btmName = e.target.parentNode.getAttribute('class').substr(4);
//         }
//         console.log(btmName);
//         if (btmName) {
//             globalThis.ctrls.wctrl(btmName).then((result) => {
//                 // if (result.class === 'max-btn') {
//                 //     if (result.btn === 'MAX') {
//                 //         document.querySelector('.' + result.class).children[0].classList.remove('fa-window-maximize');
//                 //         document.querySelector('.' + result.class).children[0].classList.remove('fa-window-restore');
//                 //     } else if (result.btn === 'UNMAX') {
//                 //         document.querySelector('.' + result.class).children[0].classList.remove('fa-window-restore');
//                 //         document.querySelector('.' + result.class).children[0].classList.remove('fa-window-maximize');
//                 //     }
//                 // }
//             });
//         }
//     });
// });



// window.addEventListener('resize', () => {
//     let btn = document.querySelector('.max-btn');
//     globalThis.ctrls.wctrl('resize').then((result) => {
//         if (result.btn === 'MAX') {
//             btn.children[0].classList.remove('fa-window-maximize');
//             btn.children[0].classList.add('fa-window-restore');
//         } else if (result.btn === 'UNMAX') {
//             btn.children[0].classList.remove('fa-window-restore');
//             btn.children[0].classList.add('fa-window-maximize');
//         }
//     });
// });