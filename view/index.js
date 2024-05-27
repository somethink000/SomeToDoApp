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


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.head-ctrl-box').addEventListener('click', e => {
        let btmName = null;
        if (e.target.classList.contains('btn')) {
            btmName = e.target.getAttribute('class').substr(4);
        } else if (e.target.parentNode.classList.contains('btn')) {
            btmName = e.target.parentNode.getAttribute('class').substr(4);
        }
        console.log(btmName);
        if (btmName) {
            globalThis.ctrls.wctrl(btmName).then((result) => {
                // if (result.class === 'max-btn') {
                //     if (result.btn === 'MAX') {
                //         document.querySelector('.' + result.class).children[0].classList.remove('fa-window-maximize');
                //         document.querySelector('.' + result.class).children[0].classList.remove('fa-window-restore');
                //     } else if (result.btn === 'UNMAX') {
                //         document.querySelector('.' + result.class).children[0].classList.remove('fa-window-restore');
                //         document.querySelector('.' + result.class).children[0].classList.remove('fa-window-maximize');
                //     }
                // }
            });
        }
    });
});



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