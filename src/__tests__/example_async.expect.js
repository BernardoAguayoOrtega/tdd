const asyncCallback = (cb) => {
  setTimeout(() => {
    cb(true);
  }, 1000)
}

describe('async code', () => {
  it('example of async with callback', (done) => {
    asyncCallback(cb => {
      expect(cb).toBe(true);
      done()
    })
  })
})
