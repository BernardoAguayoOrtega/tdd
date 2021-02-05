const asyncCallback = (cb) => {
	setTimeout(() => {
		cb(true);
	}, 1000);
};

const promise = new Promise((resolve, reject) => resolve(true));

describe('async code', () => {
	it('example of async with callback', (done) => {
		asyncCallback((cb) => {
			expect(cb).toBe(true);
			done();
		});
	});

	it('example of promise', () => {
		return promise.then((result) => expect(result).toBe(true));
	});

	it('example of promise 2', async() => {
    const result = await promise
    
    expect(result).toBe(true)
	});
});
