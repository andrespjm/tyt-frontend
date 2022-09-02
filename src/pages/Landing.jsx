import './Landing.css';
import waves from '../assets/waves.svg';
import { useDispatch } from 'react-redux';
import { getFilteredData } from '../redux/actions';
import { Link } from 'react-router-dom';

const Landing = () => {
	const dispatch = useDispatch();

	const subscribe = e => {
		document.querySelector('#btn-subscribe').value = '';
		setTimeout(
			() => document.querySelector('#tx-submitting').classList.toggle('hidden'),
			5000
		);
		document.querySelector('#tx-submitting').classList.toggle('hidden');
	};

	return (
		<div className='snap-y snap-proximity  overflow-hidden select-none'>
			<section
				className='w-screen h-[calc(100vh-8rem)] select-none flex flex-none snap-center scroll-mb-96
			bg-gradient-to-b from-black to-purple-700'
			>
				<div
					className='h-full flex flex-col justify-center items-center
					lg:flex-row mx-auto
					'
				>
					{/* sm:bg-blue-500
					md:bg-yellow-500
					lg:bg-red-500
					xl:bg-green-500
					2xl:bg-gray-500 
					*/}
					{/* IMAGE */}
					<div
						className='w-3/4 h-1/2 
						lg:w-full lg:h-full
							'
					>
						<img
							src='https://i.ibb.co/vc9K164/tinywow-IMG-9476-4930324.png'
							className='w-full h-full object-contain
							lg:ml-16
							2xl:ml-32
							'
						/>
					</div>
					{/* PARAGRAPH */}
					<div
						className='w-4/5 h-1/2
					lg:w-full lg:h-fit
					'
					>
						<div
							className='neon flex flex-col items-center p-4 text-white bg-neutral-900 rounded-xl
						lg:w-4/5 lg:-ml-16
						2xl:-ml-32 
						'
						>
							<span
								className='text-xs
							lg:text-sm
							'
							>
								Unique Art Pieces
							</span>
							<span
								className='mt-2 text-xl 
								lg:text-3xl lg:mt-4
								2xl:text-4xl'
							>
								Cakes
								<span
									className='text-2xl text-myPurple-100
									lg:text-4xl
									2xl:text-5xl'
								>
									&
								</span>
								Bases
							</span>
							<p
								className='mt-2 text-center text-xs
								lg:max-w-md lg:text-sm lg:mt-4 
								xl:max-w-2xl  xl:text-[14px]
								'
							>
								Functional Art in your Table. Original pieces created with love
								creativity. Wood, painting, colors, and advanced techniques are
								collected togheter to achieve this unique art pieces.
							</p>
						</div>
					</div>
				</div>
			</section>
			{/* CREATION PROCESS */}
			<section
				className='w-screen h-[calc(100vh-6rem)] bg-neutral-900 text-white flex flex-none snap-center scroll-mb-96
			'
			>
				<div
					className='container grid grid-rows-2 gap-1
				lg:grid-cols-2 lg:grid-rows-1
				'
				>
					{/* CARPENTER */}
					<div
						className='relative h-full flex flex-col items-center
						bg-gradient-to-bl from-gray-900 to-slate-400
						'
					>
						<div
							className='absolute w-full h-full bg-[url("https://i.ibb.co/hB1BYgR/pexels-cottonbro-5089159.jpg")] bg-cover bg-center mix-blend-overlay 
						hover:bg-[url("https://images.pexels.com/photos/175709/pexels-photo-175709.jpeg?cs=srgb&dl=pexels-clem-onojeghuo-175709.jpg&fm=jpg")]
						duration-1000 transform
						'
						></div>
						<span
							className='hidden border-2 bg-gradient-to-b from-black to-purple-500 p-4 rounded-full mt-10
						md:block
						'
						>
							<svg
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								className='w-10 h-10'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z'
								/>
							</svg>
						</span>
						<span className='mt-10 text-sm tracking-[5px]'>
							HOW DO WE DO IT?
						</span>
						<span className='text-xl w-3/4 text-center mt-10'>
							We offer cake trails and turn tables, resin-coated and made of
							Cedar wood.
						</span>
					</div>
					{/* ARTIST */}
					<div
						className='relative h-full flex flex-col items-center
						bg-gradient-to-tr from-gray-900 to-slate-100
						'
					>
						<div
							className='absolute w-full h-full bg-[url("https://images.pexels.com/photos/262034/pexels-photo-262034.jpeg")] bg-cover bg-center mix-blend-overlay 
						hover:bg-[url("https://i.ibb.co/9w9wyZX/pexels-daian-gan-102127.jpg")]
						duration-1000 transform
						'
						></div>
						<span
							className=' hidden border-2 bg-gradient-to-b from-black to-purple-500 p-4 rounded-full mt-10
						md:block
						'
						>
							<svg
								width='42'
								height='42'
								fill='currentColor'
								className='bi bi-palette'
								viewBox='0 0 16 16'
							>
								<path d='M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z' />
								<path d='M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8zm-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7z' />
							</svg>
						</span>
						<span className='mt-10 text-sm tracking-[5px]'>A PIECE OF ART</span>
						<span className='text-xl w-5/4 text-center mt-10'>
							Intervention of several artists involved in this colorful and
							innovative idea.
						</span>
					</div>
				</div>
			</section>
			{/* OUR HISTORY */}
			<section
				className='w-screen h-[calc(100vh-6rem)] bg-neutral-900 text-white 
			'
			>
				<div className='flex flex-col h-full'>
					<div
						className='relative w-screen h-1/3 flex items-center justify-center
					bg-[url("https://i.ibb.co/VpFm0pv/pexels-suzy-hazelwood-1629236.jpg")] bg-cover bg-center bg-no-repeat bg-fixed
					'
					>
						<div className='w-4/5 h-4/5 flex flex-col items-center justify-evenly z-10'>
							<span className='text-3xl lg:5xl'>Our History</span>
							<p className='text-center text-xs lg:w-3/4 lg:text-base'>
								Cakes&Bases was born in September of 2020. The idea was having a
								place to exhibit my cakes and desserts to post and offer them in
								social media. The vision was that these pieces were uniques and
								exclusive. The final goal was to visually enhance my pastry
								creations.
							</p>
						</div>
					</div>
					<div
						className='h-2/3 grid grid-rows-2 w-full m-auto p-10
					lg:grid-cols-3 lg:grid-rows-1 gap-2
					
					'
					>
						<div
							className='mx-auto w-1/2
						bg-[url("https://i.ibb.co/k639g6H/Whats-App-Image-2022-08-28-at-9-13-57-PM.jpg")]
						bg-cover bg-center
						lg:w-full lg:h-4/5 lg:my-auto 
						border-2 rounded-xl 
						'
						></div>
						<ul
							className=' list-disc flex flex-col h-1/2 mx-auto justify-evenly  rounded-3xl  text-black font-bold my-auto text-[9px]
							lg:col-span-2 md:h-1/2 md:text-sm md:w-[90%] lg:p-10
							bg-[url("https://i.ibb.co/SBzcNCH/pawel-czerwinski-ru-Jm3d-BXCqw-unsplash.jpg")]
							bg-cover
						'
						>
							<li>
								Our products are hand made cake trails and turn tables,
								resin-coated and made of Cedar wood.
							</li>
							<li>
								In the first stage, the carpenter intervenes the wood. With his
								hands, tools,and wood as raw material, gives the basic shape of
								our pieces.
							</li>

							<li>
								After the intervention of the carpenter, an artist who with her
								magic and creativity transforms the boards into unique and
								exclusive pieces of art.
							</li>
							<li>
								This is how a piece of wood becomes an exclusive functional work
								of art, ready to be the base of delicious pastry products and
								snacks in general.
							</li>
						</ul>
					</div>
				</div>
			</section>
			{/* SECTION 2 */}
			<section
				style={{ backgroundImage: `url(${waves})` }}
				className={`w-screen h-[calc(100vh-6rem)]  bg-neutral-900 text-white bg-no-repeat bg-center bg-cover 
			`}
			>
				{/* Header */}
				<div
					className='relative w-screen h-1/4 p-5 flex flex-col items-center justify-around 
				bg-[url("https://i.ibb.co/1R0yqmW/pexels-paul-blenkhorn-sensoryarthouse-12497329.jpg")]
				bg-cover bg-center bg-no-repeat bg-fixed
				'
				>
					<div>
						<div
							className='text-center text-xs
						md:text-base
						'
						>
							In cakes&Bases we bring art to the table!.
						</div>
						<div
							className='text-2xl mt-3 font-medium text-center
					md:text-5xl
					'
						>
							Match Your Style
						</div>
					</div>
					<div className='text-[8px] md:text-base'>
						Choose between four diferent Collections: Abstract, Flowers,
						Butterflies and Others.
					</div>
				</div>
				{/* Body */}
				<div className='container h-3/4 text-center flex flex-col items-center'>
					<div className='h-full w-full grid grid-cols-2 grid-rows-2 lg:w-4/5'>
						<div className='w-full flex flex-col justify-center'>
							<div className='w-4/5 lg:w-1/2'>
								<span className='text-slate-300 text-xs lg:text-base'>
									Abstract
								</span>
								<Link to='/home'>
									<img
										onClick={() => {
											const query = '?collection1=Abstract&stock=true';
											dispatch(getFilteredData(query));
											localStorage.setItem(
												'Filter',
												JSON.stringify({
													usedFilter: false,
													onStock: true,
													coll1: true,
													coll2: false,
													coll3: false,
													coll4: false,
												})
											);
											localStorage.setItem('Colors', JSON.stringify([]));
											localStorage.setItem('Query', JSON.stringify(query));
										}}
										src='https://i.ibb.co/CtXQJ85/tinywow-JKGF5937-4878074.png'
										className='object-contain mt-1
								duration-1000 hover:rotate-45 hover:scale-150 
							'
									/>
								</Link>
							</div>
						</div>
						<div className='w-full flex flex-col justify-center'>
							<div className='w-4/5 lg:w-1/2'>
								<span className='text-slate-300 text-xs lg:text-base'>
									Flowers
								</span>
								<Link to='/home'>
									<img
										onClick={() => {
											const query = '?collection2=Flowers&stock=true';
											dispatch(getFilteredData(query));
											localStorage.setItem(
												'Filter',
												JSON.stringify({
													usedFilter: false,
													onStock: true,
													coll1: false,
													coll2: true,
													coll3: false,
													coll4: false,
												})
											);
											localStorage.setItem('Colors', JSON.stringify([]));
											localStorage.setItem('Query', JSON.stringify(query));
										}}
										src='https://i.ibb.co/YpzN1m0/tinywow-IMG-E2967-4878085.png'
										className='object-contain mt-1
								duration-1000 hover:rotate-45 hover:scale-150 
							'
									/>
								</Link>
							</div>
						</div>
						<div className='w-full flex flex-col justify-center items-end'>
							<div className='w-4/5 lg:w-1/2'>
								<span className='text-slate-300 text-xs lg:text-base'>
									Butterflies
								</span>
								<Link to='/home'>
									<img
										onClick={() => {
											const query = '?collection3=Butterflies&stock=true';
											dispatch(getFilteredData(query));
											localStorage.setItem(
												'Filter',
												JSON.stringify({
													usedFilter: false,
													onStock: true,
													coll1: false,
													coll2: false,
													coll3: true,
													coll4: false,
												})
											);
											localStorage.setItem('Colors', JSON.stringify([]));
											localStorage.setItem('Query', JSON.stringify(query));
										}}
										src='https://i.ibb.co/fS9Hhct/IMG-E6377.png'
										className='object-contain mt-1
								duration-1000 hover:rotate-45 hover:scale-150 
							'
									/>
								</Link>
							</div>
						</div>
						<div className='w-full flex flex-col justify-center items-end '>
							<div className='w-4/5 lg:w-1/2'>
								<span className='text-slate-300 text-xs lg:text-base'>
									Other
								</span>
								<Link to='/home'>
									<img
										onClick={() => {
											const query = '?collection4=Other&stock=true';
											dispatch(getFilteredData(query));
											localStorage.setItem(
												'Filter',
												JSON.stringify({
													usedFilter: false,
													onStock: true,
													coll1: false,
													coll2: false,
													coll3: false,
													coll4: true,
												})
											);
											localStorage.setItem('Colors', JSON.stringify([]));
											localStorage.setItem('Query', JSON.stringify(query));
										}}
										src='https://i.ibb.co/Zm4NwTb/tinywow-IMG-1367-4878105.png'
										className='object-contain mt-1
								duration-1000 hover:rotate-45 hover:scale-150 
							'
									/>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* SECTION 4 */}
			<section
				className='w-screen h-[calc(100vh-6rem)]  bg-neutral-900 text-white 
			
			'
			>
				<div
					className='w-screen h-1/3 flex items-center justify-center 
				bg-[url("https://i.ibb.co/T0K0TPt/lucas-kapla-w-QLAGv4-OYs-unsplash.jpg")]
				bg-center bg-no-repeat bg-cover	bg-fixed			'
				>
					<div className='w-4/5 h-4/5 flex flex-col items-center justify-evenly z-10'>
						<div className='hidden lg:block mx-auto'>
							<span className='w-20 h-20 flex items-center justify-center border-2 rounded-full bg-gradient-to-b from-black to-blue-900 '>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth='1.5'
									stroke='currentColor'
									className='w-14 h-14'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
									/>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
									/>
								</svg>
							</span>
						</div>
						<span className='text-center text-2xl lg:text-5xl'>
							Let Your Senses Be Your Guide
						</span>
						<p className='text-center text-xs lg:text-base'>
							Colors are mixed togheter to create the most marvlus pieces that
							you will be able to enjoy every day in your table. This is called
							Functional Art.
						</p>
					</div>
				</div>
				<div className='container max-w-5xl mt-20'>
					<div className='mx-auto w-3/4 text-center lg:text-5xl font-light'>
						Subscribe and Get 15% Off Your First Purchase
					</div>
					<div className='h-52 lg:px-10'>
						<span className='text-xs lg:text-base'>Email *</span>
						<div
							className='flex flex-col items-center justify-center
							lg:flex-row lg:justify-start
							'
						>
							<input
								id='btn-subscribe'
								type='text'
								placeholder='Sign up here'
								className='w-full p-4 rounded-full mt-4 text-black border
								lg:p-4
								'
							/>
							<button
								className='btn btn-purple hover:btn-purple mt-4 z-10 lg:-ml-36'
								onClick={subscribe}
							>
								Subscribe
							</button>
						</div>
						<div
							id='tx-submitting'
							className='hidden text-center text-sm mt-4 text-green-400'
						>
							Thanks for submitting!
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<section className='w-screen bg-neutral-900 text-white text-xs pt-12'>
				<div className='container'>
					<div
						className='h-40 gap-20 
					lg:grid lg:grid-cols-2 lg:p-5
					'
					>
						<div className='flex items-center gap-10 text-center justify-between'>
							<span>
								<i className='bi bi-instagram text-myRed'></i> Instagram
							</span>
							<span>
								<i className='bi bi-facebook text-blue-500'></i> Facebook
							</span>
							<span>
								<i className='bi bi-tiktok text-cyan-300'></i> TikTok
							</span>
							<span>
								<i className='bi bi-whatsapp text-green-500'></i> Whatsapp
							</span>
						</div>
						<div className='mx-auto flex  text-center items-center gap-10 mt-8 justify-between lg:mt-0'>
							<span>Terms & Conditions</span>
							<span>Shipping & Returns</span>
							<span>Privacy Policy</span>
						</div>
					</div>
					<hr className='w-3/4 mx-auto ' />
					<div
						className='h-[100px] flex flex-col
					lg:flex-row
					'
					>
						<span className='mx-auto my-auto'>
							© 2023 Cakes&Bases - + 51 318-409-51-80
						</span>
						<span className='mx-auto my-auto'>
							<img
								alt='Credit Card Logos'
								title='Credit Card Logos'
								src='http://www.credit-card-logos.com/images/multiple_credit-card-logos-1/credit_card_logos_12.gif'
								width='150'
								height='10'
								border='0'
							/>
						</span>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Landing;
