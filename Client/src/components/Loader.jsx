export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex items-center justify-center py-20 text-slate-500">
      <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mr-3" />
      {label}
    </div>
  );
}
