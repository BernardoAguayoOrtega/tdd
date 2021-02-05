import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Counter from './counter';

describe('Counter', () => {
	beforeEach(() => {
		render(<Counter />);
	});

	it('should display zero initial counts', () => {
		const result = screen.getByText(/clicked times: 0/i);

		expect(result).toBeInTheDocument();
	});

	it('should display new counter after one click', () => {
		const button = screen.getByRole('button', {
			name: /click/i,
		});

		expect(button).toBeInTheDocument();

		fireEvent.click(button);

		const result = screen.getByText(/clicked times: 1/i);

		expect(result).toBeInTheDocument();
	});
});
