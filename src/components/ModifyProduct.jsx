import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getColors } from '../redux/actions';

const ModifyProduct = () => {
	const dispatch = useDispatch();
	const [product, setProduct] = useState({});
	const [newColors, setNewColors] = useState([]);
	const { redColors } = useSelector(state => state);
	const id = 200;

	useEffect(() => {
		dispatch(getColors());
		async function fetchData() {
			try {
				const response = await axios.get(`/products/${id}`);
				setProduct(response.data);
				setNewColors([
					product.Colors[0].name,
					product.Colors[1].name,
					product.Colors[2].name,
				]);
			} catch (error) {
				alert(error);
			}
		}
		fetchData();
		updateSwitchColors();
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

	if (!product.name) return <h1>Loading...</h1>;

	console.log(newColors);

	return (
		<div className='bg-gray-800 py-10'>
			<form
				className='max-w-5xl text-white mx-auto'
				// onSubmit={handleSubmit}
				encType='multipart/form-data'
			>
				<span className='text-5xl'>Modify Product!</span>
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
									// value={input.imageMain}
									// onChange={handleImage}
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
								// value={input.name}
								// onChange={handleChange}
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
								// value={input.artist}
								// onChange={handleChange}
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
											// onChange={handleChange}
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
											// onChange={handleChange}
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
											// onChange={handleChange}
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
											// onChange={handleChange}
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
									value={product.ProductTypes[0].Stocks.quantityST}
									name='cakeTrail'
									placeholder='0, 1, 2 or more...'
									// value={stock.cakeTrail}
									// onChange={handleChangeStock}
								/>
							</div>
							<div className='flex justify-between items-center'>
								<label className='mb-2'>Cake Trail Price:</label>
								<input
									type='number'
									className='w-1/3 bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-1'
									value={product.ProductTypes[0].Stocks.priceST}
									name='priceCakeTray'
									placeholder='$...'
									// value={input.priceCakeTray}
									// onChange={handleChange}
								/>
							</div>
							<div className='flex justify-between items-center'>
								<label className='mb-2'>Turntable Stock:</label>
								<input
									type='number'
									className='w-1/3 bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-1'
									value={product.ProductTypes[1].Stocks.quantityST}
									name='turntable'
									placeholder='0, 1, 2 or more...'
									// value={input.stock[1].quantity}
									// value={stock.turntable}
									// onChange={handleChangeStock}
								/>
							</div>
							<div className='flex justify-between items-center'>
								<label className='mb-2'>Turntable Price:</label>
								<input
									type='number'
									className='w-1/3 bg-gray-700 border-2 border-gray-500 rounded-lg py-2 px-4 mt-1'
									value={product.ProductTypes[1].Stocks.priceST}
									name='priceTurntable'
									placeholder='$...'
									// value={input.priceTurntable}
									// onChange={handleChange}
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
									// onChange={handleChangeImages}
								/>
							</div>
							<span
							// className={`text-red-400 text-xs mt-1${
							// 	errorSelectImageDetail.imagesDetail ? 'block' : 'hidden'
							// }`}
							>
								{/* {errorSelectImageDetail.imagesDetail} */}
							</span>
							<div className='preview mt-4'>
								No files currently selected for upload...
							</div>
						</div>
					</div>
					{/* RIGHT COLUMN */}
					<div className=''>
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
						</div>
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
						// onChange={handleChange}
					/>
					<span
					// className={`text-red-400 text-xs mt-1${
					// 	error.description ? 'visible' : 'invisible'
					// }`}
					>
						{/* {error.description} */}
					</span>
				</div>
				{/* <span className='p-0.5 text-red-400 italic' ref={errorAll}></span> */}
				{/* <span className='p-0.5 text-green-400 italic' ref={success}></span> */}
				<div className='flex justify-end gap-4'>
					<Link to='/admin'>
						<button className='btn btn-red hover:btn-red w-32' value='Back'>
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
			</form>
		</div>
	);
};

export default ModifyProduct;
