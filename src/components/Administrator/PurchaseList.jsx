import {
	Datagrid,
	DateField,
	EditButton,
	List,
	TextField,
	NumberField,
} from 'react-admin';

export const PurchaseList = () => (
	<List>
		<Datagrid>
			<NumberField source='id' />
			<TextField source='status' />
			<NumberField source='phoneNumber' />
			<NumberField source='postalCode' />
			<TextField source='shippingAddressStreet' />
			<NumberField source='shippingAddressNumber' />
			<TextField source='shipmentCompany' />
			<TextField source='shipmentTracking' />
			<DateField source='createdAt' />
			<EditButton />
		</Datagrid>
	</List>
);
