import React from 'react';
import { Link } from 'react-router-dom';


const Agreement = () => {
  return (
    <div>
      <h2><strong>Terms and Conditions</strong></h2><br></br>
      <h5><strong>Welcome to Coupainder App! By using our app, you agree to the following terms and conditions:</strong></h5><br></br>
      <ul>
        <li>You must be at least 18 years old to use our app.</li><br></br>
        <li>You agree to use our app only for its intended purposes and not for any illegal activities.</li><br></br>
        <li>You are solely responsible for the accuracy of the information you provide on our app.</li><br></br>
        <li>We reserve the right to modify, suspend or discontinue our app at any time without prior notice.</li><br></br>
        <li>We are not responsible for any loss or damage you may incur as a result of using our app.</li><br></br>
        <li>By using our app, you agree to our Privacy Policy and consent to the collection, use and disclosure of your personal information as described therein.</li><br></br>
        <li>These terms and conditions constitute the entire agreement between you and us with respect to your use of our app.</li><br></br>
      </ul>
      <p>If you have any questions about these terms and conditions or Login issues, please contact us at: <strong> info@Coupainder.com.</strong></p>
      <br></br><strong>Go Back to <Link to={"/PassRegister"}>Registration</Link></strong>


    </div>
  );
};

export default Agreement;
