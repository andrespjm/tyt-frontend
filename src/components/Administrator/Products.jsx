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
		<Datagrid expand={<Description />}>
			<ImageField
				label='image'
				source='img_detail[0].secure_url'
				src='img_detail[0].secure_url'
				title='name'
				sx={{
					'& img': {
						maxWidth: 50,
						maxHeight: 50,
						objectFit: 'contain',
						borderRadius: 50,
					},
				}}
			/>
			<TextField source='name' />
			<TextField source='collection' />
			<TextField source='artist' />
			<TextField source='Colors.name' />
		</Datagrid>
	</List>
);
