<?php
/**
 * Algemene mail-handler voor de formulieren op xaphilfacilityservices.com
 * Vervangt FormSubmit.co. Ontvangt JSON: { "_form": "...", "_subject": "...", veld: waarde, ... }
 * De ontvanger wordt hier op de server bepaald (nooit door de browser), zodat niemand
 * dit script kan misbruiken om naar willekeurige adressen te mailen.
 */

$FORMULIEREN = [
    'glasbewassing'   => 'info@xaphilfacilityservices.com',
    'beschikbaarheid' => 'personeel@xaphil.com',
];
$AFZENDER = 'website@xaphilfacilityservices.com'; // moet op het eigen domein staan (SPF/DMARC)

header('Content-Type: application/json; charset=utf-8');
function klaar($ok, $code = 200, $msg = '') {
    http_response_code($code);
    echo json_encode(['ok' => $ok, 'message' => $msg]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') klaar(false, 405, 'Alleen POST');

$ruw = file_get_contents('php://input', false, null, 0, 50000);
$data = json_decode($ruw, true);
if (!is_array($data)) $data = $_POST; // ook gewone formulier-POST accepteren

$form = isset($data['_form']) ? (string)$data['_form'] : '';
if (!isset($FORMULIEREN[$form])) klaar(false, 400, 'Onbekend formulier');
if (!empty($data['_honey']) || !empty($data['website'])) klaar(true); // spam: stil negeren

$ontvanger = $FORMULIEREN[$form];
$enkel = function ($s, $max) { return mb_substr(trim(preg_replace('/[\r\n\t]+/', ' ', (string)$s)), 0, $max, 'UTF-8'); };

$onderwerp = $enkel($data['_subject'] ?? 'Nieuwe aanvraag via de website', 150);

// Velden opbouwen (alles behalve interne _velden)
$regels = [];
$replyTo = '';
$n = 0;
foreach ($data as $k => $v) {
    if (!is_string($k) || $k === '' || $k[0] === '_' || $k === 'website') continue;
    if (is_array($v)) $v = implode(', ', $v);
    if (++$n > 40) break;
    $sleutel = $enkel($k, 60);
    $waarde  = mb_substr(trim((string)$v), 0, 3000, 'UTF-8');
    $regels[] = str_pad($sleutel . ':', 24) . ($waarde !== '' ? $waarde : '-');
    if ($replyTo === '' && preg_match('/^e-?mail/i', $k) && filter_var(trim((string)$v), FILTER_VALIDATE_EMAIL)) {
        $replyTo = trim((string)$v);
    }
}
if (!$regels) klaar(false, 400, 'Leeg formulier');

$tekst  = "$onderwerp\n" . str_repeat('-', 50) . "\n";
$tekst .= implode("\n", $regels) . "\n";
$tekst .= str_repeat('-', 50) . "\n";
$tekst .= 'Verzonden op ' . date('d-m-Y H:i') . " via xaphilfacilityservices.com\n";

$headers  = 'From: =?UTF-8?B?' . base64_encode('Website Xaphil Facility Services') . "?= <$AFZENDER>\r\n";
if ($replyTo !== '') $headers .= "Reply-To: <$replyTo>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";

$ok = mail($ontvanger, '=?UTF-8?B?' . base64_encode($onderwerp) . '?=', $tekst, $headers, '-f' . $AFZENDER);
$ok ? klaar(true) : klaar(false, 500, 'Versturen mislukt');
