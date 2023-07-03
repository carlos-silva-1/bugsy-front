import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import IssuesScreen from '../screens/IssuesScreen';
import CreateIssueScreen from '../screens/CreateIssueScreen';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>

          <LinkContainer to='/'>
            <Navbar.Brand>
              Bugsy
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {
                userInfo?
                <>
                  <LinkContainer to='/view-issues'>
                    <Navbar.Brand>View Issues</Navbar.Brand>
                  </LinkContainer>
                  <LinkContainer to='/assigned-issues'>
                    <Navbar.Brand>My Issues</Navbar.Brand>
                  </LinkContainer>
                </>
                :
                <></>
              }
              {
                userInfo && userInfo.isAdmin?
                <>
                  <LinkContainer to='/create-issue'>
                    <Navbar.Brand>Create New Issue</Navbar.Brand>
                  </LinkContainer>
                </>
                :
                <></>
              }

              <LinkContainer to='/about'>
                <Navbar.Brand>
                  About
                </Navbar.Brand>
              </LinkContainer>
            
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
