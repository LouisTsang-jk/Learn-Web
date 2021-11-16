/** instanceof */
function instanceOf (father, child) {
  const fp = father.prototype;
  const cp = child.__proto__;
  
  while (cp) {
    if (cp === fp) {
      return true
    }
    cp = cp.__proto__;
  }
  return false;
}