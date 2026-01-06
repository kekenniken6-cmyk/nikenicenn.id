<?php
header("Content-Type: application/json");
include "php1.php";
$data = json_decode(file_get_contents("php://input"), true);

$Nama = $conn->real_escape_string($data['Nama']);
$No_Telepon = $conn->real_escape_string($data['No_Telepon']);
$Alamat = $conn->real_escape_string($data['Alamat']);
$Produk = $conn->real_escape_string(json_encode($data['Produk']));
$Total = $conn->real_escape_string($data['Total']);
$Status = $conn->real_escape_string($data['Status']);

$sql = "INSERT INTO orders 
(Nama, No_Telepon, Alamat, Produk, Total, Status_method)
VALUES
('$Nama','$No_Telepon','$Alamat','$Produk','$Total','$Status')";

if ($conn->query($sql)) {
  echo json_encode(["success"=>true]);
} else {
  echo json_encode(["success"=>false, "error"=>$conn->error]);
}
?>