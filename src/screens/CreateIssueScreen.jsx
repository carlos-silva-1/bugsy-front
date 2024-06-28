import { useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import axios from 'redaxios';
import { useCreateIssueMutation } from '../slices/issueApiSlice';
import { toast } from 'react-toastify';

const SERVER_URL = 'https://bugsy-server.onrender.com/';

const CreateIssueScreen = () => {
	const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('');
  const [assignees, setAssignees] = useState([]);
  const [users, setUsers] = useState([]);

  const [createIssue, { isLoading }] = useCreateIssueMutation();

  useEffect(() => {
    loadAllUserProfiles();
  }, []);

  const loadAllUserProfiles = () => {
    axios.get(`${SERVER_URL}api/users/`)
    .then((res) => {
      setUsers(res.data.users)
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const resetState = () => {
    setTitle("");
    setCategory("");
    setPriority("");
    setDescription("");
    setCondition("");
    setAssignees([]);
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createIssue({ title, category, priority, description, condition, assignees }).unwrap();
      toast.success('Issue created successfully');
      resetState();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Create Issue</h1>
      <Form onSubmit={submitHandler}>

        <Form.Group className='my-2 border border-secondary rounded p-3' controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            placeholder='Ex: Issue #32'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2 border border-secondary rounded p-3' controlId='priority'>
          <Form.Label>Priority</Form.Label>
          <Form.Select aria-label="Default select example" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option>Priority</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Urgent</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className='my-2 border border-secondary rounded p-3' controlId='category'>
          <Form.Label>Category</Form.Label>
          <Form.Control
            type='text'
            placeholder='Ex: UI'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2 border border-secondary rounded p-3' controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            placeholder='Ex: Update profile button does not update on click'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2 border border-secondary rounded p-3' controlId='condition'>
          <Form.Label>Condition</Form.Label>
          <Form.Select aria-label="Default select example" value={condition} onChange={(e) => setCondition(e.target.value)}>
            <option>Condition</option>
            <option>Unresolved</option>
            <option>Resolved</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className='my-2 border border-secondary rounded p-3' controlId='assignees'>
          <Form.Label>Assign to: </Form.Label>
          {assignees.map((assignee) => (
            <span key={assignee}> {assignee},</span>
          ))}
          <Form.Select aria-label="Default select example" value={assignees} onChange={(e) => setAssignees([...assignees, e.target.value])}>
            <option>Users</option>
            {users.map((user, index) => (
              <option key={index}>{user.name + " - " + user.email}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Create
        </Button>

        {isLoading && <Loader />}

      </Form>
    </FormContainer>
  );

}

export default CreateIssueScreen;
