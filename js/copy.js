var section = Array.prototype.slice.call(document.querySelectorAll('.section'));
var roundbox = document.querySelector('.roundbox');
var sectionhight = document.querySelector('.section').clientHeight;
//添加右侧翻页节点
for (let i = 0; i < section.length; i++) {
    let new_rounder = document.createElement("div");
    new_rounder.setAttribute("class", "rounder");
    roundbox.appendChild(new_rounder);
};
//选中checked后去除视觉差库
$("input").click(function () {
    // ios适配
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
              if (permissionState === 'granted') {
                // handle data
              } else {
                // handle denied
              }
            })
            .catch((err) => {
                alert('err',err)
            });
        } else {
          alert('DeviceOrientationEvent.requestPermission is not a function!')
        }
    let this_card = $(this).next()[0];
    let this_screen = $("input").index($(this));
    if (this.checked) {
        this_card.vanillaTilt.destroy();
        document.removeEventListener('wheel', disable_scroll);
        $(this.parentNode).siblings().hide();
    } else {
        // document.documentElement.scrollTop = 0;
        $(this.parentNode).siblings().show();
        document.documentElement.setAttribute('style', 'scroll-behavior: auto;');
        document.documentElement.scrollTop = sectionhight * this_screen;
        document.addEventListener('wheel', disable_scroll, {
            passive: false
        });
        VanillaTilt.init(this_card, {
            max: 25,
            speed: 400,
            transition: false,
        });
    }
}
)
//点击rounder之后添加样式并跳转
var rounders = $('.rounder');
rounders.click(function () {
    let i = $(this).index();
    for (let j = 0; j < rounders.length; j++) {
        rounders[j].className = 'rounder';
    }
    document.documentElement.setAttribute('style', 'scroll-behavior: smooth;');
    rounders[i].className += ' rounderhover';
    document.documentElement.scrollTop = i * sectionhight;
});
//js视觉差库
var cardlist = document.querySelectorAll('.card');
for (let i = 0; i < cardlist.length; i++) {
    VanillaTilt.init(cardlist[i], {
        max: 25,
        speed: 400,
        perspective: 1500,
        transition: false,
        gyroscopeSamples: 1,
    });
};
//固定屏幕
function disable_scroll(e) {
    e.preventDefault();
}
document.addEventListener('wheel', disable_scroll, {
    passive: false
});
//判断默认第几屏给对应rounder添加样式
var roundnum = Array.prototype.slice.call(document.querySelectorAll('.rounder'));
var which_rounder = Math.round((window.pageYOffset / sectionhight).toFixed(2));
for (const i of roundnum) {
    i.className = 'rounder';
    roundnum[which_rounder].className += ' rounderhover';
}
//适配
// if (typeof DeviceOrientationEvent.requestPermission === 'function') {
//     DeviceOrientationEvent.requestPermission()
//         .then(permissionState => {
//           if (permissionState === 'granted') {
//             // handle data
//           } else {
// 			// handle denied
//           }
//         })
//         .catch((err) => {
//             alert('err',err)
//         });
//     } else {
//       alert('DeviceOrientationEvent.requestPermission is not a function!')
//     }