// import * as yup from 'yup';

// const noEmpty = /\S+/;
// const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü]+$/;
const letters = /^([a-zA-Z]+)(\s[a-zA-Z]+)*$/;
// const validImage = /.(gif|jpeg|jpg|png)$/i;

export const validateProduct = input => {
	const errors = {};

	if (!letters.test(input.name))
		errors.name = 'Name is required. Alphabetic field';
	if (!letters.test(input.artist)) errors.artist = 'Artist is required';
	return errors;
};

// export const validateProduct = yup.object({
// 	name: yup
// 		.string()
// 		.required('Please enter your name')
// 		.matches(regexName, 'Please, enter a valid name')
// 		.min(3, 'Please min 3 characters')
// 		.max(15, 'Please max 12 characters'),
// 	artist: yup
// 		.string()
// 		.required("Please enter artist's name")
// 		.min(3, 'Please min 3 characters')
// 		.max(15, 'Please max 15 characters'),
// 	/* imageMain: yup.mixed().required('Image main is required'),
// 	cakeTrail: yup.number().required('Required field'),
// 	priceCakeTrail: yup.number().required('Required field'),
// 	turntable: yup.number().required('Required field'),
// 	priceTurntable: yup.number().required('Required field'),
// 	imagesDetail: yup.mixed().required('Image main is required'), */
// 	description: yup
// 		.string()
// 		.min(5, 'Please min 5 characters')
// 		.max(50, 'Please max 50 characters'),
// });
