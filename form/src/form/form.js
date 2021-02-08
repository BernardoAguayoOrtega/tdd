import {InputLabel, Select, Button} from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import React, {useState} from 'react'

const Form = () => {
  const [formErrors, setFormErrors] = useState({
    name: '',
    size: '',
    type: '',
  })

  const [isSaving, setIsSaving] = useState(false)

  const validateField = ({name, value}) => {
    setFormErrors(prevState => ({
      ...prevState,
      [name]: value.length ? '' : `the ${name} is required`,
    }))
  }

  const validateForm = event => {
    const {name, size, type} = event.target.elements

    validateField({name: 'name', value: name.value})
    validateField({name: 'size', value: size.value})
    validateField({name: 'type', value: type.value})

  }

  const handleSubmit = async event => {
    event.preventDefault()

    setIsSaving(value => !value)

    validateForm(event)

    await fetch('/products', {
      method: 'POST',
      body: JSON.stringify({}),
    })

    setIsSaving(value => !value)
  }

  const handleBlur = event => {
    const {name, value} = event.target

    validateField({name, value})
  }

  return (
    <>
      <h1>create product</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="name"
          id="name"
          helperText={formErrors.name}
          onBlur={handleBlur}
        />

        <TextField
          name="size"
          label="size"
          id="size"
          helperText={formErrors.size}
          onBlur={handleBlur}
        />

        <InputLabel htmlFor="type">Type</InputLabel>

        <Select
          native
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

        {formErrors.type.length ? <p>{formErrors.type}</p> : ''}

        <Button type="submit" disabled={isSaving}>
          Submit
        </Button>
      </form>
    </>
  )
}

export default Form
