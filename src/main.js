import { setline } from './canvas.js';
import { clearCanvas } from './canvas.js';
import { automove } from './slider.js';
import { listener } from './slider.js';
import { useselectOption } from './select.js';
import { removeallselectOption } from './select.js';
import { getpathdata } from './canvas.js'
import { getbuilddata } from './canvas.js';
import { setbuilding } from './canvas.js';
import { updateTable } from './table.js';

const thumb = document.getElementById('thumb');
const thumb2 = document.getElementById('thumb2');

const table1 = document.createElement('table');
const table2 = document.createElement('table');
const sliderWidth = parseFloat(getComputedStyle(slider).width);
const changeThumbPositionButton = document.getElementById('changeThumbPositionButton');
var dropdown = document.getElementById("dynamicDropdown");
let movethumb = null;
let lineData; 
let buildingData;
let click=true;
let selecttime;
function fetchdata(){
  const loadLineData = fetch('../public/Data/linepath.json')
  .then(response => response.json())
  .then(data => {
    lineData = data.data;
  })
  .catch(error => {
    console.error('Error fetching linepath.json:', error);
  });
  const loadwidth = fetch('../public/Data/building.json')
    .then(response => response.json())
    .then(data => {
      buildingData = data.data;
    })
    .catch(error => {
      console.error('Error fetching number_of_move.json:', error);
    });

}

function reloaddata(){
  removeallselectOption();
  useselectOption(selecttime);
}
async function executeAndReload() {
  try {
      
      await reloaddata();
      
      await fetchdata()
  } catch (error) {
      console.error('Error:', error);
  }
}
fetchdata()
executeAndReload()
setInterval(fetchdata, 300000);
setInterval(executeAndReload, 300000);
document.addEventListener('DOMContentLoaded',async () => {
    executeAndReload();
    changeThumbPositionButton.addEventListener('click', () => {
        
        if(click){
            
            click=false
            listener(false);
            var selectedValue = dropdown.value;
            dropdown.disabled = true;
            const thumbX = parseFloat(thumb.style.left)+10;
            const thumb2X = parseFloat(thumb2.style.left)+10;
            let step;
            step=sliderWidth/23;
            let space,startstep;
            startstep=(thumbX)/step;
            space=parseInt((thumb2X-thumbX)/step);
            const pathDataPromise = getpathdata(selectedValue)
                .then(data => {
                    return data.data[selectedValue];
                })
                .catch(error => {
                    console.error("Error fetching path data:", error);
                });
            const buildingDataPromise = getbuilddata(selectedValue)
                .then(data => {
                    return data.data[selectedValue];
                })
                .catch(error => {
                    console.error("Error fetching building data:", error);
                });
            Promise.all([pathDataPromise, buildingDataPromise])
                .then(([widthData, build]) => {
                    runthumbmove(parseInt(startstep), widthData, build);
                })
                .catch(error => {
                    console.error("Error:", error);
                });
                     
            function runthumbmove(i,widthData,build) {
                const newData1 = [
                    ['更新的数据1', '更新的数据2'],
                    ['更新的数据3', '更新的数据4'],
                    // 添加更多行...
                ];
                
                
                if (i <= 23 - space) {
                let thumbpath = i * step - 10;
                let thumb2path = thumbpath + thumb2X - thumbX;
                automove(thumbpath,thumb2path);
                clearCanvas();
                const switch1 = document.getElementById('switchID1');
                const switch2 = document.getElementById('switchID2');
                const tableContainer1 = document.getElementById('table-container'); 
                const tableContainer2 = document.getElementById('table-container-2');
                updateTable(tableContainer1, tableContainer2,lineData,widthData,buildingData,build,parseInt((thumbpath+10)/step),space)
                if(switch2.checked){
                  setbuilding(buildingData,build,parseInt((thumbpath+10)/step),space);
                }
                if(switch1.checked){
                  setline(lineData,widthData ,parseInt((thumbpath+10)/step),space);
                }
                
                movethumb=setTimeout(() => {
                    runthumbmove(i + 1,widthData,build); 
                }, 1500); 
                }else{
                    runthumbmove(0,widthData,build);
                }
            }
        }else{
            click=true
            listener(true);
            dropdown.disabled = false;
            if(movethumb){

                clearTimeout(movethumb);
            }
            
            
        }
    });
});
