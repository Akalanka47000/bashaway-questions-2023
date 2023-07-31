# Env generator

Given a yaml file containing kubernetes secrets, generate a .env file for each corresponding secret

Example secret name to file mapping

 - secret-name: todo-service
   file-name: .env.todo

There will be multiple secrets in the yaml file