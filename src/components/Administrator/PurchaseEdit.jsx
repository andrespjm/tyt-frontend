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
						{ id: 'Cart', name: 'Cart' },
						{ id: 'Paid', name: 'Paid' },
						{ id: 'Received', name: 'Received' },
						{ id: 'Delivering', name: 'Delivering' },
					]}
				/>
				<TextInput source='shipmentCompany' />
				<TextInput source='shipmentTracking' />
			</SimpleForm>
		</Edit>
	);
};
