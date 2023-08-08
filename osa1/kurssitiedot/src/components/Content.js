import Part from "./Part";

const Content = ({ course }) => {
  return (
    <ul>
      {course.parts.map((part) => (
        <Part part={part} key={part.id} />
      ))}
    </ul>
  );
};

export default Content;
