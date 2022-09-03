import moment from 'moment';
import * as yup from 'yup';

const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü]+$/;
// const regexPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

export const validateUser = yup.object({
	firstName: yup
		.string()
		.required('Please enter your name')
		.matches(regexName, 'Please, enter a valid name')
		.min(3, 'Please min 3 characters')
		.max(15, 'Please max 15 characters'),
	lastName: yup
		.string()
		.required('Please enter your last name')
		.matches(regexName, 'Please, enter a valid last name')
		.min(3, 'Please min 3 characters')
		.max(20, 'Please max 20 characters'),
	gender: yup.mixed().oneOf(['Male', 'Female', 'Other']).defined(),
	identityCard: yup
		.string()
		.required('Please enter your identity card')
		.matches(/^[0-9]+$/, 'Must be only digits')
		.min(6, 'Please min 6 digits')
		.max(10, 'Please max 10 digits'),
	// typeId: yup.mixed().oneOf(['cc', 'ce', 'passport']).defined(),
	// birthDate: yup
	// 	.date()
	// 	.nullable()
	// 	.min(new Date(1900, 1, 1))
	// 	.required('Please, select your birthdate'),
	birthDate: yup
		.string()
		.required('Please enter your birth date')
		.test('Message', 'Must be an adult', value => {
			return moment().diff(moment(value), 'years') >= 18;
		}),
});

export const validateResetPassword = yup.object({
	email: yup
		.string()
		.email('Please enter a valid email')
		.required('Please enter your email')
		.max(150, 'Please max 150 characters'),
});
