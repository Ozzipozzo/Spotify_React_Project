<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

try {
    $db = new PDO("mysql:host=localhost;dbname=spotify;", "root", "abdelpci");
} catch (Exception $e) {
    $return["success"] = false;
    $return["message"] = "Connexion à la base de données impossible.";
}

// Albums
$albums = $db->prepare("SELECT * FROM `albums` LIMIT 14");
$albums->execute();
$albums_home = $albums->fetchAll();
$api['albums_home'] = $albums_home;

$albums = $db->prepare("SELECT * FROM `albums`");
$albums->execute();
$albumsJSON = $albums->fetchAll();
$api['albums_full'] = $albumsJSON;

$artists_album = $db->prepare("SELECT * FROM artists 
INNER JOIN albums WHERE artists.id = albums.artist_id");
$artists_album->execute();
$artists_JSON = $artists_album->fetchAll();
$api["artist_id"] = $artists_JSON;

$artists = $db->prepare("SELECT * FROM `artists` LIMIT 14");
$artists->execute();
$artistsJSON = $artists->fetchAll();
$api["artists_home"] = $artistsJSON;

$artists = $db->prepare("SELECT * FROM `artists`");
$artists->execute();
$artistsJSON = $artists->fetchAll();
$api["artists_full"] = $artistsJSON;

// // Genre
$genres = $db->prepare("SELECT * FROM `genres`");
$genres->execute();
$genresJSON = $genres->fetchAll();
$api['genres'] = $genresJSON;

// // Genre albums
$genres_albums = $db->prepare("SELECT * FROM `genres_albums`");
$genres_albums->execute();
$genres_albumsJSON = $genres_albums->fetchAll();
$api['genres_albums'] = $genres_albumsJSON;

// // Tracks
$tracks = $db->prepare("SELECT * FROM `tracks`");
$tracks->execute();
$tracksJSON = $tracks->fetchAll();
$api['tracks'] = $tracksJSON;

$a = json_encode($api, JSON_FORCE_OBJECT);
echo $a;





// // Artists

// $get_tracks = $db->prepare("SELECT albums.id, albums.name AS 'Album', tracks.name AS 'titre', tracks.mp3 FROM tracks JOIN albums ON tracks.album_id = albums.id LIMIT 20");
// $get_tracks->execute();
// $tracks_json = $get_tracks->fetchAll();
// $api["tracks_album"] = $tracks_json;

// $artists_album_track = $db->prepare("SELECT * FROM artists INNER JOIN albums ON artists.id = albums.artist_id INNER JOIN tracks ON albums.id = tracks.album_id");
// $artists_album_track->execute();
// $artists_track = $artists_album_track->fetchAll();
// $api["artist_album_track"] = $artists_track;