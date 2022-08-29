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
		<SortButton
			fields={['lastName', 'firstName', 'birthDate']}
			sx={{ border: '1px solid red' }}
		/>
		<Datagrid rowClick='edit'>
			<ImageField
				label='Profile'
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
			<NumberField label='Identity' source='identityCard' />
			<EmailField source='email' />
			<DateField source='birthDate' />
			<EditButton />
		</Datagrid>
	</List>
);
