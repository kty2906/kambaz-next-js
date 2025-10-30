"use client"
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useState } from "react";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { Module, Lesson } from "../../../Database/types";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

  return (
    <div id="wd-modules">
      <ModulesControls 
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }}
      />
      <br /><br /><br />
      
      <ListGroup className="rounded-0">
        {modules
          .filter((module: Module) => module.course === cid)
          .map((module: Module) => (
            <ListGroupItem 
              key={module._id} 
              className="p-0 mb-5 fs-5 border-gray"
            >
              <div className="p-3 ps-2 bg-secondary text-white">
                <BsGripVertical className="me-2 fs-3" />
                
                {/* EDITABLE MODULE NAME */}
                {!(module as any).editing && module.name}
                {(module as any).editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    value={module.name}
                    onChange={(e) =>
                      dispatch(updateModule({ ...module, name: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(updateModule({ ...module, editing: false }));
                      }
                    }}
                  />
                )}
                
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => dispatch(deleteModule(moduleId))}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              </div>
              
              {/* LESSONS */}
              {module.lessons && (
                <ListGroup className="rounded-0">
                  {module.lessons.map((lesson: Lesson) => (
                    <ListGroupItem 
                      key={lesson._id} 
                      className="p-3 ps-4"
                    >
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name}
                      <LessonControlButtons />
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