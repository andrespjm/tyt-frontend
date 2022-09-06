import { SalesChart } from './SalesChart';
import SalesTable from './PerformanceChart';

export const Charts = salesData => {
	// console.log('chart/salesData', salesData);
	return (
		<div>
			<SalesChart sales={salesData} />
			<SalesTable sales={salesData} />
		</div>
	);
};
