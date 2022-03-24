# TS
TypeScript
## any/void/never
### any
无法确定变量的类型时(或者无需确认类型时),可以将其指定为 any 类型
> TS中对于被标记为 any 类型的变量，是没有进行类型检查而直接通过编译阶段的检查
### void
void 类型表示没有任何类型, 申明为 void 类型的变量，只能赋予 undefined 和 null
### never
never 类型表示永远不会有值的一种类型
## interface/type