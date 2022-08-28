import { Admin, Resource } from 'react-admin';
import { Users } from './Users';
import { PurchaseList } from './PurchaseList';
import { PurchaseEdit } from './PurchaseEdit';
import { dataProvider } from '../Administrator/DataProvider';

export default function DashBoard() {
	return (
		<Admin dataProvider={dataProvider}>
			<Resource name='users' list={Users} />
			<Resource name='purchases' list={PurchaseList} edit={PurchaseEdit} />
		</Admin>
	);
}
