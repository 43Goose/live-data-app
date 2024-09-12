import message from '@/lib/types'
import React from 'react'

export default function Message({ messageData }: { messageData: message }) {
    const getDate = () => {
        const [month, day, year] = new Date(messageData.date).toString().slice(4, 15).split(' ');;
        const showYear = new Date(new Date().getFullYear(), 0, 1).valueOf() > messageData.date;
        return (`${month} ${showYear ? year : Number(day)}`);
    }

    return (
        <div className='w-full h-min max-w-lg p-6 bg-slate-800 border-slate-500 border-2 rounded-2xl'>
            <div className='w-full flex justify-between'>
                <h1 className='text-xl font-bold'>{messageData.author[1]}</h1>
                <h2 className='text-slate-400'>{getDate()}</h2>
            </div>
            <div className='w-full px-4 my-3'>
                <div className='w-full h-0.5 bg-slate-500' />
            </div>
            <div className='w-full'>
                <p>{messageData.content}</p>
            </div>
        </div>
    )
}
