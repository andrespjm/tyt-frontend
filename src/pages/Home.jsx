import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getData, getFilteredData } from '../redux/actions';
import './Home.css';

const Home = () => {
	const dispatch = useDispatch();
	const { redData } = useSelector(state => state);
	const [slider, setSlider] = useState('grid-cols-4');

	useEffect(() => {
		if (localStorage.getItem('Filter')) {
			dispatch(getFilteredData(JSON.parse(localStorage.getItem('Query'))));
		} else dispatch(getData());
	}, [dispatch]); //

	const onChangeSlider = e => setSlider(`grid-cols-${e.target.value}`);

	return (
		<div
			className='w-screen min-h-screen select-none
		'
		>
			<Sidebar />
			<div className='text-white p-4 text-center flex justify-center '>
				<input
					onChange={onChangeSlider}
					type='range'
					id='volume'
					name='volume'
					min='1'
					max='12'
				/>
				<label forHtml='volume'>Grid Columns</label>
			</div>
			<div
				className={`container grid ${slider}

				`}
			>
				{/* lg:grid-cols-3
				sm:bg-blue-500
					md:bg-yellow-500
					lg:bg-red-500
					xl:bg-green-500
					2xl:bg-gray-500 */}
				{redData?.map(prod => (
					<Link key={prod.id} to={`/${prod.id}`}>
						<div
							className='parent w-full aspect-square
						'
						>
							<div
								style={{ backgroundImage: `url(${prod.img_home.secure_url})` }}
								className='child text-white font-bold w-full h-full
								'
							>
								<div className='mytext w-full h-full '>
									<div className=' w-full h-full flex flex-col justify-between p-10 lg:p-12'>
										<div className='w-full flex justify-between'>
											<span className='w-fit p-1 text-lg'>{prod.name}</span>
											<span>
												<i className='bi bi-bookmark-heart text-3xl'></i>
											</span>
										</div>

										<div className='w-full flex justify-between  '>
											<span className='text-sm w-fit rounded-md p-1'>
												{prod.collection}
											</span>
											<div className='flex gap-[2px] rounded-md p-1'>
												<div
													className={'rounded-full w-3 h-3'}
													style={{
														backgroundColor: `${prod.Colors[0].hex}`,
														border: ` ${prod.Colors[0].hex}`,
													}}
												></div>
												<div
													className={'rounded-full w-3 h-3'}
													style={{
														backgroundColor: `${prod.Colors[1].hex}`,
														border: ` ${prod.Colors[1].hex}`,
													}}
												></div>
												<div
													className={'rounded-full w-3 h-3'}
													style={{
														backgroundColor: `${prod.Colors[2].hex}`,
														border: ` ${prod.Colors[2].hex}`,
													}}
												></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Home;
