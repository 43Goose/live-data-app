'use client';
import React from 'react'
import { Button } from './ui/button'
import { signIn } from 'next-auth/react'

export default function AccountScreen() {
    return (
        <div className='absolute top-0 w-full h-screen flex pt-64 justify-center bg-black bg-opacity-50 md:pt-0 md:items-center'>
            <div className='w-3/4 max-w-md h-min py-4 bg-slate-900 rounded-xl md:max-w-xl'>
                <div className='w-full h-full flex flex-col items-center justify-center gap-4 px-8'>
                    <h1 className='text-3xl font-bold'>Sign In</h1>
                    <h2 className='text-center'>This site currently requires login with a google account to help prevent bots.</h2>
                    <Button onClick={() => signIn('google')}>Sign in with Google</Button>
                </div>
            </div>
        </div>
    )
}
