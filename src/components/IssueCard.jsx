import { Card, ListGroup, Button, Accordion } from 'react-bootstrap';
import { useDeleteIssueMutation } from '../slices/issueApiSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentIssue } from '../slices/issueSlice';
import '../style.css'

const IssueCard = ({ issueProps }) => {
  const { issueInfo } = useSelector((state) => state.issue);
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [deleteIssue, { isLoading }] = useDeleteIssueMutation();

  const clickHandler = () => {
    console.log(issueProps);
    dispatch(setCurrentIssue(issueProps));
  }

  return (
    <Card className="issue-card-select p-3 mb-2 bg-body rounded" border="secondary">
      <Card.Body className={issueProps.priority}>

        <Card.Header className={`issue-card-title`}>
          <Card.Link className="black-link" href="/issue-details" onClick={() => {clickHandler()}}>Title: {issueProps.title}</Card.Link>
        </Card.Header>

        <ListGroup>
          <ListGroup.Item>Priority: {issueProps.priority}</ListGroup.Item>
          <ListGroup.Item>Category: {issueProps.category}</ListGroup.Item>
          <ListGroup.Item>Condition: {issueProps.condition}</ListGroup.Item>
        </ListGroup>

      </Card.Body>
    </Card>
  );
};

export default IssueCard;
