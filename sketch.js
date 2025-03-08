// Core variables
let classifier;
let video;
let flippedVideo;
let label = "";
let confidence = 0;
// Visual design variables
let bgColor;
let textColor;
let accentColor;
let labelBgOpacity = 0;
let fontSize = 16;
// Model location
const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/UC0_LY_B4/';
// Preload essential assets
function preload() {
  classifier = ml5.imageClassifier(MODEL_URL + 'model.json');
}
function setup() {
  // Create a responsive canvas
  createCanvas(windowWidth > 700 ? 700 : windowWidth, windowHeight > 500 ? 500 : windowHeight);
  
  // Set up colors
  bgColor = color(20, 20, 30);
  textColor = color(240, 240, 255);
  accentColor = color(41, 128, 185);
  
  // Create and configure video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  
  // Ensure video is flipped for intuitive interaction
  flippedVideo = ml5.flipImage(video);
  
  // Start the classification process
  classifyVideo();
}
function draw() {
  // Draw stylish background
  background(bgColor);
  
  // Apply a subtle vignette effect
  drawVignette();
  
  // Draw video with proper sizing and centered - MODIFIED FOR SMALLER IMAGE
  const vidHeight = height * 0.6; // Reduced from 0.8 to 0.6
  const vidWidth = (vidHeight * video.width) / video.height;
  const xOffset = (width - vidWidth) / 2;
  const yOffset = (height * 0.8 - vidHeight) / 2; // Center vertically in the original space
  
  image(flippedVideo, xOffset, yOffset, vidWidth, vidHeight);
  
  // Draw stylish label container
  drawLabelContainer(label, confidence);
}
// Create a subtle vignette effect
function drawVignette() {
  noFill();
  for (let i = 0; i < 100; i++) {
    const alpha = map(i, 0, 100, 0, 50);
    stroke(0, 0, 0, alpha);
    strokeWeight(1);
    rect(i, i, width - i * 2, height - i * 2);
  }
}
// Draw an elegant, animated label container
function drawLabelContainer(labelText, confidence) {
  // Animate the label background opacity based on confidence
  const targetOpacity = map(confidence, 0, 1, 150, 220);
  labelBgOpacity = lerp(labelBgOpacity, targetOpacity, 0.1);
  
  // Draw label container
  const padding = 15;
  const labelWidth = textWidth(labelText) + padding * 2;
  const labelHeight = fontSize + padding;
  const yPos = height * 0.8 + 20;
  
  // Background with rounded corners
  fill(20, 20, 30, labelBgOpacity);
  stroke(accentColor);
  strokeWeight(2);
  rect(width/2 - labelWidth/2, yPos, labelWidth, labelHeight, 10);
  
  // Draw the label text
  noStroke();
  fill(textColor);
  textSize(fontSize);
  textAlign(CENTER, CENTER);
  text(labelText, width/2, yPos + labelHeight/2);
  
  // Draw confidence indicator dots
  const dotCount = 5;
  const dotSize = 6;
  const dotSpacing = 10;
  const dotsWidth = (dotCount - 1) * dotSpacing + dotSize;
  const dotsX = width/2 - dotsWidth/2;
  
  for (let i = 0; i < dotCount; i++) {
    const dotX = dotsX + i * dotSpacing;
    const dotY = yPos + labelHeight + 15;
    
    // Determine if this dot should be highlighted based on confidence
    const dotThreshold = i / (dotCount - 1);
    if (confidence > dotThreshold) {
      fill(accentColor);
    } else {
      fill(100);
    }
    
    noStroke();
    ellipse(dotX, dotY, dotSize);
  }
}
// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}
// Handle classification results
function gotResult(error, results) {
  if (error) {
    console.error('Classification error:', error);
    return;
  }
  
  // Update label and confidence
  label = results[0].label;
  confidence = results[0].confidence;
  
  // Continue classification
  classifyVideo();
}
// Handle window resizing
function windowResized() {
  resizeCanvas(windowWidth > 800 ? 800 : windowWidth, windowHeight > 600 ? 600 : windowHeight);
  video.size(width, height * 0.8);
}