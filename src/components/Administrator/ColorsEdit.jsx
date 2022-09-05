import { Edit, SimpleForm, TextInput } from 'react-admin';

export const ColorsEdit = () => {
	return (
		<Edit title='Edit color'>
			<SimpleForm textAlign='center'>
				<TextInput disabled source='id' />
				<TextInput source='name' />
				<TextInput source='hex' />
			</SimpleForm>
		</Edit>
	);
};
