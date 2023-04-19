
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
 * This export function takes a data matrix and returns MAD of its columns
 * @param {Array} trasnposedDataMatrix 
 * @returns Mean Absolute Deviation
 */
export function calculateSDev(trasnposedDataMatrix) {
    return trasnposedDataMatrix.map(column => {
        const mean = column.reduce((acc, val) => acc + val, 0) / column.length;
        const variance = column.reduce((acc, value) => acc + Math.pow(value - mean, 2), 0) / (column.length - 1);
        return Math.sqrt(variance);
    });
}
/**
 * This export function takes a data matrix and array of MEAN and MAD of its columns as input parameter
 * @param {Array} numericData 
 * @param {Array} meansOfCol 
 * @param {Array} madOfCol 
 * @returns a Standardized Data Matrix as Output parameter
 */
export function getStandardizedData(numericData, meansOfCol, sdevOfCol) {
    return numericData.map(row => {
        return row.map((val, index) => {
            const mean = meansOfCol[index];
            const sdev = sdevOfCol[index];
            return (val - mean) / sdev;
        });
    });
}