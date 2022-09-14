import Gonzalo from '../components/Developers/Gonzalo';
import Juancho from '../components/Developers/Juancho';
import Eugenia from '../components/Developers/Eugenia';

const Developers = () => {
	return (
		<div
			className='container grid grid-cols-1 gap-1
				md:grid-cols-2 xl:grid-cols-3 '
		>
			<Gonzalo />
			<Juancho />
			<Eugenia />
		</div>
	);
};

export default Developers;
