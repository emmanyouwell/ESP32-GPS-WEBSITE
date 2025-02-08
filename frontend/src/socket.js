import {io} from 'socket.io-client'

const socket = io.connect(import.meta.env.VITE_SERVER || 'http://localhost:4001');

export default socket;