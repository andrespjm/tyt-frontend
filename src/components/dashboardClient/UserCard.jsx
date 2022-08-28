/* eslint-disable react/prop-types */
/* eslint-disable no-undef */

import { Link } from 'react-router-dom';

export default function UserCard(props){
  const { id, name } = props;
  return (
    <div className="w-8 h-6 mx-auto">
      <Link to={`/user/main/${id}`}>
        <h3>{id}{name}</h3>
      </Link>
    </div>
  );
};