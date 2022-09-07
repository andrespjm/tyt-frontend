import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './SalesTable.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 20,
	},
}));

export default function SalesTable(sales) {
	// console.log('table/sales', sales.sales);
	function createData(
		name,
		orderId,
		status,
		date,
		shipmentFee,
		tax,
		products,
		total
	) {
		return { name, orderId, status, date, shipmentFee, tax, products, total };
	}

	const rows = sales.sales.map(e => {
		return createData(
			e.name,
			e.orderId,
			e.status,
			e.date,
			e.shipmentFee.toFixed(2),
			e.tax.toFixed(2),
			e.products.toFixed(2),
			e.total.toFixed(2)
		);
	});

	return (
		<TableContainer component={Paper}>
			<div className='perf-title'>Sales</div>
			<Table sx={{ minWidth: 700 }} aria-label='customized table'>
				<TableHead align='center'>
					<TableRow>
						<StyledTableCell>Name</StyledTableCell>
						<StyledTableCell align='center'>Order</StyledTableCell>
						<StyledTableCell align='center'>Status</StyledTableCell>
						<StyledTableCell align='center'>Date</StyledTableCell>
						<StyledTableCell align='center'>S-Fee</StyledTableCell>
						<StyledTableCell align='center'>Tax</StyledTableCell>
						<StyledTableCell align='center'>Product</StyledTableCell>
						<StyledTableCell align='center'>Total</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, i) => (
						<StyledTableRow key={i}>
							<StyledTableCell component='th' scope='row'>
								{row.name}
							</StyledTableCell>
							<StyledTableCell align='center'>N° {row.orderId}</StyledTableCell>
							<StyledTableCell align='center'>{row.status}</StyledTableCell>
							<StyledTableCell align='center'>{row.date}</StyledTableCell>
							<StyledTableCell align='center'>
								u$d {row.shipmentFee}
							</StyledTableCell>
							<StyledTableCell align='center'>u$d {row.tax}</StyledTableCell>
							<StyledTableCell align='center'>
								u$d {row.products}
							</StyledTableCell>
							<StyledTableCell align='center'>u$d {row.total}</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
