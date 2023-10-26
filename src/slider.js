const slider = document.getElementById('slider');
const thumb = document.getElementById('thumb');
const thumb2 = document.getElementById('thumb2');
//初始設定thumb的位置
thumb.style.left='-10px'
thumb2.style.left='37px'
const sliderWidth = parseFloat(getComputedStyle(slider).width);
let isDragging = false;
let isDragging2 = false;
let timeData;
let isEventListenersEnabled = true; 
fetch('../public/Data/time.json')
  .then(response => response.json())
  .then(data => {
    timeData = data.time;
    createSliderTicks();
  })
  .catch(error => {
    console.error('Error fetching JSON:', error);
  });

function createSliderTicks() {
    for (let i = 0; i < 24; i++) {
        const tick = document.createElement('div');
        tick.className = 'slider-tick';
        tick.style.left = sliderWidth/23*i + 'px';
        const tickText = document.createElement('span');
        tickText.className = 'tick-text';
        tickText.textContent = timeData[i].time;
        tick.appendChild(tickText);
        slider.appendChild(tick);
    }
}



thumb.addEventListener('mousedown', (e) => {
    isDragging = true;
    thumb.style.cursor = 'grabbing';
});
thumb2.addEventListener('mousedown', (e) => {
    isDragging2 = true;
    thumb2.style.cursor = 'grabbing';
});
document.addEventListener('mousemove', (e) => {
    if (isEventListenersEnabled) {
        if (isDragging) {
            moveThumb(e, thumb,thumb2);
            
        }
        if (isDragging2) {
            moveThumb(e, thumb2,thumb);
            
        }
        updateBlock();
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    isDragging2 = false;
    thumb.style.cursor = 'grab';
    thumb2.style.cursor = 'grab';
    
});
export function listener(enable) {
    isEventListenersEnabled = enable;
}

function moveThumb(e, thumb,thumb2) {//設置thumb移動
    const rect = slider.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const step=sliderWidth/23
    const thumbX = parseFloat(thumb.style.left);
    const thumb2X = parseFloat(thumb2.style.left);
    const snappedX = Math.round(x / step) * step-10;
    const movestep=snappedX+'px'
    

    if(thumbX>thumb2X){
        if(snappedX>thumb2X&&snappedX<= rect.width)
        {
            thumb.style.left = movestep;
        }

    }else{
        if(snappedX>=-10&&snappedX<thumb2X){

            thumb.style.left = movestep;
        }

    }
    


    
    
}
function updateBlock() {//設置block寬度
    const sliderBlock = document.querySelector('.slider-block');
    const thumbX = parseFloat(thumb.style.left);
    const thumb2X = parseFloat(thumb2.style.left);
    const width=thumb2X-thumbX;
    const left=thumbX+10;
    sliderBlock.style.width = width+'px'; 
    sliderBlock.style.left = left+'px';
}
export function automove(thumbway,thumb2way){

    thumb.style.left=thumbway+'px';
    thumb2.style.left=thumb2way+'px';
    updateBlock();

}