<?php
$hostname = 'localhost';
$username = 'root';
$password = '';
$dbname = "zadmin_car";
$port=3306;
$conn = mysqli_connect($hostname, $username, $password,$dbname,$port);

if (!$conn) {
 die('Không thể kết nối: ' . mysqli_error($conn));
 exit();
}
// echo 'Kết nối thành công';
echo 'Connect successfully !!!';
mysqli_set_charset($conn,"utf8");

// $sql = "SELECT * from users where  username='buihuudat' and password='1'";
// $result = $conn->query($sql);

// if ($result->num_rows > 0) {
//   // output data of each row
//   while($row = $result->fetch_assoc()) {
//     echo $row['ten'];
//   }
// } else {
//   echo "0 results";
// }

// $conn->close();

//mysql_set_charset('utf8', $con);
?>
