import {
	Datagrid,
	DateField,
	EditButton,
	List,
	TextField,
	NumberField,
} from 'react-admin';

// const PurchaseFilter = props => (
// 	<Filter {...props}>
// 		<SearchInput placeholder='Status' source='status' resettable alwaysOn />
// 	</Filter>
// );

export const PurchaseList = props => (
	<List {...props} textalign='center'>
		<Datagrid textalign='center' rowClick='edit'>
			<NumberField source='id' />
			<TextField source='UserId' />
			<TextField source='status' textalign='center' />
			<NumberField source='phoneNumber' label='Phone' textalign='center' />
			<NumberField source='postalCode' label='Zip Code' textalign='center' />
			<TextField
				source='shippingAddressStreet'
				label='Street'
				textalign='center'
			/>
			<NumberField
				source='shippingAddressNumber'
				label='Address Num'
				textalign='center'
			/>
			<TextField source='shipmentCompany' label='Company' textalign='center' />
			<TextField
				source='shipmentTracking'
				label='Tracking'
				textalign='center'
			/>
			<NumberField
				source='shipmentFee"'
				label='Shipment Fee'
				textalign='center'
			/>
			<NumberField source='tax"' label='Taxes' textalign='center' />
			<DateField source='createdAt' label='Created' textalign='center' />
			<EditButton label='Edit' textalign='center' />
		</Datagrid>
	</List>
);
