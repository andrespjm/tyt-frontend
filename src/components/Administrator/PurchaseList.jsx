import {
	Datagrid,
	DateField,
	EditButton,
	List,
	TextField,
	NumberField,
	Filter,
	SearchInput,
	// DeleteButton,
} from 'react-admin';

const PurchasesFilter = props => (
	<Filter {...props}>
		<SearchInput
			placeholder='Order Status'
			source='status'
			resettable
			alwaysOn
		/>
	</Filter>
);

export const PurchaseList = props => (
	<List {...props} filters={<PurchasesFilter />} title='List of purchases'>
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
