import { useState } from 'react';

export default function EditProfile() {

  const [input, setInput] = useState({ // eslint-disable-line no-unused-vars
    firstName: '',
    lastName: '',
    password: '',
    city: '',
    country: '',
    homeAddress: '',
    phoneNumber: '',
    image: '',
  });

  return (
    <h1>Editar perfil</h1>
  )
};