import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getColors } from '../redux/actions';
import {
	validateProduct,
	validateProductSubmit,
} from '../validations/modifyProductValidation';

const ModifyProduct = () => {
	const dispatch = useDispatch();
	const [product, setProduct] = useState({
		stockCakeTray: 1000,
		priceCakeTray: 1,
		stockTurntable: 1,
		priceTurntable: 1,
	});
	const [newColors, setNewColors] = useState([]);
	const [imageMain, setImageMain] = useState();
	const [imagesDetail, setimagesDetail] = useState();
	const errorAll = useRef();
	const success = useRef();
	const { redColors } = useSelector(state => state);
	const urlSplit = window.location.href.split('/');
	const id = urlSplit[urlSplit.length - 1];
	console.log(id);
	const [error, setError] = useState({});

	useEffect(() => {
		dispatch(getColors());
		async function fetchData() {
			try {
				const response = await axios.get(`/products/${id}`);
				setProduct({ ...product, ...response.data });

				setNewColors([
					product.Colors[0].name,
					product.Colors[1].name,
					product.Colors[2].name,
				]);

				updateSwitchColors();
			} catch (error) {
				console.log('error en modify', error);
			}
		}
		fetchData();
	}, []);

	const updateSwitchColors = () => {
		if (!product.Colors) return;
		document.querySelectorAll('.modify-mycolors').forEach(element => {
			for (const color of product.Colors)
				if (color.name === element.name) {
					element.checked = true;
					element.parentNode.style.backgroundColor =
						element.name === 'water green'
							? '#03bb85'
							: element.name === 'light blue'
							? '#ADD8E6'
							: element.name;
				}
		});

		document.querySelectorAll('.modify-mycolors').forEach(element => {
			if (!element.checked) element.disabled = true;
		});
	};

	!newColors.length && updateSwitchColors();

	const handleOnClickColors = e => {
		if (e.target.checked) {
			if (newColors.length === 3) return;
			if (newColors.length === 2)
				document.querySelectorAll('.modify-mycolors').forEach(element => {
					if (!element.checked) element.disabled = true;
				});
			setNewColors([...newColors, e.target.name]);
			e.target.parentNode.style.backgroundColor =
				e.target.name === 'water green'
					? '#03bb85'
					: e.target.name === 'light blue'
					? '#ADD8E6'
					: e.target.name;
		} else {
			if (newColors.length === 3)
				document.querySelectorAll('.modify-mycolors').forEach(element => {
					if (element.disabled) element.disabled = false;
				});
			setNewColors(newColors.filter(color => color !== e.target.name));
			e.target.parentNode.style.backgroundColor = '';
		}
	};

	const handleChange = (e, newColors) => {
		console.log(newColors);
		setProduct({ ...product, [e.target.name]: e.target.value });
		setError(
			validateProduct({
				...product,
				[e.target.name]: e.target.value,
				newColors,
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
		document.getElementById('img1').innerHTML = e.target.files[0].name;
		document.getElementById('img2').innerHTML = e.target.files[1].name;
		document.getElementById('img3').innerHTML = e.target.files[2].name;
	};

	const handleModifyProduct = async e => {
		e.preventDefault();
		console.log(newColors);
		setError(validateProductSubmit(product, newColors));
		setError(validateProduct(product, newColors));
		console.log(error);

		success.current.innerText = '';
		console.log(newColors);

		const color1 = redColors.filter(color => color.name === newColors[0]);
		const strClr1 = `${color1[0].hex},${color1[0].name}`;
		const color2 = redColors.filter(color => color.name === newColors[1]);
		const strClr2 = `${color2[0].hex},${color2[0].name}`;
		const color3 = redColors.filter(color => color.name === newColors[2]);
		const strClr3 = `${color3[0].hex},${color3[0].name}`;

		console.log(product); // ok
		console.log(color1); // ok
		console.log(color2); // ok
		console.log(color3); // ok
		console.log(strClr1);
		console.log(strClr2);

		console.log(strClr3);

		const toModify = {
			name: product.name,
			artist: product.artist,
			description: product.description,
			collection: product.collection,
			color1: strClr1,
			color2: strClr2,
			color3: strClr3,
			stockCakeTray: product.stockCakeTray,
			stockTurntable: product.stockTurntable,
			priceCakeTray: product.priceCakeTray,
			priceTurntable: product.priceTurntable,
		};

		const images = [];
		if (imagesDetail) {
			for (const image of imagesDetail) {
				images.push(image);
			}
		}

		imageMain && (toModify.imageMain = imageMain);
		images.length && (toModify.imagesDetail = images || []);

		console.log(toModify);

		if (Object.entries(error).length < 1) {
			try {
				success.current.innerText = 'Loading product..';
				const res = await axios.put(`/products/${id}`, toModify, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				});
				if (res.data.success === 'ok') {
					errorAll.current.innerText = '';
					return (success.current.innerText = 'Product added successfully');
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log('All fields need to be completed');
		}
	};

	if (!product.name) return <h1>Loading...</h1>;

	if (product.stockCakeTray === 1000) {
		setProduct({
			...product,
			stockCakeTray: product.ProductTypes[0].Stocks.quantityST,
			priceCakeTray: product.ProductTypes[0].Stocks.priceST,
			stockTurntable: product.ProductTypes[1].Stocks.quantityST,
			priceTurntable: product.ProductTypes[1].Stocks.priceST,
		});
		setNewColors([
			product.Colors[0].name,
			product.Colors[1].name,
			product.Colors[2].name,
		]);

		updateSwitchColors();
	}

	return (
		<div className='p-10 bg-gray-800'>
			<form
				className='max-w-7xl text-white mx-auto'
				encType='multipart/form-data'
			>
				<span className='text-5xl'>Modify Product!</span>
				<div className='grid grid-cols-[1fr_1fr] gap-8'>
					{/* LEFT COLUMN */}
					<div className='flex flex-col justify-between'>
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
									value={product.imageMain}
									onChange={handleImage}
								/>
							</div>
							<span
							// className={`text-red-400 text-xs mt-1${
							// errorSelectImage.imageMain ? 'visible' : 'invisible'
							// }`}
							>
								{/* {errorSelectImage.imageMain} */}
							</span>
							<div id='main-img-name' className='mt-4'>
								{product.img_home.secure_url}
							</div>
						</div>

						{/* NAME */}
						<div className='mt-4'>
							<label className=''>Product Name</label>

							<input
								type='text'
								className='w-full bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-1
	              '
								value={product.name}
								name='name'
								placeholder='Name...'
								onChange={handleChange}
							/>

							<span
								className={`text-red-400 p-0.5${
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
								value={product.artist}
								name='artist'
								placeholder='Artist...'
								onChange={handleChange}
							/>
							<span
								className={`text-red-400 p-0.5${
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
											checked={product.collection === 'Abstract'}
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
											checked={product.collection === 'Flowers'}
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
											checked={product.collection === 'Butterflies'}
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
											checked={product.collection === 'Other'}
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
								<label className='mb-2'>Cake Tray Stock:</label>
								<input
									type='number'
									className='w-1/3 bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-1'
									value={product.stockCakeTray}
									name='stockCakeTray'
									placeholder='un'
									onChange={handleChange}
								/>
							</div>
							<div className='flex justify-between items-center'>
								<label className='mb-2'>Cake Tray Price:</label>
								<input
									type='number'
									className='w-1/3 bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-1'
									value={product.priceCakeTray}
									name='priceCakeTray'
									placeholder='$...'
									onChange={handleChange}
								/>
							</div>
							<div className='flex justify-between items-center'>
								<label className='mb-2'>Turntable Stock:</label>
								<input
									type='number'
									className='w-1/3 bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-1'
									value={product.stockTurntable}
									name='stockTurntable'
									placeholder='un'
									onChange={handleChange}
								/>
							</div>
							<div className='flex justify-between items-center'>
								<label className='mb-2'>Turntable Price:</label>
								<input
									type='number'
									className='w-1/3 bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-1'
									value={product.priceTurntable}
									name='priceTurntable'
									placeholder='$...'
									onChange={handleChange}
								/>
							</div>
							<span className='p-0.5 text-red-400'>
								{' '}
								{error.numbers && error.numbers}
							</span>
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
									// onChange={e => setimagesDetail(e.target.files)}
								/>
							</div>
							<span
							// className={`text-red-400 text-xs mt-1${
							// 	errorSelectImageDetail.imagesDetail ? 'block' : 'hidden'
							// }`}
							>
								{/* {errorSelectImageDetail.imagesDetail} */}
							</span>
							<div className='mt-4 text-[10px] flex flex-col'>
								<span id='img1'>{product.img_detail[0]?.secure_url}</span>
								<span id='img2'>{product.img_detail[1]?.secure_url}</span>
								<span id='img3'>{product.img_detail[2]?.secure_url}</span>
							</div>
						</div>

						{/* DESCRIPTION */}
						<div>
							<label className=''>Description</label>
							<input
								type='text'
								className='w-full bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-1'
								value={product.description}
								name='description'
								placeholder='Description...'
								// value={input.description}
								onChange={handleChange}
							/>
							<span
							// className={`text-red-400 text-xs mt-1${
							// 	error.description ? 'visible' : 'invisible'
							// }`}
							>
								{/* {error.description} */}
							</span>
						</div>
					</div>
					{/* RIGHT COLUMN */}
					<div className='flex flex-col justify-between'>
						<img
							id='output'
							src={product.img_home.secure_url}
							className='w-4/5 mt-4 mx-auto aspect-square rounded-xl object-cover'
						></img>
						<div>
							{/* COLORS */}
							<div className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-white'>
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
												className='modify-mycolors form-check-input appearance-none rounded-full   bg-gray-300 cursor-pointer'
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
							<span
								className={`text-red-400 mt-1${
									error.required ? 'visible' : 'invisible'
								}`}
							>
								{error.required}
							</span>
							<span className='p-0.5 text-green-400' ref={success}></span>
							{/* BUTTONS */}
							<div className='mt-4 flex justify-center gap-4'>
								<button
									onClick={handleModifyProduct}
									type='submit'
									value='Add product'
									className='btn btn-purple hover:btn-purple justify-end w-28'
								>
									Apply
								</button>
							</div>
						</div>
					</div>
				</div>
				<span className='p-0.5 text-red-400 italic' ref={errorAll}></span>
				{/* <span className='p-0.5 text-green-400 italic' ref={success}></span> */}
			</form>
		</div>
	);
};

export default ModifyProduct;
