const tableContainer1 = document.getElementById('table-container'); 
const tableContainer2 = document.getElementById('table-container-2');

const table1 = document.createElement('table');
const table2 = document.createElement('table');
const thead1 = document.createElement('thead');
const headerRow1 = document.createElement('tr');
const thead2 = document.createElement('thead');
const headerRow2 = document.createElement('tr');

const th1 = document.createElement('th');
th1.textContent = '移動人數排行';
th1.setAttribute('colspan', '3');
headerRow1.appendChild(th1);
const th2 = document.createElement('th');
th2.textContent = '棟內人數排行(平均人數)';
th2.setAttribute('colspan', '3'); 
headerRow2.appendChild(th2);
thead1.appendChild(headerRow1);
table1.appendChild(thead1);
thead2.appendChild(headerRow2);
table2.appendChild(thead2);
const tbody1 = document.createElement('tbody');
const rowData1 = [
        ['1', 'None',0], 
        ['2', 'None',0], 
        ['3', 'None',0], 
        ['4', 'None',0], 
        ['5', 'None',0]
    ];
rowData1.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cellData => {
            const td = document.createElement('td');
            td.textContent = cellData;
            tr.appendChild(td);
        });
        tbody1.appendChild(tr);
    });
table1.appendChild(tbody1);

thead2.appendChild(headerRow2);
table2.appendChild(thead2);

const tbody2 = document.createElement('tbody');
const rowData2 = [
    ['1', 'None',0], 
    ['2', 'None',0], 
    ['3', 'None',0], 
    ['4', 'None',0], 
    ['5', 'None',0]
    ];
rowData2.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cellData => {
            const td = document.createElement('td');
            td.textContent = cellData;
            tr.appendChild(td);
        });
        tbody2.appendChild(tr);
    });
table2.appendChild(tbody2);

tableContainer1.appendChild(table1);
tableContainer2.appendChild(table2);


export function caculateline(lineData,widthData,startnumber,num) {
    const widthlabel=[]
    for(let i=0 ;i<lineData.length;i++){
        let width=0;
        const linename=lineData[i].path;
        for(let j=0 ; j<num;j++){
          try{
            width=widthData[linename][j+startnumber]+width
            
          } catch (error) {
            
          }
        }
        const label=[width,linename]
        widthlabel.push(label);
    }
    const sortedWidthLabel = widthlabel.sort((a, b) => b[0] - a[0]);
    const topFive = sortedWidthLabel.slice(0, 5);
    const table=[]
    for(let i=0 ;i<topFive.length;i++){
        if(topFive[i]!=0){
            const label=[(i+1), topFive[i][1],topFive[i][0]]
            table.push(label)
        }else{
            const label=[(i+1),'None',0]
            table.push(label)
        }
        

    }
    return table;
}
export function caculatebuild(buildingdata,build,startnumber,num){
    const buildlabel=[]
    for(let i=0 ;i<buildingdata.length;i++){
        let buildnumber=0;
        const buildname=buildingdata[i].building;
        for(let j=0 ; j<num;j++){
          try{
            buildnumber=build[buildname][j+startnumber]+buildnumber
          } catch (error) {
            
          }
        }
        const label=[buildnumber,buildname]
        buildlabel.push(label);
    }
    const sortedBuildLabel = buildlabel.sort((a, b) => b[0] - a[0]);
    const topFive = sortedBuildLabel.slice(0, 5);
    const table=[]
    for(let i=0 ;i<topFive.length;i++){
        if(topFive[i]!=0){
            topFive[i][0]=Math.floor(topFive[i][0] * 100) / 100;
            const label=[(i+1), topFive[i][1],topFive[i][0]]
            
            table.push(label)
        }else{
            const label=[(i+1),'None',0]
            table.push(label)
        }
        

    }
    return table;

}

export function updateTable(tableElement, tableElement2,lineData,widthData,buildingData,build,startnumber,num) {
    // 获取现有的表格
    const table1 = tableElement.querySelector('table');
    const table2 = tableElement2.querySelector('table');

    // 清除现有的表格内容
    table1.innerHTML = '';
    table2.innerHTML = '';

    // 创建新的表格头部和数据
    const thead1 = document.createElement('thead');
    const headerRow1 = document.createElement('tr');
    const thead2 = document.createElement('thead');
    const headerRow2 = document.createElement('tr');

    const th1 = document.createElement('th');
    th1.textContent = '移動人數排行';
    th1.setAttribute('colspan', '3');
    headerRow1.appendChild(th1);
    const th2 = document.createElement('th');
    th2.textContent = '棟內人數排行(平均人數)';
    th2.setAttribute('colspan', '3'); 
    headerRow2.appendChild(th2);

    thead1.appendChild(headerRow1);
    table1.appendChild(thead1);
    thead2.appendChild(headerRow2);
    table2.appendChild(thead2);

    const tbody1 = document.createElement('tbody');
    const linedata=caculateline(lineData,widthData,startnumber,num)
    
    linedata.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cellData => {
            const td = document.createElement('td');
            td.textContent = cellData;
            tr.appendChild(td);
        });
        tbody1.appendChild(tr);
    });
    table1.appendChild(tbody1);

    const tbody2 = document.createElement('tbody');
    const rowData2 = [
        ['新的数据1', '新的数据2'],
        ['新的数据3', '新的数据4'],
    ];
    const builddata=caculatebuild(buildingData,build,startnumber,num)
    builddata.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cellData => {
            const td = document.createElement('td');
            td.textContent = cellData;
            tr.appendChild(td);
        });
        tbody2.appendChild(tr);
    });
    table2.appendChild(tbody2);
}
