import {
	BooleanField,
	Datagrid,
	DateField,
	EditButton,
	EmailField,
	FunctionField,
	Filter,
	ImageField,
	List,
	NumberField,
	TextField,
	SearchInput,
} from 'react-admin';

// const userFilter = props => {
// 	<Filter {...props}>
// 		<SearchInput source='firstName' resettable alwaysOn />
// 	</Filter>;
// };

// filters={userFilter}
export const Users = props => (
	<List {...props} textAlign='center'>
		<Datagrid textAlign='center'>
			<BooleanField source='enabled' />
			<ImageField
				label='Profile'
				source='profilePicture'
				title='picture.title'
				textAlign='center'
				sx={{
					'& img': {
						maxWidth: 50,
						maxHeight: 50,
						objectFit: 'contain',
						borderRadius: 50,
					},
				}}
			/>
			<TextField source='firstName' textAlign='center' />
			<TextField source='lastName' textAlign='center' />
			<FunctionField
				textAlign='center'
				label='Full name'
				render={record => `${record.lastName}, ${record.firstName}`}
			/>
			<TextField source='gender' textAlign='center' />
			<NumberField label='Identity' source='identityCard' textAlign='center' />
			<EmailField source='email' textAlign='center' />
			<DateField source='birthDate' textAlign='center' />
			<EditButton label='Disable User' textAlign='center' />
		</Datagrid>
	</List>
);
