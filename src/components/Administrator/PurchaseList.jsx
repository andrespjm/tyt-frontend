import {
	Datagrid,
	DateField,
	EditButton,
	List,
	TextField,
	NumberField,
	DeleteButton,
} from 'react-admin';

export const PurchaseList = () => (
	<List>
		<Datagrid>
			<NumberField source='id' />
			<TextField source='status' />
			<NumberField source='phoneNumber' />
			<NumberField source='postalCode' label='Zip Code' />
			<TextField source='shippingAddressStreet' label='Street' />
			<NumberField source='shippingAddressNumber' label='Address Num' />
			<TextField source='shipmentCompany' label='Company' />
			<TextField source='shipmentTracking' />
			<DateField source='createdAt' />
			<EditButton label='Edit' />
			<DeleteButton label='Del' />
		</Datagrid>
	</List>
);
