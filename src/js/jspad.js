/*
IDEA/WISH LIST
[FOCUS ON JAVASCRIPT ONLY NO CSS or HTML]
-Add to Chrome Extenstions. Offline JS editor. (Make a version just for this)
-Add save/load to disk
-Add auto save
-Excute code works (Capture Timeout errors etc try using worker)
-Colaboration  using Together.JS - may be webrtc. 
-cloudsaving and auth with firebase - ONLINE
-Code forking and sharing (twitter and fb - even email sharing)
-Add load test files (way to create tests) - Learners EDITION - tests for novice to advanced learners.
-Bold colors for - kids EDITION - tests can help teach kids.
-A way to share code
-Add Tabs (done on single page)
-Add a setting tab. (change color)
-Add a reference / help page
-Add to github eanable colob
-Add credit to codemirror for awesome code highlighting.
-Work on making your own code highlighter
-Way to import libs to excution enviroment (react.js , angular.js , jquery.js etc)
-My CODE PEN :-P
--Add CSS editor
--ADD HTML editor (May be we will see)
-Print the call stack. (console.log(new Error().stack);)  good for errors
*/

//dom elements



function refreshWindow(){
	window.location.reload();
}

function iFrameSetup(bypass=false){

let myIframe = document.getElementById("console-log");
let logHack = `
let fakeInput = '&#10095;';
if (window.console && console) {
    for (let c in console) {
        if (typeof console[c] === 'function') {
            let cx = console[c]
            console[c] = function (...message) {
				let msg = [...message].join('');
					if([...message].length!=0 || msg!='' || msg.length!=0 || msg!=undefined || msg!=null){
						if(c=='log'){
							msg ='<p class="console '+c+'"><span class="symbol">'+fakeInput+'</span> '+msg+'</p>';
						}else if(c=='warn'){
							msg ='<p class="console '+c+'"><span class="symbol">'+fakeInput+'</span> '+msg+'</p>';
						}else if(c=='error'){
							msg = '<p class="console '+c+'"><span class="symbol">'+fakeInput+'</span> '+msg+'</p>';
						}else if(c=='trace'){
							msg = '<p class="console '+c+'"><span class="symbol">'+fakeInput+'</span> Trace Output<br/>'+msg+'</p>';
						}else{
							msg ='<p class="console info"><span class="symbol">'+fakeInput+'</span> '+msg+'</p>';
						}
						document.body.innerHTML += msg;
					}
                cx.apply(this, [...message])
            }
        }
    }
}`;
//<span style="font-weight:bold;">&#65310;</span>
//&#10132; ➔ &#10148; ➤ &#65310; ＞ ❯  &#10095;

let style = myIframe.contentWindow.document.getElementById("myStyle");
let myConsoleScript = myIframe.contentWindow.document.getElementById("myConsoleScript");

if(!myConsoleScript||bypass){
var consoleScript = myIframe.contentWindow.document.createElement("script");
consoleScript.type = "text/javascript";
consoleScript.setAttribute('id','myConsoleScript');
consoleScript.textContent = logHack 
myIframe.contentWindow.document.head.appendChild(consoleScript);
}else{
	alert('Hi')
}

if(!style||bypass){
var cssLink = document.createElement("link");
cssLink.setAttribute('id','myStyle');
cssLink.href = "./css/iframe.css"; 
cssLink.rel = "stylesheet"; 
cssLink.type = "text/css"; 
myIframe.contentWindow.document.head.appendChild(cssLink);
}else{
	alert('Hi')
}
	
}

function importCode(){
	//import code from a file.
	alert('Importing File.')
	try{
		const file = document.getElementById('importedFile').files[0];
		if(file){
			// make sure its a js file. 
			// may be we let the user decide. 
			// What could go wrong - leo
			const fileReader = new FileReader();
			fileReader.onload = event => window.editor.setValue(event.target.result);
			fileReader.onerror = error => console.error(error.message);
			fileReader.readAsText(file);
		}else{
			alert('No file was selected.')
		}
	}catch(e){
		console.error(e.message);
	}
}

function exportCode(){
	alert('Exporting Code to File.')
	try{
		const blob = new Blob([window.editor.getValue()],{type:"application/javascript"})
		const url = window.URL.createObjectURL(blob); 
		const filename = "jspad_file_"+Date.now()+".js";
		const a = document.createElement('a');
		a.href= url;
		a.download = filename;
		a.innerText = "Download"
		a.click();
	}catch(e){
		console.error(e.message);
	}
}

function saveCode(slot='new'){
// Put the object into storage
try {
	const savedJson = localStorage.getItem('jsPadSave') ? JSON.parse(localStorage.getItem('jsPadSave')) : {}
	savedJson[slot] = JSON.stringify(window.editor.getValue())
	localStorage.setItem('jsPadSave', JSON.stringify(savedJson))
	console.log('CODE SAVED');
	alert('Code Saved')
} catch (error) {
	alert(error.message)
}




//localStorage.setItem('code', document.getElementById("code").value.replace('`',"'").replace(/[\u0000-\u0008\u0010-\u0019\u00ad\u200b-\u200f\u2028\u2029\ufeff]/g,' ').replace(/\b\d*\n/g,'') );
//document.getElementById("code").value = document.querySelector(".CodeMirror-code").innerText;
/*
let saveData = null;

if(!localStorage.getItem('js_pad_save')){
		
}

let saveData = localStorage.getItem('js_pad_save')
localStorage.setItem('code',window.editor.getValue());
*/

}

function loadCode(slot = 'new'){
	// Retrieve the object from storage
// document.getElementById("code").value = localStorage.getItem('code');
// console.log(localStorage.getItem('code'));

// document.querySelectorAll(".CodeMirror-code").forEach((c)=>c.parentNode.removeChild(c));
// document.querySelectorAll(".CodeMirror").forEach((c)=>c.parentNode.removeChild(c));
// colorcoding();
// document.querySelectorAll(".cm-invalidchar").forEach((c)=>c.parentNode.removeChild(c));

	document.getElementById("code").value = window.editor.getValue();
	try {
		const savedJson = localStorage.getItem('jsPadSave') ? JSON.parse(localStorage.getItem('jsPadSave')) : {}
		const codeOutput = JSON.parse(savedJson[slot].toString() || '')
		window.editor.setValue(codeOutput)
		console.log(codeOutput)

		//document.getElementById("code").value = 
		//= JSON.stringify(window.editor.getValue())

		alert('Loaded Code')
		console.log('CODE LOADED');
	} catch (error) {
		alert(error.message)
	}
}

function clearConsole() 
{
	console.log('Clear Console');
	let myIframe = document.getElementById("console-log");
	
	//myIframe.contentWindow.document.body.innerHTML = '';
	//myIframe.contentWindow.document.body.innerText = '';
	//myIframe.contentWindow.document.head.innerHTML = '';
	//myIframe.contentWindow.document.head.innerText = '';
	
	myIframe.contentWindow.document.location.reload();
	myIframe.contentWindow.document.body.scrollTop = myIframe.contentWindow.document.body.scrollHeight;
	document.body.scrollTop = document.body.scrollHeight;
	//myIframe.scrollTop = myIframe.scrollHeight;
	//iFrameSetup();
}


function runCode() 
{
console.log('Running Code...');
let myIframe = document.getElementById("console-log");
let script = myIframe.contentWindow.document.getElementById("myScript");

if (script) {
	script.parentNode.removeChild(script);
}

script = myIframe.contentWindow.document.createElement("script");

let _try = `try {`
//console.error(e);
//console.trace();.replace('eval ','js_pad_script ')
//replace('eval (eval','>>JSpad Script ').replace('(eval ','>>JSpad Script ').
let _catch = `
} catch (e) {
	console.error(e.stack.replace(/ [(]{1}eval/g,'()').split(" at ").join("<br/>&nbsp;&nbsp;&nbsp;at "));
}`

//'<p class="console error"><span class="symbol">&#65310;</span> '+e+'</p>'
script.type = "text/javascript";
script.setAttribute('id','myScript');
// document.querySelectorAll(".cm-invalidchar").forEach((c)=>c.parentNode.removeChild(c));
// document.getElementById("code").value = window.editor.getValue(); 

//document.querySelector(".CodeMirror-code").innerText;

//script.textContent = _try + 'console.log(eval(`'+document.getElementById("code").value.replace('`','\`').replace(/[\u0000-\u0008\u0010-\u0019\u00ad\u200b-\u200f\u2028\u2029\ufeff]/g,' ') +'`))'+ _catch;

console.log(window.editor.getValue().replace(/`/g,'\\`'));
//script.textContent = _try + 'console.log(eval(`'+window.editor.getValue().replace(/`/g,'\\`')+'`))'+ _catch;

script.textContent = 'console.log(eval(`'+_try+window.editor.getValue().replace(/`/g,'\\`')+_catch+'`))';

myIframe.contentWindow.document.head.appendChild(script);
myIframe.contentWindow.document.body.scrollTop = myIframe.contentWindow.document.body.scrollHeight

}
function colorcoding() {
		//codeHighlighter(document.getElementById("code"));
		
  var ua = navigator.userAgent;
  //Opera Mini refreshes the page when trying to edit the textarea.
  if (ua && ua.toUpperCase().indexOf("OPERA MINI") > -1) { return false; }
  window.editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    mode: "javascript",	
	lineNumbers:true
  });
  
	}
	
	/*
	specialChars: /[\u0000-\u0019\u00a0\u00ad\u200b-\u200f\u2028\u2029\ufeff]/g
	    lineWrapping: true,
    smartIndent: false,
	    addModeClass: true,
	matchBrackets: true
	*/
// console.log("JS-EDITOR-LOADED")