"use client";
import "./index.css";
import { FaHome, FaUser, FaBook, FaCalendar, FaEnvelope, FaFlask } from "react-icons/fa";
import { Container, Row, Col, Table, Form, Button, Card, Nav, Tab } from "react-bootstrap";

export default function Lab2() {
  return (
    <div className="lab2-container">

      <h1>Lab 2 – Styling with CSS, Bootstrap & React Icons</h1>

      {/* ================= SELECTORS ================= */}
      <h2>Selectors</h2>
      <p id="white-on-red">White on red paragraph</p>
      <p id="black-on-yellow">Black on yellow paragraph</p>
      <p className="blue-on-yellow">Blue on yellow paragraph (class)</p>
      <h3 className="blue-on-yellow">Blue on yellow heading (class)</h3>
      <div className="doc-structure">
        White on red DIV
        <span className="span-highlight">Blue on yellow span inside</span>
      </div>

      {/* ================= FOREGROUND COLORS ================= */}
      <h2>Foreground Colors</h2>
      <h3 className="blue-text">Blue on white heading</h3>
      <p className="red-text">Red on white text</p>
      <p className="green-text">Green on white text</p>

      {/* ================= BACKGROUND COLORS ================= */}
      <h2>Background Colors</h2>
      <h3 className="white-text blue-bg">White on blue heading</h3>
      <p className="black-text red-bg">Black on red paragraph</p>
      <span className="white-text green-bg">White on green span</span>

      {/* ================= BORDERS ================= */}
      <h2>Borders</h2>
      <p className="fat-red-border">Fat red border</p>
      <p className="thin-blue-dashed">Thin blue dashed border</p>

      {/* ================= MARGINS & PADDING ================= */}
      <h2>Margins & Padding</h2>
      <div className="margins-1">Fat red border + yellow bg + padding top/left</div>
      <div className="margins-2">Fat blue border + yellow bg + padding bottom</div>
      <div className="margins-3">Fat yellow border + blue bg + padding all</div>
      <div className="margins-4">Fat red border + yellow bg + margin bottom</div>
      <div className="margins-5">Centered fat blue border + yellow bg</div>
      <div className="margins-6">Fat yellow border + blue bg + margins all</div>

      {/* ================= CORNERS ================= */}
      <h2>Rounded Corners</h2>
      <div className="rounded-top red-bg white-text">Rounded top</div>
      <div className="rounded-bottom blue-bg white-text">Rounded bottom</div>
      <div className="rounded-all green-bg white-text">All rounded</div>
      <div className="rounded-except-top-right yellow-bg black-text">All rounded except top-right</div>

      {/* ================= DIMENSIONS ================= */}
      <h2>Dimensions</h2>
      <div className="dim-long yellow-bg">Longer than tall</div>
      <div className="dim-tall blue-bg white-text">Taller than long</div>
      <div className="dim-square red-bg white-text">Square</div>

      {/* ================= POSITIONING ================= */}
      <h2>Positioning</h2>
      <div className="pos-relative">Yellow div text nudged down & right</div>
      <div className="pos-relative2">Blue div moved up & right</div>
      <div className="pos-absolute-container">
        <div className="portrait"></div>
        <div className="landscape"></div>
        <div className="square"></div>
      </div>
      <div className="pos-fixed">Fixed position blue box</div>

      {/* ================= FLOATING ================= */}
      <h2>Floating</h2>
      <div className="float-box red-bg"></div>
      <div className="float-box green-bg"></div>
      <div className="float-box blue-bg"></div>
      <img src="https://via.placeholder.com/100" className="float-right" />

      {/* ================= GRID ================= */}
      <h2>CSS Grid</h2>
      <div className="grid-container">
        <div className="grid-item">1</div>
        <div className="grid-item">2</div>
        <div className="grid-item">3</div>
        <div className="grid-item">4</div>
      </div>

      {/* ================= FLEXBOX ================= */}
      <h2>Flexbox</h2>
      <div className="flex-container">
        <div className="flex-item">Col 1</div>
        <div className="flex-item">Col 2</div>
        <div className="flex-item">Col 3</div>
      </div>

      {/* ================= REACT ICONS ================= */}
      <h2>React Icons</h2>
      <FaHome /> <FaUser /> <FaBook /> <FaCalendar /> <FaEnvelope /> <FaFlask />

      {/* ================= BOOTSTRAP ================= */}
      <h2>Bootstrap Demo</h2>
      <Container className="p-3 border">
        <Row>
          <Col md={6} className="bg-light border">Left half</Col>
          <Col md={6} className="bg-secondary text-white">Right half</Col>
        </Row>
        <Row>
          <Col md={4} className="bg-warning">One third</Col>
          <Col md={8} className="bg-success text-white">Two thirds</Col>
        </Row>
      </Container>

      {/* ================= TABLE ================= */}
      <h2>Bootstrap Table</h2>
      <Table striped bordered hover>
        <thead>
          <tr><th>Quiz</th><th>Date</th><th>Score</th></tr>
        </thead>
        <tbody>
          <tr><td>Q1</td><td>01/10</td><td>85</td></tr>
          <tr><td>Q2</td><td>01/20</td><td>92</td></tr>
        </tbody>
      </Table>

      {/* ================= LISTS ================= */}
      <h2>Lists</h2>
      <ul className="list-group">
        <li className="list-group-item">Movie 1</li>
        <li className="list-group-item">Movie 2</li>
        <li className="list-group-item">Movie 3</li>
      </ul>

      {/* ================= FORMS ================= */}
      <h2>Forms</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Dropdown</Form.Label>
          <Form.Select>
            <option>Option 1</option>
            <option>Option 2</option>
          </Form.Select>
        </Form.Group>
        <Form.Check type="switch" label="Enable option" />
        <Form.Range />
        <Button variant="primary">Submit</Button>
      </Form>

      {/* ================= TABS & PILLS ================= */}
      <h2>Tabs & Pills</h2>
      <Tab.Container defaultActiveKey="tab1">
        <Nav variant="pills">
          <Nav.Item><Nav.Link eventKey="tab1">Lab 1</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="tab2">Lab 2</Nav.Link></Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="tab1">Content for Lab 1</Tab.Pane>
          <Tab.Pane eventKey="tab2">Content for Lab 2</Tab.Pane>
        </Tab.Content>
      </Tab.Container>

      {/* ================= CARDS ================= */}
      <h2>Bootstrap Card</h2>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="https://via.placeholder.com/150" />
        <Card.Body>
          <Card.Title>Starship</Card.Title>
          <Card.Text>Stacking Starship card styled as shown</Card.Text>
          <Button variant="danger">Launch</Button>
        </Card.Body>
      </Card>

    </div>
  );
}
