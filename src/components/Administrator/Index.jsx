import { Admin, Resource } from 'react-admin';
import { dataProvider } from '../Administrator/DataProvider';
import { Users } from './Users';
import { UserEdit } from './UserEdit';
import { PurchaseList } from './PurchaseList';
import { PurchaseEdit } from './PurchaseEdit';
import { Products } from './Products';
import { Create } from './ProductsCreate';
// import PostIcon from '@mui/icons-material/Book';
import UserIcon from '@mui/icons-material/Group';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FactoryIcon from '@mui/icons-material/Factory';
import { Charts } from './Charts';
import BarChartSharpIcon from '@mui/icons-material/BarChartSharp';

export default function DashBoard() {
	return (
		<Admin dataProvider={dataProvider}>
			<Resource name='chart' list={Charts} icon={BarChartSharpIcon} />

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
