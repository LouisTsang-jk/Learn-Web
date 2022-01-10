# webpack hash
- hash
其中一个文件修改了，所以其他的文件的hash也会跟着修改
- chunk hash
chunk hash根据不同的入口文件(Entry)进行依赖解析并构建对应的chunk和hash
- content hash
文件内容级别，只有文件内容变了才会更新相应文件的hash