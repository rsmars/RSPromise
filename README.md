# RSPromise
A Realization of Node.JS Promise/A+

Promsis.js exports an Object with:
  then(onFulfilled, onRejected) Method: the then method of the promise/A+;
  fulfill(v) Mehtod: fulfill the promise with value "v";
  reject(r) Method: reject the promise with reason "r";
  GetState Method: return the status of the promise(Pending ,Fulfilled, Rejected);
