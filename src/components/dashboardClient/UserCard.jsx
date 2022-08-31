/* eslint-disable react/prop-types */
/* eslint-disable no-undef */

import { Link } from 'react-router-dom';

export default function UserCard(props){
  const { id, firstName } = props;
  return (
    <div className="w-auto h-auto mx-auto">
      <Link to={`/${id}/user/menu`}>
        <h3 className="text-white">{id} {firstName}</h3>
      </Link>
    </div>
  );
};