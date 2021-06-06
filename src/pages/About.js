import Navbar from '../components/Navbar';

const AboutPage = () => {
  console.log("AboutPage reached");
  return (
    <>
    <Navbar />
      <div>
        <h1 className="header">Presentations. Made Simple.</h1>
        <h3 className="container">
          Key Features
          <li>Ease of Usage</li>
          <li>Conducive Peer/Peer and Tutor/Student Feedback System </li>
          <li>Script/Presentation Autograder</li>
        </h3>
      </div>
  </>
  )
}

export default AboutPage;
