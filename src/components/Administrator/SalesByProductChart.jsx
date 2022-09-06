import { Bar } from 'react-chartjs-2';
import './SalesByProductChart.css';
import {
	Chart,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function SalesByProductChart(products) {
	console.log('graph/products', products.products);

	const salesProducts = products.products;

	const options = {
		maintainAspectRatio: false,
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Sales by Products',
			},
		},
	};

	const data = {
		labels: salesProducts.map(e => e.productType),
		datasets: [
			{
				label: 'September 2022',
				// data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
				data: salesProducts.map(e => e.total),
				backgroundColor: 'rgba(53, 162, 235, 0.5)',
				hoverBackgroundColor: 'rgba(53, 162, 235, 0.8)',
				borderWidth: 3,
			},
		],
	};

	return (
		<div className='chartContainer'>
			<Bar options={options} data={data} />
		</div>
	);
}
