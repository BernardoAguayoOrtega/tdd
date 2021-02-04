describe('set up and teardown examples', () => {
  beforeAll(() => console.log('before'))

  beforeEach(() => console.log('before each'))
  
  it('should 1', () => {
    expect(true).toBe(true)
  })

  it('should 2', () => {
    expect(true).toBe(true)
  })

  it('should 3', () => {
    expect(true).toBe(true)
  })
})