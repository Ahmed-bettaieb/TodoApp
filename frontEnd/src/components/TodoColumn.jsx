import { Card } from 'react-bootstrap';
import TodoItem from './TodoItem';

function TodoColumn({ title, tasks, onEdit, onDelete, color }) {
  return (
    <div className="d-flex flex-column border border-secondary rounded p-3" style={{ backgroundColor: '#f8f9fa' }}>
      <h5 className="text-center mb-3" style={{ color }}>{title}</h5>
      {tasks.length === 0 ? (
        <Card body className="mb-3 text-center text-muted">No tasks found</Card>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="mb-3">
            <TodoItem task={task} onEdit={onEdit} onDelete={onDelete} />
          </div>
        ))
      )}
    </div>
  );
}

export default TodoColumn;
