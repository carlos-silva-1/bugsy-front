import { useState, useEffect } from 'react';
import { Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // used so that field 'isAdmin' (which is used to control the layout of the page) is only updated after the 'update' button is pressed
  const [isAdminTEMP, setIsAdminTEMP] = useState(false); 

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setIsAdmin(userInfo.isAdmin);
  }, [userInfo.email, userInfo.name, userInfo.isAdmin]);

  useEffect(() => {
    setIsAdminTEMP(userInfo.isAdmin);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        setIsAdmin(isAdminTEMP);
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
          isAdmin: isAdminTEMP,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Update Profile</h1>

      <Form onSubmit={submitHandler}>

        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='isAdmin'>
          {
            isAdmin?
              <>
                <Form.Label>Are you an administrator?</Form.Label>
                <Form.Check
                  type='checkbox'
                  id='default-checkbox'
                  label='Admin'
                  checked={isAdminTEMP}
                  onChange={(e) => setIsAdminTEMP(e.target.checked)}
                />
              </>
            :
              <>
                <Form.Label>Are you an administrator?</Form.Label>
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Can only be checked by administrators</Tooltip>}>
                  <span className="Medium">
                    <Form.Check
                      disabled
                      type='checkbox'
                      id='default-checkbox'
                      label='Admin'
                      checked={isAdminTEMP}
                      onChange={(e) => setIsAdminTEMP(e.target.checked)}
                      style={{'width':'70px'}}
                    />
                  </span>
                </OverlayTrigger>
              </>
          }
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Update
        </Button>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;
