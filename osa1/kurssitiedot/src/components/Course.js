import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

const Course = ({ course }) => (
  <>
    <Header course={course} />
    <Content course={course} />
    <Footer course={course} />
  </>
);

export default Course;
