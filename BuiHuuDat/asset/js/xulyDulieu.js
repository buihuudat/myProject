function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
  return str;
}
// check click button
var upImg = "";
$(document).ready(function () {

  var status = 'Khachhang';

  var liSl = $('.li').toArray();
  liSl.forEach((v, i) => {
    $(v).on("click", function() {
      var d = $(v).text();
      var t = (removeVietnameseTones(d)).replace(/\s/g, '');
      $('.button-main').children().removeClass().addClass(t);
      $('tbody').last().attr('class', 'td ' + 'addList' + t);
      $(" .btnadd").prop("disabled", 0);
      $(" .btnsave").prop("disabled", 0);
      $(" .btnedit").prop("disabled", 0);
      $(" .btnedel").prop("disabled", 0);
      $(" .btnrf").prop("disabled", 0);

      // khachhang
      if (t == 'Khachhang') {
        status = 'Khachhang';
        var flagkh = 0;
        $(".Khachhang .btnadd").click(function () {
          $(".Khachhang .btnadd").prop("disabled", true);
          $(".Khachhang .btnsave").prop("disabled", false);
          $(".Khachhang .btnedit").prop("disabled", true);
          resetViewkh();
          flagkh = 1;
          $(".makh").prop("disabled", false);
        });
        $(".Khachhang .btnedit").click(function () {

          $(".Khachhang .btnadd").prop("disabled", true);
          $(".Khachhang .btnsave").prop("disabled", false);
          $(".Khachhang .btnedit").prop("disabled", true);
          flagkh = 2;
          $(".makh").prop("disabled", true);
        });
        $(".Khachhang .btnrf").click(function () {
          resetViewkh();
          $(".Khachhang .btnadd").prop("disabled", false);
          $(".Khachhang .btnsave").prop("disabled", true);
          $(".Khachhang .btnedit").prop("disabled", true);
          flagkh = 0;
        });
        $(".Khachhang .btnsave").click(function () {
          if (flagkh == 1 && status == 'Khachhang') {
            var makh = $(".makh").val();
            var tenkh = $(".tenkh").val();
            var tuoikh = $(".tuoikh").val();
            var sdtkh = $(".sdtkh").val();
            var mailkh = $(".mailkh").val();
            if (makh == "") {
              alert_info("ID khách hàng không thể để trống");
              $(".makh").focus();
            } else if (tenkh == "") {
              alert_info("Tên khách hàng không thể để trống");
              $(".tenkh").focus();
            } else //có nghĩa makh và tên thể loại hop le
            {
              var dataclient = {
                makh: makh,
                tenkh: tenkh,
                tuoikh: tuoikh,
                sdtkh: sdtkh,
                mailkh: mailkh,
                event: "insertKH"
              }
              queryData("asset/php/api.php", dataclient, function (res) {
                if (res.success == 2 && status == 'Khachhang') {
                  alert_error("Dữ liệu đã bị trùng mã Khách hàng");
                } else if (res.success == 1 && status == 'Khachhang') {
                  alert_success("Insert Thành Công");
                  flagkh = 0;
                  resetViewkh();
                  $(".Khachhang .btnadd").prop("disabled", false);
                  $(".Khachhang .btnsave").prop("disabled", true);
                  $(".Khachhang .btnedit").prop("disabled", true);
                  showDataKhachHang();
                } else if (status == 'Khachhang') {
                  alert_error("Lỗi Insert Không Thành Công");
                  showDataKhachHang();
                }
              });
            }

          } else if (flagkh == 2 && status == 'Khachhang') {
            var makh = $(".makh").val();
            var tenkh = $(".tenkh").val();
            var tuoikh = $(".tuoikh").val();
            var sdtkh = $(".sdtkh").val();
            var mailkh = $(".mailkh").val();
            if (makh == "") {
              alert_info("ID khach hang không thể để trống");
              $(".makh").focus();
            } else if (tenkh == "") {
              alert_info("Tên khach hang không thể để trống");
              $(".tenkh").focus();
            } else //có nghĩa makh và tên thể loại hop le
            {
              var dataclient = {
                //Không thành công
                makh: makh,
                tenkh: tenkh,
                tuoikh: tuoikh,
                sdtkh: sdtkh,
                mailkh: mailkh,
                event: "updateKH"
              }
              //Gọi hàm Query
              queryData("asset/php/api.php", dataclient, function (res) {
                console.log("" + res.success);
                if (res.success == 2 && status == 'Khachhang') {
                  alert_error("Dữ liệu đã bị trùng mã TL");

                } else if (res.success == 1 && status == 'Khachhang') {
                  showDataKhachHang();
                  alert_success("Cập nhật Thành Công");
                  flagkh = 0;

                  $(".Khachhang .btnadd").prop("disabled", false);
                  $(".Khachhang .btnsave").prop("disabled", true);
                  $(".Khachhang .btnedit").prop("disabled", true);
                } else if (status == 'Khachhang') {
                  alert_error("Lỗi Cập nhật Không Thành Công");
                }
              });
            }
          } else if (status == 'Khachhang') {
            console.log("chưa nhấn nút nào cả");
          }
        });
        $(".Khachhang .btndel").click(function () {
          var makh = $(".makh").val();
          var tenkh = $(".tenkh").val();
          if (status == 'Khachhang') {
            bootbox.confirm("Bạn có chắc xóa khách hàng[ " + tenkh + " ] này không?", function (result) {
              if (result == true) {
                var dataSend = {
                  event: "deleteKH",
                  makh: makh
                };
                queryData("asset/php/api.php", dataSend, function (data) {
                  if (data.success == 1 && status == 'Khachhang') {
                    showDataKhachHang();
                    resetViewkh();
                    $(".makh").prop("disabled", false);
                    alert_success("Xóa thành công");
                  } else if (data.success == 2 && status == 'Khachhang') {
                    alert_info("Khách hàng đã được sử dụng trong bảng sách");
                  } else {
                    alert_error("Xóa không thành công");
                  }
                });
              } else if (status == 'Khachhang') {
                alert_info("Lỗi");
              }
            })
          }
        })
        ////Bắt sự kiện click trên mỗi dòng
        $(".addListKhachhang").on('click', '.click_view', function () {
          var makh = $(this).parent().attr("data-makh");
          var tenkh = $(this).parent().attr("data-tenkh");
          var tuoikh = $(this).parent().attr("data-tuoikh");
          var sdtkh = $(this).parent().attr("data-sdtkh");
          var mailkh = $(this).parent().attr("data-mailkh");
          $(".makh").val(makh);
          $(".tenkh").val(tenkh);
          $(".tuoikh").val(tuoikh);
          $(".sdtkh").val(sdtkh);
          $(".mailkh").val(mailkh);
          $(".Khachhang .btnadd").prop("disabled", false);
          $(" .btnsave").prop("disabled", true);
          $(" .btnedit").prop("disabled", false);
        })

        function showDataKhachHang() {
          var dataSend = {
            event: "getALLKH"
          }
          var htmls = '';
          queryData("asset/php/api.php", dataSend, function (data) {
            var arr = data.items; //lấy ra mảng 
            var stt = 1;
            for (var item in arr) {
              var d = arr[item];

              htmls = htmls + '<tr data-makh="' + d.makh + '" data-tenkh="' + d.tenkh + '" data-tuoikh="' + d.tuoikh + '" data-sdtkh="' + d.sdtkh + '" data-mailkh="' + d.mailkh + '" >' +
                '<td>' + stt + '</td>' +
                '<td>' + d.makh + '</td>' +
                '<td>' + d.tenkh + '</td>' +
                '<td>' + d.tuoikh + '</td>' +
                '<td>' + d.sdtkh + '</td>' +
                '<td>' + d.mailkh + '</td>' +
                '<td class="click_view" ><span class="badge bg-danger" style="cursor:pointer">Xem</span></td>' +
                '</tr>';
              stt++;
            }
            $(".table .td").html(htmls);
          });
        }
        function resetViewkh() {
          $(".makh").val("");
          $(".makh").focus();
          $(".tenkh").val("");
          $(".tuoikh").val("");
          $(".sdtkh").val("");
          $(".mailkh").val("");
        };
        showDataKhachHang();
      } else if (t == 'Diachi') {
        status = 'Diachi';
        var flagdc = 0;
        $(".Diachi .btnadd").click(function () {
          $(".Diachi .btnadd").prop("disabled", true);
          $(".Diachi .btnsave").prop("disabled", false);
          $(".Diachi .btnedit").prop("disabled", true);
          resetViewdc();
          flagdc = 1;
          $(".iddc").prop("disabled", false);
        });
        $(".Diachi .btnedit").click(function () {

          $(".Diachi .btnadd").prop("disabled", true);
          $(".Diachi .btnsave").prop("disabled", false);
          $(".Diachi .btnedit").prop("disabled", true);
          flagdc = 2;
          $(".iddc").prop("disabled", true);
        });
        $(".Diachi .btnrf").click(function () {
          resetViewdc();
          $(".Diachi .btnadd").prop("disabled", false);
          $(".Diachi .btnsave").prop("disabled", true);
          $(".Diachi .btnedit").prop("disabled", true);
          flagdc = 0;
        });
        $(".Diachi .btnsave").click(function () {
          if (flagdc == 1 && status == 'Diachi') {
            var iddc = $(".iddc").val();
            var idkhdc = $(".idkhdc").val();
            var dc1 = $(".dc1").val();
            var dc2 = $(".dc2").val();
            var dc3 = $(".dc3").val();
            var qt = $(".qt").val();
            var tptt = $(".tptt").val();
            var qg = $(".qg").val();
            var zc = $(".zc").val();
            var dck = $(".dck").val();
            if (iddc == "") {
              alert_info("ID Địa chỉ không thể để trống");
              $(".iddc").focus();
            } else if (idkhdc == "") {
              console.log("save");
              alert_info("ID khách hàng không thể để trống");
              $(".idkhdc").focus();
            } else //có nghĩa iddc và tên thể loại hop le
            {
              var dataclient = {
                iddc: iddc,
                idkhdc: idkhdc,
                dc1: dc1,
                dc2: dc2,
                dc3: dc3,
                qt: qt,
                tptt: tptt,
                qg: qg,
                zc: zc,
                dck: dck,
                event: "insertDC"
              }
              queryData("asset/php/api.php", dataclient, function (res) {
                if (res.success == 2 && status == 'Diachi') {
                  alert_error("Dữ liệu đã bị trùng mã Địa chỉ");
                } else if (res.success == 1 && status == 'Diachi') {
                  alert_success("Insert Thành Công");
                  flagdc = 0;
                  resetViewdc();
                  $(".Diachi .btnadd").prop("disabled", false);
                  $(".Diachi .btnsave").prop("disabled", true);
                  $(".Diachi .btnedit").prop("disabled", true);
                  showDataDiaChi();
                } else if (status == 'Diachi') {
                  alert_error("Lỗi Insert Không Thành Công");
                  showDataDiaChi();
                }
              });
            }
          } else if (flagdc == 2 && status == 'Diachi') {
            console.log("update");
            var iddc = $(".iddc").val();
            var idkhdc = $(".idkhdc").val();
            var dc1 = $(".dc1").val();
            var dc2 = $(".dc2").val();
            var dc3 = $(".dc3").val();
            var qt = $(".qt").val();
            var tptt = $(".tptt").val();
            var qg = $(".qg").val();
            var zc = $(".zc").val();
            var dck = $(".dck").val();
            if (iddc == "" && status == 'Diachi') {
              alert_info("ID địa chỉ không thể để trống");
              $(".iddc").focus();
            } else if (idkhdc == "") {

              alert_info("ID khách hàng không thể để trống");
              $(".idkhdc").focus();
            } else //có nghĩa iddc và tên thể loại hop le
            {
              var dataclient = {
                iddc: iddc,
                idkhdc: idkhdc,
                dc1: dc1,
                dc2: dc2,
                dc3: dc3,
                qt: qt,
                tptt: tptt,
                qg: qg,
                zc: zc,
                dck: dck,
                event: "updateDC"
              }
              //Gọi hàm Query
              queryData("asset/php/api.php", dataclient, function (res) {
                if (res.success == 2) {
                  alert_error("Dữ liệu đã bị trùng ID địa chỉ");
                } else if (res.success == 1) {
                  showDataDiaChi();
                  alert_success("Cập nhật Thành Công");
                  flagdc = 0;

                  $(".Diachi .btnadd").prop("disabled", false);
                  $(".Diachi .btnsave").prop("disabled", true);
                  $(".Diachi .btnedit").prop("disabled", true);
                } else if (status == 'Diachi') {
                  alert_error("Lỗi cập nhật Không Thành Công");
                }
              });
            }
          } else if (status == 'Diachi') {
            console.log("chưa nhấn nút nào cả");
          }
        });
        $(".Diachi .btndel").click(function () {
          var iddc = $(".iddc").val();
          if (status == 'Diachi') {
            bootbox.confirm("Bạn có chắc xóa Địa chỉ[ " + iddc + " ] này không?", function (result) {
              if (result == true) {
                var dataSend = {
                  event: "deleteDC",
                  iddc: iddc
                };
                queryData("asset/php/api.php", dataSend, function (data) {
                  if (data.success == 1 && status == 'Diachi') {
                    showDataDiaChi();
                    resetViewdc();
                    $(".iddc").prop("disabled", false);
                    alert_success("Xóa thành công");
                  } else if (data.success == 2 && status == 'Diachi') {
                    alert_info("Địa chỉ đã được sử dụng trong bảng sách");
                  } else {
                    alert_error("Xóa không thành công");
                  }
                });
              } else if (status == 'Diachi') {
                alert_info("Lỗi");
              }
            })
          }
        })
        ////Bắt sự kiện click trên mỗi dòng
        $(".addListDiachi").on('click', '.click_view_DC', function () {
          var iddc = $(this).parent().attr("data-iddc");
          var idkhdc = $(this).parent().attr("data-idkhdc");
          var dc1 = $(this).parent().attr("data-dc1");
          var dc2 = $(this).parent().attr("data-dc2");
          var dc3 = $(this).parent().attr("data-dc3");
          var qt = $(this).parent().attr("data-qt");
          var tptt = $(this).parent().attr("data-tptt");
          var qg = $(this).parent().attr("data-qg");
          var zc = $(this).parent().attr("data-zc");
          var dck = $(this).parent().attr("data-dck");
          $(".iddc").val(iddc);
          $(".idkhdc").val(idkhdc);
          $(".dc1").val(dc1);
          $(".dc2").val(dc2);
          $(".dc3").val(dc3);
          $(".qt").val(qt);
          $(".tptt").val(tptt);
          $(".qg").val(qg);
          $(".zc").val(zc);
          $(".dck").val(dck);
          $(".Diachi .btnadd").prop("disabled", false);
          $(".Diachi .btnsave").prop("disabled", true);
          $(".Diachi .btnedit").prop("disabled", false);
        })

        function showDataDiaChi() {
          var dataSend = {
            event: "getALLDC"
          }
          var htmls = '';
          queryData("asset/php/api.php", dataSend, function (data) {
            var arr = data.items; //lấy ra mảng 
            var stt = 1;
            for (var item in arr) {
              var d = arr[item];

              htmls = htmls + '"<tr data-iddc="' + d.iddc + '" data-idkhdc="' + d.idkhdc + '" data-dc1="' + d.dc1 + '" data-dc2="' + d.dc2 + '" data-dc3="' + d.dc3 + '" data-qt="' + d.qt + '" data-tptt="' + d.tptt + '" data-qg="' + d.qg + '" data-zc="' + d.zc + '" data-dck= "' + d.dck + '" >' +
                '<td>' + stt + '</td>' +
                '<td>' + d.iddc + '</td>' +
                '<td>' + d.idkhdc + '</td>' +
                '<td>' + d.dc1 + '</td>' +
                '<td>' + d.dc2 + '</td>' +
                '<td>' + d.dc3 + '</td>' +
                '<td>' + d.qt + '</td>' +
                '<td>' + d.tptt + '</td>' +
                '<td>' + d.qg + '</td>' +
                '<td>' + d.zc + '</td>' +
                '<td>' + d.dck + '</td>' +
                '<td class="click_view_DC"><span class="badge bg-danger" style="cursor:pointer">Xem</span></td>' +
                '</tr>';
              stt++;
            }
            $(".table .td").html(htmls);
          });
        }

        function resetViewdc() {
          $(".iddc").val("");
          $(".iddc").focus();
          $(".idkhdc").val("");
          $(".dc1").val("");
          $(".dc2").val("");
          $(".dc3").val("");
          $(".qt").val("");
          $(".tptt").val("");
          $(".qg").val("");
          $(".zc").val("");
          $(".dck").val("");
        }
        showDataDiaChi();
      } else if (t == 'Sothich') {

        status = 'Sothich';
        var flagST = 0;
        $(".Sothich .btnadd").click(function () {
          $(".Sothich .btnadd").prop("disabled", true);
          $(".Sothich .btnsave").prop("disabled", false);
          $(".Sothich .btnedit").prop("disabled", true);
          resetViewST();
          flagST = 1;
          $(".idst").prop("disabled", false);
        });
        $(".Sothich .btnedit").click(function () {

          $(".Sothich .btnadd").prop("disabled", true);
          $(".Sothich .btnsave").prop("disabled", false);
          $(".Sothich .btnedit").prop("disabled", true);
          flagST = 2;
          $(".idst").prop("disabled", true);
        });
        $(".Sothich .btnrf").click(function () {
          resetViewST();
          $(".Sothich .btnadd").prop("disabled", false);
          $(".Sothich .btnsave").prop("disabled", true);
          $(".Sothich .btnedit").prop("disabled", true);
          flagST = 0;
        });
        $(".Sothich .btnsave").click(function () {
          if (flagST == 1 && status == 'Sothich') {
            var idst = $(".idst").val();
            var idddstkh = $(".idddstkh").val();
            var idkhstkh = $(".idkhstkh").val();
            if (idst == "") {
              alert_info("ID sở thích không thể để trống");
              $(".idst").focus();
            } else if (idddstkh == "") {
              alert_info("ID đặc điểm không thể để trống");
              $(".idddstkh").focus();
            } else if (idkhstkh == "") {
              alert_info("ID khách hàng không thể để trống");
              $(".idkhstkh").focus();
            } else //có nghĩa idst và tên thể loại hop le
            {
              var dataclient = {
                idst: idst,
                idddstkh: idddstkh,
                idkhstkh: idkhstkh,
                event: "insertstkh"
              }
              queryData("asset/php/api.php", dataclient, function (res) {
                if (res.success == 2 && status == 'Sothich') {
                  alert_error("Dữ liệu đã bị trùng ID sở thích");
                } else if (res.success == 1 && status == 'Sothich') {
                  alert_success("Insert Thành Công");
                  flagST = 0;
                  resetViewST();
                  $(".Sothich .btnadd").prop("disabled", false);
                  $(".Sothich .btnsave").prop("disabled", true);
                  $(".Sothich .btnedit").prop("disabled", true);
                  showDataSothichkhachhang();
                } else if (status == 'Sothich') {
                  alert_error("Lỗi Insert Không Thành Công");
                  showDataSothichkhachhang();
                }
              });
            }
          } else if (flagST == 2 && status == 'Sothich') {
            console.log("update");
            var idst = $(".idst").val();
            var idddstkh = $(".idddstkh").val();
            var idkhstkh = $(".idddstkh").val();
            if (idst == "") {
              alert_info("ID sở thích không thể để trống");
              $(".idst").focus();
            } else if (idddstkh == "") {
              alert_info("ID đặc điểm không thể để trống");
              $(".idddstkh").focus();
            } else //có nghĩa idst và tên thể loại hop le
            {
              var dataclient = {
                idst: idst,
                idddstkh: idddstkh,
                idkhstkh: idkhstkh,
                event: "updatestkh"
              }
              //Gọi hàm Query
              queryData("asset/php/api.php", dataclient, function (res) {
                if (res.success == 2 && status == 'Sothich') {
                  alert_error("Dữ liệu đã bị trùng ID sở thích");
                } else if (res.success == 1 && status == 'Sothich') {
                  showDataSothichkhachhang();
                  alert_success("Cập nhật Thành Công");
                  flagST = 0;
                  $(".Sothich .btnadd").prop("disabled", false);
                  $(".Sothich .btnsave").prop("disabled", true);
                  $(".Sothich .btnedit").prop("disabled", true);
                } else if (status == 'Sothich') {
                  alert_error("Lỗi cập nhật Không Thành Công");
                }
              });
            }
          } else if (status == 'Sothich') {
            console.log("chưa nhấn nút nào cả");
          }
        });
        $(".Sothich .btndel").click(function () {
          var idst = $(".idst").val();
          if (status == 'Sothich') {
            bootbox.confirm("Bạn có chắc xóa ID sở thích[ " + idst + " ] này không?", function (result) {
              if (result == true) {
                var dataSend = {
                  event: "deletestkh",
                  idst: idst
                };
                queryData("asset/php/api.php", dataSend, function (data) {
                  if (data.success == 1 && status == 'Sothich') {
                    showDataSothichkhachhang();
                    resetViewST();
                    $(".idst").prop("disabled", false);
                    alert_success("Xóa thành công");
                  } else if (data.success == 2 && status == 'Sothich') {
                    alert_info("ID sở thích đã được sử dụng trong bảng sách");
                  } else {
                    alert_error("Xóa không thành công");
                  }
                });
              } else if (status == 'Sothich') {
                alert_info("Lỗi");
              }
            })
          }
        })
        ////Bắt sự kiện click trên mỗi dòng
        $(".addListSothich").on('click', '.click_view_stkh', function () {
          var idst = $(this).parent().attr("data-idst");
          var idddstkh = $(this).parent().attr("data-idddstkh");
          var idkhstkh = $(this).parent().attr("data-idkhstkh");
          $(".idst").val(idst);
          $(".idddstkh").val(idddstkh);
          $(".idkhstkh").val(idkhstkh);
          $(".Sothich .btnadd").prop("disabled", false);
          $(".Sothich .btnsave").prop("disabled", true);
          $(".Sothich .btnedit").prop("disabled", false);
        })

        function showDataSothichkhachhang() {
          var dataSend = {
            event: "getALLstkh"
          }
          var htmls = '';
          queryData("asset/php/api.php", dataSend, function (data) {
            var arr = data.items; //lấy ra mảng 
            var stt = 1;
            for (var item in arr) {
              var d = arr[item];
              htmls = htmls + '"<tr data-idst="' + d.idst + '" data-idddstkh="' + d.idddstkh + '" data-idkhstkh="' + d.idkhstkh + '">' +
                '<td>' + stt + '</td>' +
                '<td>' + d.idst + '</td>' +
                '<td>' + d.idddstkh + '</td>' +
                '<td>' + d.idkhstkh + '</td>' +
                '<td class="click_view_stkh"><span class="badge bg-danger" style="cursor:pointer">Xem</span></td>' +
                '</tr>';
              stt++;
            }
            $(".table .td").html(htmls);
          });
        }

        function resetViewST() {
          $(".idst").val("");
          $(".idst").focus();
          $(".idddstkh").val("");
          $(".idkhstkh").val("");
        }
        showDataSothichkhachhang();

      } else if (t == 'Xeban') {
        status = 'Xeban';
        var flagxb = 0;
        $(".Xeban .btnadd").click(function () {
          $(".Xeban .btnadd").prop("disabled", true);
          $(".Xeban .btnsave").prop("disabled", false);
          $(".Xeban .btnedit").prop("disabled", true);
          resetViewxb();
          flagxb = 1;
          $(".idxb").prop("disabled", false);
        });
        $(".Xeban .btnedit").click(function () {

          $(".Xeban .btnadd").prop("disabled", true);
          $(".Xeban .btnsave").prop("disabled", false);
          $(".Xeban .btnedit").prop("disabled", true);
          flagxb = 2;
          $(".idxb").prop("disabled", true);
        });
        $(".Xeban .btnrf").click(function () {
          resetViewxb();
          $(".Xeban .btnadd").prop("disabled", false);
          $(".Xeban .btnsave").prop("disabled", true);
          $(".Xeban .btnedit").prop("disabled", true);
          flagxb = 0;
        });
        $(".Xeban .btnsave").click(function () {
          if (flagxb == 1 && status == 'Xeban') {
            var idxb = $(".idxb").val();
            var tnsxxb = $(".tnsxxb").val();
            var mmhxb = $(".mmhxb").val();
            var mlxxb = $(".mlxxb").val();
            var gxb = $(".gxb").val();
            var slxb = $(".slxb").val();
            var nmxb = $(".nmxb").val();
            var ndkxb = $(".ndkxb").val();
            var tttxb = $(".tttxb").val();
            if (idxb == "") {
              alert_info("ID xe bán không thể để trống");
              $(".idxb").focus();
            } else if (tnsxxb == "") {
              alert_info("Tên nhà sản xuất không thể để trống");
              $(".tnsxxb").focus();
            } else if (mmhxb == "") {
              alert_info("Mã mô hình không thể để trống");
              $(".mmhxb").focus();
            } else if (mlxxb == "") {
              alert_info("Mã loại xe không thể để trống");
              $(".mlxxb").focus();
            } else if (gxb == "") {
              alert_info("Yêu cầu nhập giá");
              $(".gxb").focus();
            } else if (slxb == "") {
              alert_info("Yêu cầu nhập số lượng");
              $(".mlxxb").focus();
            } else if (nmxb == "") {
              alert_info("Yêu cầu nhập ngày mua (yyyy/m/d)");
              $(".nmxb").focus();
            } else if (ndkxb == "") {
              alert_info("Yêu cầu nhập năm đăng ký xe bán");
              $(".ndkxb").focus();
            } else //có nghĩa idxb và tên thể loại hop le
            {
              var dataclient = {
                idxb: idxb,
                tnsxxb: tnsxxb,
                mmhxb: mmhxb,
                mlxxb: mlxxb,
                gxb: gxb,
                slxb: slxb,
                nmxb: nmxb,
                ndkxb: ndkxb,
                tttxb: tttxb,
                event: "insertXB"
              }
              queryData("asset/php/api.php", dataclient, function (res) {
                if (res.success == 2 && status == 'Xeban') {
                  alert_error("Dữ liệu đã bị trùng ID xe bán");
                } else if (res.success == 1 && status == 'Xeban') {
                  alert_success("Insert Thành Công");
                  flagxb = 0;
                  resetViewxb();
                  $(".Xeban .btnadd").prop("disabled", false);
                  $(".Xeban .btnsave").prop("disabled", true);
                  $(".Xeban .btnedit").prop("disabled", true);
                  showDataXeban();
                } else if (status == 'Xeban') {
                  alert_error("Lỗi Insert Không Thành Công");
                  showDataXeban();
                }
              });
            }

          } else if (flagxb == 2 && status == 'Xeban') {
            var idxb = $(".idxb").val();
            var tnsxxb = $(".tnsxxb").val();
            var mmhxb = $(".mmhxb").val();
            var mlxxb = $(".mlxxb").val();
            var gxb = $(".gxb").val();
            var slxb = $(".slxb").val();
            var nmxb = $(".nmxb").val();
            var ndkxb = $(".ndkxb").val();
            var tttxb = $(".tttxb").val();
            if (idxb == "") {
              alert_info("ID xe bán không thể để trống");
              $(".idxb").focus();
            } else if (tnsxxb == "") {
              alert_info("Tên nhà sản xuất không thể để trống");
              $(".tnsxxb").focus();
            } else if (mmhxb == "") {
              alert_info("Mã mô hình không thể để trống");
              $(".mmhxb").focus();
            } else if (mlxxb == "") {
              alert_info("Mã loại xe không thể để trống");
              $(".mlxxb").focus();
            } else if (gxb == "") {
              alert_info("Yêu cầu nhập giá");
              $(".gxb").focus();
            } else if (slxb == "") {
              alert_info("Yêu cầu nhập số lượng");
              $(".mlxxb").focus();
            } else if (nmxb == "") {
              alert_info("Yêu cầu nhập ngày mua (yyyy/m/d)");
              $(".nmxb").focus();
            } else if (ndkxb == "") {
              alert_info("Yêu cầu nhập năm đăng ký xe bán");
              $(".ndkxb").focus();
            } else //có nghĩa idxb và tên thể loại hop le
            {
              var dataclient = {
                idxb: idxb,
                tnsxxb: tnsxxb,
                mmhxb: mmhxb,
                mlxxb: mlxxb,
                gxb: gxb,
                slxb: slxb,
                nmxb: nmxb,
                ndkxb: ndkxb,
                tttxb: tttxb,
                event: "updateXB"
              }
              //Gọi hàm Query
              queryData("asset/php/api.php", dataclient, function (res) {
                console.log("" + res.success);
                if (res.success == 2 && status == 'Xeban') {
                  alert_error("Dữ liệu đã bị trùng mã Xe bán");

                } else if (res.success == 1 && status == 'Xeban') {
                  showDataXeban();
                  alert_success("Cập nhật Thành Công");
                  flagxb = 0;

                  $(".Xeban .btnadd").prop("disabled", false);
                  $(".Xeban .btnsave").prop("disabled", true);
                  $(".Xeban .btnedit").prop("disabled", true);
                } else if (status == 'Xeban') {
                  alert_error("Lỗi Cập nhật Không Thành Công");
                }
              });
            }
          } else if (status == 'Xeban') {
            console.log("chưa nhấn nút nào cả");
          }
        })
        $(".Xeban .btndel").click(function () {
          var idxb = $(".idxb").val();
          var tnsxxb = $(".tnsxxb").val();
          if (status == 'Xeban') {
            bootbox.confirm("Bạn có chắc xóa xe bán của [ " + tnsxxb + " ] này không?", function (result) {
              if (result == true) {
                var dataSend = {
                  event: "deleteXB",
                  idxb: idxb
                };
                queryData("asset/php/api.php", dataSend, function (data) {
                  if (data.success == 1 && status == 'Xeban') {
                    showDataXeban();
                    resetViewxb();
                    $(".idxb").prop("disabled", false);
                    alert_success("Xóa thành công");
                  } else if (data.success == 2 && status == 'Xeban') {
                    alert_info("Xe bán đã được sử dụng trong bảng sách");
                  } else {
                    alert_error("Xóa không thành công");
                  }
                });
              } else if (status == 'Xeban') {
                alert_info("Lỗi");
              }
            })
          }
        })
        ////Bắt sự kiện click trên mỗi dòng
        $(".addListXeban").on('click', '.click_view', function () {
          var idxb = $(this).parent().attr("data-idxb");
          var tnsxxb = $(this).parent().attr("data-tnsxxb");
          var mmhxb = $(this).parent().attr("data-mmhxb");
          var mlxxb = $(this).parent().attr("data-mlxxb");
          var gxb = $(this).parent().attr("data-gxb");
          var slxb = $(this).parent().attr("data-slxb");
          var nmxb = $(this).parent().attr("data-nmxb");
          var ndkxb = $(this).parent().attr("data-ndkxb");
          var tttxb = $(this).parent().attr("data-tttxb");
          $(".idxb").val(idxb);
          $(".tnsxxb").val(tnsxxb);
          $(".mmhxb").val(mmhxb);
          $(".mlxxb").val(mlxxb);
          $(".gxb").val(gxb);
          $(".slxb").val(slxb);
          $(".nmxb").val(nmxb);
          $(".ndkxb").val(ndkxb);
          $(".tttxb").val(tttxb);
          $(".Xeban .btnadd").prop("disabled", false);
          $(".Xeban .btnsave").prop("disabled", true);
          $(".Xeban .btnedit").prop("disabled", false);
        })

        function showDataXeban() {
          var dataSend = {
            event: "getALLXB"
          }
          var htmls = '';
          queryData("asset/php/api.php", dataSend, function (data) {
            var arr = data.items; //lấy ra mảng 
            var stt = 1;
            for (var item in arr) {
              var d = arr[item];
              htmls = htmls + '<tr data-idxb="' + d.idxb + '" data-tnsxxb="' + d.tnsxxb + '" data-mmhxb="' + d.mmhxb + '" data-mlxxb="' + d.mlxxb + '" data-gxb="' + d.gxb + '" data-slxb="' + d.slxb + '" data-nmxb="' + d.nmxb + '" data-ndkxb="' + d.ndkxb + '" data-tttxb="' + d.tttxb + '" >' +
                '<td>' + stt + '</td>' +
                '<td>' + d.idxb + '</td>' +
                '<td>' + d.tnsxxb + '</td>' +
                '<td>' + d.mmhxb + '</td>' +
                '<td>' + d.mlxxb + '</td>' +
                '<td>' + d.gxb + '</td>' +
                '<td>' + d.slxb + '</td>' +
                '<td>' + d.nmxb + '</td>' +
                '<td>' + d.ndkxb + '</td>' +
                '<td>' + d.tttxb + '</td>' +
                '<td class="click_view" ><span class="badge bg-danger" style="cursor:pointer">Xem</span></td>' +
                '</tr>';
              stt++;
            }
            $(".table .td").html(htmls);
          });
        }

        function resetViewxb() {
          $(".idxb").val("");
          $(".idxb").focus();
          $(".tnsxxb").val("");
          $(".mmhxb").val("");
          $(".mlxxb").val("");
          $(".gxb").val("");
          $(".slxb").val("");
          $(".nmxb").val("");
          $(".ndkxb").val("");
          $(".tttxb").val("");
        };
        showDataXeban();
      } else if (t == 'Dacdiemxe') {
        // dac diecm xe
        status = 'Dacdiemxe';
        var flagdd = 0;
        $(".Dacdiemxe .btnadd").click(function () {
          $(".Dacdiemxe .btnadd").prop("disabled", true);
          $(".Dacdiemxe .btnsave").prop("disabled", false);
          $(".Dacdiemxe .btnedit").prop("disabled", true);
          resetViewddx();
          flagdd = 1;
          $(".idddddx").prop("disabled", false);
        });
        $(".Dacdiemxe .btnedit").click(function () {

          $(".Dacdiemxe .btnadd").prop("disabled", true);
          $(".Dacdiemxe .btnsave").prop("disabled", false);
          $(".Dacdiemxe .btnedit").prop("disabled", true);
          flagdd = 2;
          $(".idddddx").prop("disabled", true);
        });
        $(".Dacdiemxe .btnrf").click(function () {
          resetViewddx();
          $(".Dacdiemxe .btnadd").prop("disabled", false);
          $(".Dacdiemxe .btnsave").prop("disabled", true);
          $(".Dacdiemxe .btnedit").prop("disabled", true);
          flagdd = 0;
        });
        $(".Dacdiemxe .btnsave").click(function () {
          if (flagdd == 1 && status == 'Dacdiemxe') {
            var idddddx = $(".idddddx").val();
            var mttn = $(".mttn").val();
            if (idddddx == "") {
              alert_info("ID đặc điểm không thể để trống");
              $(".idddddx").focus();
            } else if (mttn == "") {
              console.log("save");
              alert_info("Bạn cần mô tả đặc điểm của xe");
              $(".mttn").focus();
            } else //có nghĩa idddddx và tên thể loại hop le
            {
              var dataclient = {
                idddddx: idddddx,
                mttn: mttn,
                event: "insertDD"
              }
              queryData("asset/php/api.php", dataclient, function (res) {
                if (res.success == 2 && status == 'Dacdiemxe') {
                  alert_error("Dữ liệu đã bị trùng ID đặc điểm");
                } else if (res.success == 1 && status == 'Dacdiemxe') {
                  alert_success("Insert Thành Công");
                  flagdd = 0;
                  resetViewddx();
                  $(".Dacdiemxe .btnadd").prop("disabled", false);
                  $(".Dacdiemxe .btnsave").prop("disabled", true);
                  $(".Dacdiemxe .btnedit").prop("disabled", true);
                  showDataDacdiemxe();
                } else if (status == 'Dacdiemxe') {
                  alert_error("Lỗi Insert Không Thành Công");
                  showDataDacdiemxe();
                }
              });
            }
          } else if (flagdd == 2 && status == 'Dacdiemxe') {
            console.log("update");
            var idddddx = $(".idddddx").val();
            var mttn = $(".mttn").val();
            if (idddddx == "") {
              alert_info("ID đặc điểm không thể để trống");
              $(".idddddx").focus();
            } else if (mttn == "") {
              alert_info("Bạn cần mô tả đặc điểm của xe");
              $(".mttn").focus();
            } else //có nghĩa idddddx và tên thể loại hop le
            {
              var dataclient = {
                idddddx: idddddx,
                mttn: mttn,
                event: "updateDD"
              }
              //Gọi hàm Query
              queryData("asset/php/api.php", dataclient, function (res) {
                if (res.success == 2 && status == 'Dacdiemxe') {
                  alert_error("Dữ liệu đã bị trùng ID đặc điểm");
                } else if (res.success == 1 && status == 'Dacdiemxe') {
                  showDataDacdiemxe();
                  alert_success("Cập nhật Thành Công");
                  flagdd = 0;

                  $(".Dacdiemxe .btnadd").prop("disabled", false);
                  $(".Dacdiemxe .btnsave").prop("disabled", true);
                  $(".Dacdiemxe .btnedit").prop("disabled", true);
                } else if (status == 'Dacdiemxe') {
                  alert_error("Lỗi cập nhật Không Thành Công");
                }
              });
            }
          } else if (status == 'Dacdiemxe') {
            console.log("chưa nhấn nút nào cả");
          }
        });
        $(".Dacdiemxe .btndel").click(function () {
          var idddddx = $(".idddddx").val();
          if (status == 'Dacdiemxe') {
            bootbox.confirm("Bạn có chắc xóa đặc điểm[ " + idddddx + " ] này không?", function (result) {
              if (result == true) {
                var dataSend = {
                  event: "deleteDD",
                  idddddx: idddddx
                };
                queryData("asset/php/api.php", dataSend, function (data) {
                  if (data.success == 1 && status == 'Dacdiemxe') {
                    showDataDacdiemxe();
                    resetViewddx();
                    $(".idddddx").prop("disabled", false);
                    alert_success("Xóa thành công");
                  } else if (data.success == 2 && status == 'Dacdiemxe') {
                    alert_info("Địa chỉ đã được sử dụng trong bảng sách");
                  } else {
                    alert_error("Xóa không thành công");
                  }
                });
              } else if (status == 'Dacdiemxe') {
                alert_info("Lỗi");
              }
            })
          }
        })
        ////Bắt sự kiện click trên mỗi dòng
        $(".addListDacdiemxe").on('click', '.click_view_DD', function () {
          var idddddx = $(this).parent().attr("data-idddddx");
          var mttn = $(this).parent().attr("data-mttn");
          $(".idddddx").val(idddddx);
          $(".mttn").val(mttn);
          $(".Dacdiemxe .btnadd").prop("disabled", false);
          $(".Dacdiemxe .btnsave").prop("disabled", true);
          $(".Dacdiemxe .btnedit").prop("disabled", false);
        })

        function showDataDacdiemxe() {
          var dataSend = {
            event: "getALLDD"
          }
          var htmls = '';
          queryData("asset/php/api.php", dataSend, function (data) {
            var arr = data.items; //lấy ra mảng 
            var stt = 1;
            for (var item in arr) {
              var d = arr[item];

              htmls = htmls + '"<tr data-idddddx="' + d.idddddx + '" data-mttn="' + d.mttn + '">' +
                '<td>' + stt + '</td>' +
                '<td>' + d.idddddx + '</td>' +
                '<td>' + d.mttn + '</td>' +
                '<td class="click_view_DD"><span class="badge bg-danger" style="cursor:pointer">Xem</span></td>' +
                '</tr>';
              stt++;
            }
            $(".table .td").html(htmls);
          });
        }

        function resetViewddx() {
          $(".idddddx").val("");
          $(".idddddx").focus();
          $(".mttn").val("");
        }
        showDataDacdiemxe();
      } else if (t == 'Xedaban') {
        status = 'Xedaban';
        var flagxdb = 0;
        $(".Xedaban .btnadd").click(function () {
          $(".Xedaban .btnadd").prop("disabled", true);
          $(".Xedaban .btnsave").prop("disabled", false);
          $(".Xedaban .btnedit").prop("disabled", true);
          resetViewXDB();
          flagxdb = 1;
          $(".idxdb").prop("disabled", false);
        });
        $(".Xedaban .btnedit").click(function () {

          $(".Xedaban .btnadd").prop("disabled", true);
          $(".Xedaban .btnsave").prop("disabled", false);
          $(".Xedaban .btnedit").prop("disabled", true);
          flagxdb = 2;
          $(".idxdb").prop("disabled", true);
        });
        $(".Xedaban .btnrf").click(function () {
          resetViewXDB();
          $(".Xedaban .btnadd").prop("disabled", false);
          $(".Xedaban .btnsave").prop("disabled", true);
          $(".Xedaban .btnedit").prop("disabled", true);
          flagxdb = 0;
        });
        $(".Xedaban .btnsave").click(function () {
          if (flagxdb == 1 && status == 'Xedaban') {
            var idxdb = $(".idxdb").val();
            var idxbxdb = $(".idxbxdb").val();
            var idkhxdb = $(".idkhxdb").val();
            var gtt = $(".gtt").val();
            var nb = $(".nb").val();
            var tttht = $(".tttht").val();
            var nttht = $(".nttht").val();
            var tttxdb = $(".tttxdb").val();
            if (idxdb == "") {
              alert_info("ID xe đã bán không thể để trống");
              $(".idxdb").focus();
            } else if (idxbxdb == "") {
              console.log("save");
              alert_info("ID xe bán không thể để trống");
              $(".idxbxdb").focus();
            } else //có nghĩa idxdb và tên thể loại hop le
            {
              var dataclient = {
                idxdb: idxdb,
                idxbxdb: idxbxdb,
                idkhxdb: idkhxdb,
                gtt: gtt,
                nb: nb,
                tttht: tttht,
                nttht: nttht,
                tttxdb: tttxdb,
                event: "insertXDB"
              }
              queryData("asset/php/api.php", dataclient, function (res) {
                if (res.success == 2 && status == 'Xedaban') {
                  alert_error("Dữ liệu đã bị trùng ID xe đã bán");
                } else if (res.success == 1 && status == 'Xedaban') {
                  alert_success("Insert Thành Công");
                  flagxdb = 0;
                  resetViewXDB();
                  $(".Xedaban .btnadd").prop("disabled", false);
                  $(".Xedaban .btnsave").prop("disabled", true);
                  $(".Xedaban .btnedit").prop("disabled", true);
                  showDataXedaban();
                } else if (status == 'Xedaban') {
                  alert_error("Lỗi Insert Không Thành Công");
                  showDataXedaban();
                }
              });
            }
          } else if (flagxdb == 2 && status == 'Xedaban') {
            console.log("update");
            var idxdb = $(".idxdb").val();
            var idxbxdb = $(".idxbxdb").val();
            var idkhxdb = $(".idkhxdb").val();
            var gtt = $(".gtt").val();
            var nb = $(".nb").val();
            var tttht = $(".tttht").val();
            var nttht = $(".nttht").val();
            var tttxdb = $(".tttxdb").val();
            if (idxdb == "" && status == 'Xedaban') {
              alert_info("ID xe đã bán không thể để trống");
              $(".idxdb").focus();
            } else if (idxbxdb == "") {
              alert_info("ID xe bán không thể để trống");
              $(".idxbxdb").focus();
            } else //có nghĩa idxdb và tên thể loại hop le
            {
              var dataclient = {
                idxdb: idxdb,
                idxbxdb: idxbxdb,
                idkhxdb: idkhxdb,
                gtt: gtt,
                nb: nb,
                tttht: tttht,
                nttht: nttht,
                tttxdb: tttxdb,
                event: "updateXDB"
              }
              //Gọi hàm Query
              queryData("asset/php/api.php", dataclient, function (res) {
                if (res.success == 2 && status == 'Xedaban') {
                  alert_error("Dữ liệu đã bị trùng ID xe đã bán");
                } else if (res.success == 1 && status == 'Xedaban') {
                  showDataXedaban();
                  alert_success("Cập nhật Thành Công");
                  flagxdb = 0;
                  $(".Xedaban .btnadd").prop("disabled", false);
                  $(".Xedaban .btnsave").prop("disabled", true);
                  $(".Xedaban .btnedit").prop("disabled", true);
                } else if (status == 'Xedaban') {
                  alert_error("Lỗi cập nhật Không Thành Công");
                }
              });
            }
          } else if (status == 'Xedaban') {
            console.log("chưa nhấn nút nào cả");
          }
        });
        $(".Xedaban .btndel").click(function () {
          var idxdb = $(".idxdb").val();
          if (status == 'Xedaban') {
            bootbox.confirm("Bạn có chắc xóa ID xe đã bán[ " + idxdb + " ] này không?", function (result) {
              if (result == true) {
                var dataSend = {
                  event: "deleteXDB",
                  idxdb: idxdb
                };
                queryData("asset/php/api.php", dataSend, function (data) {
                  if (data.success == 1 && status == 'Xedaban') {
                    showDataXedaban();
                    resetViewXDB();
                    $(".idxdb").prop("disabled", false);
                    alert_success("Xóa thành công");
                  } else if (data.success == 2 && status == 'Xedaban') {
                    alert_info("Địa chỉ đã được sử dụng trong bảng sách");
                  } else {
                    alert_error("Xóa không thành công");
                  }
                });
              } else if (status == 'Xedaban') {
                alert_info("Lỗi");
              }
            })
          }
        })
        ////Bắt sự kiện click trên mỗi dòng
        $(".addListXedaban").on('click', '.click_view_XDB', function () {
          var idxdb = $(this).parent().attr("data-idxdb");
          var idxbxdb = $(this).parent().attr("data-idxbxdb");
          var idkhxdb = $(this).parent().attr("data-idkhxdb");
          var gtt = $(this).parent().attr("data-gtt");
          var nb = $(this).parent().attr("data-nb");
          var tttht = $(this).parent().attr("data-tttht");
          var nttht = $(this).parent().attr("data-nttht");
          var tttxdb = $(this).parent().attr("data-tttxdb");
          $(".idxdb").val(idxdb);
          $(".idxbxdb").val(idxbxdb);
          $(".idkhxdb").val(idkhxdb);
          $(".gtt").val(gtt);
          $(".nb").val(nb);
          $(".tttht").val(tttht);
          $(".nttht").val(nttht);
          $(".tttxdb").val(tttxdb);
          $(".Xedaban .btnadd").prop("disabled", false);
          $(".Xedaban .btnsave").prop("disabled", true);
          $(".Xedaban .btnedit").prop("disabled", false);
        })

        function showDataXedaban() {
          var dataSend = {
            event: "getALLXDB"
          }
          var htmls = '';
          queryData("asset/php/api.php", dataSend, function (data) {
            var arr = data.items; //lấy ra mảng 
            var stt = 1;
            for (var item in arr) {
              var d = arr[item];
              htmls = htmls + '"<tr data-idxdb="' + d.idxdb + '" data-idxbxdb="' + d.idxbxdb + '" data-idkhxdb="' + d.idkhxdb + '" data-gtt="' + d.gtt + '" data-nb="' + d.nb + '" data-tttht="' + d.tttht + '" data-nttht="' + d.nttht + '" data-tttxdb="' + d.tttxdb + '" >' +
                '<td>' + stt + '</td>' +
                '<td>' + d.idxdb + '</td>' +
                '<td>' + d.idxbxdb + '</td>' +
                '<td>' + d.idkhxdb + '</td>' +
                '<td>' + d.gtt + '</td>' +
                '<td>' + d.nb + '</td>' +
                '<td>' + d.tttht + '</td>' +
                '<td>' + d.nttht + '</td>' +
                '<td>' + d.tttxdb + '</td>' +
                '<td class="click_view_XDB"><span class="badge bg-danger" style="cursor:pointer">Xem</span></td>' +
                '</tr>';
              stt++;
            }
            $(".table .td").html(htmls);
          });
        }

        function resetViewXDB() {
          $(".idxdb").val("");
          $(".idxdb").focus();
          $(".idxbxdb").val("");
          $(".idkhxdb").val("");
          $(".gtt").val("");
          $(".nb").val("");
          $(".tttht").val("");
          $(".nttht").val("");
          $(".tttxdb").val("");
        }
        showDataXedaban();
      } else if (t == 'DDxedaban') {

        status = 'DDxedaban';
        var flagddxdb = 0;
        $(".DDxedaban .btnadd").click(function () {
          $(".DDxedaban .btnadd").prop("disabled", true);
          $(".DDxedaban .btnsave").prop("disabled", false);
          $(".DDxedaban .btnedit").prop("disabled", true);
          resetViewddxdb();
          flagddxdb = 1;
          $(".idxbddxdb").prop("disabled", false);
        });
        $(".DDxedaban .btnedit").click(function () {

          $(".DDxedaban .btnadd").prop("disabled", true);
          $(".DDxedaban .btnsave").prop("disabled", false);
          $(".DDxedaban .btnedit").prop("disabled", true);
          flagddxdb = 2;
          $(".idxbddxdb").prop("disabled", true);
        });
        $(".DDxedaban .btnrf").click(function () {
          resetViewddxdb();
          $(".DDxedaban .btnadd").prop("disabled", false);
          $(".DDxedaban .btnsave").prop("disabled", true);
          $(".DDxedaban .btnedit").prop("disabled", true);
          flagddxdb = 0;
        });
        $(".DDxedaban .btnsave").click(function () {
          if (flagddxdb == 1 && status == 'DDxedaban') {
            var idxbddxdb = $(".idxbddxdb").val();
            var idddddxdb = $(".idddddxdb").val();
            if (idxbddxdb == "") {
              alert_info("ID xe bán không thể để trống");
              $(".idxbddxdb").focus();
            } else if (idddddxdb == "") {
              alert_info("ID đặc điểm không thể để trống");
              $(".idddddxdb").focus();
            } else //có nghĩa idxbddxdb và tên thể loại hop le
            {
              var dataclient = {
                idxbddxdb: idxbddxdb,
                idddddxdb: idddddxdb,
                event: "insertDDXDB"
              }
              queryData("asset/php/api.php", dataclient, function (res) {
                if (res.success == 2 && status == 'DDxedaban') {
                  alert_error("Dữ liệu đã bị trùng ID xe bán");
                } else if (res.success == 1 && status == 'DDxedaban') {
                  alert_success("Insert Thành Công");
                  flagddxdb = 0;
                  resetViewddxdb();
                  $(".DDxedaban .btnadd").prop("disabled", false);
                  $(".DDxedaban .btnsave").prop("disabled", true);
                  $(".DDxedaban .btnedit").prop("disabled", true);
                  showDataDDXDB();
                } else if (status == 'DDxedaban') {
                  alert_error("Lỗi Insert Không Thành Công");
                  showDataDDXDB();
                }
              });
            }
          } else if (flagddxdb == 2 && status == 'DDxedaban') {
            console.log("update");
            var idxbddxdb = $(".idxbddxdb").val();
            var idddddxdb = $(".idddddxdb").val();
            if (idxbddxdb == "") {
              alert_info("ID xe bán không thể để trống");
              $(".idxbddxdb").focus();
            } else if (idddddxdb == "") {
              alert_info("ID đặc điểm không thể để trống");
              $(".idddddxdb").focus();
            } else //có nghĩa idxbddxdb và tên thể loại hop le
            {
              var dataclient = {
                idxbddxdb: idxbddxdb,
                idddddxdb: idddddxdb,
                event: "updateDDXDB"
              }
              //Gọi hàm Query
              queryData("asset/php/api.php", dataclient, function (res) {
                if (res.success == 2 && status == 'DDxedaban') {
                  alert_error("Dữ liệu đã bị trùng ID xe bán");
                } else if (res.success == 1 && status == 'DDxedaban') {
                  showDataDDXDB();
                  alert_success("Cập nhật Thành Công");
                  flagddxdb = 0;
                  $(".DDxedaban .btnadd").prop("disabled", false);
                  $(".DDxedaban .btnsave").prop("disabled", true);
                  $(".DDxedaban .btnedit").prop("disabled", true);
                } else if (status == 'DDxedaban') {
                  alert_error("Lỗi cập nhật Không Thành Công");
                }
              });
            }
          } else if (status == 'DDxedaban') {
            console.log("chưa nhấn nút nào cả");
          }
        });
        $(".DDxedaban .btndel").click(function () {
          var idxbddxdb = $(".idxbddxdb").val();
          if (status == 'DDxedaban') {
            bootbox.confirm("Bạn có chắc xóa ID xe bán[ " + idxbddxdb + " ] này không?", function (result) {
              if (result == true) {
                var dataSend = {
                  event: "deleteDDXDB",
                  idxbddxdb: idxbddxdb
                };
                queryData("asset/php/api.php", dataSend, function (data) {
                  if (data.success == 1 && status == 'DDxedaban') {
                    showDataDDXDB();
                    resetViewddxdb();
                    $(".idxbddxdb").prop("disabled", false);
                    alert_success("Xóa thành công");
                  } else if (data.success == 2 && status == 'DDxedaban') {
                    alert_info("ID đặc điểm đã được sử dụng trong bảng sách");
                  } else {
                    alert_error("Xóa không thành công");
                  }
                });
              } else if (status == 'DDxedaban') {
                alert_info("Lỗi");
              }
            })
          }
        })
        ////Bắt sự kiện click trên mỗi dòng
        $(".addListDDxedaban").on('click', '.click_view_ddxdb', function () {
          var idxbddxdb = $(this).parent().attr("data-idxbddxdb");
          var idddddxdb = $(this).parent().attr("data-idddddxdb");
          $(".idxbddxdb").val(idxbddxdb);
          $(".idddddxdb").val(idddddxdb);
          $(".DDxedaban .btnadd").prop("disabled", false);
          $(".DDxedaban .btnsave").prop("disabled", true);
          $(".DDxedaban .btnedit").prop("disabled", false);
        })

        function showDataDDXDB() {
          var dataSend = {
            event: "getALLddxdb"
          }
          var htmls = '';
          queryData("asset/php/api.php", dataSend, function (data) {
            var arr = data.items; //lấy ra mảng 
            var stt = 1;
            for (var item in arr) {
              var d = arr[item];
              htmls = htmls + '"<tr data-idxbddxdb="' + d.idxbddxdb + '" data-idddddxdb="' + d.idddddxdb + '">' +
                '<td>' + stt + '</td>' +
                '<td>' + d.idxbddxdb + '</td>' +
                '<td>' + d.idddddxdb + '</td>' +
                '<td class="click_view_ddxdb"><span class="badge bg-danger" style="cursor:pointer">Xem</span></td>' +
                '</tr>';
              stt++;
            }
            $(".table .td").html(htmls);
          });
        }

        function resetViewddxdb() {
          $(".idxbddxdb").val("");
          $(".idxbddxdb").focus();
          $(".idddddxdb").val("");
        }
        showDataDDXDB();
      } else if (t == 'Xemohinh') {

        status = 'Xemohinh';
        var flagXMH = 0;
        $(".Xemohinh .btnadd").click(function () {
          $(".Xemohinh .btnadd").prop("disabled", true);
          $(".Xemohinh .btnsave").prop("disabled", false);
          $(".Xemohinh .btnedit").prop("disabled", true);
          resetViewXMH();
          flagXMH = 1;
          $(".mmh").prop("disabled", false);
        });
        $(".Xemohinh .btnedit").click(function () {

          $(".Xemohinh .btnadd").prop("disabled", true);
          $(".Xemohinh .btnsave").prop("disabled", false);
          $(".Xemohinh .btnedit").prop("disabled", true);
          flagXMH = 2;
          $(".mmh").prop("disabled", true);
        });
        $(".Xemohinh .btnrf").click(function () {
          resetViewXMH();
          $(".Xemohinh .btnadd").prop("disabled", false);
          $(".Xemohinh .btnsave").prop("disabled", true);
          $(".Xemohinh .btnedit").prop("disabled", true);
          flagXMH = 0;
        });
        $(".Xemohinh .btnsave").click(function () {
          if (flagXMH == 1 && status == 'Xemohinh') {
            var mmh = $(".mmh").val();
            var mnsx = $(".mnsx").val();
            var tmh = $(".tmh").val();
            if (mmh == "") {
              alert_info("Mã mô hình không thể để trống");
              $(".mmh").focus();
            } else if (mnsx == "") {
              alert_info("Mã nhà sản xuất không thể để trống");
              $(".mnsx").focus();
            } else //có nghĩa mmh và tên thể loại hop le
            {
              var dataclient = {
                mmh: mmh,
                mnsx: mnsx,
                tmh: tmh,
                event: "insertXMH"
              }
              queryData("asset/php/api.php", dataclient, function (res) {
                if (res.success == 2 && status == 'Xemohinh') {
                  alert_error("Dữ liệu đã bị trùng Mã mô hình");
                } else if (res.success == 1 && status == 'Xemohinh') {
                  alert_success("Insert Thành Công");
                  flagXMH = 0;
                  resetViewXMH();
                  $(".Xemohinh .btnadd").prop("disabled", false);
                  $(".Xemohinh .btnsave").prop("disabled", true);
                  $(".Xemohinh .btnedit").prop("disabled", true);
                  showDataXemohinh();
                } else if (status == 'Xemohinh') {
                  alert_error("Lỗi Insert Không Thành Công");
                  showDataXemohinh();
                }
              });
            }
          } else if (flagXMH == 2 && status == 'Xemohinh') {
            console.log("update");
            var mmh = $(".mmh").val();
            var mnsx = $(".mnsx").val();
            var tmh = $(".mnsx").val();
            if (mmh == "") {
              alert_info("Mã mô hình không thể để trống");
              $(".mmh").focus();
            } else if (mnsx == "") {
              alert_info("Mã nhà sản xuất không thể để trống");
              $(".mnsx").focus();
            } else //có nghĩa mmh và tên thể loại hop le
            {
              var dataclient = {
                mmh: mmh,
                mnsx: mnsx,
                tmh: tmh,
                event: "updateXMH"
              }
              //Gọi hàm Query
              queryData("asset/php/api.php", dataclient, function (res) {
                if (res.success == 2 && status == 'Xemohinh') {
                  alert_error("Dữ liệu đã bị trùng Mã mô hình");
                } else if (res.success == 1 && status == 'Xemohinh') {
                  showDataXemohinh();
                  alert_success("Cập nhật Thành Công");
                  flagXMH = 0;

                  $(".Xemohinh .btnadd").prop("disabled", false);
                  $(".Xemohinh .btnsave").prop("disabled", true);
                  $(".Xemohinh .btnedit").prop("disabled", true);
                } else if (status == 'Xemohinh') {
                  alert_error("Lỗi cập nhật Không Thành Công");
                }
              });
            }
          } else if (status == 'Xemohinh') {
            console.log("chưa nhấn nút nào cả");
          }
        });
        $(".Xemohinh .btndel").click(function () {
          var mmh = $(".mmh").val();
          if (status == 'Xemohinh') {
            bootbox.confirm("Bạn có chắc xóa Mã mô hình[ " + mmh + " ] này không?", function (result) {
              if (result == true) {
                var dataSend = {
                  event: "deleteXMH",
                  mmh: mmh
                };
                queryData("asset/php/api.php", dataSend, function (data) {
                  if (data.success == 1 && status == 'Xemohinh') {
                    showDataXemohinh();
                    resetViewXMH();
                    $(".mmh").prop("disabled", false);
                    alert_success("Xóa thành công");
                  } else if (data.success == 2 && status == 'Xemohinh') {
                    alert_info("Mã mô hình đã được sử dụng trong bảng sách");
                  } else {
                    alert_error("Xóa không thành công");
                  }
                });
              } else if (status == 'Xemohinh') {
                alert_info("Lỗi");
              }
            })
          }
        })
        ////Bắt sự kiện click trên mỗi dòng
        $(".addListXemohinh").on('click', '.click_view_xmh', function () {
          var mmh = $(this).parent().attr("data-mmh");
          var mnsx = $(this).parent().attr("data-mnsx");
          var tmh = $(this).parent().attr("data-tmh");
          $(".mmh").val(mmh);
          $(".mnsx").val(mnsx);
          $(".tmh").val(tmh);
          $(".Xemohinh .btnadd").prop("disabled", false);
          $(".Xemohinh .btnsave").prop("disabled", true);
          $(".Xemohinh .btnedit").prop("disabled", false);
        })

        function showDataXemohinh() {
          var dataSend = {
            event: "getALLxmh"
          }
          var htmls = '';
          queryData("asset/php/api.php", dataSend, function (data) {
            var arr = data.items; //lấy ra mảng 
            var stt = 1;
            for (var item in arr) {
              var d = arr[item];
              htmls = htmls + '"<tr data-mmh="' + d.mmh + '" data-mnsx="' + d.mnsx + '" data-tmh="' + d.tmh + '">' +
                '<td>' + stt + '</td>' +
                '<td>' + d.mmh + '</td>' +
                '<td>' + d.mnsx + '</td>' +
                '<td>' + d.tmh + '</td>' +
                '<td class="click_view_xmh"><span class="badge bg-danger" style="cursor:pointer">Xem</span></td>' +
                '</tr>';
              stt++;
            }
            $(".table .td").html(htmls);
          });
        }

        function resetViewXMH() {
          $(".mmh").val("");
          $(".mmh").focus();
          $(".mnsx").val("");
          $(".tmh").val("");
        }
        showDataXemohinh();

      } else if (t == 'Loaixe') {
        status = 'Loaixe';
        var flagLX = 0;
        $(".Loaixe .btnadd").click(function () {
          $(".Loaixe .btnadd").prop("disabled", true);
          $(".Loaixe .btnsave").prop("disabled", false);
          $(".Loaixe .btnedit").prop("disabled", true);
          resetViewLX();
          flagLX = 1;
          $(".mlx").prop("disabled", false);
        });
        $(".Loaixe .btnedit").click(function () {

          $(".Loaixe .btnadd").prop("disabled", true);
          $(".Loaixe .btnsave").prop("disabled", false);
          $(".Loaixe .btnedit").prop("disabled", true);
          flagLX = 2;
          $(".mlx").prop("disabled", true);
        });
        $(".Loaixe .btnrf").click(function () {
          resetViewLX();
          $(".Loaixe .btnadd").prop("disabled", false);
          $(".Loaixe .btnsave").prop("disabled", true);
          $(".Loaixe .btnedit").prop("disabled", true);
          flagLX = 0;
        });
        $(".Loaixe .btnsave").click(function () {
          if (flagLX == 1 && status == 'Loaixe') {
            var mlx = $(".mlx").val();
            var mtx = $(".mtx").val();
            var nl = $(".nl").val();
            var hs = $(".hs").val();
            if (mlx == "") {
              alert_info("Mã loại xe không thể để trống");
              $(".mlx").focus();
            } else if (mtx == "") {
              alert_info("Mô tả xe không thể để trống");
              $(".mtx").focus();
            } else if (nl == "") {
              alert_info("Nhiên liệu không thể để trống");
              $(".mtx").focus();
            } else if (hs == "") {
              alert_info("Hộp số xe không thể để trống");
              $(".hs").focus();
            } else //có nghĩa mlx và tên thể loại hop le
            {
              var dataclient = {
                mlx: mlx,
                mtx: mtx,
                nl: nl,
                hs: hs,
                event: "insertLX"
              }
              queryData("asset/php/api.php", dataclient, function (res) {
                if (res.success == 2 && status == 'Loaixe') {
                  alert_error("Dữ liệu đã bị trùng mã loại xe");
                } else if (res.success == 1 && status == 'Loaixe') {
                  alert_success("Insert Thành Công");
                  flagLX = 0;
                  resetViewLX();
                  $(".Loaixe .btnadd").prop("disabled", false);
                  $(".Loaixe .btnsave").prop("disabled", true);
                  $(".Loaixe .btnedit").prop("disabled", true);
                  showDataLoaixe();
                } else if (status == 'Loaixe') {
                  alert_error("Lỗi Insert Không Thành Công");
                  showDataLoaixe();
                }
              });
            }
          } else if (flagLX == 2 && status == 'Loaixe') {
            var mlx = $(".mlx").val();
            var mtx = $(".mtx").val();
            var nl = $(".nl").val();
            var hs = $(".hs").val();
            if (mlx == "") {
              alert_info("Mã loại xe không thể để trống");
              $(".mlx").focus();
            } else if (mtx == "") {
              alert_info("Mô tả xe không thể để trống");
              $(".mtx").focus();
            } else if (nl == "") {
              alert_info("Nhiên liệu không thể để trống");
              $(".mtx").focus();
            } else if (hs == "") {
              alert_info("Hộp số xe không thể để trống");
              $(".hs").focus();
            } else //có nghĩa mlx và tên thể loại hop le
            {
              var dataclient = {
                //Không thành công
                mlx: mlx,
                mtx: mtx,
                nl: nl,
                hs: hs,
                event: "updateLX"
              }
              //Gọi hàm Query
              queryData("asset/php/api.php", dataclient, function (res) {
                console.log("" + res.success);
                if (res.success == 2 && status == 'Loaixe') {
                  alert_error("Dữ liệu đã bị trùng mã Loại xe");

                } else if (res.success == 1 && status == 'Loaixe') {
                  showDataLoaixe();
                  alert_success("Cập nhật Thành Công");
                  flagLX = 0;
                  $(".Loaixe .btnadd").prop("disabled", false);
                  $(".Loaixe .btnsave").prop("disabled", true);
                  $(".Loaixe .btnedit").prop("disabled", true);
                } else if (status == 'Loaixe') {
                  alert_error("Lỗi Cập nhật Không Thành Công");
                }
              });
            }
          } else if (status == 'Loaixe') {
            console.log("chưa nhấn nút nào cả");
          }
        });
        $(".Loaixe .btndel").click(function () {
          var mlx = $(".mlx").val();
          if (status == 'Loaixe') {
            bootbox.confirm("Bạn có chắc xóa Mã loại xe[ " + mlx + " ] này không?", function (result) {
              if (result == true) {
                var dataSend = {
                  event: "deleteLX",
                  mlx: mlx
                };
                queryData("asset/php/api.php", dataSend, function (data) {
                  if (data.success == 1 && status == 'Loaixe') {
                    showDataLoaixe();
                    resetViewLX();
                    $(".mlx").prop("disabled", false);
                    alert_success("Xóa thành công");
                  } else if (data.success == 2 && status == 'Loaixe') {
                    alert_info("Mã loại xe đã được sử dụng trong bảng sách");
                  } else {
                    alert_error("Xóa không thành công");
                  }
                });
              } else if (status == 'Loaixe') {
                alert_info("Lỗi");
              }
            })
          }
        })
        ////Bắt sự kiện click trên mỗi dòng
        $(".addListLoaixe").on('click', '.click_view', function () {
          var mlx = $(this).parent().attr("data-mlx");
          var mtx = $(this).parent().attr("data-mtx");
          var nl = $(this).parent().attr("data-nl");
          var hs = $(this).parent().attr("data-hs");
          $(".mlx").val(mlx);
          $(".mtx").val(mtx);
          $(".nl").val(nl);
          $(".hs").val(hs);
          $(".Loaixe .btnadd").prop("disabled", false);
          $(" .btnsave").prop("disabled", true);
          $(" .btnedit").prop("disabled", false);
        })

        function showDataLoaixe() {
          var dataSend = {
            event: "getALLLX"
          }
          var htmls = '';
          var sl2 = '"<select><option value="0">Kiểu</option></select>"';
          queryData("asset/php/api.php", dataSend, function (data) {
            var arr = data.items; //lấy ra mảng 
            var stt = 1;
            for (var item in arr) {
              var d = arr[item];
              htmls = htmls + '<tr data-mlx="' + d.mlx + '" data-mtx="' + d.mtx + '" data-nl="' + d.nl + '" data-hs="' + d.hs + '">' +
                '<td>' + stt + '</td>' +
                '<td>' + d.mlx + '</td>' +
                '<td>' + d.mtx + '</td>' +
                '<td>' + d.nl + '</td>' +
                '<td>' + d.hs + '</td>' +
                '<td class="click_view" ><span class="badge bg-danger" style="cursor:pointer">Xem</span></td>' +
                '</tr>';
              stt++;
            }
            $(".table .td").html(htmls);
          });
        }

        function resetViewLX() {
          $(".mlx").val("");
          $(".mlx").focus();
          $(".mtx").val("");
          $(".nl").val("");
          $(".hs").val("");
        };
        showDataLoaixe();
      } else if (t == 'Trangthai') {
        status = 'Trangthai';
        var flagDH = 0;
        $(".Trangthai .btnadd").click(function () {
          $(".Trangthai .btnadd").prop("disabled", true);
          $(".Trangthai .btnsave").prop("disabled", false);
          $(".Trangthai .btnedit").prop("disabled", true);
          resetViewTT();
          flagDH = 1;
          $(".mtt").prop("disabled", false);
        });
        $(".Trangthai .btnedit").click(function () {

          $(".Trangthai .btnadd").prop("disabled", true);
          $(".Trangthai .btnsave").prop("disabled", false);
          $(".Trangthai .btnedit").prop("disabled", true);
          flagDH = 2;
          $(".mtt").prop("disabled", true);
        });
        $(".Trangthai .btnrf").click(function () {
          resetViewTT();
          $(".Trangthai .btnadd").prop("disabled", false);
          $(".Trangthai .btnsave").prop("disabled", true);
          $(".Trangthai .btnedit").prop("disabled", true);
          flagDH = 0;
        });
        $(".Trangthai .btnsave").click(function () {
          if (flagDH == 1 && status == 'Trangthai') {
            var mtt = $(".mtt").val();
            var tttt = $(".tttt").val();
            if (mtt == "") {
              alert_info("Mã trạng thái không thể để trống");
              $(".mtt").focus();
            } else if (tttt == "") {
              alert_info("Trạng thái thanh toán không thể để trống");
              $(".tttt").focus();
            } else //có nghĩa mtt và tên thể loại hop le
            {
              var dataclient = {
                mtt: mtt,
                tttt: tttt,
                event: "insertTT"
              }
              queryData("asset/php/api.php", dataclient, function (res) {
                if (res.success == 2 && status == 'Trangthai') {
                  alert_error("Dữ liệu đã bị trùng mã thanh toán");
                } else if (res.success == 1 && status == 'Trangthai') {
                  alert_success("Insert Thành Công");
                  flagDH = 0;
                  resetViewTT();
                  $(".Trangthai .btnadd").prop("disabled", false);
                  $(".Trangthai .btnsave").prop("disabled", true);
                  $(".Trangthai .btnedit").prop("disabled", true);
                  showDataThanhtoan();
                } else if (status == 'Trangthai') {
                  alert_error("Lỗi Insert Không Thành Công");
                  showDataThanhtoan();
                }
              });
            }
          } else if (flagDH == 2 && status == 'Trangthai') {
            var mtt = $(".mtt").val();
            var tttt = $(".tttt").val();
            if (mtt == "") {
              alert_info("Mã thanh toán không thể để trống");
              $(".mtt").focus();
            } else if (tttt == "") {
              alert_info("Trạng thái thanh toán không thể để trống");
              $(".tttt").focus();
            } else //có nghĩa mtt và tên thể loại hop le
            {
              var dataclient = {
                //Không thành công
                mtt: mtt,
                tttt: tttt,
                event: "updateTT"
              }
              //Gọi hàm Query
              queryData("asset/php/api.php", dataclient, function (res) {
                console.log("" + res.success);
                if (res.success == 2 && status == 'Trangthai') {
                  alert_error("Dữ liệu đã bị trùng Mã thanh toán");

                } else if (res.success == 1 && status == 'Trangthai') {
                  showDataThanhtoan();
                  alert_success("Cập nhật Thành Công");
                  flagDH = 0;
                  $(".Trangthai .btnadd").prop("disabled", false);
                  $(".Trangthai .btnsave").prop("disabled", true);
                  $(".Trangthai .btnedit").prop("disabled", true);
                } else if (status == 'Trangthai') {
                  alert_error("Lỗi Cập nhật Không Thành Công");
                }
              });
            }
          } else if (status == 'Trangthai') {
            console.log("chưa nhấn nút nào cả");
          }
        });
        $(".Trangthai .btndel").click(function () {
          var mtt = $(".mtt").val();
          if (status == 'Trangthai') {
            bootbox.confirm("Bạn có chắc xóa Mã thanh toán [ " + mtt + " ] này không?", function (result) {
              if (result == true) {
                var dataSend = {
                  event: "deleteTT",
                  mtt: mtt
                };
                queryData("asset/php/api.php", dataSend, function (data) {
                  if (data.success == 1 && status == 'Trangthai') {
                    showDataThanhtoan();
                    resetViewTT();
                    $(".mtt").prop("disabled", false);
                    alert_success("Xóa thành công");
                  } else if (data.success == 2 && status == 'Trangthai') {
                    alert_info("Mã thanh toán đã được sử dụng trong bảng sách");
                  } else {
                    alert_error("Xóa không thành công");
                  }
                });
              } else if (status == 'Trangthai') {
                alert_info("Lỗi");
              }
            })
          }
        })
        ////Bắt sự kiện click trên mỗi dòng
        $(".addListTrangthai").on('click', '.click_view', function () {
          var mtt = $(this).parent().attr("data-mtt");
          var tttt = $(this).parent().attr("data-tttt");
          $(".mtt").val(mtt);
          $(".tttt").val(tttt);
          $(".Trangthai .btnadd").prop("disabled", false);
          $(".Trangthai .btnsave").prop("disabled", true);
          $(".Trangthai .btnedit").prop("disabled", false);
        })

        function showDataThanhtoan() {
          var dataSend = {
            event: "getALLTT"
          }
          var htmls = '';
          queryData("asset/php/api.php", dataSend, function (data) {
            var arr = data.items; //lấy ra mảng 
            var stt = 1;
            for (var item in arr) {
              var d = arr[item];
              htmls = htmls + '<tr data-mtt="' + d.mtt + '" data-tttt="' + d.tttt + '">' +
                '<td>' + stt + '</td>' +
                '<td>' + d.mtt + '</td>' +
                '<td>' + d.tttt + '</td>' +
                '<td class="click_view" ><span class="badge bg-danger" style="cursor:pointer">Xem</span></td>' +
                '</tr>';
              stt++;
            }
            $(".table .td").html(htmls);
          });
        }

        function resetViewTT() {
          $(".mtt").val("");
          $(".mtt").focus();
          $(".tttt").val("");
        };
        showDataThanhtoan();
      } else if (t == 'Hoadon') {
        // xe đã bán
        status = 'Hoadon';
        var flagHD = 0;
        $(".Hoadon .btnadd").click(function () {
          $(".Hoadon .btnadd").prop("disabled", true);
          $(".Hoadon .btnsave").prop("disabled", false);
          $(".Hoadon .btnedit").prop("disabled", true);
          resetViewHD();
          flagHD = 1;
          $(".idhd").prop("disabled", false);
        });
        $(".Hoadon .btnedit").click(function () {

          $(".Hoadon .btnadd").prop("disabled", true);
          $(".Hoadon .btnsave").prop("disabled", false);
          $(".Hoadon .btnedit").prop("disabled", true);
          flagHD = 2;
          $(".idhd").prop("disabled", true);
        });
        $(".Hoadon .btnrf").click(function () {
          resetViewHD();
          $(".Hoadon .btnadd").prop("disabled", false);
          $(".Hoadon .btnsave").prop("disabled", true);
          $(".Hoadon .btnedit").prop("disabled", true);
          flagHD = 0;
        });
        $(".Hoadon .btnsave").click(function () {
          if (flagHD == 1 && status == 'Hoadon') {
            var idhd = $(".idhd").val();
            var idxdbhdtt = $(".idxdbhdtt").val();
            var idkhhdtt = $(".idkhhdtt").val();
            var idnvhdtt = $(".idnvhdtt").val();
            var mtthdtt = $(".mtthdtt").val();
            var ntt = $(".ntt").val();
            var htt = $(".htt").val();
            var sttt = $(".sttt").val();
            if (idhd == "") {
              alert_info("ID hóa đơn không thể để trống");
              $(".idhd").focus();
            } else if (idxdbhdtt == "") {
              alert_info("ID xe đã bán không thể để trống");
              $(".idxdbhdtt").focus();
            } else if (idkhhdtt == "") {
              alert_info("ID khách hàng không thể để trống");
              $(".idkhhdtt").focus();
            } else if (idnvhdtt == "") {
              alert_info("ID nhân viên không thể để trống");
              $(".idnvhdtt").focus();
            } else if (mtthdtt == "") {
              alert_info("Mã thanh toán không thể để trống");
              $(".mtthdtt").focus();
            } else if (ntt == "") {
              alert_info("Yêu cầu nhập ngày thanh toán (yyyy/m/d)");
              $(".ntt").focus();
            } else if (htt == "") {
              alert_info("Yêu cầu nhập hạn thanh toán (yyyy/m/d)");
              $(".htt").focus();
            } else if (sttt == "") {
              alert_info("Yêu cầu nhập số tiền thanh toán");
              $(".sttt").focus();
            } else //có nghĩa idhd và tên thể loại hop le
            {
              var dataclient = {
                idhd: idhd,
                idxdbhdtt: idxdbhdtt,
                idkhhdtt: idkhhdtt,
                idnvhdtt: idnvhdtt,
                mtthdtt: mtthdtt,
                ntt: ntt,
                htt: htt,
                sttt: sttt,
                event: "insertHD"
              }
              queryData("asset/php/api.php", dataclient, function (res) {
                if (res.success == 2 && status == 'Hoadon') {
                  alert_error("Dữ liệu đã bị trùng ID hóa đơn");
                } else if (res.success == 1 && status == 'Hoadon') {
                  alert_success("Insert Thành Công");
                  flagHD = 0;
                  resetViewHD();
                  $(".Hoadon .btnadd").prop("disabled", false);
                  $(".Hoadon .btnsave").prop("disabled", true);
                  $(".Hoadon .btnedit").prop("disabled", true);
                  showDataHoadon();
                } else {
                  alert_error("Lỗi Insert Không Thành Công");
                  showDataHoadon();
                }
              });
            }

          } else if (flagHD == 2 && status == 'Hoadon') {
            var idhd = $(".idhd").val();
            var idxdbhdtt = $(".idxdbhdtt").val();
            var idkhhdtt = $(".idkhhdtt").val();
            var idnvhdtt = $(".idnvhdtt").val();
            var mtthdtt = $(".mtthdtt").val();
            var ntt = $(".ntt").val();
            var htt = $(".htt").val();
            var sttt = $(".sttt").val();
            if (idhd == "") {
              alert_info("ID hóa đơn không thể để trống");
              $(".idhd").focus();
            } else if (idxdbhdtt == "") {
              alert_info("ID xe đã bán không thể để trống");
              $(".idxdbhdtt").focus();
            } else if (idkhhdtt == "") {
              alert_info("ID khách hàng không thể để trống");
              $(".idkhhdtt").focus();
            } else if (idnvhdtt == "") {
              alert_info("ID nhân viên không thể để trống");
              $(".idnvhdtt").focus();
            } else if (mtthdtt == "") {
              alert_info("Mã thanh toán không thể để trống");
              $(".mtthdtt").focus();
            } else if (ntt == "") {
              alert_info("Yêu cầu nhập ngày thanh toán (yyyy/m/d)");
              $(".ntt").focus();
            } else if (htt == "") {
              alert_info("Yêu cầu nhập hạn thanh toán (yyyy/m/d)");
              $(".htt").focus();
            } else if (sttt == "") {
              alert_info("Yêu cầu nhập số tiền thanh toán");
              $(".sttt").focus();
            } else //có nghĩa idhd và tên thể loại hop le
            {
              var dataclient = {
                idhd: idhd,
                idxdbhdtt: idxdbhdtt,
                idkhhdtt: idkhhdtt,
                idnvhdtt: idnvhdtt,
                mtthdtt: mtthdtt,
                ntt: ntt,
                htt: htt,
                sttt: sttt,
                event: "updateHD"
              }
              //Gọi hàm Query
              queryData("asset/php/api.php", dataclient, function (res) {
                console.log("" + res.success);
                if (res.success == 2 && status == 'Hoadon') {
                  alert_error("Dữ liệu đã bị trùng ID hóa đơn");
                } else if (res.success == 1 && status == 'Hoadon') {
                  showDataHoadon();
                  resetViewHD();
                  alert_success("Cập nhật Thành Công");
                  flagHD = 0;
                  $(".Hoadon .btnadd").prop("disabled", false);
                  $(".Hoadon .btnsave").prop("disabled", true);
                  $(".Hoadon .btnedit").prop("disabled", true);
                } else if (status == 'Hoadon') {
                  alert_error("Lỗi Cập nhật Không Thành Công");
                }
              });
            }
          } else if (status == 'Hoadon') {
            console.log("chưa nhấn nút nào cả");
          }
        })
        $(".Hoadon .btndel").click(function () {
          var idhd = $(".idhd").val();
          var idxdbhdtt = $(".idxdbhdtt").val();
          if (status == 'Hoadon') {
            bootbox.confirm("Bạn có chắc xóa ID hóa đơn [ " + idxdbhdtt + " ] này không?", function (result) {
              if (result == true) {
                var dataSend = {
                  event: "deleteHD",
                  idhd: idhd
                };
                queryData("asset/php/api.php", dataSend, function (data) {
                  if (data.success == 1 && status == 'Hoadon') {
                    showDataHoadon();
                    resetViewHD();
                    $(".idhd").prop("disabled", false);
                    alert_success("Xóa thành công");
                  } else if (data.success == 2 && status == 'Hoadon') {
                    alert_info("ID hóa đơn đã được sử dụng trong bảng sách");
                  } else if (status == 'Hoadon') {
                    alert_error("Xóa không thành công");
                  }
                });
              } else {
                alert_info("Lỗi");
              }
            })
          }
        })
        ////Bắt sự kiện click trên mỗi dòng
        $(".addListHoadon").on('click', '.click_view', function () {
          var idhd = $(this).parent().attr("data-idhd");
          var idxdbhdtt = $(this).parent().attr("data-idxdbhdtt");
          var idkhhdtt = $(this).parent().attr("data-idkhhdtt");
          var idnvhdtt = $(this).parent().attr("data-idnvhdtt");
          var mtthdtt = $(this).parent().attr("data-mtthdtt");
          var ntt = $(this).parent().attr("data-ntt");
          var htt = $(this).parent().attr("data-htt");
          var sttt = $(this).parent().attr("data-sttt");
          $(".idhd").val(idhd);
          $(".idxdbhdtt").val(idxdbhdtt);
          $(".idkhhdtt").val(idkhhdtt);
          $(".idnvhdtt").val(idnvhdtt);
          $(".mtthdtt").val(mtthdtt);
          $(".ntt").val(ntt);
          $(".htt").val(htt);
          $(".sttt").val(sttt);
          $(".Hoadon .btnadd").prop("disabled", false);
          $(".Hoadon .btnsave").prop("disabled", true);
          $(".Hoadon .btnedit").prop("disabled", false);
        })

        function showDataHoadon() {
          var dataSend = {
            event: "getALLHD"
          }
          var htmls = '';
          queryData("asset/php/api.php", dataSend, function (data) {
            var arr = data.items; //lấy ra mảng 
            var stt = 1;
            for (var item in arr) {
              var d = arr[item];
              htmls = htmls + '<tr data-idhd="' + d.idhd + '" data-idxdbhdtt="' + d.idxdbhdtt + '" data-idkhhdtt="' + d.idkhhdtt + '" data-idnvhdtt="' + d.idnvhdtt + '" data-mtthdtt="' + d.mtthdtt + '" data-ntt="' + d.ntt + '" data-htt="' + d.htt + '" data-sttt="' + d.sttt + '" >' +
                '<td>' + stt + '</td>' +
                '<td>' + d.idhd + '</td>' +
                '<td>' + d.idxdbhdtt + '</td>' +
                '<td>' + d.idkhhdtt + '</td>' +
                '<td>' + d.idnvhdtt + '</td>' +
                '<td>' + d.mtthdtt + '</td>' +
                '<td>' + d.ntt + '</td>' +
                '<td>' + d.htt + '</td>' +
                '<td>' + d.sttt + '</td>' +
                '<td class="click_view" ><span class="badge bg-danger" style="cursor:pointer">Xem</span></td>' +
                '</tr>';
              stt++;
            }
            $(".table .td").html(htmls);
          });
        }

        function resetViewHD() {
          $(".idhd").val("");
          $(".idhd").focus();
          $(".idxdbhdtt").val("");
          $(".idkhhdtt").val("");
          $(".idnvhdtt").val("");
          $(".mtthdtt").val("");
          $(".ntt").val("");
          $(".htt").val("");
          $(".sttt").val("");
        };
        showDataHoadon();
      } else if (t == 'Baohiem') {
        // xe đã bán
        status = 'Baohiem';
        var flagBH = 0;
        $(".Baohiem .btnadd").click(function () {
          $(".Baohiem .btnadd").prop("disabled", true);
          $(".Baohiem .btnsave").prop("disabled", false);
          $(".Baohiem .btnedit").prop("disabled", true);
          resetViewBH();
          flagBH = 1;
          $(".idbh").prop("disabled", false);
        });
        $(".Baohiem .btnedit").click(function () {

          $(".Baohiem .btnadd").prop("disabled", true);
          $(".Baohiem .btnsave").prop("disabled", false);
          $(".Baohiem .btnedit").prop("disabled", true);
          flagBH = 2;
          $(".idbh").prop("disabled", true);
        });
        $(".Baohiem .btnrf").click(function () {
          resetViewBH();
          $(".Baohiem .btnadd").prop("disabled", false);
          $(".Baohiem .btnsave").prop("disabled", true);
          $(".Baohiem .btnedit").prop("disabled", true);
          flagBH = 0;
        });
        $(".Baohiem .btnsave").click(function () {
          if (flagBH == 1 && status == 'Baohiem') {
            var idbh = $(".idbh").val();
            var idxdbbh = $(".idxdbbh").val();
            var idctbh = $(".idctbh").val();
            var nbdbh = $(".nbdbh").val();
            var nkt = $(".nkt").val();
            var tthh = $(".tthh").val();
            if (idbh == "") {
              alert_info("ID bảo hiểm không thể để trống");
              $(".idbh").focus();
            } else if (idxdbbh == "") {
              alert_info("ID xe đã bán không thể để trống");
              $(".idxdbbh").focus();
            } else if (idctbh == "") {
              alert_info("ID công ty không thể để trống");
              $(".idctbh").focus();
            } else if (nbdbh == "") {
              alert_info("Yêu cầu nhập ngày bắt đầu(yyyy/m/d)");
              $(".nbdbh").focus();
            } else if (nkt == "") {
              alert_info("Yêu cầu nhập ngày kết thúc(yyyy/m/d)");
              $(".nkt").focus();
            } else if (tthh == "") {
              alert_info("Yêu cầu nhập thanh toán hàng tháng");
              $(".tthh").focus();
            } else //có nghĩa idbh và tên thể loại hop le
            {
              var dataclient = {
                idbh: idbh,
                idxdbbh: idxdbbh,
                idctbh: idctbh,
                nbdbh: nbdbh,
                nkt: nkt,
                tthh: tthh,
                event: "insertBH"
              }
              queryData("asset/php/api.php", dataclient, function (res) {
                if (res.success == 2 && status == 'Baohiem') {
                  alert_error("Dữ liệu đã bị trùng ID bảo hiểm");
                } else if (res.success == 1 && status == 'Baohiem') {
                  alert_success("Insert Thành Công");
                  flagBH = 0;
                  resetViewBH();
                  $(".Baohiem .btnadd").prop("disabled", false);
                  $(".Baohiem .btnsave").prop("disabled", true);
                  $(".Baohiem .btnedit").prop("disabled", true);
                  showDataBaohiem();
                } else {
                  alert_error("Lỗi Insert Không Thành Công");
                  showDataBaohiem();
                }
              });
            }

          } else if (flagBH == 2 && status == 'Baohiem') {
            var idbh = $(".idbh").val();
            var idxdbbh = $(".idxdbbh").val();
            var idctbh = $(".idctbh").val();
            var nbdbh = $(".nbdbh").val();
            var nkt = $(".nkt").val();
            var tthh = $(".tthh").val();
            if (idbh == "") {
              alert_info("ID bảo hiểm không thể để trống");
              $(".idbh").focus();
            } else if (idxdbbh == "") {
              alert_info("ID xe đã bán không thể để trống");
              $(".idxdbbh").focus();
            } else if (idctbh == "") {
              alert_info("ID công ty không thể để trống");
              $(".idctbh").focus();
            } else if (nbdbh == "") {
              alert_info("Yêu cầu nhập ngày bắt đầu(yyyy/m/d)");
              $(".nbdbh").focus();
            } else if (nkt == "") {
              alert_info("Yêu cầu nhập ngày kết thúc(yyyy/m/d)");
              $(".nkt").focus();
            } else if (tthh == "") {
              alert_info("Yêu cầu nhập thanh toán hàng tháng");
              $(".tthh").focus();
            } else //có nghĩa idbh và tên thể loại hop le
            {
              var dataclient = {
                idbh: idbh,
                idxdbbh: idxdbbh,
                idctbh: idctbh,
                nbdbh: nbdbh,
                nkt: nkt,
                tthh: tthh,
                event: "updateBH"
              }
              //Gọi hàm Query
              queryData("asset/php/api.php", dataclient, function (res) {
                console.log("" + res.success);
                if (res.success == 2 && status == 'Baohiem') {
                  alert_error("Dữ liệu đã bị trùng ID bảo hiểm");
                } else if (res.success == 1 && status == 'Baohiem') {
                  showDataBaohiem();
                  resetViewBH();
                  alert_success("Cập nhật Thành Công");
                  flagBH = 0;
                  $(".Baohiem .btnadd").prop("disabled", false);
                  $(".Baohiem .btnsave").prop("disabled", true);
                  $(".Baohiem .btnedit").prop("disabled", true);
                } else if (status == 'Baohiem') {
                  alert_error("Lỗi Cập nhật Không Thành Công");
                }
              });
            }
          } else if (status == 'Baohiem') {
            console.log("chưa nhấn nút nào cả");
          }
        })
        $(".Baohiem .btndel").click(function () {
          var idbh = $(".idbh").val();
          var idxdbbh = $(".idxdbbh").val();
          if (status == 'Baohiem') {
            bootbox.confirm("Bạn có chắc xóa ID bảo hiểm [ " + idxdbbh + " ] này không?", function (result) {
              if (result == true) {
                var dataSend = {
                  event: "deleteBH",
                  idbh: idbh
                };
                queryData("asset/php/api.php", dataSend, function (data) {
                  if (data.success == 1 && status == 'Baohiem') {
                    showDataBaohiem();
                    resetViewBH();
                    $(".idbh").prop("disabled", false);
                    alert_success("Xóa thành công");
                  } else if (data.success == 2 && status == 'Baohiem') {
                    alert_info("ID bảo hiểm đã được sử dụng trong bảng sách");
                  } else if (status == 'Baohiem') {
                    alert_error("Xóa không thành công");
                  }
                });
              } else {
                alert_info("Lỗi");
              }
            })
          }
        })
        ////Bắt sự kiện click trên mỗi dòng
        $(".addListBaohiem").on('click', '.click_view', function () {
          var idbh = $(this).parent().attr("data-idbh");
          var idxdbbh = $(this).parent().attr("data-idxdbbh");
          var idctbh = $(this).parent().attr("data-idctbh");
          var nbdbh = $(this).parent().attr("data-nbdbh");
          var nkt = $(this).parent().attr("data-nkt");
          var tthh = $(this).parent().attr("data-tthh");
          var htt = $(this).parent().attr("data-htt");
          var sttt = $(this).parent().attr("data-sttt");
          $(".idbh").val(idbh);
          $(".idxdbbh").val(idxdbbh);
          $(".idctbh").val(idctbh);
          $(".nbdbh").val(nbdbh);
          $(".nkt").val(nkt);
          $(".tthh").val(tthh);
          $(".htt").val(htt);
          $(".sttt").val(sttt);
          $(".Baohiem .btnadd").prop("disabled", false);
          $(".Baohiem .btnsave").prop("disabled", true);
          $(".Baohiem .btnedit").prop("disabled", false);
        })

        function showDataBaohiem() {
          var dataSend = {
            event: "getALLBH"
          }
          var htmls = '';

          queryData("asset/php/api.php", dataSend, function (data) {
            var arr = data.items; //lấy ra mảng 
            var stt = 1;
            for (var item in arr) {
              var d = arr[item];


              htmls = htmls + '<tr data-idbh="' + d.idbh + '" data-idxdbbh="' + d.idxdbbh + '" data-idctbh="' + d.idctbh + '" data-nbdbh="' + d.nbdbh + '" data-nkt="' + d.nkt + '" data-tthh="' + d.tthh + '">' +
                '<td>' + stt + '</td>' +
                '<td>' + d.idbh + '</td>' +
                '<td>' + d.idxdbbh + '</td>' +
                '<td>' + d.idctbh + '</td>' +
                '<td>' + d.nbdbh + '</td>' +
                '<td>' + d.nkt + '</td>' +
                '<td>' + d.tthh + '</td>' +
                '<td class="click_view" ><span class="badge bg-danger" style="cursor:pointer">Xem</span></td>' +
                '</tr>';
              stt++;
            }
            $(".table .td").html(htmls);

          });
        }

        function resetViewBH() {
          $(".idbh").val("");
          $(".idbh").focus();
          $(".idxdbbh").val("");
          $(".idctbh").val("");
          $(".nbdbh").val("");
          $(".nkt").val("");
          $(".tthh").val("");
        };
        showDataBaohiem();
      } else if (t == 'Congtybaohiem') {
        status = 'Congtybaohiem';
        var flagCTBH = 0;
        $(".Congtybaohiem .btnadd").click(function () {
          $(".Congtybaohiem .btnadd").prop("disabled", true);
          $(".Congtybaohiem .btnsave").prop("disabled", false);
          $(".Congtybaohiem .btnedit").prop("disabled", true);
          resetViewCTBH();
          flagCTBH = 1;
          $(".idctbht").prop("disabled", false);
        });
        $(".Congtybaohiem .btnedit").click(function () {

          $(".Congtybaohiem .btnadd").prop("disabled", true);
          $(".Congtybaohiem .btnsave").prop("disabled", false);
          $(".Congtybaohiem .btnedit").prop("disabled", true);
          flagCTBH = 2;
          $(".idctbht").prop("disabled", true);
        });
        $(".Congtybaohiem .btnrf").click(function () {
          resetViewCTBH();
          $(".Congtybaohiem .btnadd").prop("disabled", false);
          $(".Congtybaohiem .btnsave").prop("disabled", true);
          $(".Congtybaohiem .btnedit").prop("disabled", true);
          flagCTBH = 0;
        });
        $(".Congtybaohiem .btnsave").click(function () {
          if (flagCTBH == 1 && status == 'Congtybaohiem') {
            var idctbht = $(".idctbht").val();
            var tctbh = $(".tctbh").val();
            var qgctbh = $(".qgctbh").val();
            var tttctbh = $(".tttctbh").val();
            if (idctbht == "") {
              alert_info("ID công ty bảo hiểm không thể để trống");
              $(".idctbht").focus();
            } else if (tctbh == "") {
              alert_info("Tên công ty bảo hiểm không thể để trống");
              $(".tctbh").focus();
            } else if (qgctbh == "") {
              alert_info("Quốc gia không thể để trống");
              $(".qgctbh").focus();
            } else //có nghĩa idctbht và tên thể loại hop le
            {
              var dataclient = {
                idctbht: idctbht,
                tctbh: tctbh,
                qgctbh: qgctbh,
                tttctbh: tttctbh,
                event: "insertCTBH"
              }
              queryData("asset/php/api.php", dataclient, function (res) {
                if (res.success == 2 && status == 'Congtybaohiem') {
                  alert_error("Dữ liệu đã bị trùng ID công ty bảo hiểm");
                } else if (res.success == 1 && status == 'Congtybaohiem') {
                  alert_success("Insert Thành Công");
                  flagCTBH = 0;
                  resetViewCTBH();
                  $(".Congtybaohiem .btnadd").prop("disabled", false);
                  $(".Congtybaohiem .btnsave").prop("disabled", true);
                  $(".Congtybaohiem .btnedit").prop("disabled", true);
                  showDataCongtybaohiem();
                } else if (status == 'Congtybaohiem') {
                  alert_error("Lỗi Insert Không Thành Công");
                  showDataCongtybaohiem();
                }
              });
            }
          } else if (flagCTBH == 2 && status == 'Congtybaohiem') {
            var idctbht = $(".idctbht").val();
            var tctbh = $(".tctbh").val();
            var qgctbh = $(".qgctbh").val();
            var tttctbh = $(".tttctbh").val();
            if (idctbht == "") {
              alert_info("ID công ty bảo hiểm không thể để trống");
              $(".idctbht").focus();
            } else if (tctbh == "") {
              alert_info("Tên công ty bảo hiểm không thể để trống");
              $(".tctbh").focus();
            } else if (qgctbh == "") {
              alert_info("Quốc gia không thể để trống");
              $(".qgctbh").focus();
            } else //có nghĩa idctbht và tên thể loại hop le
            {
              var dataclient = {
                //Không thành công
                idctbht: idctbht,
                tctbh: tctbh,
                qgctbh: qgctbh,
                tttctbh: tttctbh,
                event: "updateCTBH"
              }
              //Gọi hàm Query
              queryData("asset/php/api.php", dataclient, function (res) {
                console.log("" + res.success);
                if (res.success == 2 && status == 'Congtybaohiem') {
                  alert_error("Dữ liệu đã bị trùng ID công ty bảo hiểm");

                } else if (res.success == 1 && status == 'Congtybaohiem') {
                  showDataCongtybaohiem();
                  alert_success("Cập nhật Thành Công");
                  flagCTBH = 0;
                  $(".Congtybaohiem .btnadd").prop("disabled", false);
                  $(".Congtybaohiem .btnsave").prop("disabled", true);
                  $(".Congtybaohiem .btnedit").prop("disabled", true);
                } else if (status == 'Congtybaohiem') {
                  alert_error("Lỗi Cập nhật Không Thành Công");
                }
              });
            }
          } else if (status == 'Congtybaohiem') {
            console.log("chưa nhấn nút nào cả");
          }
        });
        $(".Congtybaohiem .btndel").click(function () {
          var idctbht = $(".idctbht").val();
          if (status == 'Congtybaohiem') {
            bootbox.confirm("Bạn có chắc xóa ID công ty bảo hiểm[ " + idctbht + " ] này không?", function (result) {
              if (result == true) {
                var dataSend = {
                  event: "deleteCTBH",
                  idctbht: idctbht
                };
                queryData("asset/php/api.php", dataSend, function (data) {
                  if (data.success == 1 && status == 'Congtybaohiem') {
                    showDataCongtybaohiem();
                    resetViewCTBH();
                    $(".idctbht").prop("disabled", false);
                    alert_success("Xóa thành công");
                  } else if (data.success == 2 && status == 'Congtybaohiem') {
                    alert_info("ID công ty bảo hiểm đã được sử dụng trong bảng sách");
                  } else {
                    alert_error("Xóa không thành công");
                  }
                });
              } else if (status == 'Congtybaohiem') {
                alert_info("Lỗi");
              }
            })
          }
        })
        ////Bắt sự kiện click trên mỗi dòng
        $(".addListCongtybaohiem").on('click', '.click_view', function () {
          var idctbht = $(this).parent().attr("data-idctbht");
          var tctbh = $(this).parent().attr("data-tctbh");
          var qgctbh = $(this).parent().attr("data-qgctbh");
          var tttctbh = $(this).parent().attr("data-tttctbh");
          $(".idctbht").val(idctbht);
          $(".tctbh").val(tctbh);
          $(".qgctbh").val(qgctbh);
          $(".tttctbh").val(tttctbh);
          $(".Congtybaohiem .btnadd").prop("disabled", false);
          $(" .btnsave").prop("disabled", true);
          $(" .btnedit").prop("disabled", false);
        })

        function showDataCongtybaohiem() {
          var dataSend = {
            event: "getALLCTBH"
          }
          var htmls = '';
          queryData("asset/php/api.php", dataSend, function (data) {
            var arr = data.items; //lấy ra mảng 
            var stt = 1;
            for (var item in arr) {
              var d = arr[item];
              htmls = htmls + '<tr data-idctbht="' + d.idctbht + '" data-tctbh="' + d.tctbh + '" data-qgctbh="' + d.qgctbh + '" data-tttctbh="' + d.tttctbh + '">' +
                '<td>' + stt + '</td>' +
                '<td>' + d.idctbht + '</td>' +
                '<td>' + d.tctbh + '</td>' +
                '<td>' + d.qgctbh + '</td>' +
                '<td>' + d.tttctbh + '</td>' +
                '<td class="click_view" ><span class="badge bg-danger" style="cursor:pointer">Xem</span></td>' +
                '</tr>';
              stt++;
            }
            $(".table .td").html(htmls);
          });
        }

        function resetViewCTBH() {
          $(".idctbht").val("");
          $(".idctbht").focus();
          $(".tctbh").val("");
          $(".qgctbh").val("");
          $(".tttctbh").val("");
        };
        showDataCongtybaohiem();
      } else if (t == 'Muachovay') {
        // xe đã bán
        status = 'Muachovay';
        var flagMCV = 0;
        $(".Muachovay .btnadd").click(function () {
          $(".Muachovay .btnadd").prop("disabled", true);
          $(".Muachovay .btnsave").prop("disabled", false);
          $(".Muachovay .btnedit").prop("disabled", true);
          resetViewMCV();
          flagMCV = 1;
          $(".idcv").prop("disabled", false);
        });
        $(".Muachovay .btnedit").click(function () {

          $(".Muachovay .btnadd").prop("disabled", true);
          $(".Muachovay .btnsave").prop("disabled", false);
          $(".Muachovay .btnedit").prop("disabled", true);
          flagMCV = 2;
          $(".idcv").prop("disabled", true);
        });
        $(".Muachovay .btnrf").click(function () {
          resetViewMCV();
          $(".Muachovay .btnadd").prop("disabled", false);
          $(".Muachovay .btnsave").prop("disabled", true);
          $(".Muachovay .btnedit").prop("disabled", true);
          flagMCV = 0;
        });
        $(".Muachovay .btnsave").click(function () {
          if (flagMCV == 1 && status == 'Muachovay') {
            var idcv = $(".idcv").val();
            var idxbd = $(".idxbd").val();
            var idct = $(".idct").val();
            var nbd = $(".nbd").val();
            var nktmcv = $(".nktmcv").val();
            var tttmcv = $(".tttmcv").val();
            if (idcv == "") {
              alert_info("ID mua cho vay không thể để trống");
              $(".idcv").focus();
            } else if (idxbd == "") {
              alert_info("ID xe đã bán không thể để trống");
              $(".idxbd").focus();
            } else if (idct == "") {
              alert_info("ID công ty không thể để trống");
              $(".idct").focus();
            } else if (nbd == "") {
              alert_info("Yêu cầu nhập ngày bắt đầu(yyyy/m/d)");
              $(".nbd").focus();
            } else if (nktmcv == "") {
              alert_info("Yêu cầu nhập ngày kết thúc(yyyy/m/d)");
              $(".nktmcv").focus();
            } else if (tttmcv == "") {
              alert_info("Yêu cầu nhập thanh toán hàng tháng");
              $(".tttmcv").focus();
            } else //có nghĩa idcv và tên thể loại hop le
            {
              var dataclient = {
                idcv: idcv,
                idxbd: idxbd,
                idct: idct,
                nbd: nbd,
                nktmcv: nktmcv,
                tttmcv: tttmcv,
                event: "insertMCV"
              }
              queryData("asset/php/api.php", dataclient, function (res) {
                if (res.success == 2 && status == 'Muachovay') {
                  alert_error("Dữ liệu đã bị trùng ID mua cho vay");
                } else if (res.success == 1 && status == 'Muachovay') {
                  alert_success("Insert Thành Công");
                  flagMCV = 0;
                  resetViewMCV();
                  $(".Muachovay .btnadd").prop("disabled", false);
                  $(".Muachovay .btnsave").prop("disabled", true);
                  $(".Muachovay .btnedit").prop("disabled", true);
                  showDataMuachovay();
                } else {
                  alert_error("Lỗi Insert Không Thành Công");
                  showDataMuachovay();
                }
              });
            }

          } else if (flagMCV == 2 && status == 'Muachovay') {
            var idcv = $(".idcv").val();
            var idxbd = $(".idxbd").val();
            var idct = $(".idct").val();
            var nbd = $(".nbd").val();
            var nktmcv = $(".nktmcv").val();
            var tttmcv = $(".tttmcv").val();
            if (idcv == "") {
              alert_info("ID mua cho vay không thể để trống");
              $(".idcv").focus();
            } else if (idxbd == "") {
              alert_info("ID xe đã bán không thể để trống");
              $(".idxbd").focus();
            } else if (idct == "") {
              alert_info("ID công ty không thể để trống");
              $(".idct").focus();
            } else if (nbd == "") {
              alert_info("Yêu cầu nhập ngày bắt đầu(yyyy/m/d)");
              $(".nbd").focus();
            } else if (nktmcv == "") {
              alert_info("Yêu cầu nhập ngày kết thúc(yyyy/m/d)");
              $(".nktmcv").focus();
            } else //có nghĩa idcv và tên thể loại hop le
            {
              var dataclient = {
                idcv: idcv,
                idxbd: idxbd,
                idct: idct,
                nbd: nbd,
                nktmcv: nktmcv,
                tttmcv: tttmcv,
                event: "updateMCV"
              }
              //Gọi hàm Query
              queryData("asset/php/api.php", dataclient, function (res) {
                console.log("" + res.success);
                if (res.success == 2 && status == 'Muachovay') {
                  alert_error("Dữ liệu đã bị trùng ID mua cho vay");
                } else if (res.success == 1 && status == 'Muachovay') {
                  showDataMuachovay();
                  resetViewMCV();
                  alert_success("Cập nhật Thành Công");
                  flagMCV = 0;
                  $(".Muachovay .btnadd").prop("disabled", false);
                  $(".Muachovay .btnsave").prop("disabled", true);
                  $(".Muachovay .btnedit").prop("disabled", true);
                } else if (status == 'Muachovay') {
                  alert_error("Lỗi Cập nhật Không Thành Công");
                }
              });
            }
          } else if (status == 'Muachovay') {
            console.log("chưa nhấn nút nào cả");
          }
        })
        $(".Muachovay .btndel").click(function () {
          var idcv = $(".idcv").val();
          if (status == 'Muachovay') {
            bootbox.confirm("Bạn có chắc xóa ID cho vay [ " + idcv + " ] này không?", function (result) {
              if (result == true) {
                var dataSend = {
                  event: "deleteMCV",
                  idcv: idcv
                };
                queryData("asset/php/api.php", dataSend, function (data) {
                  if (data.success == 1 && status == 'Muachovay') {
                    showDataMuachovay();
                    resetViewMCV();
                    $(".idcv").prop("disabled", false);
                    alert_success("Xóa thành công");
                  } else if (data.success == 2 && status == 'Muachovay') {
                    alert_info("ID mua cho vay đã được sử dụng trong bảng sách");
                  } else if (status == 'Muachovay') {
                    alert_error("Xóa không thành công");
                  }
                });
              } else {
                alert_info("Lỗi");
              }
            })
          }
        })
        ////Bắt sự kiện click trên mỗi dòng
        $(".addListMuachovay").on('click', '.click_view', function () {
          var idcv = $(this).parent().attr("data-idcv");
          var idxbd = $(this).parent().attr("data-idxbd");
          var idct = $(this).parent().attr("data-idct");
          var nbd = $(this).parent().attr("data-nbd");
          var nktmcv = $(this).parent().attr("data-nktmcv");
          var tttmcv = $(this).parent().attr("data-tttmcv");
          $(".idcv").val(idcv);
          $(".idxbd").val(idxbd);
          $(".idct").val(idct);
          $(".nbd").val(nbd);
          $(".nktmcv").val(nktmcv);
          $(".tttmcv").val(tttmcv);
          $(".Muachovay .btnadd").prop("disabled", false);
          $(".Muachovay .btnsave").prop("disabled", true);
          $(".Muachovay .btnedit").prop("disabled", false);
        })

        function showDataMuachovay() {
          var dataSend = {
            event: "getALLMCV"
          }
          var htmls = '';
          queryData("asset/php/api.php", dataSend, function (data) {
            var arr = data.items; //lấy ra mảng 
            var stt = 1;
            for (var item in arr) {
              var d = arr[item];
              htmls = htmls + '<tr data-idcv="' + d.idcv + '" data-idxbd="' + d.idxbd + '" data-idct="' + d.idct + '" data-nbd="' + d.nbd + '" data-nktmcv="' + d.nktmcv + '" data-tttmcv="' + d.tttmcv + '">' +
                '<td>' + stt + '</td>' +
                '<td>' + d.idcv + '</td>' +
                '<td>' + d.idxbd + '</td>' +
                '<td>' + d.idct + '</td>' +
                '<td>' + d.nbd + '</td>' +
                '<td>' + d.nktmcv + '</td>' +
                '<td>' + d.tttmcv + '</td>' +
                '<td class="click_view" ><span class="badge bg-danger" style="cursor:pointer">Xem</span></td>' +
                '</tr>';
              stt++;
            }
            $(".table .td").html(htmls);
          });
        }

        function resetViewMCV() {
          $(".idcv").val("");
          $(".idcv").focus();
          $(".idxbd").val("");
          $(".idct").val("");
          $(".nbd").val("");
          $(".nktmcv").val("");
          $(".tttmcv").val("");
        };
        showDataMuachovay();
      } else if (t == 'Congtytaichinh') {
        status = 'Congtytaichinh';
        var flagCTTC = 0;
        $(".Congtytaichinh .btnadd").click(function () {
          $(".Congtytaichinh .btnadd").prop("disabled", true);
          $(".Congtytaichinh .btnsave").prop("disabled", false);
          $(".Congtytaichinh .btnedit").prop("disabled", true);
          resetViewCTTC();
          flagCTTC = 1;
          $(".idcttc").prop("disabled", false);
        });
        $(".Congtytaichinh .btnedit").click(function () {

          $(".Congtytaichinh .btnadd").prop("disabled", true);
          $(".Congtytaichinh .btnsave").prop("disabled", false);
          $(".Congtytaichinh .btnedit").prop("disabled", true);
          flagCTTC = 2;
          $(".idcttc").prop("disabled", true);
        });
        $(".Congtytaichinh .btnrf").click(function () {
          resetViewCTTC();
          $(".Congtytaichinh .btnadd").prop("disabled", false);
          $(".Congtytaichinh .btnsave").prop("disabled", true);
          $(".Congtytaichinh .btnedit").prop("disabled", true);
          flagCTTC = 0;
        });
        $(".Congtytaichinh .btnsave").click(function () {
          if (flagCTTC == 1 && status == 'Congtytaichinh') {
            var idcttc = $(".idcttc").val();
            var tcttc = $(".tcttc").val();
            var sdtcttc = $(".sdtcttc").val();
            var tttcttc = $(".tttcttc").val();
            if (idcttc == "") {
              alert_info("ID công ty tài chính không thể để trống");
              $(".idcttc").focus();
            } else if (tcttc == "") {
              alert_info("Tên công ty bảo hiểm không thể để trống");
              $(".tcttc").focus();
            } else if (sdtcttc == "") {
              alert_info("Yêu cầu nhập số điện thoại của công ty tài chính");
              $(".sdtcttc").focus();
            } else //có nghĩa idcttc và tên thể loại hop le
            {
              var dataclient = {
                idcttc: idcttc,
                tcttc: tcttc,
                sdtcttc: sdtcttc,
                tttcttc: tttcttc,
                event: "insertCTTC"
              }
              queryData("asset/php/api.php", dataclient, function (res) {
                if (res.success == 2 && status == 'Congtytaichinh') {
                  alert_error("Dữ liệu đã bị trùng ID công ty tài chính");
                } else if (res.success == 1 && status == 'Congtytaichinh') {
                  alert_success("Insert Thành Công");
                  flagCTTC = 0;
                  resetViewCTTC();
                  $(".Congtytaichinh .btnadd").prop("disabled", false);
                  $(".Congtytaichinh .btnsave").prop("disabled", true);
                  $(".Congtytaichinh .btnedit").prop("disabled", true);
                  showDataCongtytaichinh();
                } else if (status == 'Congtytaichinh') {
                  alert_error("Lỗi Insert Không Thành Công");
                  showDataCongtytaichinh();
                }
              });
            }
          } else if (flagCTTC == 2 && status == 'Congtytaichinh') {
            var idcttc = $(".idcttc").val();
            var tcttc = $(".tcttc").val();
            var sdtcttc = $(".sdtcttc").val();
            var tttcttc = $(".tttcttc").val();
            if (idcttc == "") {
              alert_info("ID công ty tài chính không thể để trống");
              $(".idcttc").focus();
            } else if (tcttc == "") {
              alert_info("Tên công ty bảo hiểm không thể để trống");
              $(".tcttc").focus();
            } else if (sdtcttc == "") {
              alert_info("Quốc gia không thể để trống");
              $(".sdtcttc").focus();
            } else //có nghĩa idcttc và tên thể loại hop le
            {
              var dataclient = {
                //Không thành công
                idcttc: idcttc,
                tcttc: tcttc,
                sdtcttc: sdtcttc,
                tttcttc: tttcttc,
                event: "updateCTTC"
              }
              //Gọi hàm Query
              queryData("asset/php/api.php", dataclient, function (res) {
                console.log("" + res.success);
                if (res.success == 2 && status == 'Congtytaichinh') {
                  alert_error("Dữ liệu đã bị trùng ID công ty tài chính");
                } else if (res.success == 1 && status == 'Congtytaichinh') {
                  showDataCongtytaichinh();
                  alert_success("Cập nhật Thành Công");
                  flagCTTC = 0;
                  $(".Congtytaichinh .btnadd").prop("disabled", false);
                  $(".Congtytaichinh .btnsave").prop("disabled", true);
                  $(".Congtytaichinh .btnedit").prop("disabled", true);
                } else if (status == 'Congtytaichinh') {
                  alert_error("Lỗi Cập nhật Không Thành Công");
                }
              });
            }
          } else if (status == 'Congtytaichinh') {
            console.log("chưa nhấn nút nào cả");
          }
        });
        $(".Congtytaichinh .btndel").click(function () {
          var idcttc = $(".idcttc").val();
          if (status == 'Congtytaichinh') {
            bootbox.confirm("Bạn có chắc xóa ID công ty tài chính[ " + idcttc + " ] này không?", function (result) {
              if (result == true) {
                var dataSend = {
                  event: "deleteCTTC",
                  idcttc: idcttc
                };
                queryData("asset/php/api.php", dataSend, function (data) {
                  if (data.success == 1 && status == 'Congtytaichinh') {
                    showDataCongtytaichinh();
                    resetViewCTTC();
                    $(".idcttc").prop("disabled", false);
                    alert_success("Xóa thành công");
                  } else if (data.success == 2 && status == 'Congtytaichinh') {
                    alert_info("ID công ty tài chính đã được sử dụng trong bảng sách");
                  } else {
                    alert_error("Xóa không thành công");
                  }
                });
              } else if (status == 'Congtytaichinh') {
                alert_info("Lỗi");
              }
            })
          }
        })
        ////Bắt sự kiện click trên mỗi dòng
        $(".addListCongtytaichinh").on('click', '.click_view', function () {
          var idcttc = $(this).parent().attr("data-idcttc");
          var tcttc = $(this).parent().attr("data-tcttc");
          var sdtcttc = $(this).parent().attr("data-sdtcttc");
          var tttcttc = $(this).parent().attr("data-tttcttc");
          $(".idcttc").val(idcttc);
          $(".tcttc").val(tcttc);
          $(".sdtcttc").val(sdtcttc);
          $(".tttcttc").val(tttcttc);
          $(".Congtytaichinh .btnadd").prop("disabled", false);
          $(" .btnsave").prop("disabled", true);
          $(" .btnedit").prop("disabled", false);
        })

        function showDataCongtytaichinh() {
          var dataSend = {
            event: "getALLCTTC"
          }
          var htmls = '';
          queryData("asset/php/api.php", dataSend, function (data) {
            var arr = data.items; //lấy ra mảng 
            var stt = 1;
            for (var item in arr) {
              var d = arr[item];

              htmls = htmls + '<tr data-idcttc="' + d.idcttc + '" data-tcttc="' + d.tcttc + '" data-sdtcttc="' + d.sdtcttc + '" data-tttcttc="' + d.tttcttc + '">' +
                '<td>' + stt + '</td>' +
                '<td>' + d.idcttc + '</td>' +
                '<td>' + d.tcttc + '</td>' +
                '<td>' + d.sdtcttc + '</td>' +
                '<td>' + d.tttcttc + '</td>' +
                '<td class="click_view" ><span class="badge bg-danger" style="cursor:pointer">Xem</span></td>' +
                '</tr>';
              stt++;
            }
            $(".table .td").html(htmls);
          });
        }

        function resetViewCTTC() {
          $(".idcttc").val("");
          $(".idcttc").focus();
          $(".tcttc").val("");
          $(".sdtcttc").val("");
          $(".tttcttc").val("");
        };
        showDataCongtytaichinh();
      } else if (t == 'NhanVien') {
        status = 'NhanVien';
        var flagnv = 0;
        $(".NhanVien .btnadd").click(function () {
          $(".NhanVien .btnadd").prop("disabled", true);
          $(".NhanVien .btnsave").prop("disabled", false);
          $(".NhanVien .btnedit").prop("disabled", true);
          resetViewxdb();
          flagnv = 1;
          $(".idnv").prop("disabled", false);
        });
        $(".NhanVien .btnedit").click(function () {

          $(".NhanVien .btnadd").prop("disabled", true);
          $(".NhanVien .btnsave").prop("disabled", false);
          $(".NhanVien .btnedit").prop("disabled", true);
          flagnv = 2;
          $(".idnv").prop("disabled", true);
        });
        $(".NhanVien .btnrf").click(function () {
          resetViewxdb();
          $(".NhanVien .btnadd").prop("disabled", false);
          $(".NhanVien .btnsave").prop("disabled", true);
          $(".NhanVien .btnedit").prop("disabled", true);
          flagnv = 0;
        });
        $(".NhanVien .btnsave").click(function () {
          if (flagnv == 1 && status == 'NhanVien') {
            var idnv = $(".idnv").val();
            var tnv = $(".tnv").val();
            var ns = $(".ns").val();
            var gt = $(".gt").val();
            var dc = $(".dc").val();
            var sdtnv = $(".sdtnv").val();
            var nvl = $(".nvl").val();
            var lcb = $(".lcb").val();
            if (idnv == "") {
              alert_info("ID nhân viên không thể để trống");
              $(".idnv").focus();
            } else if (tnv == "") {
              alert_info("Yêu cầu nhập tên nhân viên");
              $(".tnv").focus();
            } else if (ns == "") {
              alert_info("Yêu cầu nhập ngày sinh (yyyy/m/d)");
              $(".ns").focus();
            } else if (gt == "") {
              alert_info("Yêu cầu nhập giới tính");
              $(".gt").focus();
            } else if (dc == "") {
              alert_info("Yêu cầu nhập địa chỉ (yyyy/m/d)");
              $(".dc").focus();
            } else if (sdtnv == "") {
              alert_info("Yêu cầu nhập số điện thoại");
              $(".sdtnv").focus();
            } else if (nvl == "") {
              alert_info("Yêu cầu nhập năm vào làm");
              $(".nvl").focus();
            } else if (lcb == "") {
              alert_info("Yêu cầu nhập mức lượng cơ bản");
              $(".lcb").focus();
            } else //có nghĩa idnv và tên thể loại hop le
            {
              var dataclient = {
                idnv: idnv,
                tnv: tnv,
                ns: ns,
                gt: gt,
                dc: dc,
                sdtnv: sdtnv,
                nvl: nvl,
                lcb: lcb,
                event: "insertNV"
              }
              queryData("asset/php/api.php", dataclient, function (res) {
                if (res.success == 2 && status == 'NhanVien') {
                  alert_error("Dữ liệu đã bị trùng ID nhân viên");
                } else if (res.success == 1 && status == 'NhanVien') {
                  alert_success("Insert Thành Công");
                  flagnv = 0;
                  resetViewxdb();
                  $(".NhanVien .btnadd").prop("disabled", false);
                  $(".NhanVien .btnsave").prop("disabled", true);
                  $(".NhanVien .btnedit").prop("disabled", true);
                  showDataNhanvien();
                } else {
                  alert_error("Lỗi Insert Không Thành Công");
                  showDataNhanvien();
                }
              });
            }

          } else if (flagnv == 2 && status == 'NhanVien') {
            var idnv = $(".idnv").val();
            var tnv = $(".tnv").val();
            var ns = $(".ns").val();
            var gt = $(".gt").val();
            var dc = $(".dc").val();
            var sdtnv = $(".sdtnv").val();
            var nvl = $(".nvl").val();
            var lcb = $(".lcb").val();
            if (idnv == "") {
              alert_info("ID nhân viên không thể để trống");
              $(".idnv").focus();
            } else if (tnv == "") {
              alert_info("Yêu cầu nhập tên nhân viên");
              $(".tnv").focus();
            } else if (ns == "") {
              alert_info("Yêu cầu nhập ngày sinh (yyyy/m/d)");
              $(".ns").focus();
            } else if (gt == "") {
              alert_info("Yêu cầu nhập giới tính");
              $(".gt").focus();
            } else if (dc == "") {
              alert_info("Yêu cầu nhập địa chỉ");
              $(".dc").focus();
            } else if (sdtnv == "") {
              alert_info("Yêu cầu nhập số điện thoại");
              $(".sdtnv").focus();
            } else if (nvl == "") {
              alert_info("Yêu cầu nhập năm vào làm");
              $(".nvl").focus();
            } else //có nghĩa idnv và tên thể loại hop le
            {
              var dataclient = {
                idnv: idnv,
                tnv: tnv,
                ns: ns,
                gt: gt,
                dc: dc,
                sdtnv: sdtnv,
                nvl: nvl,
                lcb: lcb,
                event: "updateNV"
              }
              //Gọi hàm Query
              queryData("asset/php/api.php", dataclient, function (res) {
                console.log("" + res.success);
                if (res.success == 2 && status == 'NhanVien') {
                  alert_error("Dữ liệu đã bị trùng mã Xe đã bán");
                } else if (res.success == 1 && status == 'NhanVien') {
                  showDataNhanvien();
                  resetViewxdb();
                  alert_success("Cập nhật Thành Công");
                  flagnv = 0;
                  $(".NhanVien .btnadd").prop("disabled", false);
                  $(".NhanVien .btnsave").prop("disabled", true);
                  $(".NhanVien .btnedit").prop("disabled", true);
                } else if (status == 'NhanVien') {
                  alert_error("Lỗi Cập nhật Không Thành Công");
                }
              });
            }
          } else if (status == 'NhanVien') {
            console.log("chưa nhấn nút nào cả");
          }
        })
        $(".NhanVien .btndel").click(function () {
          var idnv = $(".idnv").val();
          var tnv = $(".tnv").val();
          if (status == 'NhanVien') {
            bootbox.confirm("Bạn có chắc xóa xe đã bán của [ " + tnv + " ] này không?", function (result) {
              if (result == true) {
                var dataSend = {
                  event: "deleteNV",
                  idnv: idnv
                };
                queryData("asset/php/api.php", dataSend, function (data) {
                  if (data.success == 1 && status == 'NhanVien') {
                    showDataNhanvien();
                    resetViewxdb();
                    $(".idnv").prop("disabled", false);
                    alert_success("Xóa thành công");
                  } else if (data.success == 2 && status == 'NhanVien') {
                    alert_info("Xe đã bán đã được sử dụng trong bảng sách");
                  } else if (status == 'NhanVien') {
                    alert_error("Xóa không thành công");
                  }
                });
              } else {
                alert_info("Lỗi");
              }
            })
          }
        })
        ////Bắt sự kiện click trên mỗi dòng
        $(".addListNhanVien").on('click', '.click_view', function () {
          var idnv = $(this).parent().attr("data-idnv");
          var tnv = $(this).parent().attr("data-tnv");
          var ns = $(this).parent().attr("data-ns");
          var gt = $(this).parent().attr("data-gt");
          var dc = $(this).parent().attr("data-dc");
          var sdtnv = $(this).parent().attr("data-sdtnv");
          var nvl = $(this).parent().attr("data-nvl");
          var lcb = $(this).parent().attr("data-lcb");
          $(".idnv").val(idnv);
          $(".tnv").val(tnv);
          $(".ns").val(ns);
          $(".gt").val(gt);
          $(".dc").val(dc);
          $(".sdtnv").val(sdtnv);
          $(".nvl").val(nvl);
          $(".lcb").val(lcb);
          $(".NhanVien .btnadd").prop("disabled", false);
          $(".NhanVien .btnsave").prop("disabled", true);
          $(".NhanVien .btnedit").prop("disabled", false);
        })

        function showDataNhanvien() {
          var dataSend = {
            event: "getALLNV"
          }
          var htmls = '';
          queryData("asset/php/api.php", dataSend, function (data) {
            var arr = data.items; //lấy ra mảng 
            var stt = 1;
            for (var item in arr) {
              var d = arr[item];
              htmls = htmls + '<tr data-idnv="' + d.idnv + '" data-tnv="' + d.tnv + '" data-ns="' + d.ns + '" data-gt="' + d.gt + '" data-dc="' + d.dc + '" data-sdtnv="' + d.sdtnv + '" data-nvl="' + d.nvl + '" data-lcb="' + d.lcb + '" >' +
                '<td>' + stt + '</td>' +
                '<td>' + d.idnv + '</td>' +
                '<td>' + d.tnv + '</td>' +
                '<td>' + d.ns + '</td>' +
                '<td>' + d.gt + '</td>' +
                '<td>' + d.dc + '</td>' +
                '<td>' + d.sdtnv + '</td>' +
                '<td>' + d.nvl + '</td>' +
                '<td>' + d.lcb + '</td>' +
                '<td class="click_view" ><span class="badge bg-danger" style="cursor:pointer">Xem</span></td>' +
                '</tr>';
              stt++;
            }
            $(".table .td").html(htmls);
          });
        }

        function resetViewxdb() {
          $(".idnv").val("");
          $(".idnv").focus();
          $(".tnv").val("");
          $(".ns").val("");
          $(".gt").val("");
          $(".dc").val("");
          $(".sdtnv").val("");
          $(".nvl").val("");
          $(".lcb").val("");
        };
        showDataNhanvien();
      } else if (t == 'Nhasanxuat') {
        status = 'Nhasanxuat';
        var flagNSX = 0;
        $(".Nhasanxuat .btnadd").click(function () {
          $(".Nhasanxuat .btnadd").prop("disabled", true);
          $(".Nhasanxuat .btnsave").prop("disabled", false);
          $(".Nhasanxuat .btnedit").prop("disabled", true);
          resetViewNSX();
          flagNSX = 1;
          $(".tnsx").prop("disabled", false);
        });
        $(".Nhasanxuat .btnedit").click(function () {

          $(".Nhasanxuat .btnadd").prop("disabled", true);
          $(".Nhasanxuat .btnsave").prop("disabled", false);
          $(".Nhasanxuat .btnedit").prop("disabled", true);
          flagNSX = 2;
          $(".tnsx").prop("disabled", true);
        });
        $(".Nhasanxuat .btnrf").click(function () {
          resetViewNSX();
          $(".Nhasanxuat .btnadd").prop("disabled", false);
          $(".Nhasanxuat .btnsave").prop("disabled", true);
          $(".Nhasanxuat .btnedit").prop("disabled", true);
          flagNSX = 0;
        });
        $(".Nhasanxuat .btnsave").click(function () {
          if (flagNSX == 1 && status == 'Nhasanxuat') {
            var tnsx = $(".tnsx").val();
            var qgnsx = $(".qgnsx").val();
            var sdtnsx = $(".sdtnsx").val();
            if (tnsx == "") {
              alert_info("Tên nhà sản xuất không thể để trống");
              $(".tnsx").focus();
            } else if (qgnsx == "") {
              alert_info("Yêu cầu nhập quốc gia");
              $(".qgnsx").focus();
            } else if (sdtnsx == "") {
              alert_info("Yêu cầu nhập số điện thoại");
              $(".sdtnsx").focus();
            } else //có nghĩa tnsx và tên thể loại hop le
            {
              var dataclient = {
                tnsx: tnsx,
                qgnsx: qgnsx,
                sdtnsx: sdtnsx,
                event: "insertNSX"
              }
              queryData("asset/php/api.php", dataclient, function (res) {
                if (res.success == 2 && status == 'Nhasanxuat') {
                  alert_error("Dữ liệu đã bị trùng Tên nhà sản xuất");
                } else if (res.success == 1 && status == 'Nhasanxuat') {
                  alert_success("Insert Thành Công");
                  flagNSX = 0;
                  resetViewNSX();
                  $(".Nhasanxuat .btnadd").prop("disabled", false);
                  $(".Nhasanxuat .btnsave").prop("disabled", true);
                  $(".Nhasanxuat .btnedit").prop("disabled", true);
                  showDataNhasanxuat();
                } else if (status == 'Nhasanxuat') {
                  alert_error("Lỗi Insert Không Thành Công");
                  showDataNhasanxuat();
                }
              });
            }
          } else if (flagNSX == 2 && status == 'Nhasanxuat') {
            console.log("update");
            var tnsx = $(".tnsx").val();
            var qgnsx = $(".qgnsx").val();
            var sdtnsx = $(".qgnsx").val();
            if (tnsx == "") {
              alert_info("Tên nhà sản xuất không thể để trống");
              $(".tnsx").focus();
            } else if (qgnsx == "") {
              alert_info("Yêu cầu nhập quốc gia");
              $(".qgnsx").focus();
            } else //có nghĩa tnsx và tên thể loại hop le
            {
              var dataclient = {
                tnsx: tnsx,
                qgnsx: qgnsx,
                sdtnsx: sdtnsx,
                event: "updateNSX"
              }
              //Gọi hàm Query
              queryData("asset/php/api.php", dataclient, function (res) {
                if (res.success == 2 && status == 'Nhasanxuat') {
                  alert_error("Dữ liệu đã bị trùng Tên nhà sản xuất");
                } else if (res.success == 1 && status == 'Nhasanxuat') {
                  showDataNhasanxuat();
                  alert_success("Cập nhật Thành Công");
                  flagNSX = 0;

                  $(".Nhasanxuat .btnadd").prop("disabled", false);
                  $(".Nhasanxuat .btnsave").prop("disabled", true);
                  $(".Nhasanxuat .btnedit").prop("disabled", true);
                } else if (status == 'Nhasanxuat') {
                  alert_error("Lỗi cập nhật Không Thành Công");
                }
              });
            }
          } else if (status == 'Nhasanxuat') {
            console.log("chưa nhấn nút nào cả");
          }
        });
        $(".Nhasanxuat .btndel").click(function () {
          var tnsx = $(".tnsx").val();
          if (status == 'Nhasanxuat') {
            bootbox.confirm("Bạn có chắc xóa Tên nhà sản xuất[ " + tnsx + " ] này không?", function (result) {
              if (result == true) {
                var dataSend = {
                  event: "deleteNSX",
                  tnsx: tnsx
                };
                queryData("asset/php/api.php", dataSend, function (data) {
                  if (data.success == 1 && status == 'Nhasanxuat') {
                    showDataNhasanxuat();
                    resetViewNSX();
                    $(".tnsx").prop("disabled", false);
                    alert_success("Xóa thành công");
                  } else if (data.success == 2 && status == 'Nhasanxuat') {
                    alert_info("Tên nhà sản xuất đã được sử dụng trong bảng sách");
                  } else {
                    alert_error("Xóa không thành công");
                  }
                });
              } else if (status == 'Nhasanxuat') {
                alert_info("Lỗi");
              }
            })
          }
        })
        ////Bắt sự kiện click trên mỗi dòng
        $(".addListNhasanxuat").on('click', '.click_view_nsx', function () {
          var tnsx = $(this).parent().attr("data-tnsx");
          var qgnsx = $(this).parent().attr("data-qgnsx");
          var sdtnsx = $(this).parent().attr("data-sdtnsx");
          $(".tnsx").val(tnsx);
          $(".qgnsx").val(qgnsx);
          $(".sdtnsx").val(sdtnsx);
          $(".Nhasanxuat .btnadd").prop("disabled", false);
          $(".Nhasanxuat .btnsave").prop("disabled", true);
          $(".Nhasanxuat .btnedit").prop("disabled", false);

        })

        function showDataNhasanxuat() {
          var dataSend = {
            event: "getALLNSX"
          }
          var htmls = '';
          queryData("asset/php/api.php", dataSend, function (data) {
            var arr = data.items; //lấy ra mảng 
            var stt = 1;
            for (var item in arr) {
              var d = arr[item];
              htmls = htmls + '"<tr data-tnsx="' + d.tnsx + '" data-qgnsx="' + d.qgnsx + '" data-sdtnsx="' + d.sdtnsx + '">' +
                '<td>' + stt + '</td>' +
                '<td>' + d.tnsx + '</td>' +
                '<td>' + d.qgnsx + '</td>' +
                '<td>' + d.sdtnsx + '</td>' +
                '<td class="click_view_nsx"><span class="badge bg-danger" style="cursor:pointer">Xem</span></td>' +
                '</tr>';
              stt++;
            }
            $(".table .td").html(htmls);
          });
        }

        function resetViewNSX() {
          $(".tnsx").val("");
          $(".tnsx").focus();
          $(".qgnsx").val("");
          $(".sdtnsx").val("");
        }
        showDataNhasanxuat();

      } else if (t == 'Quanlitaikhoan') {
        status = 'Quanlitaikhoan';
        var flagqltk = 0;
        $(".Quanlitaikhoan .btnadd").click(function () {
          $(".Quanlitaikhoan .btnadd").prop("disabled", true);
          $(".Quanlitaikhoan .btnsave").prop("disabled", false);
          $(".Quanlitaikhoan .btnedit").prop("disabled", true);
          resetViewQLTK();
          flagqltk = 1;
          upImg = "";
          $('.showImg').addClass('.showImg');
          $(".tk").prop("disabled", false);
          document.querySelector("#ipImgU").addEventListener('change', initUploadAllCommon);
        });
        $(".Quanlitaikhoan .btnedit").click(function () {
          document.querySelector("#ipImgU").addEventListener('change', initUploadAllCommon);
          $(".Quanlitaikhoan .btnadd").prop("disabled", true);
          $(".Quanlitaikhoan .btnsave").prop("disabled", false);
          $(".Quanlitaikhoan .btnedit").prop("disabled", true);
          flagqltk = 2;
          $(".tk").prop("disabled", true);
        });
        $(".Quanlitaikhoan .btnrf").click(function () {
          resetViewQLTK();
          flagqltk = 0;
          upImg = "";
          $(".Quanlitaikhoan .btnadd").prop("disabled", false);
          $(".Quanlitaikhoan .btnsave").prop("disabled", true);
          $(".Quanlitaikhoan .btnedit").prop("disabled", true);
          document.querySelector("#ipImgU").addEventListener('change', initUploadAllCommon);
        });
        $(".Quanlitaikhoan .btnsave").click(function () {
          if (flagqltk == 1 && status == 'Quanlitaikhoan') {
            var tk = $(".tk").val();
            var mk = $(".mk").val();
            var fn = $(".fn").val();
            var gm = $(".gm").val();
            var qh = $(".qh").val();
            if (tk == "") {
              alert_info("Yêu cầu nhập tên tài khoản");
              $(".tk").focus();
            } else if (mk == "") {
              alert_info("Yêu cầu nhập mật khẩu");
              $(".mk").focus();
            } else if (fn == "") {
              alert_info("Yêu cầu nhập tên đầu đủ");
              $(".fn").focus();
            } else if (gm == "") {
              alert_info("Yêu cầu nhập gmail");
              $(".gm").focus();
            } else if (qh == "") {
              alert_info("Yêu cầu cấp quyền (0: full quyền, 1: k đc sửa)");
              $(".qh").focus();
            } else //có nghĩa tk và tên thể loại hop le
            {
              var dataclient = {
                tk: tk,
                mk: mk,
                fn: fn,
                gm: gm,
                qh: qh,
                avt: upImg,
                event: "insertQLTK"
              }
              queryData("asset/php/api.php", dataclient, function (res) {
                if (res.success == 2 && status == 'Quanlitaikhoan') {
                  alert_error("Tài khoản này đã tồn tại");
                } else if (res.success == 1 && status == 'Quanlitaikhoan') {
                  alert_success("Thêm thành Công");
                  flagqltk = 0;
                  resetViewQLTK();
                  $(".Quanlitaikhoan .btnadd").prop("disabled", false);
                  $(".Quanlitaikhoan .btnsave").prop("disabled", true);
                  $(".Quanlitaikhoan .btnedit").prop("disabled", true);
                  showDataQLTK();
                } else if (status == 'Quanlitaikhoan') {
                  alert_error("Lỗi Insert Không Thành Công");
                  showDataQLTK();
                }
              });
            }

          } else if (flagqltk == 2 && status == 'Quanlitaikhoan') {
            var tk = $(".tk").val();
            var mk = $(".mk").val();
            var fn = $(".fn").val();
            var gm = $(".gm").val();
            var qh = $(".qh").val();
            if (tk == "") {
              alert_info("Yêu cầu nhập tên tài khoản");
              $(".tk").focus();
            } else if (mk == "") {
              alert_info("Yêu cầu nhập mật khẩu");
              $(".mk").focus();
            } else if (fn == "") {
              alert_info("Yêu cầu nhập tên đầu đủ");
              $(".fn").focus();
            } else if (gm == "") {
              alert_info("Yêu cầu nhập gmail");
              $(".gm").focus();
            } else if (qh == "") {
              alert_info("Yêu cầu cấp quyền (0: full quyền, 1: k đc sửa)");
              $(".qh").focus();
            } else //có nghĩa tk và tên thể loại hop le
            {
              var dataclient = {
                //Không thành công
                tk: tk,
                mk: mk,
                fn: fn,
                gm: gm,
                qh: qh,
                avt: upImg,
                event: "updateQLTK"
              }
              //Gọi hàm Query
              queryData("asset/php/api.php", dataclient, function (res) {
                if (res.success == 2 && status == 'Quanlitaikhoan') {
                  alert_error("Tài khoản đã tồn tại");
                } else if (res.success == 1 && status == 'Quanlitaikhoan') {
                  showDataQLTK();
                  alert_success("Cập nhật Thành Công");
                  flagqltk = 0;
                  $(".Quanlitaikhoan .btnadd").prop("disabled", false);
                  $(".Quanlitaikhoan .btnsave").prop("disabled", true);
                  $(".Quanlitaikhoan .btnedit").prop("disabled", true);
                } else if (status == 'Quanlitaikhoan') {
                  alert_error("Lỗi Cập nhật Không Thành Công");
                }
              });
            }
          } else if (status == 'Quanlitaikhoan') {
            console.log("chưa nhấn nút nào cả");
          }
        });
        $(".Quanlitaikhoan .btndel").click(function () {
          var tk = $(".tk").val();
          if (status == 'Quanlitaikhoan') {
            bootbox.confirm("Bạn có chắc xóa tài khoản [ " + tk + " ] này không?", function (result) {
              if (result == true) {
                var dataSend = {
                  event: "deleteQLTK",
                  tk: tk
                };
                queryData("asset/php/api.php", dataSend, function (data) {
                  if (data.success == 1 && status == 'Quanlitaikhoan') {
                    showDataQLTK();
                    resetViewQLTK();
                    $(".tk").prop("disabled", false);
                    alert_success("Xóa thành công");
                  } else if (data.success == 2 && status == 'Quanlitaikhoan') {
                    alert_info("Khách hàng đã được sử dụng trong bảng sách");
                  } else {
                    alert_error("Xóa không thành công");
                  }
                });
              } else if (status == 'Quanlitaikhoan') {
                alert_info("Lỗi");
              }
            })
          }
        })
        ////Bắt sự kiện click trên mỗi dòng
        $(".addListQuanlitaikhoan").on('click', '.click_view', function () {
          var tk = $(this).parent().attr("data-tk");
          var mk = $(this).parent().attr("data-mk");
          var fn = $(this).parent().attr("data-fn");
          var gm = $(this).parent().attr("data-gm");
          var qh = $(this).parent().attr("data-qh");
          var avt = $(this).parent().attr("data-avt");
          $(".tk").val(tk);
          $(".mk").val(mk);
          $(".fn").val(fn);
          $(".gm").val(gm);
          $(".qh").val(qh);
          $(".Quanlitaikhoan .btnadd").prop("disabled", false);
          $(".Quanlitaikhoan .btnsave").prop("disabled", true);
          $(".Quanlitaikhoan .btnedit").prop("disabled", false);
          upImg = avt;
          $('.showImg').removeClass('showImgs');
          $(".showImg").attr("src", "asset/img/imgs/" + upImg);
        })

        function showDataQLTK() {
          var dataSend = {
            event: "getALLQLTK"
          }
          var htmls = '';
          var nvActive = '';
          queryData("asset/php/api.php", dataSend, function (data) {
            var arr = data.items; //lấy ra mảng 
            var stt = 1;
            for (var item in arr) {
              var d = arr[item];
              htmls = htmls + '<tr data-tk="' + d.tk + '" data-mk="' + d.mk + '" data-fn="' + d.fn + '" data-gm="' + d.gm + '" data-qh="' + d.qh + '" data-avt ="' + d.avt + '" >' +
                '<td>' + stt + '</td>' +
                '<td>' + d.tk + '</td>' +
                '<td style="max-width: 50px; overflow:hidden; text-overflow: ellipsis">' + d.mk + '</td>' +
                '<td>' + d.fn + '</td>' +
                '<td>' + d.gm + '</td>' +
                '<td>' + d.qh + '</td>' +
                '<td style="max-width: 50px; overflow:hidden; text-overflow: ellipsis">' + d.avt + '</td>' +
                '<td class="click_view" ><span class="badge bg-danger" style="cursor:pointer">Xem</span></td>' +
                '</tr>';
              nvActive += '<tr>' +
                '<td>' + stt + '</td>' +
                '<td style="text-align: start; padding-left: 40px">' + '<img src="asset/img/imgs/' + ((d.avt == "" || d.avt == undefined || d.avt == "null") ? "noAvt.png" : d.avt) + '" style="width: 30px;height:30px;margin-right: 10px ;border-radius: 50%;object-fit: cover">' + d.fn + '</td>' +
                '<td>' + (Math.random() % 2 == 0 ? "Online" : "Offline") + '</td>' +
                '</tr>'
              stt++;
            }
            $(".table .td").html(htmls);
            $("#nvactive").html(nvActive);
          });
        }

        function resetViewQLTK() {
          $(".tk").val("");
          $(".tk").focus();
          $(".mk").val("");
          $(".fn").val("");
          $(".gm").val("");
          $(".qh").val("");
          $('.showImg').addClass('showImgs');
        };
        showDataQLTK();

      };

    })
  })


  // change avatar ========================
  $('#file-upload').click(function () {
    document.querySelector("#file-upload").addEventListener('change', initUploadAllCommon);
    alert_success("Cập nhật thành công")
    var dataClient = {
      avt: upImg,
      username: localStorage.getItem("usernamebookstore"),
      event: 'UploadAvatar'
    }
    queryData("asset/php/api.php", dataClient, function (res) {})

  })
})
// upload anh ===============================
function upImgs(oj) {
  if (oj.status == true) {
    alert('Đã cập nhật ảnh thành công')
    upImg = oj.attach;
    $(".showImg").attr("src", "asset/img/imgs/" + upImg);
    $(".showImg").removeClass('showImgs');
  }
}

// phân trang ============
