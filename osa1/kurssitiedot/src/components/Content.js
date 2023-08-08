import Part from "./Part";

const Content = ({ course }) => {
  console.log(course);
  return (
    <ul>
      {course.parts.map((part) => (
        <Part part={part} />
      ))}
    </ul>
  );
};

export default Content;
