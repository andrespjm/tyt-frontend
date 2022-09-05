import { Create, SimpleForm, TextInput } from 'react-admin';

export const ColorsCreate = props => {
	return (
		<Create {...props} title='Add new Color'>
			<SimpleForm>
				<TextInput source='name' />
				<TextInput source='hex' />
			</SimpleForm>
		</Create>
	);
};
// title={'Add new Color'}
