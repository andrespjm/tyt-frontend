import axios from 'axios';
export async function payMercadoPago(items) {
	console.log('estoy aca', items);
	// TODO: cambiar por axios
	try {
		const preference = await (
			await axios.post('/Pay', items, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
		).data;
		const script = document.createElement('script');

		// The source domain must be completed according to the site for which you are integrating.
		// For example: for Argentina ".com.ar" or for Colombia ".com.co".
		script.src =
			'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
		script.type = 'text/javascript';
		script.dataset.preferenceId = preference.preferenceId;
		document.getElementById('page-content').innerHTML = '';
		document.querySelector('#page-content').appendChild(script);
	} catch (error) {
		console.log(error.request.response);
		window.alert('arreglar');
	}
}
