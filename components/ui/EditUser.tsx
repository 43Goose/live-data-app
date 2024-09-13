'use client';
import React, { useState } from 'react'
import { Button } from './button'
import { InputWithLabel } from './InputWithLabel'
import { changeUserName } from '@/lib/actions/db-actions';
import { useSession } from 'next-auth/react';

export default function EditUser({ closeFn }: { closeFn: Function }) {
    const [value, setValue] = useState('');
    const [result, setResult] = useState<{ status: string, message: string } | null>(null);
    const { data: session, status } = useSession();

    const handleValueChange = (newValue: string) => {
        if (result) setResult(null);
        setValue(newValue);
    }

    const changeName = async () => {
        if (status === 'authenticated') {
            const res = await changeUserName(session!.user!.email!, session.user!.name!, value);
            setResult(res);
        }
    }

    return (
        <div className='absolute top-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-50'>
            <div className='relative w-3/4 max-w-md h-min py-8 bg-slate-900 rounded-xl md:max-w-xl'>
                <div className='w-full h-full flex flex-col items-center justify-center'>
                    <h1 className='text-3xl font-bold text-center'>Change Display Name</h1>
                    <div className='w-full px-8 my-8 md:px-16'>
                        <InputWithLabel
                            inputType='text'
                            inputID='displayName'
                            label='Display Name'
                            value={value}
                            controlFn={handleValueChange}
                            placeholder='Set new display name'
                        />
                        {result && <h2 className={`text-center ${result.status === 'Error' ? 'text-red-500' : 'text-white'}`}>{result.message}</h2>}
                    </div>
                    <Button onClick={changeName}>Submit</Button>
                    <a className='absolute top-2 right-2 hover:cursor-pointer' onClick={() => closeFn()}>
                        <span className="material-symbols-outlined">
                            close
                        </span>
                    </a>
                </div>
            </div>
        </div>
    )
}
