import { SnailButton } from "@/src/components/SnailButton"
import type { ComponentProps, ReactNode } from "react"

type PaymentResultProps = {
    icon: ReactNode;
    iconClassName: string;
    title: string;
    description?: ReactNode;
    children?: ReactNode;
    actionTitle: string;
    onAction: () => void;
    actionVariant?: ComponentProps<typeof SnailButton>["variant"];
}

export const PaymentResult = ({
    icon,
    iconClassName,
    title,
    description,
    children,
    actionTitle,
    onAction,
    actionVariant,
}: PaymentResultProps) => (
    <div className="flex flex-col gap-0 items-center justify-center">
        <div className={`w-16 h-16 rounded-full items-center place-items-center content-center my-4 ${iconClassName}`}>
            {icon}
        </div>
        <h4 className="text-lg font-bold font-heading text-mist-800">{title}</h4>
        {description}
        {children}
        <SnailButton
            isLoading={false}
            variant={actionVariant}
            className="w-full cursor-pointer"
            title={actionTitle}
            onClick={onAction} />
    </div>
)
