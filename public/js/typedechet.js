

$("#type").ready(function() {

  $('#type').change(function(e){
    var typeDeDechet = e.target.value;
    $.get("/opendata/dechetteries_cugn.json?dechet=" + typeDeDechet, displayMap);
    console.log('on est passés là !');
  });

});
