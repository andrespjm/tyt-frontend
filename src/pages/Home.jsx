import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getData, getFilteredData } from '../redux/actions';

const Home = () => {
	const dispatch = useDispatch();
	const { redData } = useSelector(state => state);

	useEffect(() => {
		if (localStorage.getItem('Filter')) {
			dispatch(getFilteredData(JSON.parse(localStorage.getItem('Query'))));
		} else dispatch(getData());
	}, [dispatch]); //

	return (
		<div
			className='w-screen min-h-screen select-none -z-10
		bg-gradient-to-b from-black to-blue-500 flex
		'
		>
			<Sidebar />
			<div
				className=' container grid grid-cols-2 grid-rows-3 gap-x-1
				lg:grid-cols-3
				'
			>
				{/* lg:grid-cols-3
				sm:bg-blue-500
					md:bg-yellow-500
					lg:bg-red-500
					xl:bg-green-500
					2xl:bg-gray-500 */}
				{redData?.map((prod, i) => (
					<div key={i} className='relative max-w-lg max-h-[520px] mt-1'>
						<Link to={`/${prod.id}`}>
							<div className='absolute inset-0 z-10 flex transition duration-700 ease-in hover:opacity-0'>
								<div className='absolute inset-0 bg-black opacity-50'></div>
								<div className='border w-full flex flex-col  text-white z-10 p-3 justify-between'>
									<div className=' flex justify-between'>
										<span className='w-fit p-1 text-lg'>{prod.name}</span>
										<span>
											<i className='bi bi-bookmark-heart text-3xl'></i>
										</span>
									</div>
									<div className='flex justify-between'>
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
						</Link>
						<img
							src={prod.img_home.secure_url}
							className='w-full h-full object-cover
							'
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
