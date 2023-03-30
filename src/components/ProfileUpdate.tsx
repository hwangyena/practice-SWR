import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from '@mui/material';
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

type Props = {
  open: boolean;
  onClose: () => void;
};

const ProfileUpdate = ({ onClose, open }: Props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [age, setAge] = useState(25);

  const { data, trigger } = useSWRMutation('/user', updateUser, {
    populateCache: (updatedUser, currentUser) => {
      console.log('updatedUser', updatedUser);
      console.log('currentUser', currentUser);
      return updatedUser;
    },
  });

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Profile Update</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: '300px',
          gap: '10px',
          marginTop: '30px',
        }}
      >
        <TextField
          variant='standard'
          label='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          variant='standard'
          label='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormGroup sx={{ width: 'fit-content' }}>
          <FormControlLabel
            control={<Switch defaultChecked color='success' />}
            label='active'
          />
        </FormGroup>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button color='success' variant='text' onClick={onClose}>
          cancel
        </Button>
        <Button color='success' variant='contained' onClick={onClose}>
          save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileUpdate;
