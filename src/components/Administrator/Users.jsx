import {
	Datagrid,
	DateField,
	EditButton,
	EmailField,
	FunctionField,
	ImageField,
	List,
	NumberField,
	SortButton,
	TextField,
} from 'react-admin';

export const Users = () => (
	<List>
		<SortButton fields={['firstName', 'lastName', 'birthDate']} />
		<Datagrid>
			<ImageField
				source='profilePicture'
				title='picture.title'
				sx={{
					'& img': {
						maxWidth: 50,
						maxHeight: 50,
						objectFit: 'contain',
						borderRadius: 50,
					},
				}}
			/>
			<TextField source='firstName' />
			<TextField source='lastName' />
			<FunctionField
				label='Full name'
				render={record => `${record.lastName}, ${record.firstName}`}
			/>
			<TextField source='gender' />
			<NumberField source='identityCard' />
			<EmailField source='email' />
			<DateField source='birthDate' />
			<EditButton />
		</Datagrid>
	</List>
);
