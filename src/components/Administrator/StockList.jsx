import {
	Datagrid,
	DeleteButton,
	EditButton,
	Filter,
	List,
	NumberField,
	SearchInput,
	TextField,
} from 'react-admin';

const StockFilter = props => (
	<Filter {...props}>
		<SearchInput
			placeholder='Product Id (Number)'
			source='ProductId'
			resettable
			alwaysOn
		/>
	</Filter>
);

export const StockList = props => (
	<List {...props} filters={<StockFilter />} textalign='center'>
		<Datagrid textalign='center' rowClick='edit'>
			<TextField source='id' label='stock id' textalign='center' />
			<NumberField source='ProductId' label='product id' textalign='center' />
			<TextField
				source='ProductTypeName'
				label='product type'
				textalign='center'
			/>

			<NumberField source='quantityST' label='quantity' textalign='center' />
			<NumberField source='priceST' label='price' textalign='center' />
			<EditButton label='Edit' />
			<DeleteButton label='Delete' />
		</Datagrid>
	</List>
);
