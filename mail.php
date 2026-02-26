<?php
	function sendMail($reciver, $subject, $html) {
		$headers  = "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/html; charset=UTF-8\r\n";
		$headers .= "From: Mailtester <noreply@glitchct.ftp.sh>\r\n";
		if (mail($reciver, $subject, $html, $headers)) {
			return true;
		} else {
			return false;
		}
	}
?>
