# Introduction
--------------------------------------------------------------------------------------------------------
The nearest neighbor algorithm is used in machine learning for both classification and regression tasks, where the goal is to predict a target variable based on a set of input features. The algorithm is particularly useful in cases where the relationship between the input features and the target variable is complex or nonlinear, and cannot be easily represented by a simple mathematical function.

In the nearest neighbor algorithm, the prediction for a new data point is based on the similarity between that point and the points in the training dataset. Specifically, the algorithm finds the k nearest points in the training dataset to the new data point, and then uses the target values of those points to make a prediction for the new point.

The choice of the value of k, known as the "number of neighbors," is an important parameter in the nearest neighbor algorithm. If k is too small, the algorithm may be overly sensitive to noise in the data and may overfit, while if k is too large, the algorithm may be overly influenced by the general trend in the data and may underfit.
----------------------------------------------------------------------------------------------------------
# Code Explanation
----------------------------------------------------------------------------------------------------------
Code takes input from the end user to enter the house details and then calculates the predicted pricing.
In the K Nearest Neighbor algorithm, the first step is to calculate the distance between the new data point and each point in the dataset. The distance is typically calculated using a distance metric such as Euclidean distance, Manhattan distance, or cosine similarity.

In the code, we calculate the distance between the new data point and each point in the dataset using the Euclidean distance metric. We start by iterating over each point in the dataset using the map function. For each point, we calculate the distance using the following formula:

distance = sqrt((x1 - x2)^2 + (y1 - y2)^2 + ... + (n1 - n2)^2)

where x1, x2, y1, y2, n1, n2, etc. are the values of the continuous features of the two points.

If the feature is categorical, we simply add 1 to the distance if the values are not equal. This is because categorical features are not continuous and do not have a numerical distance metric.

We store the point and its distance in an object and return it as an element of an array.

The resulting distances array contains an object for each point in the dataset, with the point and its distance from the new data point. We then sort the array in ascending order based on the distance, so that the nearest neighbors are at the beginning of the array.

Finally, we take the k nearest neighbors by slicing the array, and use them to make a prediction for the new data point.

---------------------------------------------------------------------------------------------------------
