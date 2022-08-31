import { Edit, SelectInput, SimpleForm, TextInput } from 'react-admin';

export const PurchaseEdit = () => {
	return (
		<Edit title='Edit shipping status purchase'>
			<SimpleForm>
				<TextInput disabled source='id' />
				{/* <TextInput source='status' /> */}
				<SelectInput
					source='status'
					resettable
					choices={[
						{ id: 'Pay', name: 'Pay' },
						{ id: 'Recibed', name: 'Recibed' },
						{ id: 'Delivering', name: 'Delivering' },
						{ id: 'Pending', name: 'Pending' },
					]}
				/>
				<TextInput source='shipmentCompany' />
				<TextInput source='shipmentTracking' />
			</SimpleForm>
		</Edit>
	);
};
