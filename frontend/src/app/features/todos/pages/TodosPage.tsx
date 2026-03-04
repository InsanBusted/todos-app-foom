"use client";

import { Check, Pencil, Trash2, Plus } from "lucide-react";
import { Todo } from "../types/todos";
import {
  useCreateTodo,
  useDeleteTodo,
  useGetTodo,
  useUpdateTodo,
} from "../hooks/useTodos";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TodoFormModal } from "../components/TodoFormModal";

export default function TodosPage() {
  const { todos, setTodos } = useGetTodo();
  const { createTodo, loading, error } = useCreateTodo();
  const { updateTodo } = useUpdateTodo();
  const { deleteTodo } = useDeleteTodo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  const handleCreate = () => {
    setSelectedTodo(null);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const handleEdit = (todo: Todo) => {
    setSelectedTodo(todo);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah kamu yakin ingin menghapus todo ini?")) return;

    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const completed = todos.filter((t) => t.completed).length;
  const progress =
    todos.length > 0 ? Math.round((completed / todos.length) * 100) : 0;

  // console.log("data todo : ", todos);

  const handleSubmit = async (values: {
    title: string;
    description: string;
    completed: boolean;
  }) => {
    try {
      if (modalMode === "create") {
        const newTodo = await createTodo(values);
        setTodos((prev) => [...prev, newTodo]);
      } else {
        if (!selectedTodo) return;
        const updated = await updateTodo(selectedTodo.id, values);
        setTodos((prev) =>
          prev.map((t) => (t.id === selectedTodo.id ? updated : t)),
        );
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-2xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium tracking-widest text-zinc-500 uppercase mb-2">
                Task Manager
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-zinc-50">
                My Todos
              </h1>
            </div>
            <Button
              onClick={handleCreate}
              className="cursor-pointer mt-1 flex items-center gap-2 bg-zinc-50 hover:bg-white text-zinc-900 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-150 hover:shadow-lg hover:shadow-white/10 active:scale-95"
            >
              <Plus size={14} strokeWidth={2.5} />
              Create
            </Button>
          </div>
          {todos.length}
          <div className="mt-6">
            <div className="flex justify-between text-xs text-zinc-500 mb-2">
              <span>
                {completed} of {todos.length} completed
              </span>
              <span>{progress}%</span>
            </div>
            <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-zinc-100 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Todo Cards */}
        <div className="space-y-3">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`rounded-xl border ${
                todo.completed
                  ? "bg-zinc-900/40 border-zinc-800/60"
                  : "bg-zinc-900 border-zinc-800"
              }`}
            >
              <div className="flex items-start gap-4 px-5 pt-5 pb-3">
                <div
                  className={`mt-0.5 shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center ${
                    todo.completed
                      ? "bg-zinc-100 border-zinc-100"
                      : "border-zinc-600"
                  }`}
                >
                  {todo.completed && (
                    <Check
                      size={11}
                      strokeWidth={3}
                      className="text-zinc-900"
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-sm font-medium leading-snug ${
                      todo.completed
                        ? "text-zinc-500 line-through"
                        : "text-zinc-100"
                    }`}
                  >
                    {todo.title}
                  </h3>
                  {todo.description && (
                    <p
                      className={`mt-1 text-xs leading-relaxed ${
                        todo.completed ? "text-zinc-600" : "text-zinc-500"
                      }`}
                    >
                      {todo.description}
                    </p>
                  )}
                </div>

                <span
                  className={`shrink-0 text-[10px] font-medium tracking-wide px-2 py-0.5 rounded-full border ${
                    todo.completed
                      ? "text-emerald-400 border-emerald-400/20 bg-emerald-400/5"
                      : "text-zinc-500 border-zinc-700"
                  }`}
                >
                  {todo.completed ? "Done" : "Todo"}
                </span>
              </div>

              <div className="flex items-center gap-1 px-5 pb-4">
                <button
                  onClick={() => handleEdit(todo)}
                  className="flex items-center gap-1.5 text-[11px] text-zinc-500 hover:text-zinc-300 px-2.5 py-1.5 rounded-md hover:bg-zinc-800 transition-all"
                >
                  <Pencil size={11} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="flex items-center gap-1.5 text-[11px] text-zinc-500 hover:text-red-400 px-2.5 py-1.5 rounded-md hover:bg-red-400/5 transition-all"
                >
                  <Trash2 size={11} />
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* modal nya */}
          {isModalOpen && (
            <TodoFormModal
              mode={modalMode}
              defaultValues={selectedTodo ?? undefined}
              onClose={handleClose}
              onSubmit={handleSubmit}
              loading={loading}
              error={error}
            />
          )}
        </div>
      </div>
    </div>
  );
}
