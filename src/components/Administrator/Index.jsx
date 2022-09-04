import { Admin, Resource } from 'react-admin';
import { dataProvider } from '../Administrator/DataProvider';
import { Users } from './Users';
import { UserEdit } from './UserEdit';
import { PurchaseList } from './PurchaseList';
import { PurchaseEdit } from './PurchaseEdit';
import { Products } from './Products';
import { Create } from './ProductsCreate';
import UserIcon from '@mui/icons-material/Group';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FactoryIcon from '@mui/icons-material/Factory';
import { Charts } from './Charts';
import BarChartSharpIcon from '@mui/icons-material/BarChartSharp';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSales } from '../../redux/actions';

export default function DashBoard() {
	const dispatch = useDispatch();
	const { salesData } = useSelector(state => state);

	useEffect(() => {
		dispatch(getSales());
	}, [dispatch]);

	return (
		<Admin dataProvider={dataProvider}>
			{/* {loader && <Loader />}
			{error && <Message />} */}

			<Resource
				name='chart'
				list={Charts(salesData)}
				icon={BarChartSharpIcon}
			/>

			<Resource name='users' list={Users} edit={UserEdit} icon={UserIcon} />
			<Resource
				name='products'
				list={Products}
				create={Create}
				icon={FactoryIcon}
			/>
			<Resource
				name='purchases'
				list={PurchaseList}
				edit={PurchaseEdit}
				icon={ReceiptIcon}
			/>
		</Admin>
	);
}
