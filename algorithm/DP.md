# 动态规划
## 解决步骤
1. 确定状态
- 最后一步（最优策略中使用的最后一枚硬币）
- 化成子问题
2. 转移方程
`f[X]=min{f[X-2]+1,f[X-5]+1,f[X-7]+1}`
3. 初始条件和边界情况
f[0]=0，如果不能拼出Y,f[Y]=正无穷
4. 计算顺序
f[0],f[1],f[2]...


1. 确定状态
假设拆分第一个正整数为`j`，则将i拆分为`j`和`i-j`。
`dp[i]=max{j*(i-j),j*dp[i-j]}`
2. 转移方程
3. 初始条件和边界情况
- dp[0]=dp[1]=0
- 
4. 计算顺序
dp[0],dp[1],dp[2]...