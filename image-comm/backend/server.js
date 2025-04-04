const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Image upload and compression endpoint
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    
    const inputPath = req.file.path;
    const outputPath = `uploads/compressed-${req.file.filename}`;
    
    await sharp(inputPath)
      .resize({ width: 800 })
      .jpeg({ quality: 60 })
      .toFile(outputPath);
    
    // Delete the original file
    fs.unlinkSync(inputPath);
    
    res.json({
      message: "Image compressed successfully",
      compressedImageUrl: `http://localhost:${port}/${path.basename(outputPath)}`,
    });
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Error compressing image" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
