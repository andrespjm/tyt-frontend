import './PerformanceChart.css';

export const PerformanceChart = sales => {
	// to adding sales

	const Sales = () => {
		const units = sales.sales.map(e => {
			return e.OrderItems.map(i => {
				return i.quantity * i.price;
			});
		});
		// console.log('units', units);

		const element = [];

		for (let i = 0; i < units.length; i++) {
			for (let j = 0; j < units[i].length; j++) {
				element.push(units[i][j]);
			}
		}
		// console.log('element', element);

		const total = element.reduce((a, b) => {
			return (a = a + b);
		}, 0);
		return total;
	};

	// console.log('total', total);

	// quantity
	// price
	// createdAt

	// to adding costs
	const TotalCost = () => {
		const addTax = sales.sales.map(e => {
			return e.tax;
		});

		const costs = addTax.reduce((a, b) => {
			return (a = a + b);
		}, 0);

		return costs;
	};

	return (
		<div className='performanceContainer'>
			<div className='performanceDiv'>
				<h1>Sales</h1>
				<h1>U$D {Sales()}</h1>
			</div>
			<div className='performanceDiv'>
				<h1>Units</h1>
			</div>
			<div className='performanceDiv'>
				<h1>Costs</h1>
				<h1>U$D {TotalCost()}</h1>
			</div>
			<div className='performanceDiv'>
				<h1>Profits</h1>
			</div>
		</div>
	);
};
