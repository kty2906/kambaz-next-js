import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Labs() {
  return (
    <div id="wd-labs">
      <h1>Labs</h1>
      <p id="wd-student-name">Krisha Thakkar</p>
      <ul>
        <li><Link id="wd-lab1-link" href="/Labs/Lab1"> Lab 1: HTML Examples </Link></li>
        <li><Link id="wd-lab2-link" href="/Labs/Lab2"> Lab 2: CSS </Link></li>
      </ul>

     

    </div>
  );
}
