/** Promise */
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';
function _Promise (fn) {
  const _this = this;
  this.status = PENDING;
  this.value = null;
  this.reson = null;
  this.resolvedCallbacks = [];
  this.rejectedCallbacks = [];
  function resolve (value) {
    if (_this.status === PENDING) {
      _this.status = RESOLVED;
      _this.value = value;
      _this.resolvedCallbacks.map(cb => cb(value));
    }
  }
  function reject (reason) {
    if (_this.status === PENDING) {
      _this.status = REJECTED;
      _this.reason = reason;
      _this.rejectedCallbacks.map(cb => cb(reason));
    }
  }
  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e)
  }
}
_Promise.prototype.then = function (onFullfilled, onRejected) {
  const _this = this;
  if (_this.status === PENDING) {
    _this.resolvedCallbacks.push(onFullfilled);
    _this.rejectedCallbacks.push(onRejected);
  }
  if (_this.status === RESOLVED) {
    onFullfilled(_this.value);
  }
  if (_this.status === REJECTED) {
    onFullfilled(_this.reason);
  }
}