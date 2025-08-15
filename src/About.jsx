import './About.css';

function About() {
  
    function btn1() {
      console.log("로그1");
    }

    const btn2 = () => {
      console.log("로그2");
    }
    return (
      <>
        <div className='container'>
          <ul>
            <li><a href='https://timovite.netlify.app/' target='_blank'>JHS</a></li>
            <li><a href='https://reavite.netlify.app/' target='_blank'>OBJ</a></li>
          </ul>
        </div>
      </>
    )
  }
  
  export default About