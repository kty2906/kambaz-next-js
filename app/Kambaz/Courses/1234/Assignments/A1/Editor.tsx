"use client";

const CS1234AssignmentEditor = () => {
  return (
    <form className="p-6 space-y-4">
      <div>
        <label htmlFor="wd-name" className="block font-medium">
          Assignment Name
        </label>
        <input id="wd-name" type="text" className="border p-2 w-full" />
      </div>

      <div>
        <label htmlFor="wd-points" className="block font-medium">
          Points
        </label>
        <input id="wd-points" type="number" className="border p-2 w-full" />
      </div>

      <div>
        <label htmlFor="wd-due-date" className="block font-medium">
          Due Date
        </label>
        <input id="wd-due-date" type="date" className="border p-2 w-full" />
      </div>

      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Save
      </button>
    </form>
  );
};

export default CS1234AssignmentEditor;
