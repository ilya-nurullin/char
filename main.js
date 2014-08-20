(function ($d){

  function draw(input){
    /* CHARACTER SETTINGS */
    var start_char = "¯";
    var start_header_char = '=';
    var end_header_char = '=';
    var delimiter_char = '-';
    var end_char = '_';
    /* END CHARACTER SETTINGS */

    var lines = input.split(/\n/);
    var max_length = 0;

    function repeat(n,s){
        return Array(n+1).join(s);
    }

    for(var i = 0; i < lines.length; i++){
      if(lines[i].length > max_length) max_length = lines[i].length;
    }

    var out = '';

    for(var i = 0; i < lines.length; i++){
      var l = lines[i].length;
      var is_header = (lines[i].slice(0,1) == "#") ? true : false;
      var start_space = 0;
      var end_space = 0;

      l =(max_length - l);
      if(l % 2 == 0){
        start_space = end_space = l / 2;
      }
      else{
        start_space = end_space = Math.floor(l / 2);
        start_space++;
      }
      if(!is_header && i == 0)
        out += "|"+repeat(max_length+2,start_char) + "|\n";

      if(is_header){
        if(lines[i].slice(0,2) == "#<"){
          out += "|"+repeat(max_length+2,start_header_char) + "|\n";
          out += '|  '+repeat(start_space," ")+ lines[i].slice(2) + repeat(end_space," ") + "  |\n";
        }
        else if(lines[i].slice(0,2) == "##"){
          out += '|  '+repeat(start_space," ")+ lines[i].slice(2) + repeat(end_space," ") + "  |\n";
        }
        else if(lines[i].slice(0,2) == "#>"){
          out += '|  '+repeat(start_space," ")+ lines[i].slice(2) + repeat(end_space," ") + "  |\n";
          out += "|"+repeat(max_length+2,end_header_char) + "|\n";
        }
        else if(lines[i].slice(0,2) == "#-"){
          out += "|"+repeat(max_length+2,delimiter_char) + "|\n";
        }
        else{
          out += "|"+repeat(max_length+2,start_header_char) + "|\n";
          out += '|  '+repeat(start_space," ")+ lines[i].slice(1) + repeat(end_space," ") + " |\n";
          out += "|"+repeat(max_length+2,end_header_char) + "|\n";
        }
      }
      else{
        out += '| '+repeat(start_space," ")+ lines[i] + repeat(end_space," ") + " |\n";
      }
    }
    if(!is_header)
      out += "|"+repeat(max_length+2,end_char) + "|\n";
    return out;
  }

  var is_auto = $d.querySelector("#autoredraw").checked;
  var input = $d.querySelector("#in");
  var button = $d.querySelector("#button_redraw");
  var output = $d.querySelector("#result");

  $d.querySelector("#autoredraw").onchange = function(){
    is_auto = this.checked;
  }

  output.onclick = function(){
    this.select();
  }

  button.onclick = function(){
    var r = draw(input.value);
    output.rows = r.split(/\n/).length+1;
    output.value = r;
  }

  input.onkeyup = function(){
    this.rows = this.value.split(/\n/).length+1;
    if(is_auto){
      var r = draw(this.value);
      output.rows = r.split(/\n/).length;
      output.value = r;
    }
  }

})(document);
