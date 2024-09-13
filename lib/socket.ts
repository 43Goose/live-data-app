'use client';

import io from 'socket.io-client';

const port = process.env.PORT || 3000;
const url = process.env.NODE_ENV === 'production' ? 'https://footprint-v3w8.onrender.com' : `http://localhost:${port}`;

export const socket = io(url);