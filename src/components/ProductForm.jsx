import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../components/ProductForm.css';
import { getColors } from '../redux/actions';
import { validateProduct } from '../validations/productValidation';

const ProductForm = () => {
	const { redColors } = useSelector(state => state);
	const [queryColors, setQueryColors] = useState([]);
	const [imageMain, setImageMain] = useState();
	const [imagesDetail, setimagesDatail] = useState();
	const errorSelectColor = useRef();
	const errorSelectColl = useRef();
	const errorSelectImage = useRef();
	const errorSelectImageDetail = useRef();
	const errorAll = useRef();
	const success = useRef();
	const [stock, setStock] = useState({
		cakeTrail: '',
		turntable: '',
	});
	const dispatch = useDispatch();
	const [input, setInput] = useState({
		name: '',
		description: '',
		collection: '',
		artist: '',
		// imagesDetail:[],
		stockCakeTray: 0,
		stockTurntable: 0,
		priceCakeTray: "",
		priceTurntable: "",
		color: [],
		color1: '',
		color2: '',
		color3: '',
	});

	// const countSelected = () => {
	// 	const checked = document.querySelectorAll('.checked');
	// 	const btnText = document.querySelector('.btn-text');
	// 	checked.length
	// 		? (btnText.innerText = `${checked.length} Selected`)
	// 		: (btnText.innerText = 'Select Temperament');
	// };

	const handleOnClickDiv = () => {
		dispatch(getColors());
		document.querySelector('.select-btn').classList.toggle('open');
	};

	const OnClickItem = e => {
		setInput({ ...input, color: [...input.color, e.target.id] });
		let li =
			e.target.classList[0] === 'item' ? e.target : e.target.parentElement; // si el click es en algun span, el elemento es li
		li = e.target.classList[0] === 'item' ? e.target : e.target.parentElement; // lo hago dos veces por si el click es en el tag i
		if (li.className === 'item' && queryColors.length === 3) {
			document.getElementById('select-colors').style.color = 'red';
			return console.log('Max 3 colors');
		}
		li.classList.toggle('checked');
		try {
			li.classList[1]
				? setQueryColors([...queryColors, li.childNodes[1].innerText])
				: setQueryColors(
						queryColors.filter(e => e !== li.childNodes[1].innerText)
				  );
		} catch (error) {
			console.log(error);
		}
		// const li = // si el click es en algun span, el elemento es li
		// 	e.target.classList[0] === 'item' ? e.target : e.target.parentElement;
		// li.classList.toggle('checked');
		// try {
		// 	li.classList[1]
		// 		? setQueryColors([...queryColors, li.childNodes[1].innerText])
		// 		: setQueryColors(
		// 				queryColors.filter(e => e !== li.childNodes[1].innerText)
		// 		  );
		// } catch (error) {
		// 	console.log(error);
		// }
		// countSelected();
	};

	const [error, setError] = useState({});

	const handleChange = e => {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
		setError(
			validateProduct({
				...input,
				[e.target.name]: e.target.value,
			})
		);
	};

	const handleImage = e => {
		setImageMain(e.target.files[0]);
		/* setError(
			validateProduct({
				...input,
				[e.target.name]: e.target.value,
			})
		) */
	};

	const handleChangeImages = e => {
		setimagesDatail(e.target.files);
		/* setError(
				validateProduct({
					...input,
					[e.target.name]: e.target.value,
				})
			) */
		// }
	};

	const handleChangeStock = e => {
		if (e.target.value < 0) return alert('negative quantity not allowed');
		setStock({ ...stock, [e.target.name]: Number(e.target.value) });
	};

	/* const juancho = { ...input };
	console.log(juancho);
	juancho.ProductTypes[0].Stocks.quantity = types['Cake Tray'];
	juancho.ProductTypes[1].Stocks.quantity = types.Turntable; */
	console.log(imageMain);

	const handleSubmit = async e => {
		e.preventDefault();
		success.current.innerText = '';
		try {
			const images = [];
			if (imagesDetail) {
				for (const image of imagesDetail) {
					images.push(image);
				}
			}
			const newProduct = { ...input };
			newProduct.imageMain = imageMain;
			newProduct.imagesDetail = images || [];
			newProduct.color1 = newProduct.color[0];
			newProduct.color2 = newProduct.color[1];
			newProduct.color3 = newProduct.color[2];
			// newProduct.colors = [
			// 	{
			// 		hex: newProduct.color[0].split(',')[0],
			// 		name: newProduct.color[0].split(',')[1],
			// 	},
			// 	{
			// 		hex: newProduct.color[1].split(',')[0],
			// 		name: newProduct.color[1].split(',')[1],
			// 	},
			// 	{
			// 		hex: newProduct.color[2].split(',')[0],
			// 		name: newProduct.color[2].split(',')[1],
			// 	},
			// ];

			console.log('ANTES', newProduct);
			if (!newProduct.color.length)
				errorSelectColor.current.innerText = 'Select 3 colors';
			else errorSelectColor.current.innerText = '';
			if (!newProduct.imageMain)
				errorSelectImage.current.innerText = 'Add a image';
			else errorSelectImage.current.innerText = '';
			if (!newProduct.imagesDetail.length)
				errorSelectImageDetail.current.innerText = 'Select at least 1 image';
			else errorSelectImageDetail.current.innerText = '';
			if (!newProduct.collection)
				errorSelectColl.current.innerText = 'Add a collection';
			else errorSelectColl.current.innerText = '';
			if (!newProduct.name || Object.entries(newProduct).length === 0) {
				errorAll.current.innerText = 'Some fields are missing';
			} else {
				const res = await axios.post(
					'http://localhost:3001/products',
					{
						name: newProduct.name,
						description: newProduct.description,
						collection: newProduct.collection,
						imageMain,
						imagesDetail: newProduct.imagesDetail,
						artist: newProduct.artist,
						color1: newProduct.color1,
						color2: newProduct.color2,
						color3: newProduct.color3,
						stockCakeTray: stock.cakeTrail,
						stockTurntable: stock.turntable,
						priceCakeTray: newProduct.priceCakeTray,
						priceTurntable: newProduct.priceTurntable,
					},
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
				);
				if (res.data.success === 'ok') {
					errorAll.current.innerText = '';
					return (success.current.innerText = 'Product added successfully');
				}
			}

			// console.log(res);
			// });
		} catch (error) {
			errorAll.current.innerText = error.response.data;
			// console.log(error.response.data);
		}
	};

	useEffect(() => {}, []);

	return (
		<div className='productFormContainer'>
			<form onSubmit={handleSubmit} encType='multipart/form-data'>
				<span className='uppercase tracking-wide text-black text-center text-lg font-bold mb-2'>
					Product Form
				</span>

				<label className='uppercase tracking-wide text-black text-xs font-bold mb-2'>
					Name
				</label>
				{error.name && (
					<span className='text-red-500 text-xs italic'>{error.name}</span>
				)}
				<input
					type='text'
					className='w-full bg-gray-100 text-black border border-gray-200 rounded-md py-1 px-4 mb-3'
					name='name'
					placeholder='Name...'
					value={input.name}
					onChange={handleChange}
				/>

				<label className='uppercase tracking-wide text-black text-xs font-bold mb-2'>
					Description
				</label>
				{/* {error.description && (
					<span className='text-red-500 text-xs italic'>
						{error.description}
					</span>
				)} */}
				<input
					type='text'
					className='w-full bg-gray-100 text-black border border-gray-200 rounded-md py-1 px-4 mb-3'
					name='description'
					placeholder='Description...'
					value={input.description}
					onChange={handleChange}
				/>

				<label className='uppercase tracking-wide text-black text-xs font-bold mb-2'>
					Image Main
				</label>
				<small
					className='p-0.5 text-red-400 italic'
					ref={errorSelectImage}
				></small>
				{error.imageMain && (
					<span className='text-red-500 text-xs italic'>{error.imageMain}</span>
				)}
				<input
					data-toggle='tooltip'
					data-placement='bottom'
					type='file'
					className='w-full bg-gray-100 text-black border border-gray-200 rounded-md py-1 px-4 mb-3'
					name='imageMain'
					placeholder='Image main...'
					value={input.imageMain}
					onChange={handleImage}
				/>
				<label
					// class="custom-file-label"
					// for="customFileLangHTML"
					data-browse='Elegir archivo'
				></label>

				<label className='uppercase tracking-wide text-black text-xs font-bold mb-2'>
					Images Details
				</label>
				<small
					className='p-0.5 text-red-400 italic'
					ref={errorSelectImageDetail}
				></small>
				{error.imagesDetail && (
					<span className='text-red-500 text-xs italic'>
						{error.imagesDetail}
					</span>
				)}
				<input
					type='file'
					className='w-full bg-gray-100 text-black border border-gray-200 rounded-md py-1 px-4 mb-3'
					name='imagesDetail'
					placeholder='Images...'
					multiple
					onChange={handleChangeImages}
				/>

				<label className='uppercase tracking-wide text-black text-xs font-bold mb-2'>
					Collection
				</label>
				<small
					className='p-0.5 text-red-400 italic'
					ref={errorSelectColl}
				></small>
				<FormControl>
					<RadioGroup
						row
						aria-labelledby='demo-row-radio-buttons-group-label'
						name='collection'
						onChange={handleChange}
					>
						<FormControlLabel
							value='Abstract'
							control={<Radio />}
							label='Abstract'
						/>
						<FormControlLabel
							value='Flowers'
							control={<Radio />}
							label='Flowers'
						/>
						<FormControlLabel
							value='Butterflies'
							control={<Radio />}
							label='Butterflies'
						/>
						<FormControlLabel value='Other' control={<Radio />} label='Other' />
					</RadioGroup>
				</FormControl>

				<label className='uppercase tracking-wide text-black text-xs font-bold mb-2'>
					Cake Tray Stock:
				</label>
				<input
					type='number'
					className='w-full bg-gray-100 text-black border border-gray-200 rounded-md py-1 px-4 mb-3'
					name='cakeTrail'
					placeholder='0, 1, 2 or more...'
					value={stock.cakeTrail}
					onChange={handleChangeStock}
				/>

				<label className='uppercase tracking-wide text-black text-xs font-bold mb-2'>
					Turntable Stock:
				</label>
				<input
					type='number'
					className='w-full bg-gray-100 text-black border border-gray-200 rounded-md py-1 px-4 mb-3'
					name='turntable'
					placeholder='0, 1, 2 or more...'
					// value={input.stock[1].quantity}
					value={stock.turntable}
					onChange={handleChangeStock}
				/>

				<label className='uppercase tracking-wide text-black text-xs font-bold mb-2'>
					Cake Tray Price:
				</label>
				<input
					type='number'
					className='w-full bg-gray-100 text-black border border-gray-200 rounded-md py-1 px-4 mb-3'
					name='priceCakeTray'
					placeholder='$...'
					value={input.priceCakeTray}
					onChange={handleChange}
				/>

				<label className='uppercase tracking-wide text-black text-xs font-bold mb-2'>
					Turntable Price:
				</label>
				<input
					type='number'
					className='w-full bg-gray-100 text-black border border-gray-200 rounded-md py-1 px-4 mb-3'
					name='priceTurntable'
					placeholder='$...'
					value={input.priceTurntable}
					onChange={handleChange}
				/>

				<label className='uppercase tracking-wide text-black text-xs font-bold mb-2'>
					Artist
				</label>
				{error.artist && (
					<span className='text-red-500 text-xs italic'>{error.artist}</span>
				)}
				<input
					type='text'
					className='w-full bg-gray-100 text-black border border-gray-200 rounded-md py-1 px-4 mb-3'
					name='artist'
					placeholder='Artist...'
					value={input.artist}
					onChange={handleChange}
				/>

				<label className='uppercase tracking-wide text-black text-xs font-bold mb-2'>
					Colors
				</label>
				<small
					className='p-0.5 text-red-400 italic'
					ref={errorSelectColor}
				></small>
				<div onClick={handleOnClickDiv} className='select-btn'>
					<span className='btn-text'>
						{!queryColors.length
							? 'Select Color...'
							: `${queryColors.length} selected`}
					</span>
					<span className='filter'>
						<i className='fa-solid fa-paintbrush'></i>
					</span>
				</div>
				<ul className='list-items'>
					{redColors.map(c => (
						<li key={c.id} className='item' name='colors' onClick={OnClickItem}>
							<span
								className='checkbox'
								id={[c.hex, c.name]}
								style={{
									backgroundColor: `${c.hex}`,
									borderColor: `${c.hex}`,
								}}
							>
								<i className='fa-solid fa-check check-icon'></i>
							</span>
							<span
								/* id={`item${c.id}`} */ id={[c.hex, c.name]}
								className='item-text'
							>
								{c.name}
							</span>
						</li>
					))}
				</ul>
				<span className='p-0.5 text-red-400 italic' ref={errorAll}></span>
				<span className='p-0.5 text-green-400 italic' ref={success}></span>
				<input
					type={'submit'}
					value='Add product'
					className='uppercase tracking-wide text-black text-sm font-bold mt-4 mb-2 border-solid border-1 p-2 border-indigo-600/60 rounded-md'
				/>
			</form>
		</div>
	);
};

export default ProductForm;
