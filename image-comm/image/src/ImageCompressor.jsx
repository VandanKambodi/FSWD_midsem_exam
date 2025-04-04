import { useState } from "react";
import imageCompression from "browser-image-compression";
import "./ImageCompressor.css";

export default function ImageCompressor() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [compressionStats, setCompressionStats] = useState(null);

  const handleImageUpload = async (event) => {
    const imageFile = event.target.files[0];
    if (!imageFile) return;

    setSelectedImage(imageFile);
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      setCompressedImage(compressedFile);
      setCompressionStats({
        originalSize: (imageFile.size / 1024).toFixed(2),
        compressedSize: (compressedFile.size / 1024).toFixed(2),
        reduction: (
          ((imageFile.size - compressedFile.size) / imageFile.size) * 100
        ).toFixed(2),
      });
    } catch (error) {
      console.error("Compression error:", error);
    }
  };

  const handleDownload = () => {
    if (compressedImage) {
      const url = URL.createObjectURL(compressedImage);
      const link = document.createElement("a");
      link.href = url;
      link.download = "compressed-image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Image Compression & Analytics</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input" />

      {selectedImage && (
        <div className="image-container">
          <p className="label">Original Image:</p>
          <img src={URL.createObjectURL(selectedImage)} alt="Original" className="image" />
        </div>
      )}

      {compressedImage && (
        <div className="image-container">
          <p className="label">Compressed Image:</p>
          <img src={URL.createObjectURL(compressedImage)} alt="Compressed" className="image" />
          <button className="download-button" onClick={handleDownload}>Download Compressed Image</button>
        </div>
      )}

      {compressionStats && (
        <div className="stats-container">
          <p>Original Size: {compressionStats.originalSize} KB</p>
          <p>Compressed Size: {compressionStats.compressedSize} KB</p>
          <p>Size Reduction: {compressionStats.reduction}%</p>
        </div>
      )}
    </div>
  );
}
