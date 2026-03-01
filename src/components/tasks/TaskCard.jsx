import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { updateTask, deleteTask } from '../../services/taskService';
import { CATEGORIES } from '../../utils/constants';
import { getDueDateLabel, isOverdue } from '../../utils/dateHelpers';

export default function TaskCard({ task }) {
  const category = CATEGORIES.find(c => c.id === task.category);

  const handleToggleComplete = async (e) => {
    e.preventDefault();

    const result = await updateTask(task.id, {
      completed: !task.completed
    });

    if (result.success) {
      toast.success(
        task.completed
          ? 'Tarea marcada como pendiente'
          : 'Tarea completada 🎉'
      );
    } else {
      toast.error('No se pudo actualizar la tarea');
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!window.confirm('¿Eliminar esta tarea?')) return;

    const result = await deleteTask(task.id);

    if (result.success) {
      toast.success('Tarea eliminada');
    } else {
      toast.error('Error al eliminar la tarea');
    }
  };

  return (
    <Link to={`/tasks/${task.id}`} className="block">
      <div
        className={`card hover:shadow-lg transition-shadow 
        ${task.completed ? 'opacity-60' : ''} 
        ${isOverdue(task.dueDate, task.completed) ? 'border border-red-500' : ''}`}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold">{task.title}</h3>

            {task.description && (
              <p className="text-gray-600 mt-1">
                {task.description}
              </p>
            )}

            <div className="flex gap-2 mt-3 flex-wrap">
              <span className={`px-2 py-1 rounded text-sm bg-${category.color}-100 text-${category.color}-800`}>
                {category.label}
              </span>

              {task.dueDate && (
                <span className="text-sm text-gray-500">
                  {getDueDateLabel(task.dueDate)}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={handleToggleComplete}
              className="btn-secondary text-sm"
            >
              {task.completed ? 'Pendiente' : 'Completar'}
            </button>

            <button
              onClick={handleDelete}
              className="btn-danger text-sm"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}