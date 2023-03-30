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
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { SWRMutationConfiguration } from 'swr/mutation';
import { useUser } from '../apis/user';

type Props = {
  open: boolean;
  onClose: () => void;
  onUpdateUser: (
    arg: Profile,
    options?: SWRMutationConfiguration<AxiosResponse<unknown, unknown>, unknown>
  ) => void;
};

const ProfileUpdate = ({ onClose, open, onUpdateUser }: Props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [active, setActive] = useState(true);

  const { data: user } = useUser();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setDescription(user.description);
      setActive(user.active);
    }
  }, [user]);

  const handleUpdate = () => {
    onUpdateUser(
      { name, description, active },
      { optimisticData: { name, description, active } }
    );
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Profile Update</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: '400px',
          gap: '10px',
          marginTop: '30px',
        }}
      >
        <TextField
          variant='standard'
          color='success'
          label='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          variant='standard'
          label='description'
          color='success'
          multiline
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormGroup sx={{ width: 'fit-content' }}>
          <FormControlLabel
            control={
              <Switch
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                color='success'
              />
            }
            label='active'
          />
        </FormGroup>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button color='success' variant='text' onClick={onClose}>
          cancel
        </Button>
        <Button color='success' variant='contained' onClick={handleUpdate}>
          save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileUpdate;
