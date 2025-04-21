import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="bg-dark text-white fixed-bottom py-3">
      <Container className="text-center">
        © {new Date().getFullYear()} MyTodoApp. by Ahmed bettaieb, All rights reserved.
      </Container>
    </footer>
  );
}
