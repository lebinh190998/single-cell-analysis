library(scDHA)
library(jsonlite)

#Load example data (Goolam dataset)
data("Goolam")

#Get data matrix and label
data <- t(Goolam$data)
label <- as.character(Goolam$label)

#Log transform the data
data <- log2(data + 1)

#Generate clustering result
result <- scDHA(data, seed = 1)

#The clustering result can be found here
cluster <- result$cluster

#Generate 2D representation
result <- scDHA.vis(result, seed = 1)

# Function to serialize and print data with a label
print_data_with_label <- function(data, label) {
  json_data <- toJSON(data, auto_unbox = TRUE)
  cat(paste(label, json_data, sep = ":"), "\n")
}

# Print cluster data with a label
print_data_with_label(result$cluster, "cluster")

# Print pred data with a label
print_data_with_label(result$pred, "pred")

# Print latent data with a label
print_data_with_label(result$latent, "latent")