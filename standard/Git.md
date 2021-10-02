# Git
> 现在跳槽新公司的git用起来要比以前不一样，以前小作坊随便开发，现在多人同时协作还有多个版本，可是要正正式式好好学习Git相关知识了，不然成天问同事也不是办法。
git是版本控制系统

# 异常
- 有时候merge失败，merge之后冲突，但是merge是失败状态，这时候关闭webpack服务器再次merge就可能会成功了，原因可能是windows下占用了部分文件的使用

### 创建仓库
`git init`  
同时目录下会多一个隐藏文件夹`.git`，这是git用来跟踪管理版本库的。  
*注意git不能跟踪二进制文件的改动，如doc*


### 创建分支
`git branch <branchname>`
`git branch -b <branchname>` 创建并切换到该分支

### 把文件添加到仓库
`git add (filename)`

### 
TODO
git merge
git checkout
git checkout .
git status
git fetch

### 一些会遇到的情景
#### 修改的文件已经添加到暂存区，想撤销
```
git reset --mixed HEAD
```
#### 撤销commit
```
git reset --soft HEAD^
```
#### 撤销已提交到远程主机的文件
```
git revert <commit_id>||HEAD
```
#### 开发功能到半路，需要切换分支去修复紧急bug
```
// save
git stash
// load
git stash pop
```
#### 跨分支单独提交(important)
```
git cherry-pick <commit_id>
```
#### 需要将两个分支合并
```
// 
git merge <branch_name> 
```
#### 新功能新建分支
```
git checkout -b <branch_name>
```
#### commit错分支
```
git add .
git commit -m "..."
// 发现所在分支不是想commit的分支
git checkout <branch_name>
git cherry-pick <commit_id>
git push
// 记得在commit错的分支上撤回commit
git checkout <error_branch_name>
git reset --hard <commit_id>
```
#### 撤回commit
`git commit --amend`
[廖雪峰git教程](liaoxuefeng.com/wiki/896043488029600/896067008724000)

#### 技巧
1. git commit -am "sth"
2. git config --global alias.ac "commit -am"
> git ac "sth"