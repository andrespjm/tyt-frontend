// const noEmpty = /\S+/;
const letters = /^([a-zA-Z]+)(\s[a-zA-Z]+)*$/;
// const validImage = /.(gif|jpeg|jpg|png)$/i;

export const validateProduct = input => {
	const error = {};

	if (!letters.test(input.name) || input.name.length < 4)
		error.name = 'Name is required. Alphabetic field';
	else if (input.description.length > 50 || input.description.length < 5)
		error.description = 'Description cannot be longer than 50 characters';
	else if (!letters.test(input.artist)) error.artist = 'Artist is required';
	return error;
};
