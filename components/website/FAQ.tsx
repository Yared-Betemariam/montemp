import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQData } from "@/data/website";

export default function FAQ() {
  return (
    <section
      id="FAQ"
      className="flex flex-col md:flex-row wrapper py-20 gap-14 dm:gap-20"
    >
      <section className="flex flex-col gap-2 md:gap-6">
        <h2 className="text-4xl md:text-5xl font-bold">
          Frequently Asked Questions
        </h2>
        <span className="text-lg opacity-70">
          Have another question? Contact me on Twitter or by email.
        </span>
      </section>
      <Accordion type="single" collapsible className="w-full">
        {FAQData.map((item, i) => (
          <AccordionItem key={item.a} value={`item-${i}`}>
            <AccordionTrigger className="px-6 py-3">{item.q}</AccordionTrigger>
            <AccordionContent className="text-base px-4 opacity-90 font-normal">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
