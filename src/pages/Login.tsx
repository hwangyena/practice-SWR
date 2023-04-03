import { Button, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { isErrorResponse } from '../apis';
import { login } from '../apis/auth';

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!id || !password) {
      setError('아이디, 비밀번호를 입력해주세요.');
      return;
    }

    const res = await login({ id, password });

    console.log('res', res);
    if (isErrorResponse(res)) {
      setError(res.message);
      return;
    }

    navigate('/');
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        placeItems: 'center',
        flexDirection: 'column',
        gap: '10px',
        height: '100vh',
        width: '30%',
      }}
    >
      <Typography variant='h3'>LOGIN</Typography>
      <TextField
        required
        value={id}
        onChange={(e) => setId(e.target.value)}
        label='Id'
        color='success'
        size='medium'
        fullWidth
        error={!!error}
      />
      <TextField
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label='Password'
        color='success'
        size='medium'
        fullWidth
        error={!!error}
        helperText={error ?? ''}
      />
      <Button
        variant='contained'
        color='success'
        size='large'
        onClick={handleLogin}
      >
        로그인
      </Button>
    </Container>
  );
}
