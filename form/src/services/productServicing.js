const saveProduct = ({name, size, type}) =>
  fetch('/products', {
    method: 'POST',
    header: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({name, size, type}),
  })

export default saveProduct
