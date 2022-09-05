import {
	Datagrid,
	ImageField,
	List,
	RichTextField,
	SimpleShowLayout,
	TextField,
	NumberField,
	DeleteButton,
	FunctionField,
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
		<SearchInput placeholder='Product Name' source='name' resettable alwaysOn />
	</Filter>
);

// const postFilters = [
// 	// eslint-disable-next-line react/jsx-key
// 	<TextInput label='Search' source='name' alwaysOn />,
// 	// eslint-disable-next-line react/jsx-key
// 	<TextInput label='name' source='name' />,
// ];

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
				<FunctionField
					textAlign='center'
					label='Turntable Stock'
					render={products =>
						products.ProductTypes.find(el => el.name === 'Turntable').Stocks
							.quantityST
					}
				/>
				<FunctionField
					textAlign='center'
					label='Turntable Price'
					render={products =>
						products.ProductTypes.find(el => el.name === 'Turntable').Stocks
							.priceST
					}
				/>
				{/* <WrapperField label='Cake Tray'> */}
				<FunctionField
					textAlign='center'
					label='Cake Tray Stock'
					render={products =>
						products.ProductTypes.find(el => el.name === 'Cake Tray').Stocks
							.quantityST
					}
				/>
				<FunctionField
					textAlign='center'
					label='Cake Tray Price'
					render={products =>
						products.ProductTypes.find(el => el.name === 'Cake Tray').Stocks
							.priceST
					}
				/>
				{/* </WrapperField> */}
				<EditButton>Edit</EditButton>
				<DeleteButton>Delete</DeleteButton>
			</Datagrid>
		</List>
	);
};
