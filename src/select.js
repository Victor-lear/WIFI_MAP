var dropdown = document.getElementById("dynamicDropdown");
var selectedOption = document.getElementById("selectedOption");

let selecttime;

function gettimeapi() {
    const apiUrl = 'http://140.118.122.115:5029/gettime';
    return fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
}
export function useselectOption(){
  gettimeapi()
    .then(data => {
        const newData = data  
        addselectOption(newData)
    })

}
export function addselectOption(JsonData) {
    
    
    const selecttime=JsonData.data
    for(let i=0;i<selecttime.length;i++){
        var option = document.createElement("option");

        option.value = selecttime[i].time;
        option.textContent = selecttime[i].time;
        dropdown.appendChild(option);

    }
    if (selecttime.length > 0) {
      dropdown.value = selecttime[selecttime.length - 1].time;
    }

}

export function removeallselectOption(){
  while (dropdown.options.length > 0) {
    dropdown.remove(0);
}
}
dropdown.addEventListener("change", function() {
  var selectedValue = dropdown.value;
  selectedOption.textContent = selectedValue;
});
useselectOption()

