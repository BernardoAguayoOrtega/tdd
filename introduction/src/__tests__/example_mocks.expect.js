import { storage } from '../lib/storage';
import { saveUsername, getUsername } from '../User';

jest.mock('../lib/storage');

it('should second test', () => {
	const userName = 'Bernardo';

	saveUsername(userName);

	expect(storage.save).toHaveBeenCalledTimes(1);

	expect(storage.save).toHaveBeenCalledWith({
		key: 'username',
		value: userName,
	});
});

it('should save', () => {
	const userName = 'Bernardo';

	storage.get.mockReturnValue(userName);

	const result = getUsername('username');

	expect(result).toBe(userName);

	expect(storage.get).toBeCalledTimes(1);

	expect(storage.get).toHaveBeenCalledWith({
		key: 'username',
	});
});
