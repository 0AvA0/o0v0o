export async function getFetchedData(Path) {

  try {
    const response = await fetch(Path);
    const data = await response.json();
    return data;
  } catch (error) {
    // 处理错误
    console.error(error);
  }
}

// export function getFetchedData(Path) {

//   return fetch(Path)
//       .then(response => {
//         // 处理响应数据
//         return response.json();
//       })
//       .then(data => {
//         // 处理返回的 JSON 数据
//         return data;
//       })
//       .catch(error => {
//         // 处理错误
//         console.error(error);
//       });
//   }