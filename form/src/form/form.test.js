import React from 'react'
import {screen, render, fireEvent} from '@testing-library/react'

import Form from './form'

describe('when the form is mounted', () => {
  beforeEach(() => render(<Form />))

  it('there must be a create product form page', () => {
    expect(
      screen.getByRole('heading', {name: /create product/i}),
    ).toBeInTheDocument()
  })

  it('should exists fields: name, size, type (electronic, furniture, clothing)', () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/size/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/type/i)).toBeInTheDocument()

    expect(screen.queryByText(/electronic/i)).toBeInTheDocument()
    expect(screen.queryByText(/furniture/i)).toBeInTheDocument()
    expect(screen.queryByText(/clothing/i)).toBeInTheDocument()
  })

  it('should exists submit button', () => {
    expect(screen.queryByRole('button', {name: /submit/i})).toBeInTheDocument()
  })
})

describe('when the user submits the form without values', () => {
  beforeEach(() => render(<Form />))

  it('should display validation messages', () => {
    expect(screen.queryByText(/the name is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/the size is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/the type is required/i)).not.toBeInTheDocument()

    const button = screen.getByRole('button', {name: /submit/i})

    fireEvent.click(button)

    expect(screen.queryByText(/the name is required/i)).toBeInTheDocument()
    expect(screen.queryByText(/the size is required/i)).toBeInTheDocument()
    expect(screen.queryByText(/the type is required/i)).toBeInTheDocument()
  })
})

describe('when the user blurs an empty field', () => {
  beforeEach(() => render(<Form />))
  it('should display a validation error message name filed', () => {

    expect(screen.queryByText(/the name is required/i)).not.toBeInTheDocument()

    const name = screen.queryByLabelText(/name/i)

    fireEvent.blur(name, {target:{name: 'name', value: ''}})

    expect(screen.queryByText(/the name is required/i)).toBeInTheDocument()
  })

  it('should display a validation error message size label', () => {

    expect(screen.queryByText(/the size is required/i)).not.toBeInTheDocument()

    const size = screen.queryByLabelText(/size/i)

    fireEvent.blur(size, {target:{name: 'size', value: ''}})

    expect(screen.queryByText(/the size is required/i)).toBeInTheDocument()
  })
})
