# Log cleaner

Given a couple of source code files.

- If the file is javascript, remove all `console.log` statements
- If the file is python, remove all `print` statements
- If the file is java remove all `System.out.println` statements
- If the file is C# remove all `Console.WriteLine` statements
- If the file is Dart, convert all `print` statements to `debugPrint` statements

## Constraints

- The script should be purely written in bash without using any external tools