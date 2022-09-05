import {
	Datagrid,
	ImageField,
	List,
	RichTextField,
	SimpleShowLayout,
	TextField,
	NumberField,
	DeleteButton,
	// FunctionField,
	EditButton,
	Filter,
	SearchInput,
	// WrapperField,
} from 'react-admin';

const Description = () => (
	<SimpleShowLayout>
		<RichTextField source='description' />
	</SimpleShowLayout>
);

const ProductsFilter = props => (
	<Filter {...props}>
		<SearchInput placeholder='Name' source='name' resettable alwaysOn />
		{/* <SearchInput placeholder='Collection' source='collection' /> */}
	</Filter>
);

export const Products = props => {
	return (
		<List {...props} filters={<ProductsFilter />}>
			<Datagrid textAlign='center' expand={<Description />}>
				<NumberField label='Id' source='id' textAlign='center' />
				<ImageField
					label='image'
					source='img_home.secure_url'
					src='img_home.secure_url'
					title='name'
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
				<TextField source='name' textAlign='center' />
				<TextField source='collection' textAlign='center' />
				<TextField source='artist' textAlign='center' />
				<EditButton>Edit</EditButton>
				<DeleteButton>Delete</DeleteButton>
			</Datagrid>
		</List>
	);
};
