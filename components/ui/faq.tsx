type FaqItem = {
  question: string;
  answer: string;
};

export function FAQ({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details
          key={item.question}
          className="panel overflow-hidden px-6 py-5 [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold text-[var(--ink-900)]">
            <span>{item.question}</span>
            <span className="text-[var(--brand-green-600)]">+</span>
          </summary>
          <p className="pt-4 text-base leading-7 text-[var(--text-secondary)]">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
