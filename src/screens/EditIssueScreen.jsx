import { useState, useEffect } from 'react';
import { Form, Button, Accordion } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdateIssueMutation } from '../slices/issueApiSlice';
import { setCurrentIssue } from '../slices/issueSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'redaxios';

const SERVER_URL = 'https://bugsy.onrender.com/';

const EditIssueScreen = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('');
  const [assignees, setAssignees] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const [users, setUsers] = useState([]);

  const { userInfo } = useSelector((state) => state.auth);
  const { issueInfo } = useSelector((state) => state.issue);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateIssue, { isLoading }] = useUpdateIssueMutation();

  useEffect(() => {
    setTitle(issueInfo.title)
    setCategory(issueInfo.category)
    setPriority(issueInfo.priority)
    setDescription(issueInfo.description)
    setCondition(issueInfo.condition)
    setAssignees(issueInfo.assignees)
    setComments(issueInfo.comments)
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

  const addDateAndUsernameToComment = (comment) => {
    const current = new Date();
    const cDate = `[${current.getFullYear()}/${(current.getMonth() + 1)}/${current.getDate()}`;
    const cTime = `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}]`;
    return `${cDate} - ${cTime} ${userInfo.name}: ${comment}`
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    let newCommentsArray = comments;
    if(newComment !== '') {
      const newCommentWithDate = addDateAndUsernameToComment(newComment);
      newCommentsArray = [...comments, newCommentWithDate];
    }

    try {
      await setComments(newCommentsArray);
      dispatch(setCurrentIssue({ title, category, priority, description, condition, assignees, comments: newCommentsArray }));
      const res = await updateIssue({ title, category, priority, description, condition, assignees, comments: newCommentsArray, _id: issueInfo._id });
      toast.success('Issue updated successfully');
      navigate('/issue-details');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  const addAssignees = (assignee) => {
    if(!assignees.includes(assignee)) {
      setAssignees([...assignees, assignee]);
    }
  }

  const removeAssignee = (assignee) => {
    if(assignees.includes(assignee)) {
      setAssignees(assignees.filter(e => e !== assignee));
    }
  }

  return (
    <FormContainer>
      <h1>Edit Issue</h1>
      <Form onSubmit={submitHandler}>

        {
          userInfo.isAdmin?
          <>
            <Form.Group className='my-2 border border-secondary rounded p-3' controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Ex: Issue #32'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
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

            <Form.Group className='my-2 border border-secondary rounded p-3' controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Ex: Update profile button does not update on click'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2 border border-secondary rounded p-3' controlId='assignees'>
              <Form.Label>Add Assignee </Form.Label>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>View Assignees</Accordion.Header>
                  <Accordion.Body>
                    {assignees.map((assignee) => (
                      <span key={assignee}>
                        {assignee}
                        <button className="close-button rounded" onClick={() => removeAssignee(assignee)}>x</button>
                        <br/> 
                      </span>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <Form.Select aria-label="Default select example" value={assignees} onChange={(e) => {addAssignees(e.target.value)}}>
                <option>Users</option>
                {users.map((assignee) => (
                  <option key={assignee._id}>{assignee.name + " - " + assignee.email}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </>
          :
          <></>
        }
        
        <Form.Group className='my-2 border border-secondary rounded p-3' controlId='condition'>
          <Form.Label>Condition</Form.Label>
          <Form.Select aria-label="Default select example" value={condition} onChange={(e) => setCondition(e.target.value)}>
            <option>Condition</option>
            <option>Unresolved</option>
            <option>Resolved</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className='my-2 border border-secondary rounded p-3' controlId='newComment'>
          <Form.Label>Add Comment</Form.Label>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>View Coments</Accordion.Header>
              <Accordion.Body>
                {comments.map((comment, index) => (
                  <span key={index}>{comment}<br/></span>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Form.Control
            type='text'
            placeholder='Ex: priority should be set lower than it currently is'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Edit
        </Button>

        {isLoading && <Loader />}

      </Form>
    </FormContainer>
  );
};

export default EditIssueScreen;
 