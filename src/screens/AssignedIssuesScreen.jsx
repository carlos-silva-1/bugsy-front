import { useState, useEffect } from 'react';
import IssueCard from '../components/IssueCard';
import { toast } from 'react-toastify';
import axios from 'redaxios';
import { Button, Form } from 'react-bootstrap';
import { useDeleteIssueMutation } from '../slices/issueApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentIssue } from '../slices/issueSlice';
import { useNavigate } from 'react-router-dom';

const AssignedIssuesScreen = () => {
  const [issues, setIssues] = useState([]);
	const [assignedIssues, setAssignedIssues] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [cardHoverId, setCardHoverId] = useState(-1);
  const [showResolved, setShowResolved] = useState(false);
  const [showUnresolved, setShowUnresolved] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const [deleteIssue, { isLoading }] = useDeleteIssueMutation();

  const backendURL = 'http://bugsy.eba-rjbpkehi.us-east-2.elasticbeanstalk.com/';

	useEffect(() => {
    loadAllIssues();
  }, []);

  useEffect(() => {
    setAssignedIssues(issues.filter(isIssueAssignedToThisUser));
  }, [issues]);

  useEffect(() => {
    let issuesAssignedToUser = issues.filter(isIssueAssignedToThisUser);
    let chosenIssues = [];

    if(showResolved && !showUnresolved) {
      chosenIssues = issuesAssignedToUser.filter(issue => issue.condition === 'Resolved');
    } 
    if(!showResolved && showUnresolved) {
      chosenIssues = issuesAssignedToUser.filter(issue => issue.condition === 'Unresolved');
    }
    if(!showResolved && !showUnresolved) {
      chosenIssues = issuesAssignedToUser;
    }

    setAssignedIssues(chosenIssues);
  }, [showResolved, showUnresolved]);

  const loadAllIssues = async () => {
    await axios.get(`${backendURL}api/issues/`)
    .then((res) => {
     setIssues(res.data);
    })
    .catch((error) => {
     console.log(error.message);
    });
  }

  const isIssueAssignedToThisUser = (issue) => {
    for(let i = 0; i < issue.assignees.length; i++) {
      if(issue.assignees[i].includes(userInfo.email)) {
        return true;
      }
    }
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

	return (
    <>
      <h1>My Issues</h1>
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
      {assignedIssues.map((issue) => (
        <div 
        className="relative" 
        key={issue.title} 
        onMouseEnter={() => {setIsHovering(true); setCardHoverId(issue._id);}} 
        onMouseLeave={() => {setIsHovering(false); setCardHoverId(-1);}}
        >
          {
            isHovering && (cardHoverId === issue._id)?
            <Button className="hover-btn edit-btn-position" onClick={() => {editClickHandler(issue)}}>Edit</Button>
            :
            <></>
          }
          {
            isHovering && userInfo.isAdmin && (cardHoverId === issue._id)?
            <Button className="hover-btn delete-btn-position" variant='danger' onClick={() => {deleteClickHandler(issue)}}>Delete</Button>
            :
            <></>
          }
          <IssueCard issueProps={issue}/>
        </div>
      ))}
    </>
  );
}

export default AssignedIssuesScreen;
