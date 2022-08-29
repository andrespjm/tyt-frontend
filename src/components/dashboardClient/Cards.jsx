/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import UserCard from './UserCard';

export default function Cards({ redUser }) {
  return (
    <div className="container">
      {redUser?.map((u, b) => {
        return (
          <div key={b}>
            <UserCard
              id={u.id}
              firstName={u.firstName}
            />
          </div>
        )
      })}
    </div>
  );
};