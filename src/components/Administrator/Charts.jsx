import { SalesByProductChart } from './SalesByProductChart';
import { SalesByUserChart } from './SalesByUserChart';
import SalesTable from './SalesTable';
import './Charts.css';

export const Charts = (salesData, salesUsers, salesProducts) => {
	// console.log('chart/sales', salesData);
	// console.log('chart/user', salesUsers);
	// console.log('chart/products', salesProducts);

	return (
		<div>
			<div className='chart-container'>
				<div className='chart-bar'>
					<SalesByUserChart users={salesUsers} />
					<SalesByProductChart products={salesProducts} />
				</div>
			</div>
			<div>
				<SalesTable sales={salesData} />
			</div>
		</div>
	);
};
