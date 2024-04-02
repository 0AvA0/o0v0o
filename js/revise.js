import { getFetchedData } from "./read.js";
//    更改标题
(async function () {
    const Path = "../config/conf.json";
    let conf = await getFetchedData(Path);
    //    更改标题
    document.title = conf.display.title;

    //    更改图标
    var iconLink = document.createElement('link');
    iconLink.rel = 'icon';
    iconLink.href = conf.display.icon;
    iconLink.type = 'image/x-icon';
    // 获取 head 元素
    var headEl = document.querySelector('head');
    // 添加 link 元素到 head 中
    headEl.appendChild(iconLink);

    //    修改头部logo
    //document.querySelector('.header img.logo').src = data.display.header.logoUrl;

    //    修改头部导航栏
    // let navHtml = '';
    // conf.display.header.navItems.forEach(item => {
    //    navHtml += `<a href="${item.url}">${item.name}</a>`;
    // });
    // document.querySelector('.header nav').innerHTML = navHtml;

    //     更改页脚   
    //document.querySelector('.footer p').textContent = data.display.footer.copyright;
    // document.querySelector('.footer').innerHTML = conf.display.footer.copyright+conf.display.footer.record;
    // document.querySelector('.footer-body').innerHTML = conf.display.footer.copyright+conf.display.footer.record;

    let navHtml = '';
    let navHtml_nav = '';
    conf.display.sidebar.forEach(item => {
        navHtml += `<li>${item}</li>`;
    });
    document.querySelector('.menu').innerHTML = navHtml;

    navHtml = '';

    conf.display.body.minecraft.images.forEach((item, index) => {
        navHtml += `<img src="../images/minecraft/${item}" alt="">`
        if (index > 0) {
            navHtml_nav += "<span></span>";
        }
    })
    document.getElementById('slider_nav').innerHTML += navHtml_nav;
    document.getElementById('list').innerHTML = navHtml;



    // let images = conf.display.body.minecraft.images;
    // let index = Math.floor(Math.random() * images.length);

    // window.addEventListener("load", (event) => {

    //     document.querySelector('.image').style.backgroundImage = `url("../images/minecraft/${images[index]}")`;
    // });


    window.onload = function () {

        var carousel = document.getElementById('carousel');
        var next = document.getElementById('next');
        var prev = document.getElementById('prev');
        var list = document.getElementById('list');
        var span = document.getElementById('slider_nav').getElementsByTagName('span');//获取span
        var spanIndex = 1;//定义导航图标的下标
        var time;//定时器

        setTimeout(() => {

            //    下一步
            //    下一步
            next.onmousedown = function () {
                // 到达最后一张时跳回第一张
                if (parseInt(list.style.left) < -(conf.display.body.minecraft.images.length - 2) * 100) {
                    list.style.left = 0 + '%'
                    list.style.transition = ''
                }
                next.onmouseup = function () {
                    list.style.left = parseInt(list.style.left) + -100 + '%'
                    list.style.transition = '1200ms'
                    // 轮播图导航按钮跟随部分
                    if (spanIndex < conf.display.body.minecraft.images.length) {
                        spanIndex++
                    } else {
                        spanIndex = 1
                    }
                    for (var i = 0; i < span.length; i++) {
                        span[i].className = ''
                        span[spanIndex - 1].className = 'active'

                    }

                }

            }
            // 上一步
            prev.onmousedown = function () {
                // 到达第一张时跳最后一张
                if (parseInt(list.style.left) > -100) {
                    list.style.left = -(conf.display.body.minecraft.images.length - 1) * 100 + '%';
                    list.style.transition = '';
                }
                prev.onmouseup = function () {
                    list.style.left = parseInt(list.style.left) + 100 + '%';
                    list.style.transition = '1200ms';

                    // 轮播图导航按钮跟随部分
                    if (spanIndex > 1) {
                        spanIndex--;
                    } else {
                        spanIndex = conf.display.body.minecraft.images.length;
                    }
                    for (var i = 0; i < span.length; i++) {
                        span[i].className = '';
                        span[spanIndex - 1].className = 'active';

                    }
                }
            }

            // 轮播图导航按钮点击
            for (var i = 0; i < span.length; i++) {
                span[i].index = i + 1
                span[i].onclick = function () {
                    for (var i = 0; i < span.length; i++) {
                        span[i].className = '';
                        this.className = 'active';
                    }

                    //点击导航按钮时跳到指定图片
                    list.style.left = -100 * (this.index - 1) + '%';
                    //重新指定span的下标为当前所点击元素的下标
                    spanIndex = this.index;
                }
            }

            // 实现轮播图自动播放
            function play() {
                time = setInterval(function () {
                    if (parseInt(list.style.left) > -(conf.display.body.minecraft.images.length - 1) * 100) {
                        list.style.left = parseInt(list.style.left) + -100 + '%';
                        list.style.transition = '1200ms';
                        // 轮播图导航按钮跟随部分
                        if (spanIndex < conf.display.body.minecraft.images.length) {
                            spanIndex++;
                        } else {
                            spanIndex = 1;
                        };
                        for (var i = 0; i < span.length; i++) {
                            span[i].className = '';
                            span[spanIndex - 1].className = 'active';
                        };
                    } else if (parseInt(list.style.left) < -(conf.display.body.minecraft.images.length - 2) * 100) {
                        list.style.left = 0 + '%';
                        list.style.transition = '';
                        spanIndex = 1;
                        span[(span.length - 1)].className = '';
                        span[0].className = 'active';
                    }
                }, 3000)
            }

            // 鼠标移入停止，移出播放
            play();//初始为自动播放

            // 鼠标移入清除定时器
            carousel.onmousemove = function () {
                next.style.display = 'block';
                prev.style.display = 'block';
                clearInterval(time);
            }
            // 鼠标移出开启定时器
            carousel.onmouseout = function () {
                next.style.display = 'none';
                prev.style.display = 'none';
                play()
            }


        }, 2400)
    }

    let copyright = "";
    let record = "";
    let other = "";

    function generate_footer(element) {
        let backlinks = "";
        if (element.backlinks !== "!") {
            backlinks = `href="${element.backlinks}"`;
        }
        return `<a id="${element.id}"; ${backlinks} style="color:${element.color}; font-family:${element.font_family};
        font-size:${element.font_size}; font-weight:${element.font_weight}; font-style:${element.font_style}; 
        text-decoration:${element.text_decoration};">${element.content}</a>`;
    }

    conf.display.footer.copyright.forEach(element => {
        copyright += generate_footer(element);
    });
    conf.display.footer.record.forEach(element => {
        record += generate_footer(element);
    });
    conf.display.footer.other.forEach(element => {
        other += generate_footer(element);
    });


    document.querySelector('.page-footer').innerHTML = copyright + record + other;
    document.querySelector('.page-footer-body').innerHTML = copyright + record + other;
    document.getElementById('home_name').textContent = conf.display.body.concerning.name;

    document.getElementById('home_e-mail').innerHTML = `<a href="mailto:${conf.display.body.concerning.e_mail}" class="email_link">${conf.display.body.concerning.e_mail}</a>`;
    document.getElementById('home_contact').innerHTML = `<a href="http://wpa.qq.com/msgrd?v=3&amp;uin=${conf.display.body.concerning.introduce.contact.qq}&amp;site=qq&amp;menu=yes" target="_blank">QQ</a>` + "&nbsp" + `<a href="${conf.display.body.concerning.introduce.contact.github}">Github</a>`;

    document.getElementById("im").src = conf.display.body.sql_mather.url;
    var greets = conf.display.body.concerning.introduce.greet;
    var currentIndex = 0;
    var currentCharIndex = 0;
    var timer = null;

    function displayRandomGreeting() {
        var greetingElement = document.getElementById('home_greet');
        currentIndex = Math.floor(Math.random() * greets.length);
        var greeting = greets[currentIndex];

        clearInterval(timer);
        currentCharIndex = 0;
        timer = setInterval(function () {
            if (currentCharIndex >= greeting.length) {
                clearInterval(timer);
                setTimeout(function () {
                    deleteGreeting(greetingElement, function () {
                        setTimeout(displayNextGreeting, 512); // 延迟1秒继续显示下一条
                    });
                }, 1400); // 显示完成后延迟2秒逐渐删除显示内容
            } else {
                var displayedGreeting = greeting.substring(0, currentCharIndex + 1);
                greetingElement.textContent = displayedGreeting;
                currentCharIndex++;
            }
        }, 120); // 每个字之间的间隔为0.1秒

        function deleteGreeting(element, callback) {
            timer = setInterval(function () {
                if (element.textContent.length <= 0) {
                    clearInterval(timer);
                    callback && callback();
                } else {
                    element.textContent = element.textContent.substring(0, element.textContent.length - 1);
                }
            }, 48); // 删除每个字之间的间隔也为0.1秒
        }
    }

    function displayNextGreeting() {
        currentIndex++;
        if (currentIndex >= greets.length) {
            currentIndex = 0;
        }

        displayRandomGreeting();
    }

    displayRandomGreeting(); // 初始化显示第一条内容

    // setInterval(displayNextGreeting, 5000); // 每5秒切换一次内容
    // <a></a>conf.display.home.e_mail;
    // document.querySelector('.minecraft').innerHTML = `<div class="image"></div>` + `<div class="servers">2312</div>`;

    // const child = document.createElement('div');
    // child.className = 'test';
    // child.innerHTML = `<div class="test"></div>`


    document.querySelector(".square").addEventListener("click", function () {
        window.open(conf.display.body.sql_mather.url, "_blank");
    });

})();
