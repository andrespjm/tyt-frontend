import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../components/ProductForm2.css';
import { getColors } from '../redux/actions';
import { validateProduct } from '../validations/productValidation';

const ProductForm = () => {
	const dispatch = useDispatch();
	const { redColors } = useSelector(state => state);
	const [queryColors, setQueryColors] = useState([]);
	const [imageMain, setImageMain] = useState();
	const [imagesDetail, setimagesDetail] = useState();
	const errorSelectImage = useRef();
	const errorSelectImageDetail = useRef();
	const errorAll = useRef();
	const success = useRef();
	const [stock, setStock] = useState({
		cakeTrail: '',
		turntable: '',
	});
	const [input, setInput] = useState({
		name: '',
		description: '',
		collection: '',
		artist: '',
		stockCakeTray: 0,
		stockTurntable: 0,
		priceCakeTray: '',
		priceTurntable: '',
		color: [],
		color1: '',
		color2: '',
		color3: '',
	});

	useEffect(() => {
		dispatch(getColors());
	}, []);

	const handleOnClickColors = e => {
		if (e.target.checked) {
			if (queryColors.length === 3) return;
			if (queryColors.length === 2)
				document.querySelectorAll('.form-mycolors').forEach(element => {
					if (!element.checked) element.disabled = true;
				});
			setQueryColors([...queryColors, e.target.name]);
			e.target.parentNode.style.backgroundColor =
				e.target.name === 'water green'
					? '#03bb85'
					: e.target.name === 'light blue'
					? '#ADD8E6'
					: e.target.name;
		} else {
			if (queryColors.length === 3)
				document.querySelectorAll('.form-mycolors').forEach(element => {
					if (element.disabled) element.disabled = false;
				});
			setQueryColors(queryColors.filter(color => color !== e.target.name));
			e.target.parentNode.style.backgroundColor = '';
		}
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
		document.getElementById('output').src = URL.createObjectURL(
			e.target.files[0]
		);
		document.getElementById('main-img-name').innerHTML = e.target.files[0].name;
	};

	const handleChangeImages = e => {
		setimagesDetail(e.target.files);
	};

	const handleChangeStock = e => {
		if (e.target.value < 0) return alert('negative quantity not allowed');
		setStock({ ...stock, [e.target.name]: Number(e.target.value) });
	};

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
			const color1 = redColors.filter(color => color.name === queryColors[0]);
			const strClr1 = `${color1[0].hex},${color1[0].name}`;
			const color2 = redColors.filter(color => color.name === queryColors[1]);
			const strClr2 = `${color2[0].hex},${color2[0].name}`;
			const color3 = redColors.filter(color => color.name === queryColors[2]);
			const strClr3 = `${color3[0].hex},${color3[0].name}`;

			const newProduct = { ...input };
			newProduct.imageMain = imageMain;
			newProduct.imagesDetail = images || [];
			// if (!newProduct.color.length)
			// 	errorSelectColor.current.innerText = 'Select 3 colors';
			// else errorSelectColor.current.innerText = '';
			// if (!newProduct.imageMain)
			// 	errorSelectImage.current.innerText = 'Add a image';
			// else errorSelectImage.current.innerText = '';
			// if (!newProduct.imagesDetail.length)
			// 	errorSelectImageDetail.current.innerText = 'Select at least 1 image';
			// else errorSelectImageDetail.current.innerText = '';
			// if (!newProduct.collection)
			// 	errorSelectColl.current.innerText = 'Add a collection';
			// else errorSelectColl.current.innerText = '';

			console.log({
				name: newProduct.name,
				description: newProduct.description,
				collection: document.querySelector('input[name="collection"]:checked')
					.value,
				imageMain,
				imagesDetail: newProduct.imagesDetail,
				artist: newProduct.artist,
				color1: strClr1,
				color2: strClr2,
				color3: strClr3,
				stockCakeTray: stock.cakeTrail,
				stockTurntable: stock.turntable,
				priceCakeTray: newProduct.priceCakeTray,
				priceTurntable: newProduct.priceTurntable,
			});

			// if (!newProduct.name || Object.entries(newProduct).length === 0) {
			// 	errorAll.current.innerText = 'Some fields are missing';
			// } else {
			// 	console.log('AQUII');
			// 	const res = await axios.put(
			// 		'/products/201',
			// 		{
			// 			name: newProduct.name,
			// 			description: newProduct.description,
			// 			collection: document.querySelector(
			// 				'input[name="collection"]:checked'
			// 			).value,
			// 			imageMain,
			// 			imagesDetail: newProduct.imagesDetail,
			// 			artist: newProduct.artist,
			// 			color1: strClr1,
			// 			color2: strClr2,
			// 			color3: strClr3,
			// 			stockCakeTray: stock.cakeTrail,
			// 			stockTurntable: stock.turntable,
			// 			priceCakeTray: newProduct.priceCakeTray,
			// 			priceTurntable: newProduct.priceTurntable,
			// 		},
			// 		{
			// 			headers: {
			// 				'Content-Type': 'multipart/form-data',
			// 			},
			// 		}
			// 	);
			// 	if (res.data.success === 'ok') {
			// 		errorAll.current.innerText = '';
			// 		return (success.current.innerText = 'Product added successfully');
			// 	}
			// }

			// console.log(res);
			// });
		} catch (error) {
			console.log(error);
			// errorAll.current.innerText = error.response.data;
			// console.log(error.response.data);
		}
	};

	return (
		<div className='h-screen py-10 bg-gradient-to-b from-black via-gray-700 to-base-900'>
			<form
				className='max-w-5xl text-white mx-auto'
				onSubmit={handleSubmit}
				encType='multipart/form-data'
			>
				<span className='text-5xl'>Create Product!</span>
				<div className='grid grid-cols-[1fr_0.6fr] gap-8'>
					{/* LEFT COLUMN */}
					<div className=''>
						{/* MAIN IMAGE */}
						<div className='mt-4 border-b-2 border-blue-300 pb-4'>
							<div>
								<label
									htmlFor='imageMain'
									className='btn btn-purple cursor-pointer hover:bg-neutral-200 select-none'
								>
									Choose your cover image (PNG, JPG)
								</label>
								<input
									className='hidden'
									type='file'
									id='imageMain'
									name='imageMain'
									accept='.jpg, .jpeg, .png'
									value={input.imageMain}
									onChange={handleImage}
								/>
							</div>
							<span
								className={`text-red-400 text-xs mt-1${
									errorSelectImage.imageMain ? 'visible' : 'invisible'
								}`}
							>
								{errorSelectImage.imageMain}
							</span>
							<div id='main-img-name' className='preview mt-4'>
								No files currently selected for upload...
							</div>
						</div>

						{/* NAME */}
						<div className='mt-4'>
							<label className=''>Product Name</label>

							<input
								type='text'
								className='w-full bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-1
                '
								name='name'
								placeholder='Name...'
								value={input.name}
								onChange={handleChange}
							/>

							<span
								className={`text-red-400 text-xs mt-1${
									error.name ? 'visible' : 'invisible'
								}`}
							>
								{error.name}
							</span>
						</div>

						{/* ARTIST */}
						<div className='mt-4'>
							<label className=''>Artist</label>
							<input
								type='text'
								className='w-full bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-1'
								name='artist'
								placeholder='Artist...'
								value={input.artist}
								onChange={handleChange}
							/>
							<span
								className={`text-red-400 text-xs mt-1${
									error.artist ? 'visible' : 'invisible'
								}`}
							>
								{error.artist}
							</span>
						</div>

						{/* COLLECTION */}
						<div className='mt-4 border-y-2 border-blue-300 py-4'>
							<fieldset className='select-none'>
								<span className='text-lg '>Select collection</span>
								<div className='flex gap-4 m-4'>
									<div>
										<input
											className='inp-radios
										'
											type='radio'
											id='Abstract'
											name='collection'
											value='Abstract'
											defaultChecked
											onChange={handleChange}
										/>
										<label htmlFor='Abstract'>Abstract</label>
									</div>

									<div>
										<input
											className='inp-radios
										'
											type='radio'
											id='Flowers'
											name='collection'
											value='Flowers'
											onChange={handleChange}
										/>
										<label htmlFor='Flowers'>Flowers</label>
									</div>

									<div>
										<input
											className='inp-radios
										'
											type='radio'
											id='Butterflies'
											name='collection'
											value='Butterflies'
											onChange={handleChange}
										/>
										<label htmlFor='Butterflies'>Butterflies</label>
									</div>

									<div>
										<input
											className='inp-radios
										'
											type='radio'
											id='Other'
											name='collection'
											value='Other'
											onChange={handleChange}
										/>
										<label htmlFor='Other'>Other</label>
									</div>
								</div>
							</fieldset>
						</div>

						{/* INVENTARY */}
						<div className='grid grid-cols-2 gap-4 mt-4'>
							<div className='flex justify-between items-center'>
								<label className='mb-2'>Cake Trail Stock:</label>
								<input
									type='number'
									className='w-1/3 bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-1'
									name='cakeTrail'
									placeholder='units'
									value={stock.cakeTrail}
									onChange={handleChangeStock}
								/>
							</div>
							<div className='flex justify-between items-center'>
								<label className='mb-2'>Cake Trail Price:</label>
								<input
									type='number'
									className='w-1/3 bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-1'
									name='priceCakeTray'
									placeholder='$'
									value={input.priceCakeTray}
									onChange={handleChange}
								/>
							</div>
							<div className='flex justify-between items-center'>
								<label className='mb-2'>Turntable Stock:</label>
								<input
									type='number'
									className='w-1/3 bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-1'
									name='turntable'
									placeholder='units'
									// value={input.stock[1].quantity}
									value={stock.turntable}
									onChange={handleChangeStock}
								/>
							</div>
							<div className='flex justify-between items-center'>
								<label className='mb-2'>Turntable Price:</label>
								<input
									type='number'
									className='w-1/3 bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-1'
									name='priceTurntable'
									placeholder='$'
									value={input.priceTurntable}
									onChange={handleChange}
								/>
							</div>
						</div>
						{/* DETAILS IMAGE */}
						<div className='mt-4 mb-4 border-y-2 border-blue-300 py-4'>
							<div>
								<h1 className='mb-4'>Image Details</h1>
								<label
									htmlFor='imagesDetail'
									className='btn btn-purple cursor-pointer hover:bg-neutral-200 select-none'
								>
									Choose images to upload (PNG, JPG)
								</label>
								<input
									className='hidden'
									type='file'
									id='imagesDetail'
									name='imagesDetail'
									accept='.jpg, .jpeg, .png'
									multiple
									onChange={handleChangeImages}
								/>
							</div>
							<span
								className={`text-red-400 text-xs mt-1${
									errorSelectImageDetail.imagesDetail ? 'block' : 'hidden'
								}`}
							>
								{errorSelectImageDetail.imagesDetail}
							</span>
							<div className='mt-4 text-[10px] flex flex-col'>
								<span>No files currently selected for upload</span>
								<span>No files currently selected for upload</span>
								<span>No files currently selected for upload</span>
							</div>
						</div>

						{/* DESCRIPTION */}
						<div>
							<label className=''>Description</label>
							<input
								type='text'
								className='w-full bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-1'
								name='description'
								placeholder='Description...'
								value={input.description}
								onChange={handleChange}
							/>
							<span
								className={`text-red-400 text-xs mt-1${
									error.description ? 'visible' : 'invisible'
								}`}
							>
								{error.description}
							</span>
						</div>
					</div>
					{/* RIGHT COLUMN */}
					<div className='flex flex-col justify-between'>
						<img
							id='output'
							className='w-4/5 mt-4 mx-auto aspect-square rounded-xl object-cover'
						></img>
						<div>
							{/* COLORS */}
							<div
								className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-white'
								// onClick={handleGetColors}
							>
								<i className='bi bi-droplet text-blue-300'></i>
								<div className='flex justify-between w-full items-center'>
									<span className='text-md ml-4 text-gray-200'>
										Select 3 main colors:
									</span>
									<span className='text-sm' id='arr-clr'></span>
								</div>
							</div>
							<div
								className='text-left text-sm font-thin mt-2 text-white select-none ml-6'
								id='form-colors'
							>
								{!redColors.length ? (
									<h1>Loading...</h1>
								) : (
									redColors.map(color => (
										<div
											key={color.id}
											className={`form-check form-switch cursor-pointer p-2 rounded-md mt-1 ml-10 w-4/5`}
										>
											<input
												className='form-mycolors form-check-input appearance-none rounded-full   bg-gray-300 cursor-pointer'
												type='checkbox'
												role='switch'
												name={color.name}
												onClick={handleOnClickColors}
												style={{
													backgroundColor: `${color.hex}`,
													borderColor: `${color.hex}`,
												}}
											/>
											<label
												className='form-check-label inline-block text-white ml-2'
												htmlFor='stock-switch'
											>
												{color.name}
											</label>
										</div>
									))
								)}
							</div>
							{/* BUTTONS */}
							<div className='mt-4 flex justify-center gap-4'>
								<Link to='/admin'>
									<button
										className='btn btn-red hover:btn-red w-32'
										value='Back'
									>
										Back
									</button>
								</Link>
								<button
									type='submit'
									value='Add product'
									className='btn btn-purple hover:btn-purple justify-end'
								>
									Add Product
								</button>
							</div>
						</div>
					</div>
				</div>
				<span className='p-0.5 text-red-400' ref={errorAll}></span>
				<span className='p-0.5 text-green-400' ref={success}></span>
			</form>
		</div>
	);
};

export default ProductForm;
