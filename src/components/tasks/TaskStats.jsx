import { useMemo } from 'react';
import { useTaskStore } from '../../store/taskStore';

export default function TaskStats() {
  const { tasks } = useTaskStore();

  const stats = useMemo(() => {
    const total = tasks.length;

    const completed = tasks.filter(
      (task) => task.completed
    ).length;

    const pending = tasks.filter(
      (task) => !task.completed
    ).length;

    const today = new Date();

    const overdue = tasks.filter((task) => {
      if (!task.dueDate) return false;

      const dueDate = new Date(task.dueDate);

      return (
        !task.completed &&
        dueDate < today
      );
    }).length;

    const completionPercentage =
      total === 0
        ? 0
        : Math.round((completed / total) * 100);

    return {
      total,
      completed,
      pending,
      overdue,
      completionPercentage
    };
  }, [tasks]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">

      {/* Total */}
      <div className="card text-center">
        <p className="text-gray-500 text-sm">
          Total
        </p>
        <p className="text-2xl font-bold text-gray-800">
          {stats.total}
        </p>
      </div>

      {/* Completadas */}
      <div className="card text-center">
        <p className="text-gray-500 text-sm">
          Completadas
        </p>
        <p className="text-2xl font-bold text-green-600">
          {stats.completed}
        </p>
      </div>

      {/* Pendientes */}
      <div className="card text-center">
        <p className="text-gray-500 text-sm">
          Pendientes
        </p>
        <p className="text-2xl font-bold text-yellow-600">
          {stats.pending}
        </p>
      </div>

      {/* Vencidas */}
      <div className="card text-center">
        <p className="text-gray-500 text-sm">
          Vencidas
        </p>
        <p className="text-2xl font-bold text-red-600">
          {stats.overdue}
        </p>
      </div>

      {/* Progreso */}
      <div className="card text-center">
        <p className="text-gray-500 text-sm">
          Progreso
        </p>

        <p className="text-2xl font-bold text-blue-600">
          {stats.completionPercentage}%
        </p>

        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${stats.completionPercentage}%` }}
          />
        </div>
      </div>

    </div>
  );
}