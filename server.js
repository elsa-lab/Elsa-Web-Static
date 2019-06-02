const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// 若 Port 要改，frontend 的 root_url 也要改
const port = 8080;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}...`);
});
