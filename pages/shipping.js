import { Button } from '@mui/material';
import { useRouter } from 'next/router';

export default function Shipping() {
  const router = useRouter();

  const loginHandler = () => router.push('/login');

  return <Button onClick={loginHandler}>Login</Button>;
}
