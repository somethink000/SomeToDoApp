
function attachTask(task, target) {
    let targ;
    globalThis.tasksDataController.getTask(task.id).then((response) => {
        let taskData = response[0];

        if (targ = target.closest("#current-task-block")) {

            taskData.current = true;

            if (taskData.taskBoxId != 0) {
                if (taskData.done) {
                    taskData.done = false;
                    task.classList.remove('taskcomplete')
                }


                globalThis.tasksDataController.getTaskBox(taskData.taskBoxId).then((response) => {
                    task.innerHTML = getCurrentTaskHtml(response[0].title.slice(0, 3), taskData.text);

                });
            }

        } else if (targ = target.closest(".task-block")) {


            if (taskData.current) {

                taskData.current = false;
                task.innerHTML = getBoxedTaskHtml(taskData.text);
            }
            let taskboxid = targ.id.slice(7, 8);
            if (taskData.taskBoxId != taskboxid) {
                taskData.taskBoxId = taskboxid;
            }
        }



        globalThis.tasksDataController.updateTask(taskData).then(() => {
            if (targ) {
                targ.appendChild(task);
            }
        });

    });
}