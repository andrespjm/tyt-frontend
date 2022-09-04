import './PerformanceChart.css';

export const PerformanceChart = sales => {
	// console.log('sales', sales.sales);

	// to adding salessales
	const totalSales = () => {
		const s = sales.sales?.map(e => e.total);
		const t = s.reduce((a, b) => {
			return (a = a + b);
		}, 0);
		return t.toFixed(2);
	};

	// adding units
	// quantity
	const totalUnits = () => {};

	// to adding costs
	const totalCost = () => {
		const t = sales.sales?.map(e => e.tax);
		const rt = t.reduce((a, b) => {
			return (a = a + b);
		}, 0);

		const sf = sales.sales?.map(e => e.shipmentFee);
		const rsf = sf.reduce((a, b) => {
			return (a = a + b);
		}, 0);
		const addTc = rt + rsf;
		return addTc.toFixed(2);
	};

	// to adding costs
	const totalProfis = () => {
		const profit = totalSales() - totalCost();
		return profit.toFixed(2);
	};

	return (
		<div className='performanceContainer'>
			<div className='performanceDiv'>
				<h1>Sales</h1>
				<div className='perf-value'>
					<h1>U$D {totalSales()}</h1>
				</div>
			</div>
			<div className='performanceDiv'>
				<h1>Units</h1>
				<div className='perf-value'>
					<h1>Tables {totalUnits()}</h1>
				</div>
			</div>
			<div className='performanceDiv'>
				<h1>Costs</h1>
				<div className='perf-value'>
					<h1>U$D {totalCost()}</h1>
				</div>
			</div>
			<div className='performanceDiv'>
				<h1>Profits</h1>
				<div className='perf-value'>
					<h1>U$D {totalProfis()}</h1>
				</div>
			</div>
		</div>
	);
};

// // to adding sales
// const Sales = () => {
// 	const units = sales.sales.map(e => {
// 		return e.OrderItems.map(i => {
// 			return i.quantity * i.price;
// 		});
// 	});
// 	// console.log('units', units);

// 	const element = [];

// 	for (let i = 0; i < units.length; i++) {
// 		for (let j = 0; j < units[i].length; j++) {
// 			element.push(units[i][j]);
// 		}
// 	}
// 	// console.log('element', element);

// 	const total = element.reduce((a, b) => {
// 		return (a = a + b);
// 	}, 0);
// 	return total;
// };

// // adding units
// // quantity
// const TotalUnits = () => {
// 	const units = sales.sales.map(e => {
// 		return e.OrderItems.map(i => {
// 			return i.quantity;
// 		});
// 	});
// 	const element = [];

// 	for (let i = 0; i < units.length; i++) {
// 		for (let j = 0; j < units[i].length; j++) {
// 			element.push(units[i][j]);
// 		}
// 	}

// 	const total = element.reduce((a, b) => {
// 		return (a = a + b);
// 	}, 0);
// 	return total;
// };
// console.log('TotalUnits', TotalUnits());

// // to adding costs
// const TotalCost = () => {
// 	const addTax = sales.sales.map(e => {
// 		return e.tax;
// 	});

// 	const costs = addTax.reduce((a, b) => {
// 		return (a = a + b);
// 	}, 0);

// 	return costs;
// };

// // to adding Profits
// const TotalProfis = () => {
// 	const profits = Sales() - TotalCost();
// 	return profits;
// };

// function correction(filtered) {
// 	switch (filtered) {
// 		case 'glutenfree':
// 			return 'gluten free';
// 		case 'dairyfree':
// 			return 'dairy free';
// 		case 'lactoovovegetarian':
// 			return 'lacto ovo vegetarian';
// 		case 'vegan':
// 			return 'vegan';
// 		case 'paleolithic':
// 			return 'paleolithic';
// 		case 'primal':
// 			return 'primal';
// 		case 'whole30':
// 			return 'whole 30';
// 		case 'pescatarian':
// 			return 'pescatarian';
// 		case 'ketogenic':
// 			return 'ketogenic';
// 		case 'fodmapfriendly':
// 			return 'fod map friendly';
// 		default:
// 			return;
// 	}
// }
