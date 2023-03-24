
/**
 * Computes Euclidean distance
 * @param {Array} p1 is an array of data points
 * @param {Array} p2 is an array of data points
 * @returns squared distance between p1 & p2
 */
export const euclideanSquaredDistance = (p1, p2) => {
    let sum = 0;
    for (let i = 0; i < p1.length; i++) {
        sum += Math.pow(p1[i] - p2[i], 2);
    }
    return sum;
    // return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
};

/**
 * This export function takes a data matrix and array of MEAN and MAD of its columns as input parameter
 * @param {Array} numericData 
 * @param {Array} meansOfCol 
 * @param {Array} madOfCol 
 * @returns a Normalized Data Matrix as Output parameter
 */
export function getNormalizedData(numericData, meansOfCol, madOfCol) {
    return numericData.map(row => {
        return row.map((val, index) => {
            const mean = meansOfCol[index];
            const mad = madOfCol[index];
            return (val - mean) / mad;
        });
    });
}
/**
 * This export function transposes a data matrix which turns rows to columns and columns to rows
 * Takes a data matrix as input paramter
 * @param {Array} dataMatrix 
 * @returns a transposed data matrix
 */
export function transposeDatamatrix(dataMatrix) {
    return dataMatrix[0].map((_, colIndex) => dataMatrix.map(row => row[colIndex]));
}
/**
 * This export functions takes a data matrix as input parameter, usually a transposed data matrix if
 * reading from Excel file
 * @param {Array} trasnposedDataMatrix 
 * @returns an array of Mean values of each column of the input matrix
 */
export function calculateMeanofColumns(trasnposedDataMatrix) {
    return trasnposedDataMatrix.map(column => column.reduce((acc, val) => acc + val, 0) / column.length);
}
/**
 * This export function takes a data matrix and returns MAD of its columns
 * @param {Array} trasnposedDataMatrix 
 * @returns Mean Absolute Deviation
 */
export function calculateMAD(trasnposedDataMatrix) {
    return trasnposedDataMatrix.map(column => {
        const columnMean = column.reduce((acc, val) => acc + val, 0) / column.length;
        const deviations = column.map(val => Math.abs(val - columnMean));
        return deviations.reduce((acc, val) => acc + val, 0) / column.length;
    });
}

/**
 * This export function comapres the two arrays of centroids to check convergence for K Means
 * It calculates Euclidean Distance between two centroids and checks for tolerance.
 * @param {Array} centroids1 is an Array of centroids created from Data Matrix
 * @param {Array} centroids2 is an Array of centroids created from Data Matrix
 * @param {Number} tolerance is a value of tolerance to compare difference between centroid 1 and centroid 2
 * @returns a boolean value true or false
 */
export function compareCentroids(centroids1, centroids2, tolerance = 0.0001) {
    if (centroids1.length !== centroids2.length) {
        return false;
    }

    for (let i = 0; i < centroids1.length; i++) {
        const distance = euclideanDistance(centroids1[i], centroids2[i]);

        if (distance > tolerance) {
            return false;
        }
    }
    return true;
}

/**
 * Computes Euclidean Distance Value between two arrays
 * @param {Array} a is an array
 * @param {Array} b is an array
 * @returns Euclidean Distance value
 */
export function euclideanDistance(a, b) {
    return Math.sqrt(a.reduce((sum, x, i) => sum + (x - b[i]) ** 2, 0));
}

/**
 * This function computes Within Sum of Square Errors for a data matrix by initilizing 
 * random centroids choosen from data matrix
 * @param {Array} normalizedData is a normalized data matrix    
 * @param {Number} k is number of clusters
 * @returns sum of square errors also called SSE or WCSS
 */
export function calculateWCSS(normalizedData, k) {
    let centroids = createCentroids(normalizedData, k);
    // Initialize the sum of squared errors
    let sum = 0;
    // Calculate WCSS
    // Initialize an array to store the assignments
    const assignments = [];
    sum = calculateSSE(normalizedData, centroids, assignments, sum);
    return sum;
}
/**
 * 
 * @param {Array} normalizedData a normalized data matrix
 * @param {Array} centroids array of centroids based on normalized matrix
 * @param {Array} assignments array to store data points of matrix and their respective centroid assignemnt
 * @param {Number} sum Sum of Squared Distances between data point of matrix and centroids
 * @returns sum of squared errors
 */
export function calculateSSE(normalizedData, centroids, assignments, sum) {
    for (let index = 0; index < normalizedData.length; index++) {

        //Assign each data point to its nearest centroid.
        let minDistance = Infinity;
        let minIndex = null;

        for (let j = 0; j < centroids.length; j++) {
            let distance = euclideanSquaredDistance(normalizedData[index], centroids[j]);
            if (distance < minDistance) {
                minDistance = distance;
                minIndex = j;
            }
        }
        assignments[index] = minIndex;
        sum += minDistance;
    }
    return sum;
}
/**
 * This function creates random centroids from a data matrix
 * @param {Array} data is a data matrix
 * @param {Number} k is number of clusters
 * @returns an array of centroids 
 */
export function createCentroids(data, k) {
    let centroids = [];
    for (let i = 0; i < k; i++) {
        centroids.push(data[Math.floor(Math.random() * data.length)]); // randomly select k data points as centroids
    }
    return centroids;
}

