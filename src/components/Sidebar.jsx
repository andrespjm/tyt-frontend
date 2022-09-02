import { Alert, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getColors,
	getData,
	getFilteredData,
	setErrorFilter,
} from '../redux/actions';

const Sidebar = () => {
	const dispatch = useDispatch();
	const { redColors, redErrorFilter } = useSelector(state => state);
	const [queryColors, setQueryColors] = useState([]);
	const [filter, setFilter] = useState({
		onStock: true,
		coll1: true,
		coll2: true,
		coll3: true,
		coll4: true,
	});
	const [state] = useState({
		vertical: 'top',
		horizontal: 'center',
	});

	const { vertical, horizontal } = state;

	useEffect(() => {
		if (localStorage.getItem('Filter')) {
			setFilter(JSON.parse(localStorage.getItem('Filter')));
			const sidebar = document.querySelector('#sidebar');
			sidebar.classList[0] === 'hidden' && toogleSidebar();
		}
		if (localStorage.getItem('Colors')) {
			setQueryColors(JSON.parse(localStorage.getItem('Colors')));
			updateSwitchColors();
		}
	}, []);

	const toogleSidebar = () =>
		document.querySelector('#sidebar').classList.toggle('hidden');

	const updateSwitchColors = () => {
		if (!queryColors.length) return;
		document.querySelectorAll('.mycolors').forEach(element => {
			if (queryColors.includes(element.name)) {
				element.checked = true;
				element.parentNode.style.backgroundColor = element.name;
			}
		});
	};

	const handleGetColors = () => {
		!redColors.length && dispatch(getColors());
		document.querySelector('#colors').classList.toggle('hidden');
		document.querySelector('#arr-clr').classList.toggle('rotate-180');
		updateSwitchColors();
	};

	const handleOnClickColors = e => {
		if (e.target.checked) {
			if (queryColors.length === 3) return;
			if (queryColors.length === 2)
				document.querySelectorAll('.mycolors').forEach(element => {
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
				document.querySelectorAll('.mycolors').forEach(element => {
					if (element.disabled) element.disabled = false;
				});
			setQueryColors(queryColors.filter(color => color !== e.target.name));
			e.target.parentNode.style.backgroundColor = '';
		}
	};

	const handleonClickFilter = e => {
		setFilter({ ...filter, [e.target.name]: e.target.checked });
	};

	const clearAll = () => {
		dispatch(getData());
		setFilter({
			usedFilter: false,
			onStock: true,
			coll1: true,
			coll2: true,
			coll3: true,
			coll4: true,
		});
		setQueryColors([]);
		document.querySelectorAll('.mycolors').forEach(e => {
			e.checked = false;
			e.parentNode.style.backgroundColor = '';
		});
		localStorage.removeItem('Filter');
		localStorage.removeItem('Colors');
		document.querySelectorAll('.mycolors').forEach(element => {
			if (element.disabled) element.disabled = false;
		});
		dispatch(setErrorFilter(false));
	};
	const queryString = () =>
		`?
	${queryColors[0] ? `color1=${queryColors[0]}&` : ''}
	${queryColors[1] ? `color2=${queryColors[1]}&` : ''}
	${queryColors[2] ? `color3=${queryColors[2]}&` : ''}
	${filter.coll1 ? `collection1=Abstract&` : ''}
	${filter.coll2 ? `collection2=Flowers&` : ''}
	${filter.coll3 ? `collection3=Butterflies&` : ''}
	${filter.coll4 ? `collection4=Other&` : ''}
	stock=${filter.onStock}
	`.replace(/\s/g, '');

	console.log(queryString());

	const makeQuery = () => {
		dispatch(getFilteredData(queryString()));
		localStorage.setItem('Filter', JSON.stringify(filter));
		localStorage.setItem('Colors', JSON.stringify(queryColors));
		localStorage.setItem('Query', JSON.stringify(queryString()));
	};

	return (
		<div>
			<div
				id='sidebar'
				className='hidden z-50 fixed top-0 bottom-0 p-2 w-[300px] overflow-y-auto text-center bg-[rgba(0,0,0,0.9)]
				'
			>
				{/* FILTER HEADER */}
				<div className='p-2.5 mt-4 flex items-center px-4 text-white text-2xl'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						className='w-6 h-6'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75'
						/>
					</svg>

					<div className='flex justify-between w-full items-center'>
						<h1 className='ml-4 text-gray-200'>Filter</h1>
						<span>
							<i className='bi bi-x cursor-pointer' onClick={toogleSidebar}></i>
						</span>
					</div>
				</div>
				<hr className='my-2 text-neutral-100' />
				{/* FILTER BUTTON */}
				<button
					className='p-2.5 mt-3 w-full rounded-md px-4 duration-300 cursor-pointer bg-blue-500 text-white'
					onClick={makeQuery}
				>
					Apply
				</button>
				{/* CLEAR FILTER */}
				<button
					className={`p-2.5 mt-3 w-full rounded-md px-4 duration-300 cursor-pointer bg-myRed text-white
					${!localStorage.getItem('Filter') && 'hidden'}
					`}
					onClick={clearAll}
				>
					Clear Filter
				</button>

				{/* ON STOCK */}
				<div
					className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'
					onClick={() => {
						document.querySelector('#onStock').classList.toggle('hidden');
						document.querySelector('#arr-sock').classList.toggle('rotate-180');
					}}
				>
					<i className='bi bi-chat-left-text-fill'></i>
					<div className='flex justify-between w-full items-center'>
						<span className='text-md ml-4 text-gray-200'>Avaibility</span>
						<span className='text-sm rotate-180' id='arr-sock'>
							<i className='bi bi-chevron-down'></i>
						</span>
					</div>
				</div>

				<div
					className='text-left text-sm font-thin mt-2 w-4/5 mx-auto text-gray-200'
					id='onStock'
				>
					<div className='form-check form-switch cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1 ml-10'>
						<input
							className='form-check-input appearance-none rounded-full   bg-gray-300 cursor-pointer'
							type='checkbox'
							role='switch'
							name='onStock'
							onClick={handleonClickFilter}
							defaultChecked={filter.onStock}
						/>
						<label
							className='form-check-label inline-block text-white'
							htmlFor='stock-switch'
						>
							On stock
						</label>
					</div>
				</div>

				{/* COLLECTION */}
				<div
					className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'
					onClick={() => {
						document.querySelector('#collection').classList.toggle('hidden');
						document.querySelector('#arr-coll').classList.toggle('rotate-180');
					}}
				>
					<i className='bi bi-chat-left-text-fill'></i>
					<div className='flex justify-between w-full items-center'>
						<span className='text-md ml-4 text-gray-200'>Collection</span>
						<span className='text-sm rotate-180' id='arr-coll'>
							<i className='bi bi-chevron-down'></i>
						</span>
					</div>
				</div>

				<div
					className='text-left text-sm font-thin mt-2 w-4/5 mx-auto text-gray-200'
					id='collection'
				>
					<div className='form-check form-switch cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1 ml-10'>
						<input
							className='form-check-input appearance-none rounded-full   bg-gray-300 cursor-pointer'
							type='checkbox'
							role='switch'
							name='coll1'
							checked={filter.coll1}
							onClick={handleonClickFilter}
							onChange={() => {}}
						/>
						<label
							className='form-check-label inline-block text-white'
							htmlFor='stock-switch'
						>
							Abstract
						</label>
					</div>
					<div className='form-check form-switch cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1 ml-10'>
						<input
							className='form-check-input appearance-none rounded-full   bg-gray-300 cursor-pointer'
							type='checkbox'
							role='switch'
							name='coll2'
							checked={filter.coll2}
							onClick={handleonClickFilter}
							onChange={() => {}}
						/>
						<label
							className='form-check-label inline-block text-white'
							htmlFor='stock-switch'
						>
							Flowers
						</label>
					</div>
					<div className='form-check form-switch cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1 ml-10'>
						<input
							className='form-check-input appearance-none rounded-full   bg-gray-300 cursor-pointer'
							type='checkbox'
							role='switch'
							name='coll3'
							checked={filter.coll3}
							onClick={handleonClickFilter}
							onChange={() => {}}
						/>
						<label
							className='form-check-label inline-block text-white'
							htmlFor='stock-switch'
						>
							Butterflies
						</label>
					</div>
					<div className='form-check form-switch cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1 ml-10'>
						<input
							className='form-check-input appearance-none rounded-full   bg-gray-300 cursor-pointer'
							type='checkbox'
							name='coll4'
							checked={filter.coll4}
							onClick={handleonClickFilter}
							onChange={() => {}}
						/>
						<label
							className='form-check-label inline-block text-white'
							htmlFor='stock-switch'
						>
							Other
						</label>
					</div>
				</div>

				{/* COLORS */}
				<div
					className='p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white'
					onClick={handleGetColors}
				>
					<i className='bi bi-chat-left-text-fill'></i>
					<div className='flex justify-between w-full items-center'>
						<span className='text-md ml-4 text-gray-200'>Colors</span>
						<span className='text-sm' id='arr-clr'>
							<i className='bi bi-chevron-down'></i>
						</span>
					</div>
				</div>

				<div
					className='hidden text-left text-sm font-thin mt-2 w-4/5 mx-auto text-white'
					id='colors'
				>
					{!redColors.length ? (
						<h1>Loading...</h1>
					) : (
						redColors.map(color => (
							<div
								key={color.id}
								className={`form-check form-switch cursor-pointer p-2 rounded-md mt-1 ml-10`}
							>
								<input
									className='mycolors form-check-input appearance-none rounded-full   bg-gray-300 cursor-pointer'
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
									className='form-check-label inline-block text-white '
									htmlFor='stock-switch'
								>
									{color.name}
								</label>
							</div>
						))
					)}
				</div>
			</div>
			<Snackbar
				anchorOrigin={{ vertical, horizontal }}
				open={redErrorFilter}
				autoHideDuration={6000}
				// onClose={() => dispatch(setErrorFilter(false))}
				key={vertical + horizontal}
			>
				<Alert
					onClose={() => dispatch(setErrorFilter(false))}
					severity='warning'
					sx={{ width: '100%' }}
				>
					We are sorry. No data found 😢 !!
				</Alert>
			</Snackbar>
		</div>
	);
};

export default Sidebar;
