# Teachable Machine Image Classifier

A responsive web application that uses a pre-trained machine learning model to classify webcam images in real-time. This project leverages the p5.js creative coding library and ml5.js for machine learning functionality.

## Features

- Real-time image classification using a pre-trained Teachable Machine model
- Responsive design that adapts to different screen sizes
- Elegant UI with vignette effect and animated confidence indicators
- Flipped video display for more intuitive interaction

## Demo

[View the original sketch on p5.js web editor](https://editor.p5js.org/abdulf/sketches/VvgG6-z9U)

## How it Works

This application:
1. Captures video from your webcam
2. Sends each frame to a pre-trained machine learning model
3. Displays the predicted class label and confidence level
4. Visualizes the confidence with an animated indicator

## Prerequisites

- A modern web browser with webcam access
- Internet connection (to load the ml5.js library and the pre-trained model)

## How to Run

### Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/teachable-machine-classifier.git
   cd teachable-machine-classifier
   ```

2. Due to security restrictions, you'll need to run this on a local server:
   ```bash
   # Using Python to create a simple server
   python -m http.server
   ```
   Then visit `http://localhost:8000` in your browser.

### Hosting Online

This project can be hosted on GitHub Pages:

1. Go to your repository settings
2. Navigate to the "Pages" section
3. Select the branch to deploy (usually `main`)
4. Save your settings and wait for deployment

## Customization

You can modify the application by:

- Changing the `MODEL_URL` to point to your own Teachable Machine model
- Adjusting the visual design variables at the top of the script
- Modifying the confidence visualization in the `drawLabelContainer` function

## Creating Your Own Model

1. Visit [Teachable Machine](https://teachablemachine.withgoogle.com/)
2. Create and train your image classification model
3. Export the model and replace the `MODEL_URL` in the script

## License

MIT

## Credits

Created by [Your Name]
Based on the original sketch by [abdulf](https://editor.p5js.org/abdulf/sketches/VvgG6-z9U)
Using [ml5.js](https://ml5js.org/) and [p5.js](https://p5js.org/)