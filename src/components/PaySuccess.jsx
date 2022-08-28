import { useEffect } from "react";
import { Link } from "react-router-dom";
const PaySuccess = () => {
	useEffect(()=>console.log("hola"), [])
		
	

	return (
		<div>
			<Link to="/home">
			<button>go back home</button>
			
			</Link>
			
		</div>
	);
};
export default PaySuccess;