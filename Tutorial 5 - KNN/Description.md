# Problem Statement and steps

In this Tutorial, for predicting the sales price of the Housing dataset, we are performing KNN Algorithm.

I have first converted categorical values of Location into Numbers.
Next, I have calculated the distance of all enteries with respect to the input or new data entry.
Based on the distance, I have ranked each entry.
Value of K = 3, can be varied.
Based upon K = 3, I have selected Rank 1, 2 and 3 enteries and idenified their sales price
In the predicted sales price of new entry: I have calculated the average of 1st three (k=3) ranked entries'sales price.

------------------------------------------------------------------------------------------------------
# KNN

The nearest neighbor algorithm is used in machine learning for both classification and regression tasks, where the goal is to predict a target variable based on a set of input features. The algorithm is particularly useful in cases where the relationship between the input features and the target variable is complex or nonlinear, and cannot be easily represented by a simple mathematical function.

In the nearest neighbor algorithm, the prediction for a new data point is based on the similarity between that point and the points in the training dataset. Specifically, the algorithm finds the k nearest points in the training dataset to the new data point, and then uses the target values of those points to make a prediction for the new point.

The choice of the value of k, known as the "number of neighbors," is an important parameter in the nearest neighbor algorithm. If k is too small, the algorithm may be overly sensitive to noise in the data and may overfit, while if k is too large, the algorithm may be overly influenced by the general trend in the data and may underfit.