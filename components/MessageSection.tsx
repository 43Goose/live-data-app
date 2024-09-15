'use client';
import message from '@/lib/types'
import React, { useEffect, useRef, useState } from 'react'
import Message from './ui/Message';
import { getMessages } from '@/lib/actions/db-actions';
import { socket } from '@/lib/socket';
import { Button } from './ui/button';

export default function MessageSection() {
    const [messages, setMessages] = useState<message[]>([]);

    useEffect(() => {
        // load initial messages
        async function loadMessages() {
            const initMessages = await getMessages();
            setMessages(initMessages);
        }

        // Listen for new messages
        socket.on('chat message', (message) => {
            setMessages((cur) => [JSON.parse(message), ...cur]);
        });

        loadMessages();
    }, []);

    const loadMoreMessage = async () => {
        // load more messages if available when button is pressed
        const newMessages = await getMessages(messages.length);
        setMessages([...messages, ...newMessages]);
    }

    return (
        <div className='relative w-full flex flex-col items-center gap-8 p-12 pb-52 md:pb-36'>
            {messages.map((m, i) => (
                <Message key={i} messageData={m} />
            ))}
            <Button
                className='active:scale-95'
                onClick={loadMoreMessage}
            >Load More</Button>
        </div>
    )
}
