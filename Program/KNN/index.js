import pkg from 'xlsx';
const { readFile, utils } = pkg;
import readline from "readline-sync";
// Read Excel file with training data
const workbook = readFile('HousingSale.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const trainingData = utils.sheet_to_json(worksheet, { header: 1, defval: null });

// Extract the numeric data
const numericData = trainingData.slice(1)
  .map(row => row.slice(1)
    .filter(cell => cell !== null)).filter(row => row.length != 0);

// Convert the categorical location feature to numerical
const locationMap = { Suburban: 0, Urban: 1, Rural: 2 };
numericData.forEach((point) => {
  point[3] = locationMap[point[3]];
});

// Store the data in an array of objects
const featureNames = ["bedrooms", "bathrooms", "squareFootage", "location"];
const featureTypes = ["continuous", "continuous", "continuous", "categorical"];

// Define the new data point to make a prediction for
// const newPoint = [3, 2, 2000, "urban"]; // 3 bedrooms, 2 bathrooms, 2000 sq ft, urban location

// Prompt the user to enter the values for the new data point
const newPoint = [];
for (let i = 0; i < featureNames.length; i++) {
  let value;
  do {
    value = readline.question(`Enter ${featureNames[i]}: `);
    if (featureTypes[i] === "continuous" && isNaN(value)) {
      console.log(`Invalid ${featureNames[i]} input. Please enter a number.`);
    } else if (featureTypes[i] === "categorical" && locationMap[value] === undefined) {
      console.log(`Invalid ${featureNames[i]} input. Please enter a valid location.`);
    }
  } while ((featureTypes[i] === "continuous" && isNaN(value)) || (featureTypes[i] === "categorical" && locationMap[value] === undefined));
  newPoint.push(featureTypes[i] === "continuous" ? parseFloat(value) : locationMap[value]);
}

// Convert the categorical location feature to numerical
newPoint[3] = locationMap[newPoint[3]];

// Define the number of neighbors to consider
const k = 3;
// Calculate the distance between the new point and each point in the dataset
const distances = numericData.map((point) => {
  let distance = 0;
  for (let i = 0; i < point.length - 1; i++) {
    if (featureTypes[i] === "continuous") {
      distance += Math.pow(point[i] - newPoint[i], 2);
    } else if (featureTypes[i] === "categorical") {
      if (point[i] !== newPoint[i]) {
        distance += 1;
      }
    }
  }
  return { point, distance: Math.sqrt(distance) };
});

// Sort the distances in ascending order
distances.sort((a, b) => a.distance - b.distance);

// Take the k nearest neighbors
const nearestNeighbors = distances.slice(0, k);

// Calculate the mean of the sale prices of the nearest neighbors
const predictedPrice =
  nearestNeighbors.reduce((sum, neighbor) => sum + neighbor.point[4], 0) / k;

// const dataObjects = numericData.slice(1).map((point) => {
//   const obj = {};
//   for (let i = 0; i < featureNames.length; i++) {
//     obj[featureNames[i]] = point[i];
//   }
//   obj["salePrice"] = point[4];
//   return obj;
// });

console.log(predictedPrice)