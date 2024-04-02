import { getFetchedData } from "./read.js";

var mtod = "";
(async function () {
  const Path = "../config/conf.json";
  let conf = await getFetchedData(Path);
  let serverName, serverIP, serverPort;
  conf.menu.minecraft.forEach(element => {
    serverName = element.name;
    serverIP = "ranmc.cc";
    // element.url;
    serverPort = element.port;
  });

  // 使用Promise封装fetch请求
  function fetchServerInfo() {
    const url = `https://api.mcsrvstat.us/2/${serverIP}:${serverPort}`;

    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }

  // 更新服务器信息
  function updateServerInfo() {
    fetchServerInfo()
      .then(data => {
        //打印服务器信息
        // document.getElementById('serverVersion').textContent = '版本：' + data.version;
        // document.getElementById('onlinePlayers').textContent = '在线玩家数量：' + data.players.online;
        // document.getElementById('maxPlayers').innerHTML = '最大玩家数量：' + data.players.max;

        // const img = document.createElement('img');
        // img.src = `https://api.mcsrvstat.us/icon/${serverIP}:${serverPort}`;
        // document.body.appendChild(img);
        // document.querySelector('.icon').appendChild(img);
        //data.latency 网络延迟
        //data.motd.html.join(','); 服务器描述
        //data.players.sample.forEach(element =>{let playesrs = element.name;}); 在线玩家




        const imgContainer = document.querySelector('.icon');
        const img = imgContainer.querySelector('img');
        const players_percentage = (data.players.online / data.players.max) * 100;

        if (img) {
          // 如果已经有图片，则更新其 src 属性
          img.src = `https://api.mcsrvstat.us/icon/${serverIP}:${serverPort}`;
        } else {
          // 否则，创建一个新的图片元素并将其添加到容器中
          const newImg = document.createElement('img');
          newImg.src = `https://api.mcsrvstat.us/icon/${serverIP}:${serverPort}`;
          imgContainer.appendChild(newImg);
        }
        if (players_percentage < 25) {
          document.getElementById("0").style.backgroundColor = "rgba(101, 241, 40, 0.6)";
        } else if (players_percentage < 50) {
          document.getElementById("0").style.backgroundColor = "rgba(233, 243, 40, 0.6)";
        } else if (players_percentage < 75) {
          document.getElementById("0").style.backgroundColor = "rgba(251, 171, 40, 0.6)";
        } else {
          document.getElementById("0").style.backgroundColor = "rgba(231, 41, 40, 0.6)";
        }
        document.querySelector('.motd').innerHTML = data.motd.html.join(',').replace(',', '');
        document.querySelector('.name').textContent = data.version;
        document.querySelector('.online').textContent = data.online;
        document.querySelector('.host').textContent = data.hostname + ":" + data.port;
        document.getElementById("0").textContent = players_percentage + '%';
        document.getElementById("0").style.width = players_percentage + '%';


        // document.querySelector('.gamer').innerHTML = data.players.online +""+ data.players.max;

        // document.querySelector('.name').innerHTML = data.version;
      })
      .catch(error => {
        console.error('发生错误：', error);
      });
  }

  // 初始加载和定时更新
  updateServerInfo();
  setInterval(updateServerInfo, 30000); // 30秒更新一次
})();
