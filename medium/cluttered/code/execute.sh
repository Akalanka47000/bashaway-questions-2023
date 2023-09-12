docker pull mongo:latest

docker run -d --name mongodb -p 27207:27017 mongo

# Data will be populated into the above database instance once the tests are run.

# Write your code here