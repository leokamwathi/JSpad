 
 
 
 function includeHTML() {
  const htmlInclude = document.querySelectorAll('[includeHTML]');
   
  htmlInclude.forEach(
  (element) =>
  {
		try{
			  let src = element.getAttribute("includeHTML");
			  if(src){
				  /* Use xhttp to retrive the file in the includeHTML attribute */
				  let xhttp = new XMLHttpRequest();
				  xhttp.onreadystatechange = function() {
					if (this.readyState == 4) {
					  if (this.status == 200) {element.innerHTML += this.responseText;}
					  if (this.status == 404) {element.innerHTML += "<br/><b>IncludeHTML file (" + src + ") was not found.</b>";}
					  /* Remove the attribute to prevent future includes on current file might break page reload.*/
					  element.removeAttribute("includeHTML");
					}
				  }
				xhttp.open("GET", src, true);
				xhttp.send();
			  }
		}catch(error){
			element.innerHTML += "<br/><b>ERROR!!! "+ error.message +" <br/>While retriving IncludeHTML file (" + src + ").</b>";
		}
  }
  )
  
}