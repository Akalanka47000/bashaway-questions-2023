# Log cleaner

Given a couple of source code files which are inside the `src` directory

- If the file is a javascript file, remove all `console.log` statements
- If the file is a python file, remove all `print` statements
- If the file is a java file remove all `System.out.println` statements
- If the file is a C# file remove all `Console.WriteLine` statements
- If the file is a dart file, remove all `print` statements

## Constraints

- The script should be purely written in bash within the `execute.sh` file without using any other programming language

## Output / Evaluation Criteria

- The cleaned files should be inside a directory called `out`
