const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
var dropdown = document.getElementById("dynamicDropdown");
var selectedOption = document.getElementById("selectedOption");
const image = new Image();
image.src = "./public/image/NTUST_MAP.jpg"; // 替换为实际图像的路径

let lineData; 
let widthData;

const loadLineData = fetch('../public/Data/linepath.json')
  .then(response => response.json())
  .then(data => {
    lineData = data.data;
  })
  .catch(error => {
    console.error('Error fetching linepath.json:', error);
  });
const loadwidth = fetch('../public/Data/number_of_move.json')
  .then(response => response.json())
  .then(data => {
    widthData = data.data;
  })
  .catch(error => {
    console.error('Error fetching number_of_move.json:', error);
  });
  
const loadImagePromise = new Promise((resolve, reject) => {
    image.onload = () => {
      //地圖相片
      ctx.drawImage(image, 0, 0, 1080, 640);
      resolve();
    };
});
Promise.all([loadImagePromise, loadLineData, loadwidth])
  .then(() => {
    var selectedValue = dropdown.value;
    setline(lineData, widthData[selectedValue],0,1);
  });
export  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, 1080, 640);
}
export function setline(lineData,widthData,startnumber,num){
    //設置線的樣式
    
    for(let i=0 ;i<lineData.length;i++){

        
        const gradient1 = ctx.createLinearGradient(lineData[i].end_x, lineData[i].end_y, lineData[i].start_x, lineData[i].start_y);
        
        let width=0;
        gradient1.addColorStop(0, "red");
        gradient1.addColorStop(1, "blue");
        const linename=lineData[i].path;
        for(let j=0 ; j<num;j++){
            width=widthData[linename][j+startnumber]+width
            
        }

        ctx.strokeStyle = gradient1;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(lineData[i].start_x, lineData[i].start_y);
        ctx.lineTo(lineData[i].end_x, lineData[i].end_y);
        ctx.stroke();

    }
    
}





