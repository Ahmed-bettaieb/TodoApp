import { Card, Badge, Button } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';

function TodoItem({ task, onEdit, onDelete }) {
  const { title, description, priority, status, date, imageUrl } = task;

  return (
    <Card className="shadow-sm border-0 position-relative" style={{ borderLeft: `5px solid ${statusColor(status)}` }}>
   
      <div className="position-absolute top-0 end-0 m-2 d-flex gap-2">
        <Button
          size="sm"
          variant="outline-primary"
          onClick={() => onEdit(task)}
        >
          <PencilSquare size={16} />
        </Button>
        <Button
          size="sm"
          variant="outline-danger"
          onClick={() => onDelete(task._id)}
        >
          <Trash size={16} />
        </Button>
      </div>

      <Card.Body className="d-flex">
        <div className="flex-grow-1">
          <Card.Title className="mb-2">
            <span style={{ fontWeight: '600' }}>{title}</span>
          </Card.Title>
          <Card.Text className="text-muted" style={{ fontSize: '0.9rem' }}>
            {truncateDescription(description)}
          </Card.Text>

          <div className="d-flex align-items-center gap-3 mt-2">
            <div>
              <strong>Priority:</strong>{' '}
              <Badge bg={priorityColor(priority)}>{priority}</Badge>
            </div>
            <div>
              <strong>Status:</strong>{' '}
              <Badge bg="light" text="dark">
                {status}
              </Badge>
            </div>
          </div>

          <div className="text-muted mt-2" style={{ fontSize: '0.75rem' }}>
            Date: {new Date(date).toLocaleDateString()}
          </div>
        </div>

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Task"
            style={{
              width: '80px',
              height: '80px',
              objectFit: 'cover',
              borderRadius: '10px',
              marginLeft: '1rem'
            }}
          />
        )}
      </Card.Body>
    </Card>
  );
}


function truncateDescription(desc) {
  if (!desc) return '';
  return desc.length > 100 ? desc.substring(0, 100) + '...' : desc;
}


function priorityColor(priority) {
  switch (priority.toLowerCase()) {
    case 'high':
      return 'danger';
    case 'meduim':
      return 'warning';
    case 'low':
      return 'success';
    default:
      return 'secondary';
  }
}


function statusColor(status) {
  switch (status.toLowerCase()) {
    case 'pending':
      return '#f0ad4e';
    case 'in progress':
      return '#0275d8';
    case 'done':
      return '#5cb85c';
    default:
      return '#6c757d';
  }
}



export default TodoItem;
