<?php
require_once("server.php"); //add code php file server vào trong file api.php
$event = $_POST['event']; //Lấy giá trị từ biến event từ client gửi lên theo dạng post  
switch ($event) {
  case "login":
    $mang=array();
      $username=$_POST['username'];
      $password=sha1($_POST['password']);
      $rs=mysqli_query($conn,"SELECT * from users where  username='".$username."' and password='".$password."'");
      if(mysqli_num_rows($rs)>0){
      while ($rows=mysqli_fetch_array($rs)){
        $usertemp['username']=$rows['username'];
        $usertemp['password']=$rows['password'];
        $usertemp['fullname']=$rows['fullname'];
        $usertemp['gmail']=$rows['gmail'];
        $usertemp['avartar']=$rows['avartar'];
        $usertemp['permission']=$rows['permission'];
        array_push($mang,$usertemp);
      }
          $jsondata['success'] =1;
          $jsondata['items'] =$mang;
          echo json_encode($jsondata);
      }
      else{
      $jsondata['success'] =0;
      $jsondata['items'] =$mang;
      echo json_encode($jsondata);
      }
      mysqli_close($conn);
    break;
  
  case "signup":
    $fullname=$_POST['fullname'];
    $mail=$_POST['mail'];
    $usernamesu=$_POST['usernamesu'];
    $passwordsu=$_POST['passwordsu'];
    $rs=mysqli_query($conn, "SELECT count(*) as 'total' from users where username = '".$usernamesu."'");
    $row=mysqli_fetch_array($rs);
    if((int)$row['total'] > 0) {
      $res["success"] = 2;
    } else {
      $sql = "insert into `users`(`username`,`password`,`fullname`,`gmail`,`permission`,`avartar`) values ('".$usernamesu."','".$passwordsu."','".$fullname."','".$mail."','2','')";
      if (mysqli_query(($conn), $sql)) {
        if (mysqli_affected_rows($conn) > 0) {
          $res["success"] = 1;
        } else { 
          $res["success"] = 0;
        }
      } else {
        $res["success"] = $sql;
      }
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
  
  case "changePasss":
    $passn = sha1($_POST['passn']);
    $passo = sha1($_POST['passo']);
    $username = $_POST['username'];
    $sql = "update `users` set password = '".$passn."' where username = '".$username."' and password = '".$passo."'";
    if (mysqli_query($conn,$sql)) {
      if(mysqli_affected_rows($conn)>0){
        $res["success"] = 1;
      }
      else
      {
        $res["success"] = $sql;
      }
          } else {
              $res["success"] = $sql;
          }
        echo json_encode($res);
        mysqli_close($conn);
    break;

  case "insertKH":
    $makh = $_POST['makh'];
    $tenkh = $_POST['tenkh'];
    $tuoikh = $_POST['tuoikh'];
    $sdtkh = $_POST['sdtkh'];
    $mailkh = $_POST['mailkh'];


    $rs = mysqli_query($conn, "SELECT COUNT(*) as 'total' from  khach_hang where ID_khach_hang='" . $makh . "' ");
    $row = mysqli_fetch_array($rs);
    if ((int)$row['total'] > 0) {
      $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
    } else {
      $sql = "INSERT INTO `khach_hang`(`id_khach_hang`, `ten`,`tuoi`,`sdt`,`email`) VALUES ('" . $makh . "','" . $tenkh . "','" . $tuoikh . "','" . $sdtkh . "','" . $mailkh . "')";
      if (mysqli_query($conn, $sql)) {
        if (mysqli_affected_rows($conn) > 0) {
          $res["success"] = 1; //Insert dữ liệu thành công
        } else {
          $res["success"] = 0; 
        }
      } else {
        $res["success"] = 0;  
      }
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;

    // khach hang
  case "updateKH":
    $makh = $_POST['makh'];
    $tenkh = $_POST['tenkh'];
    $tuoikh = $_POST['tuoikh'];
    $sdtkh = $_POST['sdtkh'];
    $mailkh = $_POST['mailkh'];
    //Viết câu lệnh update có điều kiện where matl=biến client
    $sql = "update khach_hang set ten='" . $tenkh . "', tuoi = '" . $tuoikh . "', sdt = '" . $sdtkh . "', email = '" . $mailkh . "' where ID_khach_hang='" . $makh . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = 0; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
  case "deleteKH":
    $makh = $_POST['makh'];
    //Kiểm tra matl có xuất các bảng (table khác  ? nếu có thì không xóa)
    $sql = "delete from khach_hang  where ID_khach_hang='" . $makh . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = $sql; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
    //Get tất cả các TheLoai
  case "getALLKH":
    $mang = array();
    $sql = mysqli_query($conn, "SELECT * from khach_hang");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['makh'] = $rows['ID_khach_hang'];
      $usertemp['tenkh'] = $rows['ten'];
      $usertemp['tuoikh'] = $rows['tuoi'];
      $usertemp['sdtkh'] = $rows['sdt'];
      $usertemp['mailkh'] = $rows['email'];
      array_push($mang, $usertemp);
    }
    $jsonData['items'] = $mang; //{items:[{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'}]}
    echo json_encode($jsonData);
    mysqli_close($conn);
    break;

    //  dia chi
  case "insertDC":
    $iddc = $_POST['iddc'];
    $idkhdc = $_POST['idkhdc'];
    $dc1 = $_POST['dc1'];
    $dc2 = $_POST['dc2'];
    $dc3 = $_POST['dc3'];
    $qt = $_POST['qt'];
    $tptt = $_POST['tptt'];
    $qg = $_POST['qg'];
    $zc = $_POST['zc'];
    $dck = $_POST['dck'];
    $rs = mysqli_query($conn, "SELECT COUNT(*) as 'total' from  dia_chi where ID_dia_chi='" . $iddc . "' ");
    $row = mysqli_fetch_array($rs);
    if ((int)$row['total'] > 0) {
      $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
    } else {
      $sql = "INSERT INTO `dia_chi`(`ID_dia_chi`, `ID_khach_hang`,`dia_chi_1`,`dia_chi_2`,`dia_chi_3`,`quan_tinh`,`thanh_pho_thi_tran`,`quoc_gia`,`zip_code`,`dia_chi_khac`) VALUES ('" . $iddc . "','" . $idkhdc . "','" . $dc1 . "','" . $dc2 . "','" . $dc3 . "','" . $qt . "', '" . $tptt . "','" . $qg . "','" . $zc . "','" . $dck . "')";
      if (mysqli_query($conn, $sql)) {
        if (mysqli_affected_rows($conn) > 0) {
          $res["success"] = 1; //Insert dữ liệu thành công
        } else {
          $res["success"] = 3; 
        }
      } else {
        $res["success"] = $sql;  
      }
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;

  case "updateDC":
    $iddc = $_POST['iddc'];
    $idkhdc = $_POST['idkhdc'];
    $dc1 = $_POST['dc1'];
    $dc2 = $_POST['dc2'];
    $dc3 = $_POST['dc3'];
    $qt = $_POST['qt'];
    $tptt = $_POST['tptt'];
    $qg = $_POST['qg'];
    $zc = $_POST['zc'];
    $dck = $_POST['dck'];
    //Viết câu lệnh update có điều kiện where matl=biến client
    $sql = "update dia_chi set id_khach_hang='" . $idkhdc . "', dia_chi_1 = '" . $dc1 . "', dia_chi_2 = '" . $dc2 . "', dia_chi_3 = '" . $dc3 . "', quan_tinh = '" . $qt . "', thanh_pho_thi_tran = '" . $tptt . "', quoc_gia = '" . $qg . "', zip_code = '" . $zc . "', dia_chi_khac = '" . $dck . "' where ID_dia_chi='" . $iddc . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = 0; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
  case "deleteDC":
    $iddc = $_POST['iddc'];
    //Kiểm tra matl có xuất các bảng (table khác  ? nếu có thì không xóa)
    $sql = "delete from dia_chi  where ID_dia_chi='" . $iddc . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = $sql; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
    //Get tất cả các TheLoai
  case "getALLDC":
    $mang = array();
    $sql = mysqli_query($conn, "SELECT * from dia_chi");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['iddc'] = $rows['ID_dia_chi'];
      $usertemp['idkhdc'] = $rows['ID_khach_hang'];
      $usertemp['dc1'] = $rows['dia_chi_1'];
      $usertemp['dc2'] = $rows['dia_chi_2'];
      $usertemp['dc3'] = $rows['dia_chi_3'];
      $usertemp['qt'] = $rows['quan_tinh'];
      $usertemp['tptt'] = $rows['thanh_pho_thi_tran'];
      $usertemp['qg'] = $rows['quoc_gia'];
      $usertemp['zc'] = $rows['zip_code'];
      $usertemp['dck'] = $rows['dia_chi_khac'];
      array_push($mang, $usertemp);
    }
    $jsonData['items'] = $mang; //{items:[{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'}]}
    echo json_encode($jsonData);
    mysqli_close($conn);
    break;
    // so thich khach hang
  case "insertstkh":
    $idst = $_POST['idst'];
    $idddstkh = $_POST['idddstkh'];
    $idkhstkh = $_POST['idkhstkh'];

    $rs = mysqli_query($conn, "SELECT COUNT(*) as 'total' from  so_thich_Khach_hang where ID_so_thich='" . $idst . "' ");
    $row = mysqli_fetch_array($rs);
    if ((int)$row['total'] > 0) {
      $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
    } else {
      $sql = "INSERT INTO `so_thich_Khach_hang`(`ID_so_thich`, `ID_dac_diem`,`ID_khach_hang`) VALUES ('" . $idst . "','" . $idddstkh . "','" . $idkhstkh . "')";
      if (mysqli_query($conn, $sql)) {
        if (mysqli_affected_rows($conn) > 0) {
          $res["success"] = 1; //Insert dữ liệu thành công
        } else {
          $res["success"] = 0; 
        }
      } else {
        $res["success"] = 0;  
      }
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;

    // khach hang
  case "updatestkh":
    $idst = $_POST['idst'];
    $idddstkh = $_POST['idddstkh'];
    $idkhstkh = $_POST['idkhstkh'];
    $sql = "update so_thich_Khach_hang set ID_dac_diem='" . $idddstkh . "', ID_khach_hang = '" . $idkhstkh . "' where ID_so_thich = '" . $idst . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = 0; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
  case "deletestkh":
    $idst = $_POST['idst'];
    //Kiểm tra matl có xuất các bảng (table khác  ? nếu có thì không xóa)
    $sql = "delete from so_thich_Khach_hang  where ID_so_thich='" . $idst . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = $sql; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
    //Get tất cả các TheLoai
  case "getALLstkh":
    $mang = array();
    $sql = mysqli_query($conn, "SELECT * from so_thich_Khach_hang");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['idst'] = $rows['ID_so_thich'];
      $usertemp['idddstkh'] = $rows['ID_dac_diem'];
      $usertemp['idkhstkh'] = $rows['ID_khach_hang'];
      array_push($mang, $usertemp);
    }
    $jsonData['items'] = $mang; //{items:[{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'}]}
    echo json_encode($jsonData);
    mysqli_close($conn);
    break;

    // xe ban
  case "insertXB":
    $idxb = $_POST['idxb'];
    $tnsxxb = $_POST['tnsxxb'];
    $mmhxb = $_POST['mmhxb'];
    $mlxxb = $_POST['mlxxb'];
    $gxb = $_POST['gxb'];
    $slxb = $_POST['slxb'];
    $nmxb = $_POST['nmxb'];
    $ndkxb = $_POST['ndkxb'];
    $tttxb = $_POST['tttxb'];

    $rs = mysqli_query($conn, "SELECT COUNT(*) as 'total' from  xe_ban where ID_xe_ban='" . $idxb . "' ");
    $row = mysqli_fetch_array($rs);
    if ((int)$row['total'] > 0) {
      $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
    } else {
      $sql = "INSERT INTO `xe_ban`(`ID_xe_ban`, `ten_nsx`,`ma_mo_hinh`,`ma_loai_xe`,`gia`,`so_luong`,`ngay_mua`,`nam_dang_ki`,`thong_tin_khac`) VALUES ('" . $idxb . "','" . $tnsxxb . "','" . $mmhxb . "','" . $mlxxb . "','" . $gxb . "','" . $slxb . "','" . $nmxb . "','" . $ndkxb . "','" . $tttxb . "')";
      if (mysqli_query($conn, $sql)) {
        if (mysqli_affected_rows($conn) > 0) {
          $res["success"] = 1; //Insert dữ liệu thành công
        } else {
          $res["success"] = 0; 
        }
      } else {
        $res["success"] = $sql;  
      }
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;

    // khach hang
  case "updateXB":
    $idxb = $_POST['idxb'];
    $tnsxxb = $_POST['tnsxxb'];
    $mmhxb = $_POST['mmhxb'];
    $mlxxb = $_POST['mlxxb'];
    $gxb = $_POST['gxb'];
    $slxb = $_POST['slxb'];
    $nmxb = $_POST['nmxb'];
    $ndkxb = $_POST['ndkxb'];
    $tttxb = $_POST['tttxb'];
    //Viết câu lệnh update có điều kiện where matl=biến client
    $sql = "update xe_ban set ten_nsx ='" . $tnsxxb . "', ma_mo_hinh = '" . $mmhxb . "', ma_loai_xe = '" . $mlxxb . "', gia = '" . $gxb . "', so_luong = '" . $slxb . "', ngay_mua = '" . $nmxb . "', nam_dang_ki = '" . $ndkxb . "', thong_tin_khac = '" . $tttxb . "' where ID_xe_ban='" . $idxb . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = 0; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
  case "deleteXB":
    $idxb = $_POST['idxb'];
    //Kiểm tra matl có xuất các bảng (table khác  ? nếu có thì không xóa)
    $sql = "delete from xe_ban  where ID_xe_ban='" . $idxb . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = 0; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
    //Get tất cả các TheLoai
  case "getALLXB":
    $mang = array();
    $sql = mysqli_query($conn, "SELECT * from xe_ban");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['idxb'] = $rows['ID_xe_ban'];
      $usertemp['tnsxxb'] = $rows['ten_nsx'];
      $usertemp['mmhxb'] = $rows['ma_mo_hinh'];
      $usertemp['mlxxb'] = $rows['ma_loai_xe'];
      $usertemp['gxb'] = $rows['gia'];
      $usertemp['slxb'] = $rows['so_luong'];
      $usertemp['nmxb'] = $rows['ngay_mua'];
      $usertemp['ndkxb'] = $rows['nam_dang_ki'];
      $usertemp['tttxb'] = $rows['thong_tin_khac'];
      array_push($mang, $usertemp);
    }
    $jsonData['items'] = $mang; //{items:[{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'}]}
    echo json_encode($jsonData);
    mysqli_close($conn);
    break;



    // dac diem xe
  case "insertDD":
    $idddddx = $_POST['idddddx'];
    $mttn = $_POST['mttn'];

    $rs = mysqli_query($conn, "SELECT COUNT(*) as 'total' from  dac_diem_xe where ID_dac_diem='" . $idddddx . "' ");
    $row = mysqli_fetch_array($rs);
    if ((int)$row['total'] > 0) {
      $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
    } else {
      $sql = "INSERT INTO `dac_diem_xe`(`ID_dac_diem`, `mo_ta_tinh_nang`) VALUES ('" . $idddddx . "','" . $mttn . "')";
      if (mysqli_query($conn, $sql)) {
        if (mysqli_affected_rows($conn) > 0) {
          $res["success"] = 1; //Insert dữ liệu thành công
        } else {
          $res["success"] = 0; 
        }
      } else {
        $res["success"] = 0;  
      }
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
  case "updateDD":
    $idddddx = $_POST['idddddx'];
    $mttn = $_POST['mttn'];
    $sql = "update dac_diem_xe set mo_ta_tinh_nang='" . $mttn . "' where ID_dac_diem = '" . $idddddx . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = 0; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
  case "deleteDD":
    $idddddx = $_POST['idddddx'];
    //Kiểm tra matl có xuất các bảng (table khác  ? nếu có thì không xóa)
    $sql = "delete from dac_diem_xe  where ID_dac_diem='" . $idddddx . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = $sql; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
    //Get tất cả các TheLoai
  case "getALLDD":
    $mang = array();
    $sql = mysqli_query($conn, "SELECT * from dac_diem_xe");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['idddddx'] = $rows['ID_dac_diem'];
      $usertemp['mttn'] = $rows['mo_ta_tinh_nang'];
      array_push($mang, $usertemp);
    }
    $jsonData['items'] = $mang;
    echo json_encode($jsonData);
    mysqli_close($conn);
    break;

    // xe đã bán
  case "insertXDB":
    $idxdb = $_POST['idxdb'];
    $idxbxdb = $_POST['idxbxdb'];
    $idkhxdb = $_POST['idkhxdb'];
    $gtt = $_POST['gtt'];
    $nb = $_POST['nb'];
    $tttht = $_POST['tttht'];
    $nttht = $_POST['nttht'];
    $tttxdb = $_POST['tttxdb'];
    $rs = mysqli_query($conn, "SELECT COUNT(*) as 'total' from  xe_da_ban where ID_xe_da_ban='" . $idxdb . "' ");
    $row = mysqli_fetch_array($rs);
    if ((int)$row['total'] > 0) {
      $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
    } else {
      $sql = "INSERT INTO `xe_da_ban`(`ID_xe_da_ban`, `ID_xe_ban`,`ID_khach_hang`,`gia_thoai_thuan`,`ngay_ban`,`tien_tt_hang_thang`,`ngay_tt_hang_thang`,`thong_tin_them`) VALUES ('" . $idxdb . "','" . $idxbxdb . "','" . $idkhxdb . "','" . $gtt . "','" . $nb . "','" . $tttht . "', '" . $nttht . "','" . $tttxdb . "')";
      if (mysqli_query($conn, $sql)) {
        if (mysqli_affected_rows($conn) > 0) {
          $res["success"] = 1; //Insert dữ liệu thành công
        } else {
          $res["success"] = 0; 
        }
      } else {
        $res["success"] = 0;  
      }
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;

  case "updateXDB":
    $idxdb = $_POST['idxdb'];
    $idxbxdb = $_POST['idxbxdb'];
    $idkhxdb = $_POST['idkhxdb'];
    $gtt = $_POST['gtt'];
    $nb = $_POST['nb'];
    $tttht = $_POST['tttht'];
    $nttht = $_POST['nttht'];
    $tttxdb = $_POST['tttxdb'];
    //Viết câu lệnh update có điều kiện where matl=biến client
    $sql = "update xe_da_ban set ID_xe_ban='" . $idxbxdb . "', ID_khach_hang = '" . $idkhxdb . "', gia_thoai_thuan = '" . $gtt . "', ngay_ban = '" . $nb . "', tien_tt_hang_thang = '" . $tttht . "', ngay_tt_hang_thang = '" . $nttht . "', thong_tin_them = '" .$tttxdb. "' where ID_xe_da_ban='" . $idxdb . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = 0; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
  case "deleteXDB":
    $idxdb = $_POST['idxdb'];
    //Kiểm tra matl có xuất các bảng (table khác  ? nếu có thì không xóa)
    $sql = "delete from xe_da_ban  where ID_xe_da_ban='" . $idxdb . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = 0; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
    //Get tất cả các TheLoai
  case "getALLXDB":
    $mang = array();
    $sql = mysqli_query($conn, "SELECT * from xe_da_ban");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['idxdb'] = $rows['ID_xe_da_ban'];
      $usertemp['idxbxdb'] = $rows['ID_xe_ban'];
      $usertemp['idkhxdb'] = $rows['ID_khach_hang'];
      $usertemp['gtt'] = $rows['gia_thoai_thuan'];
      $usertemp['nb'] = $rows['ngay_ban'];
      $usertemp['tttht'] = $rows['tien_tt_hang_thang'];
      $usertemp['nttht'] = $rows['ngay_tt_hang_thang'];
      $usertemp['tttxdb'] = $rows['thong_tin_them'];
      array_push($mang, $usertemp);
    }
    $jsonData['items'] = $mang; //{items:[{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'}]}
    echo json_encode($jsonData);
    mysqli_close($conn);
    break;

    // dac diem xe da ban
  case "insertDDXDB":
    $idxbddxdb = $_POST['idxbddxdb'];
    $idddddxdb = $_POST['idddddxdb'];
    $rs = mysqli_query($conn, "SELECT COUNT(*) as 'total' from  dac_diem_xe_ban where ID_xe_ban='" . $idxbddxdb . "' ");
    $row = mysqli_fetch_array($rs);
    if ((int)$row['total'] > 0) {
      $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
    } else {
      $sql = "INSERT INTO `dac_diem_xe_ban`(`ID_xe_ban`,`ID_dac_diem`) VALUES ('" . $idxbddxdb . "','" . $idddddxdb . "')";
      if (mysqli_query($conn, $sql)) {
        if (mysqli_affected_rows($conn) > 0) {
          $res["success"] = 1; //Insert dữ liệu thành công
        } else {
          $res["success"] = 0; 
        }
      } else {
        $res["success"] = 0;  
      }
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;

  case "updateDDXDB":
    $idxbddxdb = $_POST['idxbddxdb'];
    $idddddxdb = $_POST['idddddxdb'];
    $sql = "update dac_diem_xe_ban set ID_dac_diem='" . $idddddxdb . "' where ID_xe_ban = '" . $idxbddxdb . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = 0; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
  case "deleteDDXDB":
    $idxbddxdb = $_POST['idxbddxdb'];
    //Kiểm tra matl có xuất các bảng (table khác  ? nếu có thì không xóa)
    $sql = "delete from dac_diem_xe_ban  where ID_xe_ban='" . $idxbddxdb . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = 0; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
    //Get tất cả các TheLoai
  case "getALLddxdb":
    $mang = array();
    $sql = mysqli_query($conn, "SELECT * from dac_diem_xe_ban");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['idxbddxdb'] = $rows['ID_xe_ban'];
      $usertemp['idddddxdb'] = $rows['ID_dac_diem'];
      array_push($mang, $usertemp);
    }
    $jsonData['items'] = $mang; //{items:[{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'}]}
    echo json_encode($jsonData);
    mysqli_close($conn);
    break;

    // xe mo hinh
  case "insertXMH":
    $mmh = $_POST['mmh'];
    $mnsx = $_POST['mnsx'];
    $tmh = $_POST['tmh'];

    $rs = mysqli_query($conn, "SELECT COUNT(*) as 'total' from  xe_mo_hinh where ma_mo_hinh='" . $mmh . "' ");
    $row = mysqli_fetch_array($rs);
    if ((int)$row['total'] > 0) {
      $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
    } else {
      $sql = "INSERT INTO `xe_mo_hinh`(`ma_mo_hinh`, `ma_nxs`,`ten_mo_hinh`) VALUES ('" . $mmh . "','" . $mnsx . "','" . $tmh . "')";
      if (mysqli_query($conn, $sql)) {
        if (mysqli_affected_rows($conn) > 0) {
          $res["success"] = 1; //Insert dữ liệu thành công
        } else {
          $res["success"] = 0; 
        }
      } else {
        $res["success"] = 0;  
      }
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;

    // khach hang
  case "updateXMH":
    $mmh = $_POST['mmh'];
    $mnsx = $_POST['mnsx'];
    $tmh = $_POST['tmh'];
    $sql = "update xe_mo_hinh set ma_nxs='" . $mnsx . "', ten_mo_hinh = '" . $tmh . "' where ma_mo_hinh = '" . $mmh . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = 0; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
  case "deleteXMH":
    $mmh = $_POST['mmh'];
    //Kiểm tra matl có xuất các bảng (table khác  ? nếu có thì không xóa)
    $sql = "delete from xe_mo_hinh  where ma_mo_hinh='" . $mmh . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = $sql; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
    //Get tất cả các TheLoai
  case "getALLxmh":
    $mang = array();
    $sql = mysqli_query($conn, "SELECT * from xe_mo_hinh");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['mmh'] = $rows['ma_mo_hinh'];
      $usertemp['mnsx'] = $rows['ma_nxs'];
      $usertemp['tmh'] = $rows['ten_mo_hinh'];
      array_push($mang, $usertemp);
    }
    $jsonData['items'] = $mang; //{items:[{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'}]}
    echo json_encode($jsonData);
    mysqli_close($conn);
    break;

    // loai xe
  case "insertLX":
    $mlx = $_POST['mlx'];
    $mtx = $_POST['mtx'];
    $nl = $_POST['nl'];
    $hs = $_POST['hs'];

    $rs = mysqli_query($conn, "SELECT COUNT(*) as 'total' from  loai_xe where ma_loai_xe='" . $mlx . "' ");
    $row = mysqli_fetch_array($rs);
    if ((int)$row['total'] > 0) {
      $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
    } else {
      $sql = "INSERT INTO `loai_xe`(`ma_loai_xe`, `mo_ta_xe`,`nhien_lieu`,`hop_so`) VALUES ('" . $mlx . "','" . $mtx . "','" . $nl . "','" . $hs . "')";
      if (mysqli_query($conn, $sql)) {
        if (mysqli_affected_rows($conn) > 0) {
          $res["success"] = 1; //Insert dữ liệu thành công
        } else {
          $res["success"] = 0; 
        }
      } else {
        $res["success"] = 0;  
      }
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;

    // khach hang
  case "updateLX":
    $mlx = $_POST['mlx'];
    $mtx = $_POST['mtx'];
    $nl = $_POST['nl'];
    $hs = $_POST['hs'];
    //Viết câu lệnh update có điều kiện where matl=biến client
    $sql = "update loai_xe set mo_ta_xe='" . $mtx . "', nhien_lieu = '" . $nl . "', hop_so = '" . $hs . "' where ma_loai_xe='" . $mlx . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = 0; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
  case "deleteLX":
    $mlx = $_POST['mlx'];
    //Kiểm tra matl có xuất các bảng (table khác  ? nếu có thì không xóa)
    $sql = "delete from loai_xe where ma_loai_xe='" . $mlx . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = 0; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
    //Get tất cả các TheLoai
  case "getALLLX":
    $mang = array();
    $sql = mysqli_query($conn, "SELECT * from loai_xe");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['mlx'] = $rows['ma_loai_xe'];
      $usertemp['mtx'] = $rows['mo_ta_xe'];
      $usertemp['nl'] = $rows['nhien_lieu'];
      $usertemp['hs'] = $rows['hop_so'];
      array_push($mang, $usertemp);
    }
    $jsonData['items'] = $mang; //{items:[{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'}]}
    echo json_encode($jsonData);
    mysqli_close($conn);
    break;

    // thanh toan
  case "insertTT":
    $mtt = $_POST['mtt'];
    $tttt = $_POST['tttt'];
    $rs = mysqli_query($conn, "SELECT COUNT(*) as 'total' from  trang_thai_thanh_toan where ma_thanh_toan='" . $mtt . "' ");
    $row = mysqli_fetch_array($rs);
    if ((int)$row['total'] > 0) {
      $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
    } else {
      $sql = "INSERT INTO `trang_thai_thanh_toan`(`ma_thanh_toan`, `trang_thai_thanh_toan`) VALUES ('" . $mtt . "','" . $tttt . "')";
      if (mysqli_query($conn, $sql)) {
        if (mysqli_affected_rows($conn) > 0) {
          $res["success"] = 1; //Insert dữ liệu thành công
        } else {
          $res["success"] = $sql; 
        }
      } else {
        $res["success"] = 0;  
      }
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;

  case "updateTT":
    $mtt = $_POST['mtt'];
    $tttt = $_POST['tttt'];
    //Viết câu lệnh update có điều kiện where matl=biến client
    $sql = "update trang_thai_thanh_toan set trang_thai_thanh_toan='" . $tttt . "' where ma_thanh_toan='" . $mtt . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = 0; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
  case "deleteTT":
    $mtt = $_POST['mtt'];
    //Kiểm tra matl có xuất các bảng (table khác  ? nếu có thì không xóa)
    $sql = "delete from trang_thai_thanh_toan  where ma_thanh_toan='" . $mtt . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = 0; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
  case "getALLTT":
    $mang = array();
    $sql = mysqli_query($conn, "SELECT * from trang_thai_thanh_toan");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['mtt'] = $rows['ma_thanh_toan'];
      $usertemp['tttt'] = $rows['trang_thai_thanh_toan'];
      array_push($mang, $usertemp);
    }
    $jsonData['items'] = $mang; //{items:[{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'}]}
    echo json_encode($jsonData);
    mysqli_close($conn);
    break;

    // hoa đơn

  case "insertHD":
    $idhd = $_POST['idhd'];
    $idxdbhdtt = $_POST['idxdbhdtt'];
    $idkhhdtt = $_POST['idkhhdtt'];
    $idnvhdtt = $_POST['idnvhdtt'];
    $mtthdtt = $_POST['mtthdtt'];
    $ntt = $_POST['ntt'];
    $htt = $_POST['htt'];
    $sttt = $_POST['sttt'];
    $rs = mysqli_query($conn, "SELECT COUNT(*) as 'total' from  hoa_don_thanh_toan where ID_hoa_don='" . $idhd . "' ");
    $row = mysqli_fetch_array($rs);
    if ((int)$row['total'] > 0) {
      $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
    } else {
      $sql = "INSERT INTO `hoa_don_thanh_toan`(`ID_hoa_don`,`ID_xe_da_ban`, `ID_khach_hang`,`ID_nhan_vien`,`ma_thanh_toan`,`ngay_thanh_toan`,`han_thanh_toan`,`so_tien_thanh_toan`) VALUES ('" . $idhd . "','" . $idxdbhdtt . "','" . $idkhhdtt . "','" . $idnvhdtt . "','" . $mtthdtt . "','" . $ntt . "','" . $htt . "','" . $sttt . "')";
      if (mysqli_query($conn, $sql)) {
        if (mysqli_affected_rows($conn) > 0) {
          $res["success"] = 1; //Insert dữ liệu thành công
        } else {
          $res["success"] = 0; 
        }
      } else {
        $res["success"] = 0;  
      }
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;

    // khach hang
  case "updateHD":
    $idhd = $_POST['idhd'];
    $idxdbhdtt = $_POST['idxdbhdtt'];
    $idkhhdtt = $_POST['idkhhdtt'];
    $idnvhdtt = $_POST['idnvhdtt'];
    $mtthdtt = $_POST['mtthdtt'];
    $ntt = $_POST['ntt'];
    $htt = $_POST['htt'];
    $sttt = $_POST['sttt'];
    //Viết câu lệnh update có điều kiện where matl=biến client
    $sql = "update hoa_don_thanh_toan set ID_xe_da_ban='" . $idxdbhdtt . "', ID_khach_hang = '" . $idkhhdtt . "', ID_nhan_vien = '" . $idnvhdtt . "', ma_thanh_toan = '" . $mtthdtt . "', ngay_thanh_toan = '" . $ntt . "', han_thanh_toan = '" . $htt . "', so_tien_thanh_toan = '" . $sttt . "' where ID_hoa_don = '" . $idhd . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = $sql; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
  case "deleteHD":
    $idhd = $_POST['idhd'];
    //Kiểm tra matl có xuất các bảng (table khác  ? nếu có thì không xóa)
    $sql = "delete from hoa_don_thanh_toan  where ID_hoa_don='" . $idhd . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = 0; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
    //Get tất cả các TheLoai
  case "getALLHD":
    $mang = array();
    $sql = mysqli_query($conn, "SELECT * from hoa_don_thanh_toan");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['idhd'] = $rows['ID_hoa_don'];
      $usertemp['idxdbhdtt'] = $rows['ID_xe_da_ban'];
      $usertemp['idkhhdtt'] = $rows['ID_khach_hang'];
      $usertemp['idnvhdtt'] = $rows['ID_nhan_vien'];
      $usertemp['mtthdtt'] = $rows['ma_thanh_toan'];
      $usertemp['ntt'] = $rows['ngay_thanh_toan'];
      $usertemp['htt'] = $rows['han_thanh_toan'];
      $usertemp['sttt'] = $rows['so_tien_thanh_toan'];
      array_push($mang, $usertemp);
    }
    $jsonData['items'] = $mang; //{items:[{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'}]}
    echo json_encode($jsonData);
    mysqli_close($conn);
    break;

    // bao hiem
  case "insertBH":
    $idbh = $_POST['idbh'];
    $idxdbbh = $_POST['idxdbbh'];
    $idctbh = $_POST['idctbh'];
    $nbdbh = $_POST['nbdbh'];
    $nkt = $_POST['nkt'];
    $tthh = $_POST['tthh'];

    $rs = mysqli_query($conn, "SELECT COUNT(*) as 'total' from  bao_hiem where ID_bao_hien='" . $idbh . "' ");
    $row = mysqli_fetch_array($rs);
    if ((int)$row['total'] > 0) {
      $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
    } else {
      $sql = "INSERT INTO `bao_hiem`(`ID_bao_hien`,`ID_xe_da_ban`, `ID_cong_ty_bao_hiem`,`ngay_bat_dau_chinh_sach`,`ngay_ket_thuc_chinh_sach`,`thanh_toan_hang_thang`) VALUES ('" . $idbh . "','" . $idxdbbh . "','" . $idctbh . "','" . $nbdbh . "','" . $nkt . "','" . $tthh . "')";
      if (mysqli_query($conn, $sql)) {
        if (mysqli_affected_rows($conn) > 0) {
          $res["success"] = 1; //Insert dữ liệu thành công
        } else {
          $res["success"] = 0; 
        }
      } else {
        $res["success"] = $sql;  
      }
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;

    // khach hang
  case "updateBH":
    $idbh = $_POST['idbh'];
    $idxdbbh = $_POST['idxdbbh'];
    $idctbh = $_POST['idctbh'];
    $nbdbh = $_POST['nbdbh'];
    $nkt = $_POST['nkt'];
    $tthh = $_POST['tthh'];
    //Viết câu lệnh update có điều kiện where matl=biến client
    $sql = "update bao_hiem set ID_xe_da_ban='" . $idxdbbh . "', ID_cong_ty_bao_hiem = '" . $idctbh . "', ngay_bat_dau_chinh_sach = '" . $nbdbh . "', ngay_ket_thuc_chinh_sach = '" . $nkt . "', thanh_toan_hang_thang = '" . $tthh . "' where ID_bao_hien = '".$idbh."'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = 0; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
  case "deleteBH":
    $idbh = $_POST['idbh'];
    //Kiểm tra matl có xuất các bảng (table khác  ? nếu có thì không xóa)
    $sql = "delete from bao_hiem  where ID_bao_hien='" . $idbh . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = 0; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
    //Get tất cả các TheLoai
  case "getALLBH":
    $mang = array();
    $sql = mysqli_query($conn, "SELECT * from bao_hiem");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['idbh'] = $rows['ID_bao_hien'];
      $usertemp['idxdbbh'] = $rows['ID_xe_da_ban'];
      $usertemp['idctbh'] = $rows['ID_cong_ty_bao_hiem'];
      $usertemp['nbdbh'] = $rows['ngay_bat_dau_chinh_sach'];
      $usertemp['nkt'] = $rows['ngay_ket_thuc_chinh_sach'];
      $usertemp['tthh'] = $rows['thanh_toan_hang_thang'];
      array_push($mang, $usertemp);
    }
    $jsonData['items'] = $mang; //{items:[{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'}]}
    echo json_encode($jsonData);
    mysqli_close($conn);
    break;
    $mang = array();
    $sql = mysqli_query($conn, "SELECT * from cong_ty_bao_hiem");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['idctbht'] = $rows['ID_cong_ty_bao_hiem'];
      $usertemp['tctbh'] = $rows['ten_cong_ty_bao_hiem'];
      $usertemp['qgctbh'] = $rows['quoc_gia'];
      $usertemp['tttctbh'] = $rows['thong_tin_them'];
      array_push($mang, $usertemp);
    }
    $jsonData['items'] = $mang; //{items:[{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'}]}
    echo json_encode($jsonData);
    mysqli_close($conn);
    break;

  // ten cong ty bao hiem
  case "insertCTBH":
    $idctbht = $_POST['idctbht'];
    $tctbh = $_POST['tctbh'];
    $qgctbh = $_POST['qgctbh'];
    $tttctbh = $_POST['tttctbh'];

    $rs = mysqli_query($conn, "SELECT COUNT(*) as 'total' from  cong_ty_bao_hiem where ID_cong_ty_bao_hiem='" . $idctbht . "' ");
    $row = mysqli_fetch_array($rs);
    if ((int)$row['total'] > 0) {
      $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
    } else {
      $sql = "INSERT INTO `cong_ty_bao_hiem`(`ID_cong_ty_bao_hiem`, `ten_cong_ty_bao_hiem`,`quoc_gia`,`thong_tin_them`) VALUES ('" . $idctbht . "','" . $tctbh . "','" . $qgctbh . "','" . $tttctbh . "')";
      if (mysqli_query($conn, $sql)) {
        if (mysqli_affected_rows($conn) > 0) {
          $res["success"] = 1; //Insert dữ liệu thành `công`
        } else {
          $res["success"] = 0; 
        }
      } else {
        $res["success"] = 0;  
      }
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;

    // khach hang
  case "updateCTBH":
    $idctbht = $_POST['idctbht'];
    $tctbh = $_POST['tctbh'];
    $qgctbh = $_POST['qgctbh'];
    $tttctbh = $_POST['tttctbh'];
    //Viết câu lệnh update có điều kiện where matl=biến client
    $sql = "update cong_ty_bao_hiem set ten_cong_ty_bao_hiem='" . $tctbh . "', quoc_gia = '" . $qgctbh . "', thong_tin_them = '" . $tttctbh . "' where ID_cong_ty_bao_hiem='" . $idctbht . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = 0; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
  case "deleteCTBH":
    $idctbht = $_POST['idctbht'];
    //Kiểm tra matl có xuất các bảng (table khác  ? nếu có thì không xóa)
    $sql = "delete from cong_ty_bao_hiem where ID_cong_ty_bao_hiem='" . $idctbht . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = 0; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
    //Get tất cả các TheLoai
  case "getALLCTBH":
    $mang = array();
    $sql = mysqli_query($conn, "SELECT * from cong_ty_bao_hiem");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['idctbht'] = $rows['ID_cong_ty_bao_hiem'];
      $usertemp['tctbh'] = $rows['ten_cong_ty_bao_hiem'];
      $usertemp['qgctbh'] = $rows['quoc_gia'];
      $usertemp['tttctbh'] = $rows['thong_tin_them'];
      array_push($mang, $usertemp);
    }
    $jsonData['items'] = $mang; //{items:[{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'}]}
    echo json_encode($jsonData);
    mysqli_close($conn);
    break;

  // mua cho vay
  case "insertMCV":
    $idcv = $_POST['idcv'];
    $idxbd = $_POST['idxbd'];
    $idct = $_POST['idct'];
    $nbd = $_POST['nbd'];
    $nktmcv = $_POST['nktmcv'];
    $tttmcv = $_POST['tttmcv'];

    $rs = mysqli_query($conn, "SELECT COUNT(*) as 'total' from  mua_cho_vay where ID_cho_vay='" . $idcv . "' ");
    $row = mysqli_fetch_array($rs);
    if ((int)$row['total'] > 0) {
      $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
    } else {
      $sql = "INSERT INTO `mua_cho_vay`(`ID_cho_vay`,`ID_xe_da_ban`, `ID_cong_ty_tai_chinh`,`ngay_bat_dau_tra_no`,`ngay_key_thuc_tra_na`,`thong_tin_them`) VALUES ('" . $idcv . "','" . $idxbd . "','" . $idct . "','" . $nbd . "','" . $nktmcv . "','" . $tttmcv . "')";
      if (mysqli_query($conn, $sql)) {
        if (mysqli_affected_rows($conn) > 0) {
          $res["success"] = 1; //Insert dữ liệu thành công
        } else {
          $res["success"] = 0; 
        }
      } else {
        $res["success"] = $sql;  
      }
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;

  case "updateMCV":
    $idcv = $_POST['idcv'];
    $idxbd = $_POST['idxbd'];
    $idct = $_POST['idct'];
    $nbd = $_POST['nbd'];
    $nktmcv = $_POST['nktmcv'];
    $tttmcv = $_POST['tttmcv'];
    //Viết câu lệnh update có điều kiện where matl=biến client
    $sql = "update mua_cho_vay set ID_xe_da_ban='" . $idxbd . "', ID_cong_ty_tai_chinh = '" . $idct . "', ngay_bat_dau_tra_no = '" . $nbd . "', ngay_key_thuc_tra_na = '" . $nktmcv . "', thong_tin_them = '" . $tttmcv . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = 0; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
  case "deleteMCV":
    $idcv = $_POST['idcv'];
    //Kiểm tra matl có xuất các bảng (table khác  ? nếu có thì không xóa)
    $sql = "delete from mua_cho_vay  where ID_cho_vay='" . $idcv . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = 0; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
    //Get tất cả các TheLoai
  case "getALLMCV":
    $mang = array();
    $sql = mysqli_query($conn, "SELECT * from mua_cho_vay");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['idcv'] = $rows['ID_cho_vay'];
      $usertemp['idxbd'] = $rows['ID_xe_da_ban'];
      $usertemp['idct'] = $rows['ID_cong_ty_tai_chinh'];
      $usertemp['nbd'] = $rows['ngay_bat_dau_tra_no'];
      $usertemp['nktmcv'] = $rows['ngay_key_thuc_tra_na'];
      $usertemp['tttmcv'] = $rows['thong_tin_them'];
      array_push($mang, $usertemp);
    }
    $jsonData['items'] = $mang; //{items:[{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'}]}
    echo json_encode($jsonData);
    mysqli_close($conn);
    break;


  // cong ty tai chinh
  case "insertCTTC":
    $idcttc = $_POST['idcttc'];
    $tcttc = $_POST['tcttc'];
    $sdtcttc = $_POST['sdtcttc'];
    $tttcttc = $_POST['tttcttc'];

    $rs = mysqli_query($conn, "SELECT COUNT(*) as 'total' from  cong_ty_tai_chinh where ID_cong_ty_tai_chinh='" . $idcttc . "' ");
    $row = mysqli_fetch_array($rs);
    if ((int)$row['total'] > 0) {
      $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
    } else {
      $sql = "INSERT INTO `cong_ty_tai_chinh`(`ID_cong_ty_tai_chinh`, `ten_cong_ty_tai_chinh`,`sdt`,`thong_tin_them`) VALUES ('" . $idcttc . "','" . $tcttc . "','" . $sdtcttc . "','" . $tttcttc . "')";
      if (mysqli_query($conn, $sql)) {
        if (mysqli_affected_rows($conn) > 0) {
          $res["success"] = 1; //Insert dữ liệu thành `công`
        } else {
          $res["success"] = 0; 
        }
      } else {
        $res["success"] = 0;  
      }
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;

    // khach hang
  case "updateCTTC":
    $idcttc = $_POST['idcttc'];
    $tcttc = $_POST['tcttc'];
    $sdtcttc = $_POST['sdtcttc'];
    $tttcttc = $_POST['tttcttc'];
    //Viết câu lệnh update có điều kiện where matl=biến client
    $sql = "update cong_ty_tai_chinh set ten_cong_ty_tai_chinh='" . $tcttc . "', sdt = '" . $sdtcttc . "', thong_tin_them = '" . $tttcttc . "' where ID_cong_ty_tai_chinh='" . $idcttc . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = 0; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
  case "deleteCTTC":
    $idcttc = $_POST['idcttc'];
    //Kiểm tra matl có xuất các bảng (table khác  ? nếu có thì không xóa)
    $sql = "delete from cong_ty_tai_chinh where ID_cong_ty_tai_chinh='" . $idcttc . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = 0; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
    //Get tất cả các TheLoai
  case "getALLCTTC":
    $mang = array();
    $sql = mysqli_query($conn, "SELECT * from cong_ty_tai_chinh");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['idcttc'] = $rows['ID_cong_ty_tai_chinh'];
      $usertemp['tcttc'] = $rows['ten_cong_ty_tai_chinh'];
      $usertemp['sdtcttc'] = $rows['sdt'];
      $usertemp['tttcttc'] = $rows['thong_tin_them'];
      array_push($mang, $usertemp);
    }
    $jsonData['items'] = $mang; //{items:[{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'}]}
    echo json_encode($jsonData);
    mysqli_close($conn);
    break;
  
  // nhan vien
  case "insertNV":
    $idnv = $_POST['idnv'];
    $tnv = $_POST['tnv'];
    $ns = $_POST['ns'];
    $gt = $_POST['gt'];
    $dc = $_POST['dc'];
    $sdtnv = $_POST['sdtnv'];
    $nvl = $_POST['nvl'];
    $lcb = $_POST['lcb'];

    $rs = mysqli_query($conn, "SELECT COUNT(*) as 'total' from  nhan_vien where ID_nhan_vien='" . $idnv . "' ");
    $row = mysqli_fetch_array($rs);
    if ((int)$row['total'] > 0) {
      $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
    } else {
      $sql = "INSERT INTO `nhan_vien`(`ID_nhan_vien`,`ten_nhan_vien`, `ngay_sinh`,`gioi_tinh`,`dia_Chi`,`sdt`,`ngay_vao_lam`,`luong_co_ban`) VALUES ('" . $idnv . "','" . $tnv . "','" . $ns . "','" . $gt . "','" . $dc . "','" . $sdtnv . "','" . $nvl . "','" . $lcb . "')";
      if (mysqli_query($conn, $sql)) {
        if (mysqli_affected_rows($conn) > 0) {
          $res["success"] = 1; //Insert dữ liệu thành công
        } else {
          $res["success"] = 0; 
        }
      } else {
        $res["success"] = $sql;  
      }
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;

  case "updateNV":
    $idnv = $_POST['idnv'];
    $tnv = $_POST['tnv'];
    $ns = $_POST['ns'];
    $gt = $_POST['gt'];
    $dc = $_POST['dc'];
    $sdtnv = $_POST['sdtnv'];
    $nvl = $_POST['nvl'];
    $lcb = $_POST['lcb'];
    //Viết câu lệnh update có điều kiện where matl=biến client
    $sql = "update nhan_vien set ten_nhan_vien='" . $tnv . "', ngay_sinh = '" . $ns . "', gioi_tinh = '" . $gt . "', dia_Chi = '" . $dc . "', sdt = '" . $sdtnv . "', ngay_vao_lam = '" . $nvl . "', luong_co_ban = '" . $lcb . "' where ten_nhan_vien = '" . $idnv . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = $sql; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
  case "deleteNV":
    $idnv = $_POST['idnv'];
    //Kiểm tra matl có xuất các bảng (table khác  ? nếu có thì không xóa)
    $sql = "delete from nhan_vien  where ID_nhan_vien='" . $idnv . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = 0; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
    //Get tất cả các TheLoai
  case "getALLNV":
    $mang = array();
    $sql = mysqli_query($conn, "SELECT * from nhan_vien");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['idnv'] = $rows['ID_nhan_vien'];
      $usertemp['tnv'] = $rows['ten_nhan_vien'];
      $usertemp['ns'] = $rows['ngay_sinh'];
      $usertemp['gt'] = $rows['gioi_tinh'];
      $usertemp['dc'] = $rows['dia_Chi'];
      $usertemp['sdtnv'] = $rows['sdt'];
      $usertemp['nvl'] = $rows['ngay_vao_lam'];
      $usertemp['lcb'] = $rows['luong_co_ban'];
      array_push($mang, $usertemp);
    }
    $jsonData['items'] = $mang; //{items:[{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'}]}
    echo json_encode($jsonData);
    mysqli_close($conn);
    break;

  // nha san xuat
  case "insertNSX":
    $tnsx = $_POST['tnsx'];
    $qgnsx = $_POST['qgnsx'];
    $sdtnsx = $_POST['sdtnsx'];

    $rs = mysqli_query($conn, "SELECT COUNT(*) as 'total' from  nha_san_xuat where ten_nsx='" . $tnsx . "' ");
    $row = mysqli_fetch_array($rs);
    if ((int)$row['total'] > 0) {
      $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
    } else {
      $sql = "INSERT INTO `nha_san_xuat`(`ten_nsx`, `quoc_gia`,`sdt`) VALUES ('" . $tnsx . "','" . $qgnsx . "','" . $sdtnsx . "')";
      if (mysqli_query($conn, $sql)) {
        if (mysqli_affected_rows($conn) > 0) {
          $res["success"] = 1; //Insert dữ liệu thành công
        } else {
          $res["success"] = 0; 
        }
      } else {
        $res["success"] = 0;  
      }
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;

    // khach hang
  case "updateNSX":
    $tnsx = $_POST['tnsx'];
    $qgnsx = $_POST['qgnsx'];
    $sdtnsx = $_POST['sdtnsx'];
    $sql = "update nha_san_xuat set quoc_gia='" . $qgnsx . "', sdt = '" . $sdtnsx . "' where ten_nsx = '" . $tnsx . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = 0; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
  case "deleteNSX":
    $tnsx = $_POST['tnsx'];
    //Kiểm tra matl có xuất các bảng (table khác  ? nếu có thì không xóa)
    $sql = "delete from nha_san_xuat  where ten_nsx='" . $tnsx . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = $sql; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
    //Get tất cả các TheLoai
  case "getALLNSX":
    $mang = array();
    $sql = mysqli_query($conn, "SELECT * from nha_san_xuat");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['tnsx'] = $rows['ten_nsx'];
      $usertemp['qgnsx'] = $rows['quoc_gia'];
      $usertemp['sdtnsx'] = $rows['sdt'];
      array_push($mang, $usertemp);
    }
    $jsonData['items'] = $mang; //{items:[{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'}]}
    echo json_encode($jsonData);
    mysqli_close($conn);
    break;

  // quan li tk
  case "insertQLTK":
    $tk = $_POST['tk'];
    $mk = sha1($_POST['mk']);
    $fn = $_POST['fn'];
    $gm = $_POST['gm'];
    $qh = $_POST['qh'];
    $avt = $_POST['avt'];

    $rs = mysqli_query($conn, "SELECT COUNT(*) as 'total' from  users where username='" . $tk . "' ");
    $row = mysqli_fetch_array($rs);
    if ((int)$row['total'] > 0) {
      $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
    } else {
      $sql = "INSERT INTO `users`(`username`, `password`,`fullname`,`gmail`,`permission`,`avartar`) VALUES ('" . $tk . "','" . $mk . "','" . $fn . "','" . $gm . "','" . $qh . "','".$avt."')";
      if (mysqli_query($conn, $sql)) {
        if (mysqli_affected_rows($conn) > 0) {
          $res["success"] = 1; //Insert dữ liệu thành công
        } else {
          $res["success"] = 0; 
        }
      } else {
        $res["success"] = 0;  
      }
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
  case "updateQLTK":
    $tk = $_POST['tk'];
    $mk = sha1($_POST['mk']);
    $fn = $_POST['fn'];
    $gm = $_POST['gm'];
    $qh = $_POST['qh'];
    $avt = $_POST['avt'];
    $sql = "update users set password='" . $mk . "', fullname = '" . $fn . "', gmail = '" . $gm . "', permission = '" . $qh . "', avartar = '".$avt."' where username='" . $tk . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = 0; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
  case "deleteQLTK":
    $tk = $_POST['tk'];
    //Kiểm tra matl có xuất các bảng (table khác  ? nếu có thì không xóa)
    $sql = "delete from users  where username='" . $tk . "'";
    if (mysqli_query($conn, $sql)) {
      if (mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1; 
      } else {
        $res["success"] = $sql; 
      }
    } else {
      $res["success"] = 0;  
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;
    //Get tất cả các TheLoai
  case "getALLQLTK":
    $mang = array();
    $sql = mysqli_query($conn, "SELECT * from users");
    while ($rows = mysqli_fetch_array($sql)) {
      $usertemp['tk'] = $rows['username'];
      $usertemp['mk'] = $rows['password'];
      $usertemp['fn'] = $rows['fullname'];
      $usertemp['gm'] = $rows['gmail'];
      $usertemp['qh'] = $rows['permission'];
      $usertemp['avt'] = $rows['avartar'];
      array_push($mang, $usertemp);
    }
    $jsonData['items'] = $mang; //{items:[{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'},{'matl':'TH','tentl':'tin hoc'}]}
    echo json_encode($jsonData);
    mysqli_close($conn);
    break;

  case "UploadAvatar":
    $avt = $_POST['avt'];
    $username = $_POST['username'];
    $sql = "update users set avartar = '".$avt."' where username = '".$username."'";
    if (mysqli_query($conn, $sql)) {
      if(mysqli_affected_rows($conn) > 0) {
        $res["success"] = 1;
      } else {
        $res["success"] = 0;
      }
    } else {
      $res["success"] = 0;
    }
    echo json_encode($res);
    mysqli_close($conn);
    break;



  
    default:
    # code...
    break;

}
