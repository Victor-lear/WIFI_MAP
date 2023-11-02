var dropdown = document.getElementById("dynamicDropdown");
function gettimeapi() {
    // Replace 'your_api_endpoint' with the actual API URL you want to fetch data from.
    const apiUrl = 'http://140.118.122.115:5029/gettime';
  
    // Make a GET request using fetch
    return fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response as JSON
      });
}
function getpathdata(value) {
  // Replace 'your_api_endpoint' with the actual API URL you want to fetch data from.
  const apiUrl = 'http://140.118.122.115:5029/getpath';

  // Data to be sent in the request body
  const requestData = {
      "timevalue": value,
  };

  // Make a POST request using fetch
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
      return response.json(); // Parse the response as JSON
  });
}

export function loadselecttime(){
    
    gettimeapi()
        .then(data => {
            const newData = data
            
            const newDataJSON = JSON.stringify(newData);

            // 使用 fetch 发送 POST 请求，路径应该匹配后端路由
            fetch('/saveSelectData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: newDataJSON, // 发送数据
            })
                .then(response => response.json())
                .then(result => {
                    
                })
                .catch(error => {
                    console.error('Error saving data:', error);
                });
            
        })
    
}

export function loadpathdata() {
    var selectedValue = dropdown.value;
    getpathdata(selectedValue)
          .then(data => {
            const newData = data
            
            const newDataJSON = JSON.stringify(newData);

            // 使用 fetch 发送 POST 请求，路径应该匹配后端路由
            fetch('/saveMoveData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: newDataJSON, // 发送数据
            })
                .then(response => response.json())
                .then(result => {
                    
                })
                .catch(error => {
                    console.error('Error saving data:', error);
                });
            
        })
    
}

loadselecttime()
loadpathdata()
