import {
	Datagrid,
	DeleteButton,
	EditButton,
	List,
	TextField,
	// Create,
} from 'react-admin';

export const ColorsList = props => (
	<List {...props} textAlign='center'>
		<Datagrid textAlign='center' rowClick='edit'>
			<TextField source='id' textAlign='center' />
			<TextField source='name' textAlign='center' />
			<TextField source='hex' textAlign='center' />
			<EditButton label='Edit' textAlign='center' />
			<DeleteButton label='Delete' textAlign='center' />
			{/* <Create label='Create Color' textAlign='center' /> */}
		</Datagrid>
	</List>
);
