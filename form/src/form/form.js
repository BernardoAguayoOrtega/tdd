import React from 'react'
import {InputLabel, Select, Button} from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import {useState} from 'react'

const Form = () => {
  const [formErrors, setFormErrors] = useState({
    name: '',
    size: '',
    type: '',
  })

  const handleSubmit = event => {
    event.preventDefault()

    const {name, size, type} = event.target.elements

    if (!name.value) {
      setFormErrors(prevState => ({...prevState, name: 'the name is required'}))
    }

    if (!size.value) {
      setFormErrors(prevState => ({...prevState, size: 'the size is required'}))
    }

    if (!type.value) {
      setFormErrors(prevState => ({...prevState, type: 'the type is required'}))
    }
  }

  const handleBlur = event => {
    const {name, value} = event.target

    setFormErrors({
      ...formErrors,
      [name]: value.length ? '' : `The ${name} is required`,
    })
  }

  return (
    <>
      <h1>create product</h1>
      <form onSubmit={handleSubmit}>
        <TextField name="name" label="name" id="name" helperText={formErrors.name} onBlur={handleBlur}/>

        <TextField name="size" label="size" id="size" helperText={formErrors.size} onBlur={handleBlur}/>

        <InputLabel htmlFor="type">Type</InputLabel>

        <Select
          native
          value=""
          inputProps={{
            name: 'type',
            id: 'type',
          }}
        >
          <option aria-label="None" value="" />
          <option value="electronic">electronic</option>
          <option value="furniture">furniture</option>
          <option value="clothing">clothing</option>
        </Select>

        {formErrors.type.length && <p>{formErrors.type}</p>}

        <Button type="submit">Submit</Button>
      </form>
    </>
  )
}

export default Form
