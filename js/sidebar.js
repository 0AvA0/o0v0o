var body = document.querySelector('.body');
var header = document.querySelector('.header');
var footer = document.querySelector('.footer');
var sidebar = document.querySelector('.sidebar');
var toggleBtn = document.querySelector('.toggle-btn');
var home = document.querySelector('.home');
var minecraft = document.querySelector('.minecraft');
var sql = document.querySelector('.sql');
var friendly_chain = document.querySelector('.friendly-chain');

var threshold = 800;
// 添加点击事件监听器
toggleBtn.addEventListener('click', function () {
  // 切换侧边栏和按钮的 hidden 类名
  if (header.classList.contains('hidden')) {
    header.classList.toggle('hidden');
  }
  body.classList.toggle('hidden');
  footer.classList.toggle('hidden');
  const footerBody = document.querySelector('.footer-body');
  footerBody.classList.toggle('hidden');
  if (!sidebar.classList.contains('hidde')) {
    body.classList.remove('top-hidden');
  }
  sidebar.classList.toggle('hidden');
  // toggleBtn.classList.toggle('hidden'); //启用隐藏.toggleBtn
});

// 窗口
window.addEventListener('resize', function () {

  let footerBody = document.querySelector('.footer-body');

  if (window.innerWidth < threshold) {
    sidebar.classList.add('hidden');
    toggleBtn.classList.add('hidden');
    body.classList.add('hidden');
    footer.classList.add('hidden');
    footerBody.classList.add('hidden');
  } else if (window.innerWidth > threshold && toggleBtn.classList.contains("hidden")) {
    if (header.classList.contains('hidden')) {
      header.classList.toggle('hidden');
      body.classList.toggle('top-hidden');
    }
    sidebar.classList.toggle('hidden');
    toggleBtn.classList.toggle('hidden');
    body.classList.toggle('hidden');
    footer.classList.toggle('hidden');
    footerBody.classList.toString('hidden');
  }
})


// 监听内容区域的滚动事件
// var content = document.querySelector('.content');
// content.addEventListener('scroll', function () {
//   // 如果滚动条滚动，则隐藏侧边栏和按钮
//   sidebar.classList.add('hidden');
//   // toggleBtn.classList.add('hidden'); //启用隐藏.toggleBtn
// });


// 设置延迟
setTimeout(() => {
  //点击菜单
  const menuItems = document.querySelectorAll('.menu li');

  // 上一个选项
  let prevItem = null;

  // 给每个菜单项添加点击事件监听器
  menuItems.forEach((item) => {
    item.addEventListener('click', () => {
      // 移除所有菜单项的动画类
      menuItems.forEach(item => {
        item.classList.remove('animate', 'animate-right', 'animate-up', 'animate-down');
      });
      switch(item.textContent){
        case "Concerning":     home.classList.remove('hidden');minecraft.classList.add('hidden');sql.classList.add('hidden');friendly_chain.classList.add('hidden');  break;
        case "Minecraft":      minecraft.classList.remove('hidden');home.classList.add('hidden');sql.classList.add('hidden');friendly_chain.classList.add('hidden');  break;
        case "SQL-mather":     sql.classList.remove('hidden');minecraft.classList.add('hidden');home.classList.add('hidden');friendly_chain.classList.add('hidden');  break;
        case "Friendly-chain": friendly_chain.classList.remove('hidden');minecraft.classList.add('hidden');home.classList.add('hidden');sql.classList.add('hidden');  break;
      }
      // 添加对应的动画类
      if (prevItem) {
        if (prevItem.offsetTop > item.offsetTop) {
          item.classList.remove('animate-up');
          item.classList.add('animate-up');
        } else if (prevItem.offsetTop < item.offsetTop) {
          item.classList.remove('animate-down');
          item.classList.add('animate-down');
        } else if (prevItem.offsetTop == item.offsetTop) {
          item.classList.remove('animate');
          item.classList.add('animate');
        }
      } else {
        item.classList.remove('animate-right');
        item.classList.add('animate-right');
      }

      // 更新上一个选项为当前选项
      prevItem = item;
    });
  });
}, 2400);


