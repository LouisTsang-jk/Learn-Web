# Husky

## usage(v7 version)
```
npm set-script prepare "husky install"
npm run prepare
```
run test command before pre-commit execute.
```
npx husky add .husky/pre-commit "npm test";
git add .husky/pre-commit
```
---
valid the commit message
```
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```
> husky会检测当前目录是否有.git文件夹，所以monorepo的时候需要注意。



## compose package
- commitlint

- lint-staged