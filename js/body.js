var body = document.querySelector('.body');
var header = document.querySelector('.header');
var sidebar = document.querySelector('.sidebar');
var content = document.querySelector('.content');
var prevScrollPos = 0;

content.addEventListener('scroll', function () {

  let currentScrollPos = content.scrollTop;
  let toBottom = (content.clientHeight + currentScrollPos < content.scrollHeight);

  if (sidebar.classList.contains('hidden')) {
    if (prevScrollPos < currentScrollPos) {
      // 向上滑动
      header.classList.add('hidden');
      body.classList.add('top-hidden');
    } else if (prevScrollPos > currentScrollPos && toBottom) {
      // 向下滑动
      header.classList.remove('hidden');
      body.classList.remove('top-hidden')
    }
  }
  prevScrollPos = currentScrollPos;
});

// // 将页脚元素添加到内容容器中
// var contentContainer = document.querySelector('.content');
// var footerElement = document.querySelector('.footer');
// contentContainer.appendChild(footerElement);

//弃用
// document.addEventListener("DOMContentLoaded", function () {
//   // 获取页面容器和内容元素
//   var content = document.querySelector(".content");

//   var isDragging = false;  // 标记当前是否正在拖动

//   // 自动滚动
//   function autoScroll() {
//     content.scrollTop += 1;  // 每次滚动1像素

//     // 如果滚动到底部，则停止自动滚动
//     if (content.scrollTop + content.offsetHeight >= content.scrollHeight) {
//       cancelAnimationFrame(autoScrollInterval);
//     } else {
//       // 否则继续请求下一帧执行自动滚动
//       autoScrollInterval = requestAnimationFrame(autoScroll);
//     }
//   }

//   var autoScrollInterval = requestAnimationFrame(autoScroll);  // 开始自动滚动

//   // 监听 touch 事件
//   content.addEventListener('touchstart', function (e) {
//     cancelAnimationFrame(autoScrollInterval); // 清除自动滚动的请求动画帧
//     isDragging = true;
//   });

//   content.addEventListener('touchmove', function (e) {
//     if (!isDragging) return;

//     var touch = e.touches[0];  // 获取第一个触摸点

//     // 计算滑动距离并设置页面容器的 scrollTop
//     content.scrollTop -= touch.clientY - touch.pageY;

//     e.preventDefault();  // 阻止默认的滚动行为
//   });

//   content.addEventListener('touchend', function (e) {
//     isDragging = false;

//     // 如果滚动到底部，则停止自动滚动
//     if (content.scrollTop + content.offsetHeight >= content.scrollHeight) {
//       cancelAnimationFrame(autoScrollInterval);
//     } else {
//       // 否则继续请求下一帧执行自动滚动
//       autoScrollInterval = requestAnimationFrame(autoScroll);
//     }
//   });
// });
