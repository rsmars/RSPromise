var Promise = require('./Promise.js');
var assert = require("assert");
var adapter = {
	resolved : function(v){
		var p = new Promise();
		p.fulfill(v);
		return p;
	},
	rejected : function(v){
		var p = new Promise();
		p.reject(v);
		return p;
	},
	deferred : function(){
		var o = new Object();
		o.promise = new Promise();
		o.resolve = function(value){
			this.promise.fulfill(value);
		};
		o.reject = function(reason){
			this.promise.reject(reason);
		}
		return o;
	}
}

describe("Promises/A+ Tests", function () {
    require("./promises-tests-master/lib/programmaticRunner.js").mocha(adapter);
});