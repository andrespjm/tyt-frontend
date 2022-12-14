import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import waves from '../assets/waves.svg';
import { Loader } from '../components/Loader';
import Sidebar from '../components/Sidebar';
import { getData, getFilteredData } from '../redux/actions';
import './Home.css';

const Home = () => {
	const dispatch = useDispatch();
	const { redData } = useSelector(state => state);
	const [loader, setLoader] = useState(true);

	useEffect(() => {
		if (localStorage.getItem('Filter')) {
			dispatch(getFilteredData(JSON.parse(localStorage.getItem('Query'))));
		} else dispatch(getData());
	}, [dispatch]); //

	if (redData.length > 0 && loader) {
		setLoader(false);
	}
	if (loader) return <Loader />;

	return (
		<div
			style={{ backgroundImage: `url(${waves})` }}
			className='w-screen h-screen bg-neutral-900 text-white  bg-center bg-cover '
		>
			<Sidebar />
			<div
				className={` container grid grid-cols-2 gap-1
				lg:grid-cols-3 2xl:grid-cols-4
				`}
			>
				{/* lg:grid-cols-3
				sm:bg-blue-500
				md:bg-yellow-500
				lg:bg-red-500
				xl:bg-green-500
			2xl:bg-gray-500 */}
				{redData?.map((prod, i) => (
					<Link key={i} to={`/detail/${prod.id}`}>
						<div
							className='parent relative w-full aspect-square select-none
							hover:border-2 hover:border-blue-500
						'
						>
							<div
								style={{ backgroundImage: `url(${prod.img_home.secure_url})` }}
								className='child text-white w-full h-full
								'
							>
								<div className='mytext w-full h-full '>
									<div className=' w-full h-full flex flex-col justify-between p-10 lg:p-12'>
										<span className='text-center font-semibold p-1 text-lg'>
											{prod.name}
										</span>

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
