const letters = /^([a-zA-Z]+)(\s[a-zA-Z]+)*$/;
const numbers = /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/;

export const validateProduct = product => {
	const errors = {};
	if (product.name) {
		if (!letters.test(product.name))
			errors.name =
				'The product name must not contain numbers or special characters';
	}
	if (product.artist) {
		if (!letters.test(product.artist))
			errors.artist =
				'The artist name must not contain numbers or special characters';
	}
	if (!numbers.test(product.stockCakeTray + 0.01))
		errors.numbers = 'Only positive amounts allowed';

	if (!numbers.test(product.priceCakeTray + 0.01))
		errors.numbers = 'Only positive amounts allowed';
	if (!numbers.test(product.stockTurntable + 0.01))
		errors.numbers = 'Only positive amounts allowed';
	if (!numbers.test(product.priceTurntable + 0.01))
		errors.numbers = 'Only positive amounts allowed';

	if (
		!product.name ||
		!product.description ||
		!product.artist ||
		!number.test(product.priceCakeTray + 0.01) ||
		!number.test(product.priceTurntable + 0.01) ||
		!number.test(product.stockCakeTray + 0.01) ||
		!number.test(product.stockTurntable + 0.01)
	) {
		errors.required = `Required: ${!product.name ? 'name,' : ''} ${
			!product.description ? 'description,' : ''
		} ${!product.artist ? 'artist,' : ''} ${
			!number.test(product.priceCakeTray + 0.01) ? 'cake tray price,' : ''
		}${!number.test(product.priceTurntable + 0.01) ? 'turntable price,' : ''} ${
			!number.test(product.stockCakeTray + 0.01) ? 'cake tray stock,' : ''
		} ${
			!number.test(product.stockTurntable + 0.01) ? 'turntable stock,' : ''
		} `;
	}
	return errors;
};

const number = /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/;
export const validateProductSubmit = (product, newColors) => {
	const errorSubmit = {};
	console.log(newColors);

	if (
		!product.name ||
		!product.description ||
		!product.artist ||
		!number.test(product.priceCakeTray + 0.01) ||
		!number.test(product.priceTurntable + 0.01) ||
		!newColors ||
		newColors.length < 3 ||
		!number.test(product.stockCakeTray + 0.01) ||
		!number.test(product.stockTurntable + 0.01)
	) {
		errorSubmit.required = `Required: ${!product.name ? 'name,' : ''} ${
			!product.description ? 'description,' : ''
		} ${!product.artist ? 'artist,' : ''} ${
			!number.test(product.priceCakeTray + 0.01) ? 'cake tray price,' : ''
		}${!number.test(product.priceTurntable + 0.01) ? 'turntable price,' : ''} ${
			!number.test(product.stockCakeTray + 0.01) ? 'cake tray stock,' : ''
		} ${
			!number.test(product.stockTurntable + 0.01) ? 'turntable stock,' : ''
		} ${!newColors || newColors.length < 3 ? 'three colors' : ''}  `;
	}

	return errorSubmit;
};
