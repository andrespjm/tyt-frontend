import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../components/ProductForm.css';
import { getColors } from '../redux/actions';
import {
	validateProduct,
	validateProductStock,
	validateProductSubmit,
} from '../validations/productValidation';

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
		stockCakeTray: '',
		stockTurntable: '',
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
		console.log(queryColors);
	};

	const [error, setError] = useState({});

	const handleChange = e => {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
		setError(
			validateProduct(
				{
					...input,
					[e.target.name]: e.target.value,
				},
				stock,
				queryColors,
				imageMain,
				imagesDetail
			)
		);
	};

	const handleImage = e => {
		setImageMain(e.target.files[0]);
		document.getElementById('output').src = URL.createObjectURL(
			e.target.files[0]
		);
		document.getElementById('main-img-name').innerHTML = e.target.files[0].name;
		setError(
			validateProduct(
				input,
				stock,
				queryColors,
				{ imageMain: e.target.files[0] },
				imagesDetail
			)
		);
	};

	const handleChangeImages = e => {
		setimagesDetail(e.target.files);
		document.getElementById('img1').innerHTML = e.target.files[0].name;
		document.getElementById('img2').innerHTML = e.target.files[1].name;
		document.getElementById('img3').innerHTML = e.target.files[2].name;
	};

	const handleChangeStock = e => {
		setStock({ ...stock, [e.target.name]: e.target.value });
		setError(
			validateProductStock({ ...stock, [e.target.name]: e.target.value })
		);
		console.log(stock);
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setError(
			validateProductSubmit(input, stock, queryColors, imageMain, imagesDetail)
		);
		if (Object.entries(error).length < 1) {
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

				if (!imageMain || Object.entries(newProduct).length === 0) {
					errorAll.current.innerText = 'Some fields are missing';
				} else {
					success.current.innerText = 'Loading product..';
					const res = await axios.post(
						'/products',
						{
							name: newProduct.name,
							description: newProduct.description,
							collection: document.querySelector(
								'input[name="collection"]:checked'
							).value,
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
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log('All fields need to be completed');
		}
	};

	return (
		<div className='py-10 bg-gray-800'>
			<form
				className='max-w-7xl text-white mx-auto'
				onSubmit={handleSubmit}
				encType='multipart/form-data'
			>
				<span className='text-5xl'>Create Product!</span>
				<div className='grid grid-cols-[1fr_0.6fr] gap-8'>
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
							<div id='main-img-name' className=' preview mt-4'>
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
								name='artist'
								placeholder='Artist...'
								value={input.artist}
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
								<label className='mb-2'>Cake Tray Stock:</label>
								<input
									type='text'
									className='w-1/3 bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-1'
									name='cakeTrail'
									placeholder='units'
									value={stock.cakeTrail}
									onChange={handleChangeStock}
								/>
							</div>
							<div className='flex justify-between items-center'>
								<label className='mb-2'>Cake Tray Price:</label>
								<input
									type='text'
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
									type='text'
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
									type='text'
									className='w-1/3 bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-1'
									name='priceTurntable'
									placeholder='$'
									value={input.priceTurntable}
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
								/>
							</div>
							<span
								className={`text-red-400 text-xs mt-1${
									errorSelectImageDetail.imagesDetail ? 'block' : 'hidden'
								}`}
							>
								{errorSelectImageDetail.imagesDetail}
							</span>
							<div className='preview mt-4 mt-4  flex flex-col'>
								<span id='img1'>No files currently selected for upload</span>
								<span id='img2'></span>
								<span id='img3'></span>
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
			</form>
		</div>
	);
};

export default ProductForm;
