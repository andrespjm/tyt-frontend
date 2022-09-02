import './PerformanceChart.css';

export function PerformanceChart() {
	return (
		<div className='performanceContainer'>
			<Sales />
			<Units />
			<Costs />
			<Profits />
		</div>
	);
}

const Sales = () => {
	return (
		<div className='performanceDiv'>
			<h1>Sales</h1>
		</div>
	);
};
const Units = () => {
	return (
		<div className='performanceDiv'>
			<h1>Units</h1>
		</div>
	);
};
const Costs = () => {
	return (
		<div className='performanceDiv'>
			<h1>Costs</h1>
		</div>
	);
};
const Profits = () => {
	return (
		<div className='performanceDiv'>
			<h1>Pprfit</h1>
		</div>
	);
};
