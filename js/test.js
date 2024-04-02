fetch("../config/test.json")
    .then(response => response.json())
    .then(data => {
        // 修改标题
        document.title = data.title;
        
        // 修改头部logo
        document.querySelector('.header img.logo').src = data.header.logoUrl;
        // 修改头部导航栏
        let navHtml = '';
        data.header.navItems.forEach(item => {
            navHtml += `<a href="${item.url}">${item.name}</a>`;
        });
        document.querySelector('.header nav').innerHTML = navHtml;

        // 修改主内容区
        document.querySelector('.main-content').innerHTML = data.mainContent;

        // 修改页脚版权信息
        document.querySelector('.footer p').textContent = data.footer.copyright;
        document.querySelector('link[rel="icon"]').href = 'https://0ava0.github.io/image/IMG_20211220_132224.jpg';
    });