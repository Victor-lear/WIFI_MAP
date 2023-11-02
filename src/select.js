import { loadpathdata } from "./loaddata";
var dropdown = document.getElementById("dynamicDropdown");
var selectedOption = document.getElementById("selectedOption");
let selecttime;
const selecttimedata = fetch('../public/Data/selecttime.json')
  .then(response => response.json())
  .then(data => {
    
    selecttime = data.data;
    addselectOption(selecttime) 
  })
  .catch(error => {
    console.error('Error fetching linepath.json:', error);
  });
export function addselectOption(selecttime) {
    
    for(let i=0;i<selecttime.length;i++){
        var option = document.createElement("option");

        option.value = selecttime[i].time;
        option.textContent = selecttime[i].time;
        dropdown.appendChild(option);
    }
}
export function removeallselectOption(){
  while (dropdown.options.length > 0) {
    dropdown.remove(0);
}


}
dropdown.addEventListener("change", function() {
  // 获取选择的选项的值
  
  loadpathdata()
});

