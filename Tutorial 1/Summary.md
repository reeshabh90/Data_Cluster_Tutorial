In this excel file, I first entered manual records of the patients with their respective health data.
I considered Hemoglobin, Platelets, MCV and RDW values.

Higher values of Hemoglobin and Platelets and lower values of MCV and RDW suggest a person is Healthy or else Unhealthy.

To Perform this check, I calculated Mean, Std Deviation and Mean Absolute Deviation for respective cateogies of Data.
Based on the above parameters, I calculated Z_Scores of respective Data.
Since Data is now in a normalized form, I created two clusters for classification: Healthy and UnHealthy.
I manually entered value for Healthy and Unhealthy classification, as I kept a refrence point of standard values. There can be other ways of assigning values against 
these two clusters.

I just chose one patient's value as Unhealthy and other one's as Healthy, as a manual interpratation. 

Now, from the centroid of Healthy and Unhealthy clusters, I calculated distance of each ZScores of different categories of each patient. 
Based on the shortest distance, I assigned these patients there respective clusters.
