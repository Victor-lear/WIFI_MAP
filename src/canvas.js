const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
var dropdown = document.getElementById("dynamicDropdown");
var selectedOption = document.getElementById("selectedOption");
const image = new Image();
image.src = "./public/image/NTUST_MAP.jpg";

let lineData; 
let widthData;
dotenv.config()
const loadLineData = fetch('../public/Data/linepath.json')
  .then(response => response.json())
  .then(data => {
    lineData = data.data;
  })
  .catch(error => {
    console.error('Error fetching linepath.json:', error);
  });

  
const loadImagePromise = new Promise((resolve, reject) => {
    image.onload = () => {
      //地圖相片
      ctx.drawImage(image, 0, 0, 1080, 640);
      resolve();
    };
});


export function getpathdata(value) {
  const apiUrl = process.env.api_url+'getpath';
  const requestData = {
      "timevalue": value,
  };
  return fetch(apiUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  });
}
export function getbuilddata(value) {
  const apiUrl = process.env.api_url+'getbuild';
  const requestData = {
      "timevalue": value,
  };
  return fetch(apiUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  });
}
export  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, 1080, 640);
}
function getColorBasedOnWidth(totalWidth) {
  if (totalWidth > 100) {
    return "red";
  } else if (totalWidth < 10) {
    return "green";
  } else {
    return "yellow";
  }
}
function getColorBasedOnbuilding(totalWidth) {
  if (totalWidth > 5) {
    return "rgba(255, 0, 0, 0.4)";
  } else if (totalWidth < 2) {
    return "rgba(0, 255, 0, 0.4)";
  } else {
    return "rgba(255, 255, 0, 0.4)";
  }
}
export function setline(lineData,widthData,startnumber,num){
  //設置線的樣式

  for(let i=0 ;i<lineData.length;i++){
      let width=0;
      const linename=lineData[i].path;
      for(let j=0 ; j<num;j++){
        try{
          width=widthData[linename][j+startnumber]+width
        } catch (error) {
          
        }
          
          
      }
      if(width!=0){
        const gradient1 = ctx.createLinearGradient(lineData[i].end_x, lineData[i].end_y, lineData[i].start_x, lineData[i].start_y);
        const color = getColorBasedOnWidth(width/num);

        gradient1.addColorStop(0, color);
        gradient1.addColorStop(1, color);
        ctx.strokeStyle = gradient1;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(lineData[i].start_x, lineData[i].start_y);
        ctx.lineTo(lineData[i].end_x, lineData[i].end_y);
        ctx.stroke();
        const arrowSize = 15;
        const angle = Math.atan2(lineData[i].end_y - lineData[i].start_y, lineData[i].end_x - lineData[i].start_x);
        ctx.beginPath();
        ctx.moveTo(lineData[i].end_x - arrowSize * Math.cos(angle - Math.PI / 6), lineData[i].end_y - arrowSize * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(lineData[i].end_x, lineData[i].end_y);
        ctx.lineTo(lineData[i].end_x - arrowSize * Math.cos(angle + Math.PI / 6), lineData[i].end_y - arrowSize * Math.sin(angle + Math.PI / 6));
        ctx.stroke();

        

        

      }
      
  }
  
}
export function setbuilding(buildingdata,build,startnumber,num) {
  
  for(let i=0 ;i<buildingdata.length;i++){
    let buildnumber=0;
    const buildname=buildingdata[i].building;
    for(let j=0 ; j<num;j++){
      try{
        buildnumber=build[buildname][j+startnumber]+buildnumber
      } catch (error) {
        
      }
    }
    if(buildnumber!=0){
        const x = buildingdata[i].x;
        const y = buildingdata[i].y;

        ctx.beginPath();

        for (let j = 0; j < buildingdata[i].sides; j++) {
          let current_x, current_y;
          if (j == 0) {
            current_x = x[j];
            current_y = y[j];
            ctx.moveTo(current_x, current_y);
          } else {
            current_x = x[j];
            current_y = y[j];
            ctx.lineTo(current_x, current_y);
          }
        }
        ctx.closePath();
        const gradient1 = ctx.createLinearGradient(x[0], y[0], x[buildingdata[i].sides - 1], y[buildingdata[i].sides - 1]);
        const color = getColorBasedOnbuilding(buildnumber/num);
        gradient1.addColorStop(0, color);
        gradient1.addColorStop(1, color);
        ctx.lineWidth = 2;
        ctx.strokeStyle = gradient1;
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();

    }
        
    
  }

}






