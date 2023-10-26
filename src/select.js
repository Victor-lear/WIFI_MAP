var dropdown = document.getElementById("dynamicDropdown");
var selectedOption = document.getElementById("selectedOption");
let selecttime;

const loadLineData = fetch('../public/Data/selecttime.json')
  .then(response => response.json())
  .then(data => {
    selecttime = data.data;
    addOption(selecttime) 
  })
  .catch(error => {
    console.error('Error fetching linepath.json:', error);
  });
function addOption(selecttime) {
    for(let i=0;i<selecttime.length;i++){
        var option = document.createElement("option");

        option.value = selecttime[i].time;
        option.textContent = selecttime[i].time;
        dropdown.appendChild(option);
    }
}



        // 监听下拉选择框的值变化
dropdown.addEventListener("change", function() {
            // 获取选择的选项的值
    var selectedValue = dropdown.value;
    selectedOption.textContent = selectedValue;
});