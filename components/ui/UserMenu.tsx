'use client';
import { signOut } from 'next-auth/react';
import React, { useState } from 'react'

export default function UserMenu({ openEditFn }: { openEditFn: Function }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className='w-16 h-16 mr-4 flex items-end justify-center'>
            <a
                className='hover:cursor-pointer bg-white w-12 h-12 flex items-center justify-center rounded-full'
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span className="material-symbols-outlined text-4xl text-slate-900">
                    person
                </span>
            </a>
            <UserOptions open={menuOpen} openFn={openEditFn} />
        </div>
    )
}

function UserOptions({ open, openFn }: { open: boolean; openFn: Function; }) {
    return (
        <div className='absolute bottom-[88px] md:bottom-[104px]'>
            <div className={`${open ? 'border-t-slate-800' : 'border-t-transparent'} transition-colors content-none w-0 h-0 absolute border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] left-0 right-0 mx-auto -bottom-4`} />
            <div className={`w-16 border-2 rounded-lg overflow-hidden transition-[max-height,_border-color,_background-color] ${open ? 'max-h-28 border-slate-500 bg-slate-800' : 'max-h-0 border-transparent bg-transparent'}`}>
                <div className='w-full h-full flex flex-col items-center gap-2 py-2 overflow-hidden'>
                    <a className='hover:cursor-pointer' onClick={() => openFn()}>
                        <span className="material-symbols-rounded text-3xl">
                            edit
                        </span>
                    </a>
                    <a className='hover:cursor-pointer' onClick={() => signOut()}>
                        <span className="material-symbols-rounded text-3xl">
                            logout
                        </span>
                    </a>
                </div>
            </div>
        </div>
    )
}
