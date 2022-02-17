
  function arr(choose,cls) {
      var inputMain = $(cls).toArray();
      var list_tong = [];
      inputMain.forEach((e,i) => {
        let arr = $(e).find(choose).toArray();
        let arr2 = [];
        arr.forEach(function (v,i) {
          arr2.push(v)
        })
        list_tong.push(arr2);
        arr2=[];    
        return arr2;
      });
  }
  var th = "";

  // show data table
  function opTable(className) {
    var liSl = $('.li').toArray();
    liSl.forEach((v, i) => {
      $(v).click(function () {
        th = "";
        td = "";
        list_tong[i].forEach(function (v1, i1) {
          th += '<th>' + v1 + '</th>';
        })
        $(className).html(th);
      })
    })
    var inputMain = $('.input-main').toArray();
    var list_tong = [];
    inputMain.forEach((v, i, a) => {
      let arr = $(v).find('.table-main').toArray();
      let arr2 = [];
      arr.forEach(function (v, i) {
        arr2.push(v.innerText);
      })
      list_tong.push(arr2);
      arr2 = [];
    })
  }

  function ipTable (){
      $(document).ready(function(){
      var inputMain = $('.input-main').toArray();  
      var list_tong = [];
      inputMain.forEach((e,i) => {
        let arr = $(e).find('input').toArray();
        let arr2 = [];
        arr.forEach(function (v,i) {
          arr2.push(v)
        })
        list_tong.push(arr2);
        arr2=[];
        
      });
      return arr2
    })
  }

export default ipTable;
