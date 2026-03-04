import { useEffect, useState } from "react";
import { Todo, todoPayload } from "../types/todos";
import { toast } from "sonner";

export const useGetTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_TODO_URL}/api/todos`,
        );

        if (!res) {
          throw new Error("gagal mengambil data todo");
        }

        const data = await res.json();
        setTodos(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Terjadi kesalahan yang tidak diketahui");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTodo();
  }, []);

  return {
    todos,
    loading,
    error,
    setTodos,
  };
};

export const useCreateTodo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTodo = async (payload: todoPayload) => {
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_TODO_URL}/api/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Gagal menyimpan todo");
      }

      toast.success("Todo berhasil dibuat");
      return await res.json();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Terjadi kesalahan yang tidak diketahui");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createTodo, loading, error };
};

export const useUpdateTodo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateTodo = async (id: string, payload: todoPayload) => {
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_TODO_URL}/api/todos/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Gagal mengupdate todo");
      }

      toast.success("Todo berhasil diupdate");
      return await res.json();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Terjadi kesalahan yang tidak diketahui");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { updateTodo, loading, error };
};

export const useDeleteTodo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteTodo = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_TODO_URL}/api/todos/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal menghapus todo");
      }

      toast.success("Todo berhasil dihapus");
      return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      setError(message);
      toast.error(message);
      throw err; 
    } finally {
      setLoading(false);
    }
  };

  return { deleteTodo, loading, error };
};
