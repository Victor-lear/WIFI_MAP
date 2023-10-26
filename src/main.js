import { setline } from './canvas.js';
import { clearCanvas } from './canvas.js';
import { automove } from './slider.js';
import { listener } from './slider.js';
const thumb = document.getElementById('thumb');
const thumb2 = document.getElementById('thumb2');
const sliderWidth = parseFloat(getComputedStyle(slider).width);
const changeThumbPositionButton = document.getElementById('changeThumbPositionButton');
var dropdown = document.getElementById("dynamicDropdown");
let movethumb = null;
let lineData; 
let widthData;
let click=true;
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
document.addEventListener('DOMContentLoaded', () => {
    changeThumbPositionButton.addEventListener('click', () => {
        // 在按钮点击时获取最新的 thumbX 值
        if(click){
            click=false
            listener(false);
            var selectedValue = dropdown.value;
            const thumbX = parseFloat(thumb.style.left)+10;
            const thumb2X = parseFloat(thumb2.style.left)+10;
            let step;
            step=sliderWidth/23;
            let space,startstep;
            startstep=(thumbX)/step;
            space=parseInt((thumb2X-thumbX)/step);
            
            runthumbmove(parseInt(startstep));
            function runthumbmove(i) {
                if (i <= 23 - space) {
                let thumbpath = i * step - 10;
                let thumb2path = thumbpath + thumb2X - thumbX;
                automove(thumbpath,thumb2path);
                clearCanvas();
                setline(lineData,widthData[selectedValue],parseInt((thumbpath+10)/step),space);
                movethumb=setTimeout(() => {
                    runthumbmove(i + 1); 
                }, 1000); 
                }else{
                    runthumbmove(0);
                }
            }
        }else{
            click=true
            listener(true);
            if(movethumb){

                clearTimeout(movethumb);
            }
            
            
        }
    });
});
