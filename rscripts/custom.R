library(scDHA)
library(jsonlite)

# Read data from stdin
file_path <- readLines(con = "stdin", n = 1)

# Specify the path to your TSV file
tsv_file <- file_path

# Load data from the TSV file
your_data <- read.table(tsv_file, header = TRUE, sep = "\t", row.names = 1)

# Get data matrix and label
data <- t(your_data)
label <- colnames(your_data)

# Log transform the data
data <- log2(data + 1)

# Generate clustering result
# result <- scDHA(data, seed = 1)

# # The clustering result can be found here
# cluster <- result$cluster

# # Generate 2D representation
# result <- scDHA.vis(result, seed = 1)

# # Function to serialize and print data with a label
# print_data_with_label <- function(data, label) {
#   json_data <- toJSON(data, auto_unbox = TRUE)
#   cat(paste(label, json_data, sep = ":"), "\n")
# }

# # Print cluster data with a label
# print_data_with_label(result$cluster, "cluster")

# # Print pred data with a label
# print_data_with_label(result$pred, "pred")

# # Print latent data with a label
# print_data_with_label(result$latent, "latent")
