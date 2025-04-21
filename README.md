# Image Compression & Analytics App

A web application that allows users to compress images and view compression analytics. Built with React, Node.js, Express, and MongoDB.

## Features

- Drag and drop image upload
- Adjustable compression quality
- Real-time compression results
- Download compressed images
- Compression analytics and history
- Responsive design
- Loading states and error handling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd image-compression-app
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Start MongoDB:
Make sure MongoDB is running on your system. The default connection URL is `mongodb://localhost:27017/image_compression`.

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```
The server will start on http://localhost:5000

2. Start the frontend development server:
```bash
cd frontend
npm start
```
The application will open in your browser at http://localhost:3000

## Usage

1. Navigate to the home page
2. Drag and drop an image or click to select one
3. Adjust the compression quality using the slider
4. Click "Compress" to process the image
5. View the compression results and download the compressed image
6. Check the Analytics page to view compression history

## API Endpoints

- POST `/api/compress` - Compress an image
  - Request: Form data with `image` file and `quality` (1-100)
  - Response: Compression results and analytics

- GET `/api/analytics` - Get compression history
  - Response: List of compression records with timestamps and statistics

## Technologies Used

- Frontend:
  - React
  - React Router

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - Multer
  - Sharp

## License

MIT
