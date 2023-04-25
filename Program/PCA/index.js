import pkg from 'xlsx';
const { readFile, utils } = pkg;
import { multiply, transpose, divide, eigs, matrix, sort, range, index } from "mathjs";
import { calculateSDev, calculateMeanofColumns, getStandardizedData, transposeDatamatrix } from "./util.js";

// Read Excel file with training data
const workbook = readFile('PCA.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const trainingData = utils.sheet_to_json(worksheet, { header: 1, defval: null });

/**
 * Calculate the mean and standard deviation
 */
// Extract the numeric data
const numericData = trainingData.slice(1)
    .map(row => row.slice(0, row.length - 1)
        .filter(cell => cell !== null)).filter(row => row.length != 0);

//console.log('Numeric Data', numericData)
/**
 * Transpose training data
 */
const transposedData = transposeDatamatrix(numericData);

/**
 * Calculate mean of each column
 */
const means = calculateMeanofColumns(transposedData);
//console.log('means', means);
/**
 * Calculate standard deviation of each column
 */
const sdevs = calculateSDev(transposedData);
//console.log('sdevs', sdevs);
/**
 * Standardize the data using mean and standard deviation
 */
const standardizedData = getStandardizedData(numericData, means, sdevs);

//console.log('Std Data', standardizedData);

// Calculate the covariance matrix of the standardized data
const X = matrix(standardizedData);
const Xt = transpose(X); // Transpose X
const n = standardizedData.length;
const covarianceMatrix = divide(multiply(Xt, X), n - 1);

// Calculate the eigenvalues and eigenvectors of the covariance matrix
const { values: eigenvalues, vectors: eigenvectors } = eigs(covarianceMatrix);
// Function to find the sorted index of Eigen Value array
const findIndexSeq = a => [...a.keys()].sort((b, c) => a[c] - a[b])
// Sort the eigenvalues and eigenvectors in descending order of eigenvalue
const sortedIndices = findIndexSeq(eigenvalues.toArray())
// Use the index array to sort the eigenvectors array
const sortedEigenvectors = sortedIndices.map(i => eigenvectors.toArray()[i])
const k = 1; // No of principal components
console.log('Sorted Eigen Vector', sortedEigenvectors)
// Calculation of Principal Components:
/**
The reason for transposing standardized data is because the shape of the standardized data is (n x m),
where n is the number of samples and m is the number of features. 
However, the eigen vectors obtained from the covariance matrix have a shape of (m x m). 
Therefore, in order to perform the multiplication,
we need to transpose the standardized data to match the shape of the eigen vectors.

The multiplication between the eigen vector matrix and the transposed standardized data results
in a new matrix where each row represents a principal component and each column represents a sample.
This is because each principal component is a linear combination of the original features, 
and the weightings for each feature are contained within the rows of the eigen vector matrix. 
Therefore, each row in the new matrix represents the scores of each sample
along a particular principal component.
 */
const principalComponents = sortedEigenvectors.slice(0, k).map((vector) => {
    return multiply(vector, transpose(standardizedData));
});
console.log(principalComponents)