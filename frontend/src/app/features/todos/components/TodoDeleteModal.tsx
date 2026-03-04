import { Trash } from "lucide-react";

export function TodoDeleteModal({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/50 p-6 text-center">
        <div className="w-10 h-10 rounded-full bg-red-400/10 flex items-center justify-center mx-auto mb-4">
          <Trash size={18} className="text-red-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-100 mb-1">Delete todo?</h3>
        <p className="text-xs text-zinc-500 mb-6">This action cannot be undone.</p>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-zinc-700 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-lg bg-red-500 hover:bg-red-400 text-white text-sm font-medium transition-colors active:scale-95"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}