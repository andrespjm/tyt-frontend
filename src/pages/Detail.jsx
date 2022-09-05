import './Detail.css';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { setLoading } from '../redux/actions';
import { ShoppingCartContext } from '../context/ShoppingCartContext';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';
import { Loader } from '../components/Loader';
import { useAuth } from '../context/AuthContext';

function Detail() {
	const { id } = useParams();
	const [product, setProduct] = useState({});
	const [open, setOpen] = useState(false);
	const [quantityAvailable, setquantityAvailable] = useState(false);
	const [rating, setRating] = useState(0);
	const [reviews, setReviews] = useState(0);
	const [favorites, setFavorites] = useState('');
	const history = useHistory();
	const dispatch = useDispatch();
	// const { loading } = useSelector(state => state);
	const { user } = useAuth();
	// const { redLoading } = useSelector(state => state);
	const [cart, setCart] = useContext(ShoppingCartContext);
	const [state] = useState({
		vertical: 'top',
		horizontal: 'center',
	});

	const { vertical, horizontal } = state;

	// adding state to use loader component
	const [loader, setLoader] = useState(false);

	console.log('loader before', loader);

	useEffect(() => {
		setLoader(true);
		async function fetchData() {
			try {
				dispatch(setLoading(true));
				const response = await axios.get(`/products/${id}`);
				setProduct(response.data);
				dispatch(setLoading(false));

				const rating = await axios(`/review/score/${id}`).then(res => res.data);
				setRating(rating.averageScore);
				setReviews(rating.numberRevisions);
			} catch (error) {
				alert(error);
			}
		}
		fetchData();
	}, [dispatch, id, rating]);

	const addToCart = () => {
		const selection = {
			name: product.name,
			designId: product.id,
			prodImageHome: product.img_home.secure_url,
			prodType:
				product.ProductTypes[document.querySelector('.detail-4').id].name,
			stockId:
				product.ProductTypes[document.querySelector('.detail-4').id].Stocks.id,
			price:
				product.ProductTypes[document.querySelector('.detail-4').id].Stocks
					.priceST,
			quantity: parseInt(document.querySelector('#quantity').value),
			stockQuantity: parseInt(
				product.ProductTypes[document.querySelector('.detail-4').id].Stocks
					.quantityST
			),
		};

		const stock =
			product.ProductTypes[document.querySelector('.detail-4').id].Stocks
				.quantityST;
		console.log(cart);

		const cart2 = [...cart];

		const alreadySelected = cart2.find(e => e.stockId === selection.stockId);

		if (alreadySelected) {
			if (alreadySelected.quantity + selection.quantity > stock) {
				// alert(`Stock available is only  ${stock} units`)
				setquantityAvailable(true);
			} else {
				setOpen(true);
			}
			alreadySelected.quantity =
				alreadySelected.quantity + selection.quantity > stock
					? stock
					: alreadySelected.quantity + selection.quantity;

			setCart(cart2);
		} else {
			setCart([...cart, selection]);
			setOpen(true);
		}
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
		setquantityAvailable(false);
	};
	const handleFavourite = async e => {
		if (!user) {
			history.push('/signin');
		} else {
			const information = {
				userid: user.uid,
				productid: id,
			};
			console.log(information);
			const resp = await axios.put(`/favorites`, information);
			console.log(resp.data);
			const statusFavorite = await axios
				.put(`/favorites/status`, information)
				.then(res => res.data);
			setFavorites(statusFavorite);
		}
	};

	const action = (
		<>
			<Button color='secondary' size='small' onClick={handleClose}>
				{/* UNDO */}
			</Button>
			<IconButton
				size='small'
				aria-label='close'
				color='inherit'
				onClick={handleClose}
			>
				<CloseIcon fontSize='small' />
			</IconButton>
		</>
	);

	if (!product.id) return <Loader />;

	const handleClick = e => {
		const miClassDiv = e.target.className.slice(0, 5);
		if (miClassDiv === 'dt4-1') {
			document.querySelector('.dt4-1').className = 'dt4-1 selected';
			document.querySelector('.dt4-2').className = 'dt4-2';
			document.querySelector(
				'.dt1-price'
			).innerHTML = ` Price: $ ${product.ProductTypes[0].Stocks.priceST}`;
			document.querySelector('#detail-5').innerHTML =
				product.ProductTypes[0].Stocks.quantityST;
			document.querySelector(
				'#detail-7'
			).value = `${product.ProductTypes[0].Stocks.quantityST}`;
			document.querySelector('.detail-4').id = 0;
			document.querySelector(
				'#quantity'
			).max = `${product.ProductTypes[0].Stocks.quantityST}`;
			document.querySelector('#quantity').value = 1;
		} else {
			document.querySelector('.dt4-1').className = 'dt4-1';
			document.querySelector('.dt4-2').className = 'dt4-2 selected';
			document.querySelector(
				'.dt1-price'
			).innerHTML = ` Price: $ ${product.ProductTypes[1].Stocks.priceST}`;
			document.querySelector('#detail-5').innerHTML =
				product.ProductTypes[1].Stocks.quantityST;
			document.querySelector(
				'#detail-7'
			).value = `${product.ProductTypes[1].Stocks.quantityST}`;
			document.querySelector('.detail-4').id = 1;
			document.querySelector(
				'#quantity'
			).max = `${product.ProductTypes[1].Stocks.quantityST}`;
			document.querySelector('#quantity').value = 1;
		}

		// document.getElementsByClassName(miClassDiv).classList.toggle('selected');
	};
	// console.log('loader after', loader);

	return (
		<div
			className='w-screen select-none -z-10
			 flex flex-col items-center text-white h-screen bg-gradient-to-b from-black via-gray-600 to-base-900'
		>
			{loader && <Loader />}
			<div className='detail-content'>
				{/* LEFT COLUMN */}
				<div className='detail-content-left'>
					{/* Bootstrap Carousel */}
					<div
						id='carouselExampleIndicators'
						className='carousel slide'
						data-bs-ride='true'
					>
						<div className='carousel-indicators'>
							{product?.img_detail.map((im, i) => (
								<button
									key={i}
									type='button'
									data-bs-target='#carouselExampleIndicators'
									data-bs-slide-to={i}
									className={`${i === 0 ? 'active' : ''}`}
									aria-current={`${i === 0 ? 'true' : ''}`}
									aria-label={`Slide ${i + 1}`}
								></button>
							))}
						</div>
						<div className='carousel-inner'>
							{product.img_detail.map((im, i) => (
								<div
									key={i}
									className={i === 0 ? 'carousel-item active' : 'carousel-item'}
								>
									<div
										style={{
											backgroundImage: `url(${im.secure_url})`,
										}}
										className='det-img d-block w-100'
										alt='...'
									/>
								</div>
							))}
						</div>
						<button
							className='carousel-control-prev'
							type='button'
							data-bs-target='#carouselExampleIndicators'
							data-bs-slide='prev'
						>
							<span
								className='carousel-control-prev-icon'
								aria-hidden='true'
							></span>
							<span className='visually-hidden'>Previous</span>
						</button>
						<button
							className='carousel-control-next'
							type='button'
							data-bs-target='#carouselExampleIndicators'
							data-bs-slide='next'
						>
							<span
								className='carousel-control-next-icon'
								aria-hidden='true'
							></span>
							<span className='visually-hidden'>Next</span>
						</button>
					</div>
				</div>

				{/* RIGHT COLUMN */}
				<div className='w-[400px]'>
					<div className='detail-1'>
						<div className='dt1-ref'>Ref-{product.id}</div>
						<div className='flex'>
							<span className='dt1-name'>{product.name}</span>
							<span onClick={handleFavourite}>
								<i
									className={`text-2xl ml-6 cursor-pointer
															${
																favorites === 'Remove from my favorites'
																	? 'bi bi-heart-fill text-myRed'
																	: 'bi bi-heart text-gray-500'
															}
								 `}
								></i>
							</span>
						</div>
						<span className='text-blue-400'>Painted by: {product.artist}</span>
						<div className='dt1-price mt-4 text-xl'>
							Price: U$ {product.ProductTypes[0].Stocks.priceST}
						</div>
					</div>


					{rating !== 'NaN' ? (
						<div className='detail-2'>
							<span>{rating}</span>
							<Rating rating={rating} />
							<Link to={`/reviews/${id}`}>
								<span className='dt2-3'>{`see all ${reviews} reviews`}</span>
							</Link>
						</div>
					) : (
						<p />
					)}

					<div className='detail-3'>
						<span>Colours</span>

						<div className='dt3'>
							<div
								className='dt3-1'
								style={{
									backgroundColor: `${product.Colors[0].hex}`,
									border: `2px solid ${product.Colors[0].hex}`,
								}}
							></div>
							<div
								className='dt3-2'
								style={{
									backgroundColor: `${product.Colors[1].hex}`,
									border: `2px solid ${product.Colors[1].hex}`,
								}}
							></div>
							<div
								className='dt3-3'
								style={{
									backgroundColor: `${product.Colors[2].hex}`,
									border: `2px solid ${product.Colors[2].hex}`,
								}}
							></div>
						</div>
					</div>
					<div className='detail-4 mt-4' id={0}>
						<span>Type</span>
						<div className='dt4'>
							<div className='dt4-1 selected' onClick={handleClick}>
								<p className='dt4-1-p1'>{product.ProductTypes[0].name}</p>
								<p className='dt4-1-p2'>{`${product.ProductTypes[0].diameter} cm`}</p>
							</div>
							<div className='dt4-2' onClick={handleClick}>
								<p className='dt4-2-p1'>{product.ProductTypes[1].name}</p>
								<p className='dt4-2-p2'>{`${product.ProductTypes[1].diameter} cm`}</p>
							</div>
						</div>
					</div>
					<div className='mt-3'>
						<span>Stock: </span>
						<span id='detail-5' className='ml-2'>
							{product.ProductTypes[0].Stocks.quantityST}
						</span>
						<span> un</span>
					</div>

					<div className='mt-2 w-full flex items-center'>
						<span>Select quantity:</span>
						<div className='flex'>
							<i
								className='fa-solid  items-center fa-minus ml-4 mt-1 h-fit cursor-pointer'
								onClick={() =>
									document.querySelector('#quantity').value > 1 &&
									document.querySelector('#quantity').value--
								}
							></i>
							<div id='detail-7'>
								<input
									className='text-white text-center bg-transparent w-10 caret-transparent after
								'
									min='1'
									max={product.ProductTypes[0].Stocks.quantityST}
									readOnly
									type='number'
									id='quantity'
									value='1'
								/>
							</div>
							<i
								className='fa-solid fa-plus mt-1 h-fit cursor-pointer'
								onClick={() => {
									console.log(document.querySelector('#quantity').max);
									const max = Number(document.querySelector('#quantity').max);
									document.querySelector('#quantity').value < max &&
										document.querySelector('#quantity').value++;
								}}
							></i>
						</div>
					</div>

					<div className='detail-6 mt-4'>
						<div
							onClick={addToCart}
							className='dt6-1 btn btn-blue hover:btn-blue w-full mt-2'
						>
							add to bag
						</div>
						<div
							className={`dt6-2 btn text-white w-full mt-2
							${
								favorites === 'Remove from my favorites'
									? 'bg-orange-500 hover:bg-transparent hover:border-orange-500'
									: 'btn-purple hover:btn-purple'
							}
							`}
							onClick={handleFavourite}
						>
							{favorites}
						</div>
					</div>
				</div>
			</div>
			<button
				onClick={history.goBack}
				className='btn btn-red hover:btn-red w-32 mt-4'
			>
				back
			</button>
			<Snackbar
				anchorOrigin={{ vertical, horizontal }}
				open={open}
				autoHideDuration={6000}
				key={vertical + horizontal}
				message='Product added to Bag'
				action={action}
			>
				<Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
					Product added to Bag 🥰 !!
				</Alert>
			</Snackbar>
			<Snackbar
				open={quantityAvailable}
				autoHideDuration={3000}
				onClose={handleClose}
				message={`Products added to Bag limited to the maximum quantity of stock available`}
				action={action}
			/>
		</div>
	);
}

export default Detail;
