import io from 'socket.io-client';

export const initSocket = () => {
  return io(process.env.NEXT_PUBLIC_SOCKET_URL, {
    auth: { token: localStorage.getItem('token') }
  });
};