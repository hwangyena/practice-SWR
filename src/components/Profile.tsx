import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Snackbar,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useUser, useUserMutation } from '../apis/user';
import ProfileUpdate from './ProfileUpdate';

const Profile = () => {
  const [open, setOpen] = useState(false);

  const { data: user } = useUser();
  const { data, trigger: onUpdateUser, reset } = useUserMutation();
  console.log('user', user);

  const onToggle = () => {
    setOpen((p) => !p);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      reset();
    }, 2000);

    return () => clearTimeout(timer);
  }, [data]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Card sx={{ width: 350 }}>
        <CardMedia
          sx={{ height: 140 }}
          image='/images/quokka.jpeg'
          title='green iguana'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {user.name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {user.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between' }}>
          <Chip
            color={user.active ? 'success' : 'default'}
            label={user.active ? '활동 중' : '자리 비움'}
            variant='filled'
          />
          <Button size='small' color='success' onClick={onToggle}>
            Update
          </Button>
        </CardActions>
      </Card>
      <ProfileUpdate {...{ onClose: onToggle, open, onUpdateUser }} />
      <Snackbar
        message='업데이트 되었습니다.'
        open={!!data}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
};

export default Profile;
