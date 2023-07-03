import { Card, ListGroup, Button } from 'react-bootstrap';
import '../style.css'
import editImg from '../assets/edit.png';
import editAdminImg from '../assets/edit-admin.png';
import headerImg from '../assets/header.png';
import headerAdminImg from '../assets/header-admin.png';
import issueColorsImg from '../assets/issue-colors.png';
import issueDetailsImg from '../assets/issue-details.png';

const AboutScreen = () => {
  return (
  	<>
	  	<h1>About</h1>

	  	<p>
	  	Bugsy was developed to assist the managing of issues that arise in the development of software. <br/>
	  	Below you will find some detailed explanations about the application.
	  	</p>

	  	<Card className="m-4" border="secondary">
	  		<Card.Header>
	      	Restricted Actions
	      </Card.Header>
	      <Card.Body>
	      	Some actions can only be performed by administrators. <br /><br />

	      	These actions are: <br />
	      	&bull; Creating an issue; <br />
	      	&bull; Assigning or reassigning an issue; <br />
	      	&bull; Deleting an issue. <br /><br />

	      	Administrators are allowed to perform these actions to any issue, regardless of wether or not the issue was created by the admin. <br /><br />

	      	An issue can have any of its fields edited by admins, but it can also have a few of its fields edited by the developers the issue was assigned to.<br /><br />

	      	<div>
	      		<h6>Header for a regular user.</h6>
		      	<img
		      	src={headerImg}
		      	alt="regular header"
		      	width="1200"
		      	height="60"
		      	/>
	      	</div>
	      	<div>
	      		<h6>Header for an admin.</h6>
		      	<img
		      	src={headerAdminImg}
		      	alt="admin header"
		      	width="1200"
		      	height="60"
		      	/>
	      	</div>
	      </Card.Body>
	  	</Card>

	  	<Card className="m-4" border="secondary">
	  		<Card.Header>
	      	An issue's fields
	      </Card.Header>
	      <Card.Body>
	      	All issues have the following fields: <br /><br />

	      	&bull; Title;<br />
	      	&bull; Category (what kind of issue it is: if its related to the UI, to the data input, etc.);<br />
	      	&bull; Piority (can be one of four values: low, medium, high or urgent);<br />
	      	&bull; Description;<br />
	      	&bull; Assignees (users this issue has been assigned to);<br />
	      	&bull; Condition (can be one of two values: resolved or unresolved);<br /><br />
	      </Card.Body>
	  	</Card>

	  	<Card className="m-4" border="secondary">
	  		<Card.Header>
	      	Developer Feedback
	      </Card.Header>

	      <Card.Body>
	      	The developers assigned to an issue can give their feedback about the process through comments. <br/><br/>

	      	<div>
	      		<h6>Issue details showing the comments made.</h6>
		      	<img
		      	src={issueDetailsImg}
		      	alt="issue details showing comments"
		      	width="1200"
		      	height="500"
		      	/>
	      	</div>
	      </Card.Body>
	  	</Card>

	  	<Card className="m-4" border="secondary">
	  		<Card.Header>
	      	Color Coding of Issues
	      </Card.Header>

	      <Card.Body>
	      	The issues are color coded based on their priority so that the more urgent issues can stand out. <br/><br/>
	      	This is the relation between priority and color: <br/>
	      	&bull; Low - Blue; <br/>
	      	&bull; Medium - Green; <br/>
	      	&bull; High - Orange; <br/>
	      	&bull; Urgent - Red. <br/><br/>
	      	
	      	<div>
	      		<h6>Issue details showing the comments made.</h6>
		      	<img
		      	src={issueColorsImg}
		      	alt="issues with different priorities"
		      	width="1200"
		      	height="800"
		      	/>
	      	</div>
	      </Card.Body>
	  	</Card>

	  	<Card className="m-4" border="secondary">
	  		<Card.Header>
	      	Future Additions
	      </Card.Header>

	      <Card.Body>
	      	These features will be present on a future version of this application.<br/><br/>
	      	&bull; Search feature to allow issues to be found by title; <br/>
	      	&bull; Add 'steps' field to the issue model, detailing the steps to be followed to recreate the bug; <br/>
	      	&bull; Notifications to admins and assignees about an issue's editing; <br/>
	      	&bull; Allow issues to be sorted based on priority. <br/>
	      </Card.Body>
	  	</Card>

    </>
  );
};

export default AboutScreen;
