// 定义一个函数，用于创建一个新的枫叶图像元素
function createLeaf() {
    const leaf = document.createElement('img');
    leaf.src = 'https://cdn.jsdelivr.net/gh/benbai123/benbai123.github.io/images/leaf.png'; // 枫叶图片地址
    leaf.style.position = 'absolute';
    leaf.style.width = '50px'; // 枫叶大小
    leaf.style.zIndex = '-1'; // 将枫叶图像元素置于最底层，避免遮挡其他内容
    return leaf;
  }
  
  // 定义一个函数，用于让一个枫叶图像元素飘落
  function fallLeaf(leaf) {
    const startX = Math.random() * window.innerWidth; // 枫叶初始位置的横坐标
    const startY = -leaf.height; // 枫叶从上方开始飘落
    const endX = Math.random() * window.innerWidth; // 枫叶结束位置的横坐标
    const duration = 5000 + Math.random() * 3000; // 枫叶飘落时间，5~8秒不等
    const rotation = Math.random() * 1080; // 枫叶旋转角度，随机值为 0~1080
    
    leaf.style.transform = `rotate(${rotation}deg)`; // 为枫叶设置旋转角度
    leaf.style.transition = `transform ${duration}ms linear, top ${duration}ms linear, left ${duration}ms linear`; // 为枫叶设置动画效果
    leaf.style.left = `${startX}px`; // 为枫叶设置初始横坐标
    leaf.style.top = `${startY}px`; // 为枫叶设置初始纵坐标
    
    setTimeout(() => {
      leaf.style.left = `${endX}px`; // 为枫叶设置结束横坐标
      leaf.style.top = `${window.innerHeight}px`; // 枫叶落到窗口底部
    }, 0);
    
    setTimeout(() => {
      leaf.remove(); // 移除已经飘落到底部的枫叶图像元素
    }, duration);
  }
  
  // 在鼠标移动时创建新的枫叶图像元素并让它飘落
  document.addEventListener('mousemove', (event) => {
    const x = event.clientX; // 鼠标横坐标
    const y = event.clientY; // 鼠标纵坐标
    
    const leaf = createLeaf(); // 创建一个新的枫叶图像元素
    leaf.style.left = `${x}px`; // 将枫叶放在鼠标位置
    leaf.style.top = `${y}px`;
    
    document.body.appendChild(leaf); // 将枫叶图像元素添加到<body>中
    
    setTimeout(() => {
      fallLeaf(leaf); // 让枫叶图像元素飘落
    }, 0);
  });
  