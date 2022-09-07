import {
	Datagrid,
	ImageField,
	List,
	RichTextField,
	SimpleShowLayout,
	TextField,
	DeleteButton,
	NumberField,
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
			<Datagrid textalign='center' expand={<Description />}>
				<NumberField source='id' textalign='center' />
				<ImageField
					label='image'
					source='img_home.secure_url'
					src='img_home.secure_url'
					title='name'
					textalign='center'
					sx={{
						'& img': {
							maxWidth: 50,
							maxHeight: 50,
							objectFit: 'contain',
							borderRadius: 50,
						},
					}}
				/>
				<TextField source='name' textalign='center' />
				<TextField source='collection' textalign='center' />
				<TextField source='artist' textalign='center' />
				<EditButton label='Edit' textalign='center'>
					Edit
				</EditButton>
				<DeleteButton label='Delete' textalign='center'>
					Delete
				</DeleteButton>
			</Datagrid>
		</List>
	);
};
