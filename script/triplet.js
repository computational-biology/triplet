
obj1 = JSON.stringify(tripjsondata);

var tripdata = JSON.parse(obj1);


function is_std_basepair(x){
      var a = x.substr(0,1);
      var b = x.substr(2,1);
      if((a === "W" || a === "H" || a === "S") && (b === "W" || b === "H" || b ==="S")){
	    return true;
      }else{
	    return false;
      }
}

function show_trip_details(){
      var accnval = document.getElementById("accn").value;
      var tripnameval = document.getElementById("tripname").value;
      var edge1 = document.getElementById("edge1").value;
      var ori1 = document.getElementsByName("orient1");
      var orival1;
      for(var i = 0; i < ori1.length; i++){
	    if(ori1[i].checked === true){
		  orival1 = ori1[i].value;
	    }
      }

      var edge2 = document.getElementById("edge2").value;
      var ori2 = document.getElementsByName("orient2");
      var orival2;
      for(var i = 0; i < ori2.length; i++){
	    if(ori2[i].checked === true){
		  orival2 = ori2[i].value;
	    }
      }
//      window.alert(orival2);
//      var ori2 = document.getElementByName("orient2").value;
      var str = "<table id=\"resulttable\"><tr><td>ACCN</td><td>TRP</td><td>EDG1-EDG2</td><td>  View in JsMol</td><td>Know Details</tr>";
        
      for(var i=0; i<tripdata.length; ++i){
	    if(tripdata[i].compname === "T1" && is_std_basepair(tripdata[i].bpname1) == true && is_std_basepair(tripdata[i].bpname23) == true){
		  if((accnval.length === 0 || tripdata[i].accn === accnval)  
			&& 
			(tripnameval.length === 0 || tripdata[i].tripname === tripnameval)
			&&
			(edge1 === "ALL" || tripdata[i].bpname1.substr(0,3) === edge1)
			&&
			(orival1 === "all"|| orival1 === tripdata[i].bpname1.substr(3,1))
			&&
			(edge2 === "ALL" || tripdata[i].bpname23.substr(0,3) === edge2)
			&&
			(orival2 === "all"|| orival2 === tripdata[i].bpname23.substr(3,1))
		  ){
			str = str + "<tr><td>"+tripdata[i].accn + "</td><td>" + tripdata[i].tripname + " </td><td>  " + tripdata[i].edgeinfo + " </td><td> [<a  href=\"javascript:void(0);\" onclick=\"runjsmol('" + tripdata[i].accn + "', ' select " +tripdata[i].resid1+":"+tripdata[i].chain1+","+tripdata[i].resid2+":"+tripdata[i].chain2+","+tripdata[i].resid3+":"+tripdata[i].chain3+"' );\">Full</a>]       [<a  href=\"javascript:void(0);\" onclick=\"runjsmol('" + tripdata[i].accn + "', 'restrict within(15.0, " +tripdata[i].resid1+":"+tripdata[i].chain1+ "); select " +tripdata[i].resid1+":"+tripdata[i].chain1+","+tripdata[i].resid2+":"+tripdata[i].chain2+","+tripdata[i].resid3+":"+tripdata[i].chain3+"' );\">Within 15A</a>]" + "</td><td> <a href=\"javascript:void(0);\" onclick=\"modal_disp("+i+");\">Show details</a> </td></tr>";
		  }

	    }
      }
      str = str + "</table>";
      document.getElementById("jsontest").innerHTML = str;
}
