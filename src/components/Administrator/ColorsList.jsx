import {
	Datagrid,
	// DeleteButton,
	EditButton,
	List,
	TextField,
	// Create,
} from 'react-admin';

export const ColorsList = props => (
	<List {...props} textalign='center'>
		<Datagrid textalign='center' rowClick='edit'>
			<TextField source='id' textalign='center' />
			<TextField source='name' textalign='center' />
			<TextField source='hex' textalign='center' />
			<EditButton label='Edit' />
			{/* <DeleteButton label='Delete' /> */}
			{/* <Create label='Create Color' textAlign='center' /> */}
		</Datagrid>
	</List>
);
