# Env generator

Given a yaml file containing kubernetes secrets, generate a .env file for each corresponding secret

Example secret name to file mapping

- secret-name: todo-service-secret
  file-name: .env.todo

There will be multiple secrets in the yaml file

## Constraints

- The script should be purely written in bash within the `execute.sh` file without using any other programming language

## Output / Evaluation Criteria

- The generated files should be inside a directory called `out` with the instructed file format
