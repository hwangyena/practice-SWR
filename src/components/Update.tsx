import { useState } from 'react';
import useSWRMutation from 'swr/mutation';

const updateUser = (
  url: string,
  { arg }: { arg: { name: string; age: number } }
) =>
  fetch(url, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),
  });

const Update = () => {
  const [name, setName] = useState('name');
  const [age, setAge] = useState(25);

  const { data, trigger } = useSWRMutation('/user', updateUser, {
    populateCache: (updatedUser, currentUser) => {
      console.log('updatedUser', updatedUser);
      console.log('currentUser', currentUser);
      return updatedUser;
    },
  });

  console.log('data', data);

  const handleUpdate = () => {
    trigger({ name, age });
  };

  return (
    <div>
      <h3>Update</h3>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        type='number'
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
      />
      <br />

      <button onClick={handleUpdate}>Update!</button>
    </div>
  );
};

export default Update;
