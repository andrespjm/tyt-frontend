import { Bar } from 'react-chartjs-2';
import './SalesChart.css';
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

export function SalesChart() {
	const options = {
		maintainAspectRatio: false,
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Anual Sales',
			},
		},
	};

	const data = {
		labels: [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		],
		datasets: [
			{
				label: 'Year 2020',
				// data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
				data: [20, 25, 25, 30, 35, 30, 35, 40, 45, 35, 40],
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
				hoverBackgroundColor: 'rgba(255, 99, 132, 0.8)',
				borderWidth: 3,
			},
			{
				label: 'Year 2021',
				// data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
				data: [25, 30, 35, 40, 45, 30, 40, 50, 55, 40, 45],
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
