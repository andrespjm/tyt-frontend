import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getColors } from '../redux/actions';

const ModifyProduct = () => {
	const dispatch = useDispatch();
	const [product, setProduct] = useState({});
	const [newColors, setNewColors] = useState([]);
	const [imageMain, setImageMain] = useState();
	const [imagesDetail, setimagesDetail] = useState([]);
	const errorAll = useRef();
	const success = useRef();
	const { redColors } = useSelector(state => state);
	const id = window.location.href.split('/')[5];
	console.log(id);

	useEffect(() => {
		dispatch(getColors());
		async function fetchData() {
			try {
				const response = await axios.get(`/products/${id}`);
				setProduct(response.data);
			} catch (error) {
				console.log('error en modify', error);
			}
		}
		fetchData();
	}, [dispatch]);

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

	const handleChange = e => {
		setProduct({ ...product, [e.target.name]: e.target.value });
	};

	const handleImage = e => {
		setImageMain(e.target.files[0]);
		document.getElementById('output').src = URL.createObjectURL(
			e.target.files[0]
		);
		document.getElementById('main-img-name').innerHTML = e.target.files[0].name;
	};

	const handleModifyProduct = async e => {
		e.preventDefault();
		success.current.innerText = '';
		const images = [];
		if (imagesDetail) {
			for (const image of imagesDetail) {
				images.push(image);
			}
		}
		const color1 = redColors.filter(color => color.name === newColors[0]);
		const strClr1 = `${color1[0].hex},${color1[0].name}`;
		const color2 = redColors.filter(color => color.name === newColors[1]);
		const strClr2 = `${color2[0].hex},${color2[0].name}`;
		const color3 = redColors.filter(color => color.name === newColors[2]);
		const strClr3 = `${color3[0].hex},${color3[0].name}`;

		// console.log({
		// 	name: product.name,
		// 	description: product.description,
		// 	collection: document.querySelector('input[name="collection"]:checked')
		// 		.value,
		// 	imageMain,
		// 	imagesDetail,
		// 	artist: product.artist,
		// 	color1: strClr1,
		// 	color2: strClr2,
		// 	color3: strClr3,
		// 	stockCakeTray: product.stockCakeTray,
		// 	stockTurntable: product.stockTurntable,
		// 	priceCakeTray: product.priceCakeTray,
		// 	priceTurntable: product.priceTurntable,
		// });
		try {
			const res = await axios.put(
				`/products/${id}`,
				{
					name: product.name,
					description: product.description,
					collection: document.querySelector('input[name="collection"]:checked')
						.value,
					imageMain,
					imagesDetail,
					artist: product.artist,
					color1: strClr1,
					color2: strClr2,
					color3: strClr3,
					stockCakeTray: product.stockCakeTray,
					stockTurntable: product.stockTurntable,
					priceCakeTray: product.priceCakeTray,
					priceTurntable: product.priceTurntable,
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
		} catch (error) {
			console.log(error);
		}
	};

	if (!product.name) return <h1>Loading...</h1>;
	if (!product.stockCakeTray) {
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
	// console.log(product);

	return (
		<div className='h-screen py-10 bg-gradient-to-b from-black via-gray-700 to-base-900'>
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
							// className={`text-red-400 text-xs mt-1${
							// error.name ? 'visible' : 'invisible'
							// }`}
							>
								{/* {error.name} */}
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
							// className={`text-red-400 text-xs mt-1${
							// 	error.artist ? 'visible' : 'invisible'
							// }`}
							>
								{/* {error.artist} */}
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
											onChange={() => {}}
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
											onChange={() => {}}
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
											onChange={() => {}}
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
											onChange={() => {}}
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
									value={product.stockCakeTray}
									name='stockCakeTray'
									placeholder='0, 1, 2 or more...'
									onChange={handleChange}
								/>
							</div>
							<div className='flex justify-between items-center'>
								<label className='mb-2'>Cake Trail Price:</label>
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
									placeholder='0, 1, 2 or more...'
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
									onChange={e => setimagesDetail(e.target.files)}
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
								<span>{product.img_detail[0]?.secure_url}</span>
								<span>{product.img_detail[1]?.secure_url}</span>
								<span>{product.img_detail[2]?.secure_url}</span>
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
							{/* BUTTONS */}
							<div className='mt-4 flex justify-center gap-4'>
								<Link to='/admin'>
									<button
										className='btn btn-red hover:btn-red w-28'
										value='Back'
									>
										Back
									</button>
								</Link>
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
				<span className='p-0.5 text-green-400 italic' ref={success}></span>
			</form>
		</div>
	);
};

export default ModifyProduct;
