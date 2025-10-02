import { ReactNode } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import TOC from './TOC';
export default function LabsLayout({ children }: { children: ReactNode }) {
  return (
    <table>
      <tbody>
        <tr>
          <td valign="top" width={160}><TOC /></td>
          <td valign="top">{children}</td>
        </tr>
      </tbody>
    </table>
  );
}
