# Lerna

## Command

- npx lerna init
- lerna init
- lerna create <package.name>
- lerna list
- lerna add <package.name>
- lerna bootstrap
- lerna exec <command>
- yarn workspaces add <package.name>
  所有应用都安装的依赖
- yarn workspace <application.name> add <package.name>
  给某个应用安装依赖
- yarn add -W -D <package.name>
  给根应用安装依赖
- lerna clean
  清理 node_modules
- yarn workspaces run clean
  删除所有项目 node_modules
- lerna publish
  发布包
