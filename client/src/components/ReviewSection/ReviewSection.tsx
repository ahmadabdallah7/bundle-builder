// Types
type ReviewSectionProps = {
  title: string;
  children: React.ReactNode;
  showDivider?: boolean;
};

export default function ReviewSection({
  title,
  children,
  showDivider = true,
}: ReviewSectionProps) {
  return (
    <section className="py-2">
      <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-[#9CA3AF]">
        {title}
      </h3>

      <div className="space-y-2">{children}</div>

      {showDivider && <div className="mt-4 border-b border-[#D7DDE6]" />}
    </section>
  );
}
