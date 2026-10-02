import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SNAILPAY_TEST_CARD, SNAILPAY_TEST_CVV, SNAILPAY_TEST_DATE } from "@snail/shared"
import { formatCardNumber } from "../hooks/usePaymentMasks"
import { PAYMENT_COPY } from "../constants/payment.copy"

export type TestCard = {
    number: string;
    date?: string;
    cvv?: string;
    result: string;
}

const TEST_CARDS: TestCard[] = [
    { number: SNAILPAY_TEST_CARD, date: SNAILPAY_TEST_DATE, cvv: SNAILPAY_TEST_CVV, result: "Pago exitoso" },
    { number: "4111111100000000", result: "Error de Snail pay" },
    { number: "4111000000000000", result: "Saldo insuficiente" },
    { number: "4222222222222222", result: "Timeout" },
]

type TestCardsProps = {
    onSelect: (card: TestCard) => void;
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
                                onClick={() => onSelect(card)}>
                                {formatCardNumber(card.number)}
                            </span>
                            <span>{card.result}</span>
                        </li>
                    ))}
                </ul>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
)
