
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
     
        const newSocket = io(import.meta.env.VITE_BASE_URL, {
            withCredentials: true,
            transports: ['websocket', 'polling'], 
        });

        setSocket(newSocket);

      
        newSocket.on('connect', () => {
            console.log('Connected to server with ID:', newSocket.id);
            setIsConnected(true);
        });

        newSocket.on('disconnect', (reason) => {
            console.log('Disconnected from server:', reason);
            setIsConnected(false);
        });

        newSocket.on('connect_error', (error) => {
            console.error('Connection error:', error);
            setIsConnected(false);
        });

       
        return () => {
            console.log('Cleaning up socket connection');
            newSocket.close();
        };
    }, []);

   
    const joinRoom = (userId, userType) => {
        if (socket && isConnected) {
            socket.emit('join', { userId, userType });
            console.log(`Joined as ${userType} with ID: ${userId}`);
        }
    };

  
    const updateCaptainLocation = (userId, location) => {
        if (socket && isConnected) {
            socket.emit('update-location-captain', { userId, location });
        }
    };

    const value = {
        socket,
        isConnected,
        joinRoom,
        updateCaptainLocation
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};

export default SocketProvider;