"use client";
import './Editor.css';

const CS1234AssignmentEditor = () => {
  return (
    <div className="assignment-editor-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span className="breadcrumb-item">CS5610 SU1 24 MO...</span>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-item">Assignments</span>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-item">A1</span>
      </div>

      <hr className="divider" />

      <form className="assignment-form">
        {/* Assignment Name */}
        <div className="form-group">
          <label htmlFor="wd-name" className="form-label">
            Assignment Name
          </label>
          <input 
            id="wd-name" 
            type="text" 
            className="form-control" 
            defaultValue="A1"
          />
        </div>

        {/* Assignment Description */}
        <div className="form-group">
          <div className="assignment-description">
            <p>The assignment is <span className="text-danger">available online</span></p>
            <p>Submit a link to the landing page of your Web application running on Netlify.</p>
            <p>The landing page should include the following:</p>
            <ul>
              <li>Your full name and section</li>
              <li>Links to each of the lab assignments</li>
              <li>Link to the Kanbas application</li>
              <li>Links to all relevant source code repositories</li>
            </ul>
            <p>The Kanbas application should include a link to navigate back to the landing page.</p>
          </div>
        </div>

        {/* Points */}
        <div className="form-group row">
          <label htmlFor="wd-points" className="col-form-label">
            Points
          </label>
          <div className="col">
            <input 
              id="wd-points" 
              type="number" 
              className="form-control" 
              defaultValue="100"
            />
          </div>
        </div>

        {/* Assignment Group */}
        <div className="form-group row">
          <label htmlFor="wd-group" className="col-form-label">
            Assignment Group
          </label>
          <div className="col">
            <select id="wd-group" className="form-control">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </select>
          </div>
        </div>

        {/* Display Grade as */}
        <div className="form-group row">
          <label htmlFor="wd-display-grade-as" className="col-form-label">
            Display Grade as
          </label>
          <div className="col">
            <select id="wd-display-grade-as" className="form-control">
              <option value="Percentage">Percentage</option>
              <option value="Points">Points</option>
              <option value="Letter">Letter Grade</option>
            </select>
          </div>
        </div>

        {/* Submission Type */}
        <div className="form-group row">
          <label htmlFor="wd-submission-type" className="col-form-label">
            Submission Type
          </label>
          <div className="col">
            <div className="submission-type-box">
              <select id="wd-submission-type" className="form-control mb-3">
                <option value="Online">Online</option>
                <option value="Paper">Paper</option>
                <option value="External Tool">External Tool</option>
              </select>

              <div className="online-entry-options">
                <label className="font-weight-bold mb-2">Online Entry Options</label>
                
                <div className="form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="wd-text-entry"
                  />
                  <label className="form-check-label" htmlFor="wd-text-entry">
                    Text Entry
                  </label>
                </div>

                <div className="form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="wd-website-url"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="wd-website-url">
                    Website URL
                  </label>
                </div>

                <div className="form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="wd-media-recordings"
                  />
                  <label className="form-check-label" htmlFor="wd-media-recordings">
                    Media Recordings
                  </label>
                </div>

                <div className="form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="wd-student-annotation"
                  />
                  <label className="form-check-label" htmlFor="wd-student-annotation">
                    Student Annotation
                  </label>
                </div>

                <div className="form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="wd-file-upload"
                  />
                  <label className="form-check-label" htmlFor="wd-file-upload">
                    File Uploads
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Assign */}
        <div className="form-group row">
          <label className="col-form-label">
            Assign
          </label>
          <div className="col">
            <div className="assign-box">
              <label htmlFor="wd-assign-to" className="font-weight-bold">
                Assign to
              </label>
              <div className="assign-to-tag">
                <span className="tag">
                  Everyone
                  <button type="button" className="tag-close">×</button>
                </span>
              </div>

              <div className="date-fields">
                <label htmlFor="wd-due-date" className="font-weight-bold">
                  Due
                </label>
                <div className="input-group">
                  <input 
                    id="wd-due-date" 
                    type="datetime-local" 
                    className="form-control" 
                    defaultValue="2024-05-13T23:59"
                  />
                </div>

                <div className="row mt-3">
                  <div className="col-md-6">
                    <label htmlFor="wd-available-from" className="font-weight-bold">
                      Available from
                    </label>
                    <div className="input-group">
                      <input 
                        id="wd-available-from" 
                        type="datetime-local" 
                        className="form-control" 
                        defaultValue="2024-05-06T12:00"
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="wd-available-until" className="font-weight-bold">
                      Until
                    </label>
                    <div className="input-group">
                      <input 
                        id="wd-available-until" 
                        type="datetime-local" 
                        className="form-control" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <hr className="divider" />
        <div className="form-actions">
          <button type="button" className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-danger">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CS1234AssignmentEditor;