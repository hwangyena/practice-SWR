import useSWR from 'swr';

const User = () => {
  const { data: user } = useSWR<User>('/user');

  return (
    <div>
      <h3>User</h3>
      <ul>
        <li>이름 : {user?.name}</li>
        <li>나이 : {user?.age}</li>
        <li>활동 상태: {user?.active ? '✅' : '❌'}</li>
      </ul>
    </div>
  );
};

export default User;
