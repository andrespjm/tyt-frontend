import {
	Datagrid,
	ImageField,
	List,
	RichTextField,
	SimpleShowLayout,
	TextField,
	TextInput,
} from 'react-admin';

const Description = () => (
	<SimpleShowLayout>
		<RichTextField source='description' />
	</SimpleShowLayout>
);

const postFilters = [
	<TextInput label='Search' source='q' alwaysOn />,
	<TextInput label='name' source='name' />,
	<TextInput label='collection' source='collection' />,
];

export const Products = props => (
	<List {...props} filters={postFilters}>
		<Datagrid textAlign='center' expand={<Description />}>
			<ImageField
				label='image'
				source='img_detail[0].secure_url'
				src='img_detail[0].secure_url'
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
			<TextField source='Colors.name' textAlign='center' />
		</Datagrid>
	</List>
);
