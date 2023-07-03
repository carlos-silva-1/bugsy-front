import { Container, Card, Button } from 'react-bootstrap';

const Hero = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>Bugsy Issue Tracker</h1>
          <p className='text-center mb-4'>
            Assists the developing process by making the managing of issues clearer. <br/>
            Details on the workings of this application can be found on the <a href="/about">about</a> page.
          </p>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
