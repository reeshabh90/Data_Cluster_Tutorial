import pkg from 'xlsx';
const { readFile, utils } = pkg;
import { kMeans } from "./KMeans.js";
import { calculateMAD, calculateMeanofColumns, getNormalizedData, transposeDatamatrix } from "./util.js";
import { elbowMethod } from "./ElbowMethod.js";
// Read Excel file with training data
const workbook = readFile('training_data.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const trainingData = utils.sheet_to_json(worksheet, { header: 1, defval: null });
// Extract the labels and names
trainingData[0].slice(1).filter(label => label != null); // skip the first element, which is empty
trainingData.slice(1).map(row => row[0]);

/**
 * Calculate the mean and standard deviation
 */
const numericData = trainingData.slice(1)
    .map(row => row.slice(1)
        .filter(cell => cell !== null)).filter(row => row.length != 0); // skip the first column
/**
 * Transpose training data
 */
const transposedData = transposeDatamatrix(numericData);

/**
 * Calculate mean of each column
 */
const means = calculateMeanofColumns(transposedData);

/**
 * Calculate mean absolute deviation of each column
 */
const mads = calculateMAD(transposedData);

/**
 * Normalize the data using mean and standard deviation
 */
const normalizedData = getNormalizedData(numericData, means, mads);

// Read Excel file with testing data
const testworkbook = readFile('testing_data.xlsx');
const testsheetName = testworkbook.SheetNames[0];
const testworksheet = testworkbook.Sheets[testsheetName];
const testingData = utils.sheet_to_json(testworksheet, { header: 1, defval: null });

// Extract the labels and names
testingData[0].slice(1).filter(label => label != null); // skip the first element, which is empty
testingData.slice(1).map(row => row[0]);
const testNumericData = testingData.slice(1).map(row => row.slice(1).filter(cell => cell !== null)).filter(row => row.length != 0); // skip the first column
console.log("testing Data before Normalization", testNumericData);
/**
 * Transpose testing data
 */
const testingTransposedData = transposeDatamatrix(testNumericData);
/**
 * Calculate mean of each column
 */
const testMeans = calculateMeanofColumns(testingTransposedData);

/**
 * Calculate mean absolute deviation of each column
 */
const testMads = calculateMAD(testingTransposedData);

/**
 * Normalize the data using mean and standard deviation
 */
const testNormalizedData = getNormalizedData(testNumericData, testMeans, testMads);

/**
 * This function calculates number of clusters from training data
 * @param {Array} normalizedData is a normalized Data Matrix
 * @param {Number} clusterLimit is maximum limit of clusters
 */
function calculateNoOfClustersFromTrainingData(normalizedData, clusterLimit) {
    return elbowMethod(normalizedData, clusterLimit);
}

/**
 * Based on Number of clusters calculated from Training data, classify testing data
 */
const [centroids, clusterAssignments] =
    kMeans(testNormalizedData, calculateNoOfClustersFromTrainingData(normalizedData, 5));
// Classify the testing data based on the cluster assignments
const predictedLabels = [];
for (let i = 0; i < clusterAssignments.length; i++) {
    predictedLabels.push(clusterAssignments[i] + 1); // add 1 to match the original label encoding
}
console.log(predictedLabels);
