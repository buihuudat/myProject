function queryData(url, dataSend, callBack) {
  $.ajax({
    type: 'POST',
    url: url,
    data: dataSend,
    async: true,
    dataType: 'json',
    success: callBack
  });
}
(async function () {
    var dataSend = {
      event: "getALLKH"
    }
    var htmls = '';
    var slc = '"<select><option value="0">Chọn dữ liệu</option></select>"';
    await queryData("asset/php/api.php", dataSend, function (data) {
      var arr = data.items; //lấy ra mảng 
      var stt = 1;
      for (var item in arr) {
        var d = arr[item];
        slc = slc + '<option value="' + d.makh + '">' + d.makh + '</option>'
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
      $(".idkhdc").html(slc);
      $(".idkhstkh").html(slc);
      $(".idkhxdb").html(slc);
      $(".idkhhdtt").html(slc);
    });
  })();
  (function () {
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
  })();
  (function () {
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
  })();
  (function () {
    var dataSend = {
      event: "getALLXB"
    }
    var htmls = '';
    var slc = '"<select><option value="0">Chọn dữ liệu</option></select>"';
    queryData("asset/php/api.php", dataSend, function (data) {
      var arr = data.items; //lấy ra mảng 
      var stt = 1;
      for (var item in arr) {
        var d = arr[item];
        slc = slc + '<option value="' + d.idxb + '">' + d.idxb + '</option>'
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
      $(".idxbxdb").html(slc);
      $(".idxbddxdb").html(slc);
    });
  })();
  (function () {
    var dataSend = {
      event: "getALLDD"
    }
    var htmls = '';
    var slc = '"<select><option value="0">Chọn dữ liệu</option></select>"';
    queryData("asset/php/api.php", dataSend, function (data) {
      var arr = data.items; //lấy ra mảng 
      var stt = 1;
      for (var item in arr) {
        var d = arr[item];
        slc = slc + '<option value="' + d.idddddx + '">' + d.idddddx + '</option>'

        htmls = htmls + '"<tr data-idddddx="' + d.idddddx + '" data-mttn="' + d.mttn + '">' +
          '<td>' + stt + '</td>' +
          '<td>' + d.idddddx + '</td>' +
          '<td>' + d.mttn + '</td>' +
          '<td class="click_view_DD"><span class="badge bg-danger" style="cursor:pointer">Xem</span></td>' +
          '</tr>';
        stt++;
      }
      $(".table .td").html(htmls);
      $(".idddstkh").html(slc);
      $(".idddddxdb").html(slc);

    });
  })();
  (function () {
    var dataSend = {
      event: "getALLXDB"
    }
    var htmls = '';
    var slc = '"<select><option value="0">Chọn dữ liệu</option></select>"';

    queryData("asset/php/api.php", dataSend, function (data) {
      var arr = data.items; //lấy ra mảng 
      var stt = 1;
      for (var item in arr) {
        var d = arr[item];

        slc = slc + '<option value="' + d.idxdb + '">' + d.idxdb + '</option>'
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
      $(".idxdbhdtt").html(slc);
      $(".idxdbbh").html(slc);
      $(".idxbd").html(slc);
    });
  })();
  (function () {
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
  })();
  (function () {
    var dataSend = {
      event: "getALLxmh"
    }
    var htmls = '';
    var slc = '"<select><option value="0">Chọn dữ liệu</option></select>"';
    queryData("asset/php/api.php", dataSend, function (data) {
      var arr = data.items; //lấy ra mảng 
      var stt = 1;
      for (var item in arr) {
        var d = arr[item];
        slc = slc + '<option value="' + d.mmh + '">' + d.mmh + '</option>'
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
      $(".mmhxb").html(slc);
    });
  })();
  (function () {
    var dataSend = {
      event: "getALLLX"
    }
    var htmls = '';
    var slc = '"<select><option value="0">Chọn dữ liệu</option></select>"';
    var slc2 = '"<select><option value="0">Chọn kiểu xe</option></select>"';
    queryData("asset/php/api.php", dataSend, function (data) {
      var arr = data.items; //lấy ra mảng 
      var stt = 1;
      for (var item in arr) {
        var d = arr[item];
        slc = slc + '<option value="' + d.mlx + '">' + d.mlx + '</option>'
        slc2 = slc2 + '<option value="' + d.mtx + '">' + d.mtx + '</option>'
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
      $(".mlxxb").html(slc);
      $(".adMotaxe").html(slc2);
    });
  })();
  (function () {
    var dataSend = {
      event: "getALLTT"
    }
    var htmls = '';
    var slc = '"<select><option value="0">Chọn dữ liệu</option></select>"';
    queryData("asset/php/api.php", dataSend, function (data) {
      var arr = data.items; //lấy ra mảng 
      var stt = 1;
      for (var item in arr) {
        var d = arr[item];
        slc = slc + '<option value="' + d.tttt + '">' + d.tttt + '</option>'
        htmls = htmls + '<tr data-mtt="' + d.mtt + '" data-tttt="' + d.tttt + '">' +
          '<td>' + stt + '</td>' +
          '<td>' + d.mtt + '</td>' +
          '<td>' + d.tttt + '</td>' +
          '<td class="click_view" ><span class="badge bg-danger" style="cursor:pointer">Xem</span></td>' +
          '</tr>';
        stt++;
      }
      $(".table .td").html(htmls);
      $(".tttt").html(slc);
      $(".mtthdtt").html(slc);
    });
  })();
  (function () {
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
  })();
  (function () {
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
  })();
  (function () {
    var dataSend = {
      event: "getALLCTBH"
    }
    var htmls = '';
    var slc = '"<select><option value="0">Chọn dữ liệu</option></select>"';

    queryData("asset/php/api.php", dataSend, function (data) {
      var arr = data.items; //lấy ra mảng 
      var stt = 1;
      for (var item in arr) {
        var d = arr[item];

        slc = slc + '<option value="' + d.idctbht + '">' + d.idctbht + '</option>'

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
      $(".idctbh").html(slc);
    });
  })();
  (function () {
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
  })();
  (function () {
    var dataSend = {
      event: "getALLCTTC"
    }
    var htmls = '';
    var slc = '"<select><option value="0">Chọn dữ liệu</option></select>"';

    queryData("asset/php/api.php", dataSend, function (data) {
      var arr = data.items; //lấy ra mảng 
      var stt = 1;
      for (var item in arr) {
        var d = arr[item];
        slc = slc + '<option value="' + d.idcttc + '">' + d.idcttc + '</option>'

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
      $(".idct").html(slc);
    });
  })();
  (function () {
    var dataSend = {
      event: "getALLNV"
    }
    var htmls = '';
    var slc = '"<select><option value="0">Chọn dữ liệu</option></select>"';
    queryData("asset/php/api.php", dataSend, function (data) {
      var arr = data.items; //lấy ra mảng 
      var stt = 1;
      for (var item in arr) {
        var d = arr[item];

        slc = slc + '<option value="' + d.idnv + '">' + d.idnv + '</option>'
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
      $(".idnvhdtt").html(slc);
    });
  })();
  (function () {
    var dataSend = {
      event: "getALLNSX"
    }
    var htmls = '';
    var slc = '"<select><option value="0">Chọn dữ liệu</option></select>"';
    queryData("asset/php/api.php", dataSend, function (data) {
      var arr = data.items; //lấy ra mảng 
      var stt = 1;
      for (var item in arr) {
        var d = arr[item];
        slc = slc + '<option value="' + d.tnsx + '">' + d.tnsx + '</option>'
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
      $(".tnsxxb").html(slc);
    });
  })();
  (function () {
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
  })();
