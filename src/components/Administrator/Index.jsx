import { Admin, Resource } from 'react-admin';
import { dataProvider } from '../Administrator/DataProvider';
import { Users } from './Users';
import { UserEdit } from './UserEdit';
import { PurchaseList } from './PurchaseList';
import { PurchaseEdit } from './PurchaseEdit';
import { Products } from './Products';
import ProductForm from '../ProductForm';
import ModifyProduct from '../../components/ModifyProduct';
import UserIcon from '@mui/icons-material/Group';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FactoryIcon from '@mui/icons-material/Factory';
import StockIcon from '@mui/icons-material/Apps';
import ColorIcon from '@mui/icons-material/Palette';
import { Charts } from './Charts';
import BarChartSharpIcon from '@mui/icons-material/BarChartSharp';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSales } from '../../redux/actions';
import './Index.css';
import { ColorsList } from './ColorsList';
import { ColorsEdit } from './ColorsEdit';
import { ColorsCreate } from './ColorsCreate';
import { StockList } from './StockList';
import { StockEdit } from './StockEdit';

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

			<Resource name='user' list={Users} edit={UserEdit} icon={UserIcon} />
			<Resource
				name='product'
				list={Products}
				edit={ModifyProduct} // traer de params
				create={ProductForm}
				icon={FactoryIcon}
			/>
			<Resource
				name='purchase'
				list={PurchaseList}
				edit={PurchaseEdit}
				icon={ReceiptIcon}
			/>
			<Resource
				name='color'
				list={ColorsList}
				edit={ColorsEdit}
				create={ColorsCreate}
				icon={ColorIcon}
			/>
			<Resource
				name='stock'
				list={StockList}
				edit={StockEdit}
				icon={StockIcon}
			/>
		</Admin>
	);
}
