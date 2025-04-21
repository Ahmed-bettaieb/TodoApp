import { Row, Col } from 'react-bootstrap';
import TodoColumn from './TodoColumn';

function TodoList({ tasks, onEdit, onDelete }) {
  const pending = tasks.filter((task) => task.status === 'pending');
  const inProgress = tasks.filter((task) => task.status === 'in progress');
  const done = tasks.filter((task) => task.status === 'done');

  return (

  <Row className='mb-2 g-3  overflow-auto' style={{ maxHeight: '70vh' }}>
    <Col md={4} >
      <TodoColumn title="Pending" tasks={pending} onEdit={onEdit} onDelete={onDelete} color="#f0ad4e" />
    </Col>
    <Col md={4} >
      <TodoColumn title="In Progress" tasks={inProgress} onEdit={onEdit} onDelete={onDelete} color="#5bc0de" />
    </Col>
    <Col md={4}>
      <TodoColumn title="Done" tasks={done} onEdit={onEdit} onDelete={onDelete} color="#5cb85c" />
    </Col>
  </Row>
  );
}

export default TodoList;
