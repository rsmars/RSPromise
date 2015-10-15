'use strict';
/*
 * Create By Rsmars @2015-10-6 15:46:24
 * A Basic Example of Promise/A+ Using nodejs
 * @link https://github.com/rsmars/RSPromise
 * @copyright Copyright (c) 2015 rsmars
 * @license The MIT License (MIT)
 */

var asyncCall = process.nextTick;
var StateDsc = {
	0: 'Pending',
	1: 'Fulfilled',
	2: 'Rejected'
}
var Promise = function(){
	//Private:
	var __state = 0; //0:Pending; 1: Fulfilled; 2:Rejected;
	var __value = null;
	var __OnFulfilled = [];
	var __OnRejected = [];
	
	var __complete = function(value, state){
		//Promise/A+ 2.1 Promise State
		if(__state === 0){
			__state = state;
			__value = value;
			var functions = state==1?__OnFulfilled:__OnRejected;
			if(functions != null){
				asyncCall(function(){
					functions.forEach(function(fn){
						if(typeof fn == 'function')
							fn(value);
					});
				})
			}
			
			__OnFulfilled = null;
			__OnRejected = null;
		}
	}
	this.__done = function(onFulfilled, onRejected){
		if(__state === 0){
			__OnFulfilled.push(onFulfilled);
			__OnRejected.push(onRejected);
		}else{
			var func = __state==1?onFulfilled:onRejected;
			if(typeof func === 'function'){
				asyncCall(function(){
					func(__value);
				})
			}
		}
	}
	var __resolve = function(promise, x){
		if(promise === x){
			promise.reject(new TypeError('The promise and its value refer to the same object'));
		}else if(x && (typeof x ==='function' || typeof x === 'object')){
			try{
				var then = x.then;
				var isCalled = false;
				var resolvePromise = function(y){
					if(isCalled == false){
						isCalled=true;
						__resolve(promise, y);
					}
					
				}
				var rejectPromise = function(r){
					if(isCalled == false){
						isCalled=true;
						promise.reject(r);
					}
				}
				if(then && typeof then === 'function'){
					then.call(x, resolvePromise, rejectPromise);
				}else {
					promise.fulfill(x);
				}
				
			}catch(e){
				if(isCalled==null || isCalled==false)
					promise.reject(e);
			}
		}else{
			promise.fulfill(x);
		}
	}
	//Public:
	this.GetState = function(){
		return StateDsc[__state];
	}
	this.fulfill = function(val){
		__complete(val, 1);
	}
	this.reject = function(val){
		__complete(val, 2);
	}
	Promise.prototype.then = function(onFulfilled, onRejected){
		var p2 = new Promise();
		this.__done(function(v){//Fulfilled
			if(typeof onFulfilled === 'function'){
				try{
					var x = onFulfilled(v);
					__resolve(p2, x);
				}catch(e){
					p2.reject(e);
				}
			}else{
				p2.fulfill(v);
			}
		}, function(v){//Rejected
			if(typeof onRejected === 'function'){
				try{
					var x = onRejected(v);
					__resolve(p2, x);
				}catch(e){
					p2.reject(e);
				}
			}else{
				p2.reject(v);
			}
		})
		return p2;
	}
	Promise.prototype.catch=function(onRejected){
		this.then(null, onRejected);
	}
}

module.exports=Promise;