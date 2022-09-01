import {
	Datagrid,
	EditButton,
	ImageField,
	List,
	ReferenceInput,
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

const productFilter = [
	<TextInput source='q' label='Search' alwaysOn />,
	<ReferenceInput source='name' label='name' reference='name' />,
];

export const Products = () => (
	<List filters={productFilter}>
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
			<EditButton />
		</Datagrid>
	</List>
);
