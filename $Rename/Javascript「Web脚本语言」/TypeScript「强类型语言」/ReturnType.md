# ReturnType
```
function toInt (testStr: string) {
  return +testStr;
}
type Temp = ReturnType<typeof toInt>
// type Temp = number
```