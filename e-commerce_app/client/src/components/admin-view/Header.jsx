import React from 'react'
import { Button } from '../ui/button'
import { AlignJustify, LogOut } from 'lucide-react'

function AdminHeader({setOpen}) {
  return (<header className='flex items-center justify-between px-4 bg-background border-b'>
    <Button className='lg:hidden sm:black' onClick={() => { setOpen(true) }} >
      <AlignJustify/>
      <span className='sr-only'></span>
    </Button>
    <div className='flex flex-1 justify-end'>
      <Button className="inline-flex gap-2 items-center rounded-md px-4 py2 text-sm font-medium shadow">
        <LogOut/>
        Logout
      </Button>
    </div>

  </header>
    
  )
}

export default AdminHeader
