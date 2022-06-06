import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { Store } from '../utils/Store';

export default function Shipping() {
  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    }
  }, [userInfo]);

  return <div>Shipping</div>;
}
