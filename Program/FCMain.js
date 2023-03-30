import pkg from 'xlsx';
const { readFile, utils } = pkg;
import { FCMeans } from "./FCMeans.js";
import { calculateMAD, calculateMeanofColumns, getNormalizedData, transposeDatamatrix } from "./util.js";
// Read Excel file with training data
const workbook = readFile('Company.xlsx');
const sheetName = workbook.SheetNames[2];
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
//console.log("Transposed Data", transposedData);
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
//console.log("Normalized Data", normalizedData);

// Define the maximum number of iterations for the algorithm
const maxIterations = 100;
// Define the number of clusters
const numClusters = 3;


const [clusterAssignments, membershipMatrix] = FCMeans(normalizedData, numClusters, maxIterations);
console.log("Membership Matrix", membershipMatrix);
console.log(clusterAssignments);


