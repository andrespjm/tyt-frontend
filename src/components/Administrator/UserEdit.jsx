import { BooleanInput, Edit, SimpleForm, TextInput } from 'react-admin';

export const UserEdit = props => (
	<Edit title={'Edit Users'} {...props}>
		<SimpleForm>
			<TextInput disabled source='id' />
			<BooleanInput source='disabled' />
		</SimpleForm>
	</Edit>
);
