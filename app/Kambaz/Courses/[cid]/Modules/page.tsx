"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import * as coursesClient from "../../client";
import * as modulesClient from "./client";
import { FaTrash, FaPencil } from "react-icons/fa6";
import { BsGripVertical } from "react-icons/bs";
import { KambazState } from "../../../store/types";
import { Module } from "../../../Database/types";
import { Lesson } from "../../../Database/types";

interface ModuleWithEditing extends Module {
  editing?: boolean;
}

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: KambazState) => state.modulesReducer);
  const dispatch = useDispatch();

  const fetchModules = useCallback(async () => {
    const modulesData = await coursesClient.findModulesForCourse(cid as string);
    dispatch(setModules(modulesData));
  }, [cid, dispatch]);

  const createModuleForCourse = async () => {
    if (!cid || Array.isArray(cid)) return;
    const courseId = cid as string;
    const newModule = { name: moduleName, course: courseId };
    const createdModule = await coursesClient.createModuleForCourse(courseId, newModule);
    dispatch(addModule(createdModule));
    setModuleName(""); // Clear input after adding
  };

  const removeModule = async (moduleId: string) => {
    if (window.confirm("Are you sure you want to delete this module?")) {
      try {
        await modulesClient.deleteModule(moduleId);
        dispatch(deleteModule(moduleId));
      } catch (error) {
        console.error("Failed to delete module:", error);
        alert("Failed to delete module");
      }
    }
  };

  const saveModule = async (module: ModuleWithEditing) => {
    try {
      await modulesClient.updateModule(module);
      dispatch(updateModule(module));
    } catch (error) {
      console.error("Failed to update module:", error);
      alert("Failed to update module");
    }
  };

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  return (
    <div>
      {/* Module Controls */}
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-secondary me-2">Collapse All</button>
        <button className="btn btn-secondary me-2">View Progress</button>
        <div className="dropdown d-inline me-2">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="publishDropdown"
            data-bs-toggle="dropdown"
          >
            Publish All
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                Publish all modules and items
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Publish modules only
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Unpublish all modules and items
              </a>
            </li>
          </ul>
        </div>
        <button className="btn btn-danger me-2">
          + Module
        </button>
        <button className="btn btn-secondary">
          <span>⋮</span>
        </button>
      </div>

      {/* Add Module Form */}
      <div className="mb-3">
        <input
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
          placeholder="New Module Name"
          className="form-control mb-2"
          id="wd-module-name-input"
        />
        <button
          onClick={createModuleForCourse}
          className="btn btn-success me-2"
          id="wd-add-module-btn"
        >
          Add Module
        </button>
      </div>

      <hr />

      {/* Modules List */}
      <ul id="wd-modules" className="list-group rounded-0">
        {modules.map((moduleItem: ModuleWithEditing) => (
          <li key={moduleItem._id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center flex-grow-1">
                <BsGripVertical className="me-2" />
                {!moduleItem.editing && (
                  <span>{moduleItem.name}</span>
                )}
                {moduleItem.editing && (
                  <input
                    className="form-control w-50 d-inline-block"
                    value={moduleItem.name}
                    onChange={(e) =>
                      dispatch(updateModule({ ...moduleItem, name: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveModule({ ...moduleItem, editing: false });
                      }
                    }}
                    autoFocus
                    id="wd-module-name-edit"
                  />
                )}
              </div>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-sm btn-link text-danger"
                  onClick={() => removeModule(moduleItem._id)}
                  id="wd-delete-module-btn"
                  title="Delete Module"
                >
                  <FaTrash />
                </button>
                <button
                  className="btn btn-sm btn-link text-primary"
                  onClick={() => dispatch(editModule(moduleItem._id))}
                  id="wd-edit-module-btn"
                  title="Edit Module"
                >
                  <FaPencil />
                </button>
                <span className="ms-2">⋮</span>
              </div>
            </div>

            {moduleItem.lessons && moduleItem.lessons.length > 0 && (
              <ul className="wd-lessons list-group rounded-0">
                {moduleItem.lessons.map((lesson: Lesson) => (
                  <li key={lesson._id} className="wd-lesson list-group-item p-3 ps-1">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <BsGripVertical className="me-2" />
                        {lesson.name}
                      </div>
                      <div>
                        <span>⋮</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}