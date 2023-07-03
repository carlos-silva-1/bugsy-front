import { Card, ListGroup, Button } from 'react-bootstrap';
import { useDeleteIssueMutation } from '../slices/issueApiSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentIssue } from '../slices/issueSlice';
import '../style.css'

const IssueDetailsScreen = () => {
  const { issueInfo } = useSelector((state) => state.issue);
  const { userInfo } = useSelector((state) => state.auth);
  const [deleteIssue, { isLoading }] = useDeleteIssueMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const editClickHandler = async () => {
    dispatch(setCurrentIssue(issueInfo));
    navigate("/edit-issue");
  }

  const deleteClickHandler = async () => {
    try {
      await deleteIssue(issueInfo._id).unwrap();
      toast.success('Issue deleted successfully');
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  const containCurrentUserEmail = (assignee) => {
    return assignee.includes(userInfo.email);
  }

  return (
    <Card>
      <Card.Body className={issueInfo.priority}>

        <Card.Header className="issue-card-title relative">
          Title: {issueInfo.title}
          {
            userInfo.isAdmin || issueInfo.assignees.some(containCurrentUserEmail)?
            <Button className="hover-btn edit-btn-position-details-screen" variant="primary" onClick={() => {editClickHandler()}}>Edit</Button>
            :
            <></>
          }
          {
            userInfo.isAdmin?
            <Button className="hover-btn delete-btn-position-details-screen" variant="danger" onClick={() => {deleteClickHandler()}}>Delete</Button>
            :
            <></>
          }
        </Card.Header>

        <ListGroup variant="flush">
          <ListGroup.Item>Priority: {issueInfo.priority}</ListGroup.Item>
          <ListGroup.Item>Category: {issueInfo.category}</ListGroup.Item>
          <ListGroup.Item>Description: {issueInfo.description}</ListGroup.Item>
          <ListGroup.Item>Condition: {issueInfo.condition}</ListGroup.Item>
          <ListGroup.Item>Assigned to:</ListGroup.Item>
          {
            issueInfo.assignees.map((assignee) => (
              <ListGroup.Item variant="dark" key={assignee}>{assignee}</ListGroup.Item>
            ))
          }
          <ListGroup.Item>Comments:</ListGroup.Item>
          {
            issueInfo.comments.map((comment) => (
              <ListGroup.Item variant="dark" key={comment}>{comment}</ListGroup.Item>
            ))
          }
        </ListGroup>
        
      </Card.Body>
    </Card>
  );
};

export default IssueDetailsScreen;
