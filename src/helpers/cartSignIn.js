import axios from 'axios';

export const cartSignIn = async (userId, cart, setCart) => {
	let orderId = '';
	try {
		const data = await axios.get(`/purchases/cart?userId=${userId}`);
		orderId = data.data;
		console.log('entre en login, orderId: ', orderId);
		if (orderId.length > 0) {
			const orderItems = (
				await axios.get(`/order-items?PurchaseId=${orderId[0].id}`)
			).data;

			const ordersDB = orderItems.map(el => ({
				name: el.Stock.Product.name,
				prodImageHome: el.Stock.Product.img_home.secure_url,
				prodType: el.Stock.ProductTypeName,
				stockId: el.StockId,
				price: el.price,
				quantity: el.quantity,
				stockQuantity: el.Stock.quantity,
			}));

			// eslint-disable-next-line no-return-assign
			cart.forEach(el =>
				ordersDB.find(lc => el.stockId === lc.stockId)
					? (el.quantity =
							el.quantity +
							ordersDB.find(lc => el.stockId === lc.stockId).quantity)
					: el
			);

			const added = ordersDB.filter(
				el => !cart.find(d => d.stockId === el.stockId)
			);

			const agreg = [...cart, ...added];
			// eslint-disable-next-line no-return-assign
			agreg.forEach(el =>
				el.quantity > el.stockQuantity ? (el.quantity = el.stockQuantity) : el
			);
			console.log('arme el cart', agreg);

			setCart(agreg);
		}
	} catch (error) {
		alert(error.request.response);
	}
};
