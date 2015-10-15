# RSPromise
A Realization of Node.JS Promise/A+

Promise.js exports an Object with:
* then(onFulfilled, onRejected) Method: the then method of the promise/A+;
* fulfill(v) Mehtod: fulfill the promise with value "v";
* reject(r) Method: reject the promise with reason "r";
* GetState Method: return the status of the promise(Pending ,Fulfilled, Rejected);
  
#Test

Thanks to Domenic Denicola <d@domenic.me>;
Git : https://github.com/promises-aplus/promises-tests.git;
This Promise has passed all cases;
Run "node test.js" to test the file;
