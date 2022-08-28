import {
	Datagrid,
	DateField,
	EditButton,
	EmailField,
	FunctionField,
	List,
	TextField,
} from 'react-admin';

export const Users = () => (
	<List>
		<Datagrid>
			<TextField source='name' />
			<TextField source='lastname' />
			<FunctionField
				label='full name'
				render={record => `${record.lastname}, ${record.name}`}
			/>
			<EmailField source='email' />
			<DateField source='birthDate' />
			<EditButton />
		</Datagrid>
	</List>
);
