const express = require('express');
const path = require('path');
const fs = require('fs');
const zlib = require('zlib'); 

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname ))); // 包括 /public 目录

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/saveSelectData', (req, res) => {
  const newData = req.body; // 接收 POST 请求中的数据
  const newDataJSON = JSON.stringify(newData, null, 2);
  const filePath = path.join(__dirname, 'public/Data/selecttime.json');
  fs.writeFile(filePath, newDataJSON, (err) => {
    if (err) {
      console.error('ERROR:', err);
      res.status(500).json({ error: 'ERROR' });
    }
  });
});
app.post('/saveMoveData', (req, res) => {
  const compressedData = req.body; // 接收 POST 请求中的压缩数据
  const newDataJSON = JSON.stringify(newData, null, 2);

  // 保存解压缩的数据
  const filePath = path.join(__dirname, 'public/Data/number_of_move.json');
  fs.writeFile(filePath, newDataJSON, (err) => {
    if (err) {
      console.error('ERROR:', err);
      res.status(500).json({ error: 'ERROR' });
    }
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
