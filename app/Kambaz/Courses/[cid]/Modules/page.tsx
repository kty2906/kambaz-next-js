"use client"
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import * as db from "../../../Database";
import { Module, Lesson } from "../../../Database/types"; // FIXED: Import types

export default function Modules() {
  const { cid } = useParams();
  const modules = db.modules;
  
  return (
    <div id="wd-modules">
      <h2>Modules</h2>
      <ListGroup className="rounded-0 mt-4">
        {modules
          .filter((module: Module) => module.course === cid) // FIXED: Use Module type
          .map((module: Module) => ( // FIXED: Use Module type
            <ListGroupItem 
              key={module._id} 
              className="p-0 mb-5 fs-5 border-gray"
            >
              <div className="p-3 ps-2 bg-secondary text-white">
                <BsGripVertical className="me-2 fs-3" /> 
                {module.name}
              </div>
              {module.lessons && (
                <ListGroup className="rounded-0">
                  {module.lessons.map((lesson: Lesson) => ( // FIXED: Use Lesson type
                    <ListGroupItem 
                      key={lesson._id} 
                      className="p-3 ps-4"
                    >
                      <BsGripVertical className="me-2 fs-3" /> 
                      {lesson.name}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}