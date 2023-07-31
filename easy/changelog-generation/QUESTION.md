# changelog-generation

Clone the official bashaway repository and generate a changelog for the given time period. The expected output is a markdown file with the following format.

Merge commits are ignored, as well as revert commits.


Example commit list for 2021-09-01

- Feat: Feature 1
- Feat: Feature 2
- Fix: Bug fix 1
- Fix: Bug fix 2
- Chore: Other 1
- Debug: Other 2


NOTE: Anything other than Feat and Fix should be considered as Others

```markdown

# Changelog

## 2023-07-01
 
### Features

    - Feature 1 (#commit-hash)

    - Feature 2 (#commit-hash)


### Bug fixes

    - Bug fix 1 (#commit-hash)

    - Bug fix 2 (#commit-hash)


### Others

    - Other 1 (#commit-hash)

    - Other 2 (#commit-hash)


## 2023-07-04

### Features

    - Feature 5 (#commit-hash)

    - Feature 3 (#commit-hash)



## Constraints

- The script should be purely written in bash without using any external tools
- Everything should be within the execute.sh file

