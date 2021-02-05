import React from 'react';
import { render, screen } from '@testing-library/react';

import AsyncList from './async-list';

describe('AsyncList', () => {

  it('should show the food data', async () => {

    render(<AsyncList />)
    
    const hamburger = await screen.findByText(/hamburger/i)

    const pizza = await screen.findByText(/pizza/i)

    const tacos = await screen.findByText(/tacos/i)

    expect(hamburger).toBeInTheDocument()
    expect(tacos).toBeInTheDocument()
    expect(pizza).toBeInTheDocument()
  })

})
