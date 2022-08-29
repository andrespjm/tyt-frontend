import { Datagrid, EditButton, ImageField, List, TextField } from 'react-admin';

export const Products = () => (
	<List>
		<Datagrid>
			<ImageField
				label='image'
				source='img_detail[0].secure_url'
				src='img_detail[0].secure_url'
				title='name'
				sx={{
					'& img': {
						maxWidth: 60,
						maxHeight: 60,
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
