import { createCentroids, compareCentroids, calculateSSE } from "./util.js";
/**
 * This function performs K-Means Cluster Analysis on the given data matrix
 * @param {Array} data is an array of Normalized Data Matrix
 * @param {Number} k number of clusters
 * @param {Number} maxIterations is number of iterations to be performed
 * @returns an Array of cluster assignments wrt to each data point within data matrix
 */
export function kMeans(data, k, maxIterations = 100) {
  // Initialize k cluster centroids randomly
  let centroids = createCentroids(data, k);
  const clusterAssignments = [];
  for (let i = 0; i < maxIterations; i++) {
    let sum = 0;
    // Calculate SSE
    sum = calculateSSE(data, centroids, clusterAssignments, sum);
    // Update the centroids based on the new cluster assignments
    const newCentroids = updateCentroids(data, clusterAssignments, k);

    // Check if the centroids have changed or the maximum number of iterations has been reached
    if (compareCentroids(centroids, newCentroids) || i === maxIterations - 1) {
      return [centroids, clusterAssignments];
    }

    centroids = newCentroids;
  }
}

/**
 * This function updates the centroids based on the new cluster assignments.
 * @param {Array} data is data matrix
 * @param {Array} assignments is an array indicating the cluster assignment of each data point.
 * @param {Number} k is number of clusters
 * @returns new centroids
 */
function updateCentroids(data, assignments, k) {
  const dim = data[0].length;
  const centroids = Array(k).fill().map(() => Array(dim).fill(0));
  const clusterCounts = Array(k).fill(0);

  // Compute the sum of data points assigned to each cluster
  for (let i = 0; i < data.length; i++) {
    const cluster = assignments[i];
    centroids[cluster] = centroids[cluster].map((val, j) => val + data[i][j]);
    clusterCounts[cluster]++;
  }

  // Compute the mean of data points assigned to each cluster
  for (let i = 0; i < k; i++) {
    if (clusterCounts[i] > 0) {
      centroids[i] = centroids[i].map(val => val / clusterCounts[i]);
    }
  }

  return centroids;
}
