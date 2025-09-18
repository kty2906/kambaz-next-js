import { ReactNode } from "react";
import CourseNavigation from "./navigate";

export default function Course2001Layout({ children }: { children: ReactNode }) {
  return (
    <div id="wd-courses">
      <h2>Course 2001</h2>
      <hr />
      <table>
        <tbody>
          <tr>
            <td valign="top" width="200">
              <CourseNavigation />
            </td>
            <td valign="top" width="100%">
              {children}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
