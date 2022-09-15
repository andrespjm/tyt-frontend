import './Developers.css';

const Edwin = () => {
	const buttons = document.querySelectorAll('.edwin-card-buttons button');
	const sections = document.querySelectorAll('.edwin-card-section');
	const card = document.querySelector('#edwin');

	const handleButtonClick = e => {
		const targetSection = e.target.getAttribute('data-section');
		const section = document.querySelector(targetSection);
		targetSection !== '#edwin-about'
			? card.classList.add('is-active')
			: card.classList.remove('is-active');
		card.setAttribute('data-state', targetSection);
		sections.forEach(s => s.classList.remove('is-active'));
		buttons.forEach(b => b.classList.remove('is-active'));
		e.target.classList.add('is-active');
		section.classList.add('is-active');
	};

	return (
		<div className='container p-20'>
			<div id='edwin' className='card' data-state='#edwin-about'>
				<div className='card-header'>
					<div
						className='card-cover'
						style={{
							backgroundImage:
								"url('https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')",
						}}
					></div>
					<img
						className='card-avatar'
						src='https://res.cloudinary.com/dyqwtxenu/image/upload/v1663269055/Me/photo_4976627796591880789_y_ajntun.jpg'
						alt='avatar'
					/>
					<h1 className='card-fullname mb-3'>Edwin Salazar</h1>
					<h2 className='card-jobtitle'>Full Stack Developer</h2>
				</div>
				<div className='card-main'>
					<div
						className='edwin-card-section card-section is-active'
						id='edwin-about'
					>
						<div className='card-content'>
							<div className='card-subtitle'>ABOUT</div>
							<p className='card-desc'>
								Full Stack Development | Back-end Developer. <br />
								<p style={{ textAlign: 'center' }}>
									<b>{'loveOfCode && The code compiles'}</b>
								</p>
							</p>
						</div>
						<div className='card-social'>
							<a href='' target='_blank' rel='noreferrer'>
								<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
									<path d='M15.997 3.985h2.191V.169C17.81.117 16.51 0 14.996 0c-3.159 0-5.323 1.987-5.323 5.639V9H6.187v4.266h3.486V24h4.274V13.267h3.345l.531-4.266h-3.877V6.062c.001-1.233.333-2.077 2.051-2.077z' />
								</svg>
							</a>
							<a href='' target='_blank' rel='noreferrer'>
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
									<path d='M512 97.248c-19.04 8.352-39.328 13.888-60.48 16.576 21.76-12.992 38.368-33.408 46.176-58.016-20.288 12.096-42.688 20.64-66.56 25.408C411.872 60.704 384.416 48 354.464 48c-58.112 0-104.896 47.168-104.896 104.992 0 8.32.704 16.32 2.432 23.936-87.264-4.256-164.48-46.08-216.352-109.792-9.056 15.712-14.368 33.696-14.368 53.056 0 36.352 18.72 68.576 46.624 87.232-16.864-.32-33.408-5.216-47.424-12.928v1.152c0 51.008 36.384 93.376 84.096 103.136-8.544 2.336-17.856 3.456-27.52 3.456-6.72 0-13.504-.384-19.872-1.792 13.6 41.568 52.192 72.128 98.08 73.12-35.712 27.936-81.056 44.768-130.144 44.768-8.608 0-16.864-.384-25.12-1.44C46.496 446.88 101.6 464 161.024 464c193.152 0 298.752-160 298.752-298.688 0-4.64-.16-9.12-.384-13.568 20.832-14.784 38.336-33.248 52.608-54.496z' />
								</svg>
							</a>
							<a
								href='https://github.com/andrespjm'
								target='_blank'
								rel='noreferrer'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='16'
									height='16'
									fill='currentColor'
									viewBox='0 0 16 16'
								>
									<path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
								</svg>
							</a>
							<a
								href='https://www.linkedin.com/in/edwinsalazarjm/'
								target='_blank'
								rel='noreferrer'
							>
								<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
									<path d='M23.994 24v-.001H24v-8.802c0-4.306-.927-7.623-5.961-7.623-2.42 0-4.044 1.328-4.707 2.587h-.07V7.976H8.489v16.023h4.97v-7.934c0-2.089.396-4.109 2.983-4.109 2.549 0 2.587 2.384 2.587 4.243V24zM.396 7.977h4.976V24H.396zM2.882 0C1.291 0 0 1.291 0 2.882s1.291 2.909 2.882 2.909 2.882-1.318 2.882-2.909A2.884 2.884 0 002.882 0z' />
								</svg>
							</a>
						</div>
					</div>
					<div
						className='edwin-card-section card-section'
						id='edwin-experience'
					>
						<div className='card-content'>
							<div className='card-subtitle'>WORK EXPERIENCE</div>
							<div className='card-timeline'>
								<div className='card-item' data-year='2015'>
									<div className='card-item-title'>Computer maintenance</div>
									<div className='card-item-desc'>QUIMSERTEK S.A.</div>
								</div>
								<div className='card-item' data-year='2016'>
									<div className='card-item-title'>Web Development</div>
									<div className='card-item-desc'>Freelancer</div>
								</div>
								<div className='card-item' data-year='2020'>
									<div className='card-item-title'>Advertising design</div>
									<div className='card-item-desc'>RP QUÍMICOS</div>
								</div>
								<div className='card-item' data-year='2022'>
									<div className='card-item-title'>
										Bootcamp <span>Henry</span>
									</div>
									<div className='card-item-desc'>
										Full Stack Web Developer.
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='edwin-card-section card-section' id='edwin-contact'>
						<div className='card-content'>
							<div className='card-subtitle'>CONTACT</div>
							<div className='card-contact-wrapper'>
								<div className='card-contact'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z' />
										<circle cx='12' cy='10' r='3' />
									</svg>
									Quito, Ecuador
								</div>
								<div className='card-contact'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<path d='M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z' />
									</svg>
									+593 992 934 903
								</div>
								<div className='card-contact'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									>
										<path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
										<path d='M22 6l-10 7L2 6' />
									</svg>
									easpjm@hotmail.com
								</div>
								<button className='contact-me'>WORK TOGETHER</button>
							</div>
						</div>
					</div>
					<div
						className='edwin-card-buttons card-buttons'
						onClick={handleButtonClick}
					>
						<button data-section='#edwin-about' className='is-active'>
							ABOUT
						</button>
						<button data-section='#edwin-experience'>EXPERIENCE</button>
						<button data-section='#edwin-contact'>CONTACT</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Edwin;
