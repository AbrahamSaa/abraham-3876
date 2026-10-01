import { CircleCheckIcon } from 'lucide-react'

interface Props {
    met: boolean;
    children: string;
}

export const PasswordRule = ({ met, children }: Props) => (
    <div className={`flex flex-row gap-3 ${met ? 'text-green-900' : 'text-gray-500'}`}>
        <CircleCheckIcon />
        <span>{children}</span>
    </div>
)
