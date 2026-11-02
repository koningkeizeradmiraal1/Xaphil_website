<?php
/**
 * Gedeelde beveiliging voor mail.php en contact/verstuur.php
 *  1. Herkomstcheck  - alleen verzoeken vanaf de eigen website
 *  2. Tijdcheck      - formulier moet minimaal X seconden open hebben gestaan
 *  3. Limiet per IP  - maximaal X berichten per tijdvak
 */
if (basename($_SERVER['SCRIPT_FILENAME'] ?? '') === 'beveiliging.php') { http_response_code(404); exit; }

const XFS_DOMEINEN = ['xaphilfacilityservices.com', 'www.xaphilfacilityservices.com'];

/** 1. Komt het verzoek van onze eigen website? */
function xfs_herkomst_ok() {
    $bron = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? '');
    if ($bron === '' || $bron === 'null') return false;
    $host = strtolower((string)parse_url($bron, PHP_URL_HOST));
    return in_array($host, XFS_DOMEINEN, true);
}

/** 2. Heeft de bezoeker het formulier lang genoeg open gehad? (seconden, gemeten in de browser) */
function xfs_tijd_ok($verstreken, $minimum) {
    if ($minimum <= 0) return true;
    if (!is_numeric($verstreken)) return false;   // veld ontbreekt = bot
    return (float)$verstreken >= $minimum;
}

/** 3. Limiet per IP-adres: max $max berichten per $venster seconden, per formulier */
function xfs_limiet_ok($formulier, $max, $venster) {
    $map = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'xfs_limiet';
    if (!is_dir($map)) @mkdir($map, 0700, true);
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'onbekend';
    $bestand = $map . DIRECTORY_SEPARATOR . hash('sha256', $formulier . '|' . $ip) . '.json';

    $fp = @fopen($bestand, 'c+');
    if (!$fp) return true; // opslag niet beschikbaar: liever doorlaten dan echte klanten blokkeren
    flock($fp, LOCK_EX);
    $nu = time();
    $momenten = json_decode(stream_get_contents($fp) ?: '[]', true);
    if (!is_array($momenten)) $momenten = [];
    $momenten = array_values(array_filter($momenten, function ($t) use ($nu, $venster) { return ($nu - $t) < $venster; }));

    $toegestaan = count($momenten) < $max;
    if ($toegestaan) $momenten[] = $nu;

    ftruncate($fp, 0); rewind($fp);
    fwrite($fp, json_encode($momenten));
    flock($fp, LOCK_UN); fclose($fp);

    // Af en toe oude bestanden opruimen
    if (mt_rand(1, 50) === 1) {
        foreach (glob($map . DIRECTORY_SEPARATOR . '*.json') ?: [] as $f) {
            if (@filemtime($f) < $nu - 86400) @unlink($f);
        }
    }
    return $toegestaan;
}
