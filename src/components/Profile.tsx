import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import useSWR from 'swr';
import ProfileUpdate from './ProfileUpdate';

const Profile = () => {
  const { data: user } = useSWR<Profile>('/user');

  const [open, setOpen] = useState(false);

  const onToggle = () => {
    setOpen((p) => !p);
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
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
      <ProfileUpdate {...{ onClose: onToggle, open }} />
    </>
  );
};

export default Profile;
