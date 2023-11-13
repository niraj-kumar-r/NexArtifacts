# nexArtifacts

## Table of Contents

1. Introduction
1. Features
1. Technologies Used
1. How to Setup
1. How to Use Website
1. Future Enhancements
1. Contributing
1. License

## Introduction

Welcome to our 3D Map Visualization Website! Our primary objective is to provide a unique and immersive experience for users who wish to explore the world in three dimensions. We have integrated Google Maps into our website and taken it a step further by incorporating the concept of Google Maps 3D into our own 3D model.

## Features

Our website boasts a range of features designed to enhance your map viewing experience:

1. **Google Maps Integration**: Seamlessly integrated with Google Maps, our website allows you to navigate the globe with ease and precision.
2. **3D Modeling**: We’ve taken the concept of Google Maps 3D and integrated it into our own 3D model, providing a more immersive and realistic viewing experience.
3. **Depth and Occlusion**: Our 3D model incorporates depth and occlusion, giving a true sense of scale and perspective to geographical features.
4. **Tilting Effect**: Navigate the map not just horizontally, but also vertically with our tilting effect feature, allowing you to view locations from different angles.

## Technologies Used

Our website utilizes a number of technologies to deliver its features:

1. **Google Maps API**: This is used for the integration of Google Maps into our website.
2. **Three.js**: This JavaScript library is used for creating and displaying animated 3D computer graphics in a web browser.
3. **WebGL**: This JavaScript API is used for rendering high-performance interactive 3D and 2D graphics within any compatible web browser without the use of plug-ins.

## How to Setup

To host our website locally, follow these steps:

1. Clone our GitHub repository to your local machine.
2. cd into the nex directory.
3. Run `npm install` to install all dependencies.
4. make a .env file and copy the contents of .env.example into it.
5. Replace the value of the REACT_APP_GOOGLE_MAPS_API_KEY variable with your own Google Maps API key.
   (Note: You will need a Google maps platform account with a billing account to get an API key, and then enable the Maps JavaScript API.
   For more info visit : https://developers.google.com/maps/documentation/javascript/cloud-setup)
6. Replace the REACT_APP_GOOGLE_MAPS_ID variable with your own Google Maps ID.
   (Note: Make sure to use a vector map with tilt and rotation enabled.
   For more info visit : https://developers.google.com/maps/documentation/javascript/webgl)
7. Run `npm start` to start the website.

## How to Use

Using our website is simple and intuitive:

1. Navigate to the website URL.
2. Use your mouse or touchpad to pan around the map.
3. Use the zoom in/out buttons to get a closer look or a wider view.
4. Hold the shift button and use mouse or arrow buttons to change the viewing angle.

## Future Enhancements

We are constantly working on improving our website and adding new features. Some future enhancements we are considering include:

1. Adding more detailed textures to our 3D models.
2. Incorporating real-life data to the artifacts.
3. Adding more artifacts to the map.
4. Adding info boxes to the artifacts.

## Contributing

We welcome contributions from the community! If you have suggestions for improvements or want to report a bug, please open an issue on our GitHub page.

## License

Our 3D Map Visualization Website is licensed under the GPL3 License. Please see the LICENSE file in our GitHub repository for more details.
