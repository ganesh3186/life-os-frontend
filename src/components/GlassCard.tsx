type Props = {
  title: string;
  children: React.ReactNode;
};

export default function GlassCard({ title, children }: Props) {
  return (
   <div className="bg-white/60 backdrop-blur-lg border border-white/40 shadow-lg rounded-xl p-6">

      <h2 className="text-lg font-semibold mb-3">
        {title}
      </h2>

      {children}

    </div>
  );
}