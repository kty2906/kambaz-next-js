"use client";

const CS1234Modules = () => {
  const modules = [
    {
      title: "Week 1",
      lessons: [
        { title: "Lecture 1", items: ["Reading: React Basics", "Slides: Intro"] },
        { title: "Lecture 2", items: ["Reading: JSX", "Slides: Components"] },
      ],
    },
    {
      title: "Week 2",
      lessons: [
        { title: "Lecture 3", items: ["Reading: State & Props", "Slides: Examples"] },
      ],
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Modules - CS1234 React JS</h2>
      <ul className="list-disc ml-6">
        {modules.map((module, mIndex) => (
          <li key={mIndex}>
            {module.title}
            <ul className="list-circle ml-6">
              {module.lessons.map((lesson, lIndex) => (
                <li key={lIndex}>
                  {lesson.title}
                  <ul className="list-square ml-6">
                    {lesson.items.map((item, iIndex) => (
                      <li key={iIndex}>{item}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CS1234Modules;
