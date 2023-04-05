
export function FCMeans(normalizedData, numClusters, maxIterations) {
    // Initialize the membership matrix with random values
    const membershipMatrix = initializeMembershipMatrix(normalizedData, numClusters);
    // Perform the algorithm for the specified number of iterations for convergence of clusters
    for (let iteration = 0; iteration < maxIterations; iteration++) {
        // Update the centroids
        const centroids = initializeCentroids(normalizedData, membershipMatrix, numClusters);

        // Update the membership matrix
        updateMembership(normalizedData, membershipMatrix, centroids);
    }

    // Get Cluster Assignments
    const clusterAssignments = normalizedData.map((row, rowIndex) => {
        const maxMembership = Math.max(...membershipMatrix[rowIndex]);
        return membershipMatrix[rowIndex].findIndex(value => value === maxMembership);
    });
    return [clusterAssignments, membershipMatrix];
}

function initializeMembershipMatrix(normalizedData, numClusters) {
    return normalizedData.map(row => {
        const sum = Math.random() * (numClusters - 1) + 1;
        const rowSum = Array(numClusters).fill(0);
        return row.map((_, j) => {
            const value = Math.random() * (1 - 0.1) + 0.1;
            rowSum[j] = value;
            return value / sum;
        });
    });
}

function updateMembership(normalizedData, membershipMatrix, centroids) {
    normalizedData.forEach((row, rowIndex) => {
        const distances = centroids.map(centroid => Math.sqrt(centroid.reduce((sum, value, j) => sum + Math.pow(value - row[j], 2), 0)));
        const rowSum = distances.reduce((sum, distance, j) => sum + Math.pow(1 / distance, 2), 0);
        distances.forEach((distance, j) => {
            membershipMatrix[rowIndex][j] = 1 / Math.pow(distance, 2) / rowSum;
        });
    });
}

function initializeCentroids(normalizedData, membershipMatrix, numClusters) {
    return Array(numClusters).fill().map((_, j) => {
        const centroid = Array(normalizedData[0].length).fill(0);
        const denominator = normalizedData.reduce((sum, row, rowIndex) => sum + Math.pow(membershipMatrix[rowIndex][j], 2), 0);

        normalizedData.forEach((row, rowIndex) => {
            row.forEach((value, columnIndex) => {
                centroid[columnIndex] += Math.pow(membershipMatrix[rowIndex][j], 2) * value;
            });
        });
        return centroid.map(value => value / denominator);
    });
}