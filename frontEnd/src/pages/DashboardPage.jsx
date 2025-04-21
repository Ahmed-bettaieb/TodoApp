import { useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import API from '../api';


function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [taskData, setTaskData] = useState(initialTask());

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get('/todos');
      setTasks(res.data);
    } catch (error) {
      console.error('Fetch tasks error:', error);
    }
  };

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await API.put(`/todos/${taskData.id}`, taskData);
      } else {
        await API.post('/todos', taskData);
      }
      fetchTasks();
      handleClose();
    } catch (error) {
      console.error('Save task error:', error);
    }
  };

  const handleEdit = (task) => {
    setTaskData(task);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await API.delete(`/todos/${id}`);
        fetchTasks();
      } catch (error) {
        console.error('Delete task error:', error);
      }
    }
  };

  const handleClose = () => {
    setShowForm(false);
    setIsEdit(false);
    setTaskData(initialTask());
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Your Tasks</h3>
        <Button onClick={() => setShowForm(true)}>Add Task</Button>
      </div>

        <TodoList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />

        <TodoForm
          show={showForm}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          taskData={taskData}
          handleChange={handleChange}
          isEdit={isEdit}
      />

 
    </div>
  );
}

function initialTask() {
  return {
    title: '',
    date: '',
    priority: 'low',
    description: '',
    status: 'pending',
  };
}

export default DashboardPage;
