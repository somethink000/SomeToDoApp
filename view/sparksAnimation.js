document.addEventListener("DOMContentLoaded", () => {

    // 
    // <div class="particles_container">
    //     <?php for ($i = 1; $i <= 100; $i++) { ?>   
    //         <div class="circle-container">
    //             <div class="circle"></div>
    //         </div>
    //     <?php } ?>
    // </div>
    const sparksContainer = document.getElementById("particles_container");
    for ($i = 1; $i <= 100; $i++) { 
        let div = document.createElement('div');
        div.setAttribute('class', 'circle-container');
        div.innerHTML = `<div class="circle"></div>`

        sparksContainer.append(div);
    }   
});