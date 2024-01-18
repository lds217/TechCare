import {Link} from "react-router-dom";
import {Container} from "react-bootstrap";
import "./Home.css"

function Home() {
  return (
      <Container className="Homepage">
        <div className="Homepage-content">
        <h1 className="mt-4">Trang chủ</h1>
        <Link to="/manage/list" className="btn btn-primary">Danh sách bệnh nhân</Link>
        </div>
      </Container>
  );
}

export default Home;
