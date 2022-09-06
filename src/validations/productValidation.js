const letters = /^([a-zA-Z]+)(\s[a-zA-Z]+)*$/;
const numbers = /^([0-9.])*$/;

export const validateProduct = input => {
	const errors = {};
	if (input.name) {
		if (!letters.test(input.name))
			errors.name =
				'The product name must not contain numbers or special characters';
	}
	if (input.artist) {
		if (!letters.test(input.artist))
			errors.artist =
				'The artist name must not contain numbers or special characters';
	}
	if (
		!(numbers.test(input.priceCakeTray) && numbers.test(input.priceTurntable))
	)
		errors.numbers = 'Only positive amounts allowed';

	console.log('input.priceCakeTray', numbers.test(input.priceCakeTray));
	console.log('input.priceTurntable', numbers.test(input.priceTurntable));

	console.log(
		!(numbers.test(input.priceCakeTray) && numbers.test(input.priceTurntable))
	);

	return errors;
};

export const validateProductStock = stock => {
	const errorsStock = {};
	if (!(numbers.test(stock.cakeTrail) && numbers.test(stock.turntable)))
		errorsStock.numbers = 'Only positive amounts allowed';

	console.log('stock.cakeTrail', numbers.test(stock.cakeTrail));
	console.log('stock.turntable', numbers.test(stock.turntable));

	console.log(
		!(numbers.test(stock.cakeTrail) && numbers.test(stock.turntable))
	);

	return errorsStock;
};

export const validateProductSubmit = (
	input,
	stock,
	queryColors,
	imageMain,
	imagesDetail
) => {
	const errorSubmit = {};

	if (
		!input.name ||
		!input.description ||
		!input.artist ||
		!input.priceCakeTray ||
		!input.priceTurntable ||
		!stock.cakeTrail ||
		!stock.turntable ||
		queryColors.length < 3 ||
		!imageMain ||
		!imagesDetail ||
		imagesDetail?.length < 3
	) {
		errorSubmit.required = `Required: ${!input.name ? 'name,' : ''} ${
			!input.description ? 'description,' : ''
		} ${!input.artist ? 'artist,' : ''} ${
			!input.priceCakeTray ? 'cake tray price,' : ''
		}${!input.priceTurntable ? 'turntable price,' : ''} ${
			!stock.cakeTrail ? 'cake tray stock,' : ''
		} ${!stock.turntable ? 'turntable stock,' : ''} ${
			queryColors.length < 3 ? 'three colors,' : ''
		} ${!imageMain ? 'main image,' : ''} ${
			imagesDetail?.length < 3 ? 'three detail images' : ''
		}${!imagesDetail ? 'three detail images' : ''}`;
	}

	return errorSubmit;
};
