import {
	Datagrid,
	DateField,
	EditButton,
	List,
	TextField,
	NumberField,
	// DeleteButton,
} from 'react-admin';

export const PurchaseList = () => (
	<List>
		<Datagrid textAlign='center'>
			<NumberField source='id' />
			{/* <NumberField source='User.id' /> */}
			<NumberField
				source='User.displayName'
				label='User Name'
				textAlign='center'
			/>
			<TextField source='status' textAlign='center' />
			<NumberField source='phoneNumber' label='Phone' textAlign='center' />
			<NumberField source='postalCode' label='Zip Code' textAlign='center' />
			<TextField
				source='shippingAddressStreet'
				label='Street'
				textAlign='center'
			/>
			<NumberField
				source='shippingAddressNumber'
				label='Address Num'
				textAlign='center'
			/>
			<TextField source='shipmentCompany' label='Company' textAlign='center' />
			<TextField
				source='shipmentTracking'
				label='Tracking'
				textAlign='center'
			/>
			<DateField source='createdAt' label='Created' textAlign='center' />
			<EditButton label='Edit' textAlign='center' />
			{/* <DeleteButton label='Del' /> */}
		</Datagrid>
	</List>
);
