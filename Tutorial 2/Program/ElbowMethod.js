import { calculateWCSS } from "./util.js";

/**
 * The method works by iteratively calculating the angle between each pair of consecutive lines 
 * formed by the slope values. The angle between two consecutive lines is calculated as the 
 * absolute difference between their slopes,
 * and the method stores the maximum angle seen so far and the corresponding index.
 * @param {Array} distortionsSlope 
 * @returns elbowIndex-> Maximum angle
 */
function findElbowIndex(distortionsSlope) {
    let elbowIndex = 0;
    let maxSlope = 0;
    for (let i = 0; i < distortionsSlope.length; i++) {
        if (distortionsSlope[i] > maxSlope) {
            elbowIndex = i;
            maxSlope = distortionsSlope[i];
        }
    }
    return elbowIndex;
}
/**
 * This function is used to calculate optimised number of clusters in a data set 
 * using Elbow Method Algorithm
 * @param {Array} normalizedData a normalized data matrix
 * @param {Number} noClusters Number of clusters
 * @returns elbow point
 */
export function elbowMethod(normalizedData, noClusters) {
    // Initialize an array to store the sum of squared errors for each value of k
    const sse = [];
    // Calculate the sum of squared errors for each value of k
    for (let k = 1; k <= noClusters; k++) {
        sse[k] = calculateWCSS(normalizedData, noClusters)
    }
    // PLotting Slope of Sum of Squared errors vs Number of Clusters
    const distortionsSlope = [];
    for (let i = 1; i < sse.length; i++) {
        const slope = (sse[i] - sse[i - 1]) / i;
        distortionsSlope.push(slope);
    }

    const elbowIndex = findElbowIndex(distortionsSlope);
    return elbowIndex + 1;
}
