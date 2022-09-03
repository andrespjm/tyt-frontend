import { SalesChart } from './SalesChart';
import { PerformanceChart } from './PerformanceChart';

export const Charts = salesData => {
	// console.log('chart/salesData', salesData);
	return (
		<div>
			<SalesChart />
			<PerformanceChart sales={salesData} />
		</div>
	);
};
