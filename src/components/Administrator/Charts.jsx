import { SalesChart } from './SalesChart';
import { PerformanceChart } from './PerformanceChart';
import './Charts.css';
// import { useDispatch } from 'react-redux';
// import { getSalesFilter } from '../../redux/reducers/sales';

export const Charts = salesData => {
	// const dispatch = useDispatch;
	// // console.log('chart/salesData', salesData);

	// const monthHandleSelec = e => {
	// 	dispatch(getSalesFilter(e.target.value));
	// };
	return (
		<div>
			<div className='chart-buttons-container'>
				<button className='chart-buttons'>YEAR</button>
				<select className='chart-buttons' onChange={e => monthHandleSelec(e)}>
					<opion value='All'>All Month</opion>
					<opion value='0'>January</opion>
					<opion value='1'>February</opion>
					<opion value='2'>March</opion>
					<opion value='3'>April</opion>
					<opion value='4'>May</opion>
					<opion value='5'>Juny</opion>
					<opion value='6'>July</opion>
					<opion value='7'>August</opion>
					<opion value='8'>September</opion>
					<opion value='9'>October</opion>
					<opion value='10'>November</opion>
					<opion value='11'>December</opion>
				</select>
			</div>
			<SalesChart sales={salesData} />
			<PerformanceChart sales={salesData} />
		</div>
	);
};
