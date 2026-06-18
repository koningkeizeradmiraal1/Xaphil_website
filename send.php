<?php
// Xaphil Facility Services — formulierafhandeling (eigen mailscript)
// Verstuurt formulierinzendingen naar de juiste mailbox. Geen externe diensten.

header('Content-Type: application/json; charset=utf-8');

// Ontvangers staan hier serverside vast (kan de bezoeker niet wijzigen)
$recipients = array(
  'contact'         => 'info@xaphilfacilityservices.com',
  'glasbewassing'   => 'info@xaphilfacilityservices.com',
  'beschikbaarheid' => 'personeel@xaphil.com',
);

$fromName    = 'Xaphil Facility Services website';
$fromAddress = 'info@xaphilfacilityservices.com';

// Inkomende data: JSON (fetch) of gewoon formulier (POST)
$ctype = isset($_SERVER['CONTENT_TYPE']) ? $_SERVER['CONTENT_TYPE'] : '';
if (stripos($ctype, 'application/json') !== false) {
  $data = json_decode(file_get_contents('php://input'), true);
  if (!is_array($data)) $data = array();
} else {
  $data = $_POST;
}

$wantsJson = (stripos($ctype, 'application/json') !== false)
  || (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest')
  || (isset($_SERVER['HTTP_ACCEPT']) && stripos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false);

function respond($ok, $msg = '') {
  global $wantsJson, $data;
  if ($wantsJson) {
    echo json_encode(array('success' => $ok, 'message' => $msg));
  } else {
    $back = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '/';
    $sep = (strpos($back, '?') === false) ? '?' : '&';
    header('Location: ' . $back . $sep . 'verzonden=' . ($ok ? '1' : '0'));
  }
  exit;
}

// Honeypot tegen spam: als dit veld gevuld is, doen we alsof het gelukt is
if (!empty($data['_honey'])) respond(true);

$form = isset($data['form']) ? preg_replace('/[^a-z]/', '', strtolower($data['form'])) : '';
if (!isset($recipients[$form])) respond(false, 'Onbekend formulier.');
$to = $recipients[$form];

// Onderwerp (zonder regeleindes i.v.m. header-injectie)
$subject = isset($data['_subject']) ? $data['_subject'] : ('Nieuw bericht via website (' . $form . ')');
$subject = trim(str_replace(array("\r", "\n"), ' ', $subject));

// Reply-to = e-mailadres van de bezoeker, mits geldig
$replyTo = '';
foreach (array('Email', 'E-mailadres', 'email') as $k) {
  if (!empty($data[$k]) && filter_var($data[$k], FILTER_VALIDATE_EMAIL)) { $replyTo = $data[$k]; break; }
}

// Tekst opbouwen uit alle velden (behalve interne velden)
$skip = array('_honey', '_subject', '_template', '_captcha', '_next', 'form');
$lines = array();
foreach ($data as $k => $v) {
  if (in_array($k, $skip, true)) continue;
  if (is_array($v)) $v = implode(', ', $v);
  $lines[] = $k . ': ' . $v;
}
$body = implode("\n", $lines) . "\n\n— Verzonden via xaphilfacilityservices.com";

// Headers
$headers  = 'From: ' . $fromName . ' <' . $fromAddress . '>' . "\r\n";
if ($replyTo) $headers .= 'Reply-To: ' . $replyTo . "\r\n";
$headers .= 'Content-Type: text/plain; charset=UTF-8' . "\r\n";
$headers .= 'X-Mailer: PHP/Xaphil';

$subjectEnc = '=?UTF-8?B?' . base64_encode($subject) . '?=';

$ok = @mail($to, $subjectEnc, $body, $headers);
respond($ok ? true : false, $ok ? 'Verzonden' : 'Verzenden mislukt');
