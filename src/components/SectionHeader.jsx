export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold">{title}</h1>
      {subtitle ? <p className="text-gray-600 mt-2">{subtitle}</p> : null}
    </div>
  );
}
