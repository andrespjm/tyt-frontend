import {
	Datagrid,
	DeleteButton,
	EditButton,
	List,
	NumberField,
	TextField,
} from 'react-admin';

export const StockList = props => (
	<List {...props} textAlign='center'>
		<Datagrid textAlign='center' rowClick='edit'>
			<TextField source='id' textAlign='center' />
			<NumberField source='ProductId' label='productId' textAlign='center' />
			<TextField
				source='ProductTypeName'
				label='product type'
				textAlign='center'
			/>
			<NumberField source='quantityST' label='quantity' textAlign='center' />
			<NumberField source='priceST' label='price' textAlign='center' />
			<EditButton label='Edit' textAlign='center' />
			<DeleteButton label='Delete' textAlign='center' />
		</Datagrid>
	</List>
);
