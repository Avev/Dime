const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);

const port = process.env.PORT || 3030;

app.use(express.json());

const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
};
app.use(cors(corsOptions));

const itemRoutes = require('./api/items/item.routes');
app.use('/api/item', itemRoutes);

http.listen(port, () => {
  console.log('Server is running on port: ' + port);
});
