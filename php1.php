<?php
$conn = new mysqli("localhost", "root", "", "icenn_shop");
if ($conn->connect_error) {
  die("Koneksi gagal");
}
?>