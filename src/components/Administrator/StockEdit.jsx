import { Edit, NumberInput, SimpleForm, TextInput } from 'react-admin';

export const StockEdit = () => {
	return (
		<Edit title='Edit color'>
			<SimpleForm textalign='center'>
				<TextInput disabled source='id' />
				<NumberInput
					disabled
					source='ProductId'
					label='productId'
					textalign='center'
				/>
				<TextInput
					disabled
					source='ProductTypeName'
					label='product type'
					textalign='center'
				/>
				<NumberInput source='quantityST' label='quantity' textalign='center' />
				<NumberInput source='priceST' label='price' textalign='center' />
			</SimpleForm>
		</Edit>
	);
};
