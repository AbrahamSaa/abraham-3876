import { Link } from 'react-router-dom'
import { Snail } from 'lucide-react'
import { UserAvatar } from '@/src/components/UserAvatar'

export const Header = () => {
    return (
        <header className='w-full p-4 shadow-sm flex flex-wrap justify-between bg-white'>
            <Link to={"/dashboard"} className='flex flex-wrap gap-3 items-center'>
                <Snail className='text-primary' />
                <h5 className='font-semibold text-2xl'> Snail app</h5>
            </Link>
            <UserAvatar />
        </header>
    )
}
