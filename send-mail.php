<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = strip_tags(trim($_POST["name"] ?? ""));
    $email = filter_var(trim($_POST["email"] ?? ""), FILTER_SANITIZE_EMAIL);
    $nachricht = trim($_POST["nachricht"] ?? "");

    if (empty($name) || empty($email) || empty($nachricht) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Bitte füllen Sie alle Felder korrekt aus.";
        exit;
    }

    $empfaenger = "s.kurt001@gmail.de"; // hier deine E-Mail-Adresse eintragen
    $betreff = "Neue Kontakt-Anfrage von $name";
    $inhalt = "Name: $name\n";
    $inhalt .= "E-Mail: $email\n\n";
    $inhalt .= "Nachricht:\n$nachricht\n";

    $headers = "From: $name <$email>";

    if (mail($empfaenger, $betreff, $inhalt, $headers)) {
        http_response_code(200);
        echo "Nachricht erfolgreich versendet.";
    } else {
        http_response_code(500);
        echo "Fehler beim Senden der Nachricht.";
    }
} else {
    http_response_code(403);
    echo "Ungültige Anfrage.";
}
?>
