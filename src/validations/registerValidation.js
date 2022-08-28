const noEmpty = /\S+/;
// const letters = /^[a-z]+$/i;
const letters = /^([a-zA-Z]+)(\s[a-zA-Z]+)*$/;
const validateMail =
	/[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/;
const validatePassword =
	/^(?=(?:.*\d))(?=.*[A-Z])(?=.*[a-z])(?=.*[.,*!?¿¡/#$%&])\S{8,64}$/;
/* Al menos un número 0-9
  Al menos una mayúscula
  Al menos una minúscula
  Al menos un carácter especial (.,*!?¿¡/#$%&)
  Longitud mínima de 8 caracteres, 64 máxima
  No acepta espacios */

export const validateRegister = input => {
	const error = {};

	if (
		!noEmpty.test(input.name) ||
		!letters.test(input.name) ||
		input.name.length < 2
	)
		error.name = 'First Name is required';
	if (
		!noEmpty.test(input.lastname) ||
		!letters.test(input.lastname) ||
		input.lastname.length < 2
	)
		error.lastname = 'Last Name is required';
	if (!validateMail.test(input.email)) error.email = 'It has to be an email';
	if (!noEmpty.test(input.password) || !validatePassword.test(input.password))
		error.password = 'Be aware of password requirements';
	return error;
};
