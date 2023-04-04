import axios from 'axios';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export const useUser = () => {
  return useSWR<Profile>('/user');
};

export const useUserMutation = () => {
  const updateUser = (url: string, { arg }: { arg: Profile }) =>
    axios.put(url, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(arg),
    });

  return useSWRMutation('/user', updateUser, {
    populateCache: (updatedUser) => {
      return updatedUser.data;
    }, // optimisticData 사용 시, 굳이 써줄 필요는 없다
    revalidate: false, // 동일한 key mutate
  });
};
