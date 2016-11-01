<?php
    $email_to = "coneill@linux.org";
    $email_subject = "Website Form Message";

    // Generate error for 'graceful' die
    function died($error) {
        echo "<div id='response'><h1>We are very sorry, but there were errors found with the form you submitted.</h1><br /><br /><br /><p><ul>";
        echo $error."";
        echo "</div>";
        die();
    }

    // Check expected data is present
    if(!isset($_GET['name']) ||
        !isset($_GET['email']) ||
        !isset($_GET['subject']) ||
        !isset($_GET['message'])) {
        died('Please ensure all fields are filled out.');
    }

    $name = $_GET['name'];
    $email = $_GET['email'];
    $subject = $_GET['subject'];
    $message = $_GET['message'];

    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/'; // From php.net
    $string_exp = "/^[A-Za-z .'-]+$/"; // From php.net

    if(!preg_match($email_exp,$email)) {
        $error_message .= '<li>The Email Address you entered does not appear to be valid.</li>';
    }

    if(!preg_match($string_exp,$name)) {
        $error_message .= '<li>The Name you entered does not appear to be valid.</li>';
    }

    if(strlen($subject) < 2) {
        $error_message .= '<li>The Comments you entered do not appear to be valid.</li>';
    }

    if(strlen($message) < 2) {
        $error_message .= '<li>The Comments you entered do not appear to be valid.</li>';
    }

    if(strlen($error_message) > 0) {
        died($error_message);
    }

    $email_message = "Form details below.\n\n";

    function clean_string($string) {
        $bad = array("content-type","bcc:","to:","cc:","href");
        return str_replace($bad,"",$string);
    }

    $email_message .= "Name: ".clean_string($name)."\n";
    $email_message .= "Email: ".clean_string($email)."\n";
    $email_message .= "Sent on: ".date('d/m/y g:i A', time()+21600)."\n";
    $email_message .= "Subject: ".clean_string($subject)."\n";
    $email_message .= "Message: ".clean_string($message)."\n";

    // Generate email headers  -  From php.net
    $headers = 'From: '.$email."\r\n".'Reply-To: '.$email."\r\n".'X-Mailer: PHP/' . phpversion();
    @mail($email_to, $email_subject, $email_message, $headers);
    @mail($email_to_also, $email_subject, $email_message, $headers);

    echo "<h2 id='response'>Your message was sent successfully!</h2>";
?>
