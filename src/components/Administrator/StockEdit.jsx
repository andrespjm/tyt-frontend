import { Edit, NumberInput, SimpleForm, TextInput } from 'react-admin';

export const StockEdit = () => {
	return (
		<Edit title='Edit color'>
			<SimpleForm textAlign='center'>
				<TextInput disabled source='id' />
				<NumberInput
					disabled
					source='ProductId'
					label='productId'
					textAlign='center'
				/>
				<TextInput
					disabled
					source='ProductTypeName'
					label='product type'
					textAlign='center'
				/>
				<NumberInput source='quantityST' label='quantity' textAlign='center' />
				<NumberInput source='priceST' label='price' textAlign='center' />
			</SimpleForm>
		</Edit>
	);
};
