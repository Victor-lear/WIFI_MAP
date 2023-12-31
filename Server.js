const express = require('express');
const path = require('path');
const fs = require('fs');
const zlib = require('zlib'); 

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname ))); 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});





const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
