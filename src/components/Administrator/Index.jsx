import { Admin, Resource } from 'react-admin';
import { Users } from './Users';
import { PurchaseList } from './PurchaseList';
import { PurchaseEdit } from './PurchaseEdit';
import { dataProvider } from '../Administrator/DataProvider';
import { Products } from './Products';
import { Create } from './ProductsCreate';
// import PostIcon from '@mui/icons-material/Book';
import UserIcon from '@mui/icons-material/Group';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FactoryIcon from '@mui/icons-material/Factory';

export default function DashBoard() {
	return (
		<Admin dataProvider={dataProvider}>
			<Resource name='users' list={Users} icon={UserIcon} />
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
