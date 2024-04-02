import { getFetchedData } from "./read.js";

var sun = document.querySelector('.sun');
var moon = document.querySelector('.moon');
var value = "";

function updateTime() {
  // 创建一个新的 Date 对象，表示当前时间
  const currentDate = new Date();

  // 获取当前时间的小时、分钟和秒数
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  (async function () {
    const Path = "../config/conf.json";
    let conf = await getFetchedData(Path);
    try {
      conf.display.header.time.forEach(element => {
        if (hours >= element.time) {
          value = `<a>${element.text}</a>`;
          throw new Error("find");
        }
      });
    } catch (error) {
      console.log(error);
    }

  })();

  if (hours >= 6 || hours <= 6) {
    sun.style.display = 'block';
    moon.style.display = 'none';
  } else {
    sun.style.display = 'none';
    moon.style.display = 'block';
  }
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// setInterval(()=>{
//     let Time = updateTime();
//      document.querySelector('.header').innerHTML = Time;
// },1000);

function updateHeaderTime() {
  let time = updateTime();
  document.querySelector('.title').innerHTML = time + value;

  requestAnimationFrame(updateHeaderTime);
}

updateHeaderTime();

