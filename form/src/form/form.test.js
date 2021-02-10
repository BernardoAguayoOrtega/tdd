import React from 'react'
import {screen, render, fireEvent, waitFor} from '@testing-library/react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {CREATED_STATUS, ERROR_SERVER_STATUS} from '../consts/httpStatus'

import Form from './form'

const server = setupServer(
  rest.post('/products', (req, res, ctx) => {
    const {name, size, type} = req.body

    if (name && size && type) {
      return res(ctx.status(CREATED_STATUS))
    }

    return res(ctx.status(ERROR_SERVER_STATUS))
  }),
)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

beforeEach(() => render(<Form />))

describe('when the form is mounted', () => {
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
  it('should display validation messages', async () => {
    expect(screen.queryByText(/the name is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/the size is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/the type is required/i)).not.toBeInTheDocument()

    const button = screen.getByRole('button', {name: /submit/i})

    fireEvent.click(button)

    expect(screen.queryByText(/the name is required/i)).toBeInTheDocument()
    expect(screen.queryByText(/the size is required/i)).toBeInTheDocument()
    expect(screen.queryByText(/the type is required/i)).toBeInTheDocument()

    await waitFor(() => expect(button).not.toBeDisabled())
  })
})

describe('when the user blurs an empty field', () => {
  it('should display a validation error message name filed', () => {
    expect(screen.queryByText(/the name is required/i)).not.toBeInTheDocument()

    const name = screen.queryByLabelText(/name/i)

    fireEvent.blur(name, {target: {name: 'name', value: ''}})

    expect(screen.queryByText(/the name is required/i)).toBeInTheDocument()
  })

  it('should display a validation error message size label', () => {
    expect(screen.queryByText(/the size is required/i)).not.toBeInTheDocument()

    const size = screen.queryByLabelText(/size/i)

    fireEvent.blur(size, {target: {name: 'size', value: ''}})

    expect(screen.queryByText(/the size is required/i)).toBeInTheDocument()
  })
})

describe('when the user submits the form', () => {
  it('should the submit button be disabled until de request is done', async () => {
    const button = screen.getByRole('button', {name: /submit/i})

    expect(button).not.toBeDisabled()

    fireEvent.click(button)

    expect(button).toBeDisabled()

    await waitFor(() => expect(button).not.toBeDisabled())
  })

  it('the form page must display the success message "Product stored" and clean the fields values', async () => {
    const button = screen.getByRole('button', {name: /submit/i})
    const nameLabel = screen.getByLabelText(/name/i) 
    const sizeLabel = screen.getByLabelText(/size/i) 
    const typeLabel = screen.getByLabelText(/type/i) 

    expect(nameLabel).toBeInTheDocument()
    expect(sizeLabel).toBeInTheDocument()
    expect(typeLabel).toBeInTheDocument()

    expect(button).not.toBeDisabled()

    fireEvent.change(nameLabel, {target: {name: 'name', value: 'my product'}})
    fireEvent.change(sizeLabel, {target: {name: 'name', value: '10'}})
    fireEvent.change(typeLabel, {target: {name: 'name', value: 'electronic'}})

    fireEvent.click(button)

    await waitFor(() =>
      expect(screen.getByText(/Product stored/i)).toBeInTheDocument(),
    )
  })
})
