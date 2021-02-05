import HelloWorld from './hello-world';

import { render, screen } from '@testing-library/react';

describe('HelloWorld', () => {
	it('should render hello world', () => {
		render(<HelloWorld />);

		const title = screen.getByText(/hello world/i)

		expect(title).toBeInTheDocument()

	});
});
