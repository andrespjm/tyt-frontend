import Gonzalo from '../components/Developers/Gonzalo';
import Juancho from '../components/Developers/Juancho';
import Eugenia from '../components/Developers/Eugenia';
import Omar from '../components/Developers/Omar';

const Developers = () => {
	return (
		<div className='flex gap-10'>
			<Gonzalo />
			<Juancho />
			<Eugenia />
			<Omar/>
		</div>
	);
};

export default Developers;
