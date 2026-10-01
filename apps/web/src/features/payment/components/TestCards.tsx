import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PAYMENT_COPY } from "../constants/payment.copy"

const TEST_CARDS = [
    { number: "4111111111111111", label: "4111 1111 1111 1111", result: "Pago exitoso" },
    { number: "4111111100000000", label: "4111 1111 0000 0000", result: "Error de Snail pay" },
    { number: "4111000000000000", label: "4111 0000 0000 0000", result: "Saldo insuficiente" },
    { number: "4222222222222222", label: "4222 2222 2222 2222", result: "Timeout" },
]

type TestCardsProps = {
    onSelect: (cardNumber: string) => void;
}

export const TestCards = ({ onSelect }: TestCardsProps) => (
    <Accordion>
        <AccordionItem value={PAYMENT_COPY.testCards.title}>
            <AccordionTrigger>{PAYMENT_COPY.testCards.title}</AccordionTrigger>
            <AccordionContent>
                <ul className="list-disc list-inside grid gap-3">
                    {TEST_CARDS.map((card) => (
                        <li key={card.number} className="flex flex-row gap-3 justify-between">
                            <span
                                className="font-mono underline text-blue-400 cursor-pointer"
                                onClick={() => onSelect(card.number)}>
                                {card.label}
                            </span>
                            <span>{card.result}</span>
                        </li>
                    ))}
                </ul>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
)
