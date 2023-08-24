const multer = require("multer");
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/route')
const bcryptjs = require('bcryptjs');
const path = require("path");
const fs = require('fs');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
require('dotenv').config();
// const rootDirectory = path.resolve(path.dirname(__filename), '..');
// Create the "images" directory if it doesn't exist
const imagesDir = path.join(path.dirname(__filename), 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

// Intlizing all the libraries
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the actual origin of your frontend app
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/images', express.static(imagesDir));
app.use('/', routes);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir);
  },
  filename: (req, file, cb) => {
    cb(null, req.body.id + '.png');
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  // If the image is successfully uploaded, the file details will be available in req.file
  if (req.file) {
    res.status(200).json({ message: 'Image uploaded successfully', filename: req.file.filename });
  } else {
    res.status(500).json({ error: 'Error uploading image' });
  }
});


// Connecting to MongoDB
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then((success) => {
  console.log("mongodb connected");

  app.listen(port, () => {
    console.log(`server is running on ${port}`);
  });
}).catch((err) => {
  console.log(`Error occurred while Connecting ${err}`);
});
