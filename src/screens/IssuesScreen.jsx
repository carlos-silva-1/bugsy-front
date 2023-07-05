import { useState, useEffect } from 'react';
import IssueCard from '../components/IssueCard';
import { toast } from 'react-toastify';
import axios from 'redaxios';
import { Button, Form } from 'react-bootstrap';
import { useDeleteIssueMutation } from '../slices/issueApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentIssue } from '../slices/issueSlice';
import { useNavigate } from 'react-router-dom';

const SERVER_URL = 'https://bugsy.onrender.com/';

const IssuesScreen = () => {
	const [issues, setIssues] = useState([]);
  const [issuesCopy, setIssuesCopy] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [cardHoverId, setCardHoverId] = useState(-1);
  const [showResolved, setShowResolved] = useState(false);
  const [showUnresolved, setShowUnresolved] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleteIssue, { isLoading }] = useDeleteIssueMutation();

	useEffect(() => {
    loadAllIssues();
  }, []);

  useEffect(() => {
    let chosenIssues = [];

    if(showResolved && !showUnresolved) {
      chosenIssues = issuesCopy.filter(issue => issue.condition === 'Resolved');
    } 
    if(!showResolved && showUnresolved) {
      chosenIssues = issuesCopy.filter(issue => issue.condition === 'Unresolved');
    }
    if(!showResolved && !showUnresolved) {
      chosenIssues = issuesCopy;
    }

    setIssues(chosenIssues);
  }, [showResolved, showUnresolved]);

  const loadAllIssues = async () => {
    await axios.get(`${SERVER_URL}api/issues/`, {withCredentials: true})
    .then((res) => {
     setIssues(res.data);
     setIssuesCopy(res.data);
    })
    .catch((error) => {
     console.log(error.message);
    });
  }

  const editClickHandler = (issue) => {
    dispatch(setCurrentIssue(issue));
    navigate("/edit-issue");
  }

  const deleteClickHandler = async (issue) => {
    try {
      const res = await deleteIssue(issue._id).unwrap();
      toast.success('Issue deleted successfully');
      loadAllIssues();
    } catch (err) {
      toast.error(err?.data?.message || err.error || err?.data);
    }
  }

  // assumes the string describing the assignee is in the format 'username - email'
  const equalsCurrentUser = (assignee) => {
    return assignee.includes(userInfo.email);
  }

	return (
    <>
      <h1>Issues</h1>
      <Form.Check
        type='checkbox'
        id='default-checkbox'
        label='Only Resolved Issues'
        checked={showResolved}
        onChange={(e) => setShowResolved(e.target.checked)}
      />
      <Form.Check
        type='checkbox'
        id='default-checkbox'
        label='Only Unresolved Issues'
        checked={showUnresolved}
        onChange={(e) => setShowUnresolved(e.target.checked)}
      />
      {issues.map((issue) => (
        <div  
        className="relative" 
        key={issue.title} 
        onMouseEnter={() => {setIsHovering(true); setCardHoverId(issue._id);}} 
        onMouseLeave={() => {setIsHovering(false); setCardHoverId(-1);}}
        >
          {
            isHovering && (userInfo.isAdmin || issue.assignees.some(equalsCurrentUser)) && (cardHoverId === issue._id)?
            <Button className="hover-btn edit-btn-position" variant="primary" onClick={() => {editClickHandler(issue)}}>Edit</Button>
            :
            <></>
          }
          {
            isHovering && userInfo.isAdmin && (cardHoverId === issue._id)?
            <Button className="hover-btn delete-btn-position" variant="danger" onClick={() => {deleteClickHandler(issue)}}>Delete</Button>
            :
            <></>
          }
          <IssueCard issueProps={issue}/>
        </div>
      ))}
    </>
  );
}

export default IssuesScreen;
