import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, NavigationMenuContent } from '@/components/ui/navigation-menu';
import { SnailButton } from '@/src/components/SnailButton'
import { useAuth } from '@/src/features/auth/hooks/useAuth'

export const UserAvatar = () => {

    const { user, logout } = useAuth();

    if (!user) return null;

    const handleLogout = () => {
        logout();
    }

    return (
        <NavigationMenu >
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className={"gap-3"}>
                        <Avatar className={"bg-accent-foreground"}>
                            <AvatarFallback className={"bg-accent-foreground text-primary font-semibold"}>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className='flex-col text-start max-[500px]:hidden'>
                            <h4 className='text-sm font-semibold truncate'>{user.name}</h4>
                            <span className='text-xs font-normal'>{user.email}</span>
                        </div>
                        <NavigationMenuContent >
                            <ul className='w-auto'>
                                <SnailButton isLoading={false} title={'Cerrar sessión'} variant={"destructive"} className='cursor-pointer transition-all' onClick={handleLogout} />
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuTrigger>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
