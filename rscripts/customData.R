library(scDHA)

# Read data from stdin
input_data <- readLines(con = "stdin", n = 1)

# Parse JSON data into an R list or data frame
data_from_node <- jsonlite::fromJSON(input_data)

# Access elements of the parsed data as needed
cat("Received data from Node.js:\n")
cat(data_from_node)

# Perform your R data processing here

# Print the result (if needed)
cat("Result from R processing\n")
