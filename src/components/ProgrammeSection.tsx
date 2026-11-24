import { PROGRAMMES } from '../data/scribblesData';
import ProgrammeCard from './ProgrammeCard';

interface ProgrammeSectionProps {
  format?: 'Online Learning' | 'Offline Learning' | 'All';
  title: string;
  subtitle?: string;
}

export default function ProgrammeSection({
  format = 'All',
  title,
  subtitle,
}: ProgrammeSectionProps) {
  const items =
    format === 'All'
      ? PROGRAMMES
      : PROGRAMMES.filter((item) => item.format === format);

  return (
    <div className="space-y-8">
      <div className="max-w-2xl space-y-3">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#26352F]">
          {title}
        </h2>
        {subtitle && (
          <p className="text-base sm:text-lg leading-relaxed text-[#4B5D55]">{subtitle}</p>
        )}
      </div>

      <div
        className={`grid gap-6 ${
          items.length === 2
            ? 'md:grid-cols-2'
            : items.length === 3
            ? 'md:grid-cols-3'
            : 'md:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {items.map((programme, idx) => (
          <ProgrammeCard key={programme.id} programme={programme} index={idx} />
        ))}
      </div>
    </div>
  );
}
