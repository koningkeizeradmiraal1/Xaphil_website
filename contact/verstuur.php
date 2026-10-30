<?php
/**
 * Contactformulier-handler Xaphil Facility Services
 * Vervangt FormSubmit.co: verstuurt de aanvraag via de eigen webserver.
 * Werkt zowel met fetch (AJAX, JSON-antwoord) als met een gewone POST (redirect).
 */

$ONTVANGER = 'info@xaphilfacilityservices.com';
$AFZENDER  = 'website@xaphilfacilityservices.com'; // moet op het eigen domein staan (SPF/DMARC)

$isAjax = (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false);

function antwoord($ok, $melding, $isAjax) {
    if ($isAjax) {
        header('Content-Type: application/json; charset=utf-8');
        http_response_code($ok ? 200 : 400);
        echo json_encode(['ok' => $ok, 'message' => $melding]);
    } else {
        header('Location: /contact/?verzonden=' . ($ok ? '1' : '0'));
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /contact/');
    exit;
}

// Spam: honeypot + minimale invultijd (3 sec)
if (!empty($_POST['website'])) antwoord(true, 'Bedankt!', $isAjax);
$start = isset($_POST['ts']) ? (int)$_POST['ts'] : 0;
if ($start > 0 && (time() - $start) < 3) antwoord(true, 'Bedankt!', $isAjax);

function veld($naam, $max = 200) {
    $w = isset($_POST[$naam]) ? trim((string)$_POST[$naam]) : '';
    return mb_substr($w, 0, $max, 'UTF-8');
}
function eenRegel($s) { return trim(preg_replace('/[\r\n\t]+/', ' ', $s)); }

$naam     = eenRegel(veld('naam', 120));
$bedrijf  = eenRegel(veld('bedrijf', 120));
$email    = eenRegel(veld('email', 160));
$telefoon = eenRegel(veld('telefoon', 40));
$dienst   = eenRegel(veld('dienst', 80));
$bericht  = veld('bericht', 5000);

if ($naam === '' || $bericht === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    antwoord(false, 'Vul uw naam, een geldig e-mailadres en een bericht in.', $isAjax);
}

$onderwerp = 'Nieuwe aanvraag via website: ' . ($dienst !== '' ? $dienst : 'contact') . ' - ' . $naam;

$tekst  = "Nieuwe aanvraag via xaphilfacilityservices.com/contact/\n";
$tekst .= str_repeat('-', 50) . "\n";
$tekst .= "Naam:      $naam\n";
$tekst .= "Bedrijf:   " . ($bedrijf !== '' ? $bedrijf : '-') . "\n";
$tekst .= "E-mail:    $email\n";
$tekst .= "Telefoon:  " . ($telefoon !== '' ? $telefoon : '-') . "\n";
$tekst .= "Dienst:    " . ($dienst !== '' ? $dienst : '-') . "\n";
$tekst .= str_repeat('-', 50) . "\n\n";
$tekst .= $bericht . "\n\n";
$tekst .= str_repeat('-', 50) . "\n";
$tekst .= 'Verzonden op ' . date('d-m-Y H:i') . ' vanaf IP ' . ($_SERVER['REMOTE_ADDR'] ?? '?') . "\n";
$tekst .= "Beantwoorden? Klik op 'Antwoorden' - het gaat direct naar de klant.\n";

$headers  = 'From: =?UTF-8?B?' . base64_encode('Website Xaphil Facility Services') . "?= <$AFZENDER>\r\n";
$headers .= 'Reply-To: =?UTF-8?B?' . base64_encode($naam) . "?= <$email>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$verstuurd = mail(
    $ONTVANGER,
    '=?UTF-8?B?' . base64_encode($onderwerp) . '?=',
    $tekst,
    $headers,
    '-f' . $AFZENDER
);

if ($verstuurd) {
    antwoord(true, 'Bedankt! Uw aanvraag is verstuurd. We nemen zo snel mogelijk contact met u op.', $isAjax);
} else {
    antwoord(false, 'Versturen is helaas mislukt. Bel ons op 085 06 06 838 of mail naar info@xaphilfacilityservices.com.', $isAjax);
}
