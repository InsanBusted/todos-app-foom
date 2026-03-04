import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";

export function TodoFormModal({
  mode,
  defaultValues,
  onClose,
  onSubmit,
  loading,
  error,
}: {
  mode: "create" | "edit";
  defaultValues?: { title: string; description: string; completed: boolean };
  onClose: () => void;
  onSubmit: (values: {
    title: string;
    description: string;
    completed: boolean;
  }) => void;
  loading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}) {
  const [title, setTitle] = useState(defaultValues?.title || "");
  const [description, setDescription] = useState(
    defaultValues?.description || "",
  );
  const [completed, setCompleted] = useState(defaultValues?.completed || false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-zinc-100">
            {mode === "create" ? "Buat Todo" : "Edit Todo"}
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-zinc-500 hover:text-zinc-300 p-1 rounded-md hover:bg-zinc-800 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors"
            />
          </div>
          {error && (
            <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add description"
              rows={3}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors resize-none"
            />
          </div>

          <div className="flex items-center justify-between py-1">
            <label className="text-xs font-medium text-zinc-400">
              Tandai jika sudah selesai
            </label>
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="w-4 h-4 accent-zinc-500"
            />
          </div>
        </div>


        <div className="flex gap-2 mt-6">
          <button
            onClick={onClose}
            className="cursor-pointer flex-1 py-2.5 rounded-lg border border-zinc-700 text-sm text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <Button
            onClick={() => onSubmit({ title, description, completed })}
            className={`cursor-pointer flex-1 py-2.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-900 text-sm font-medium transition-all active:scale-95 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading
              ? "Tunggu..."
              : mode === "create"
              ? "Buat"
              : "Simpan Perubahan"}
          </Button>
        </div>
      </div>
    </div>
  );
}
