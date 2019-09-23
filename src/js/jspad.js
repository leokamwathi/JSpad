/*
IDEAS LIST
[FOCUS ON JAVASCRIPT ONLY]
-Add to Chrome Extenstions. Offline JS editor. (Make a version just for this)
-Add save/load to disk
-Add auto save
-Excute code in worked (Timeout errors etc)
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

function saveCode(){
// Put the object into storage
document.querySelectorAll(".cm-invalidchar").forEach((c)=>c.parentNode.removeChild(c));
document.getElementById("code").value = window.editor.getValue();
//localStorage.setItem('code', document.getElementById("code").value.replace('`',"'").replace(/[\u0000-\u0008\u0010-\u0019\u00ad\u200b-\u200f\u2028\u2029\ufeff]/g,' ').replace(/\b\d*\n/g,'') );

//document.getElementById("code").value = document.querySelector(".CodeMirror-code").innerText;

localStorage.setItem('code',window.editor.getValue());

console.log('CODE SAVED');
}

function loadCode(){
	// Retrieve the object from storage
document.getElementById("code").value = localStorage.getItem('code');
console.log(localStorage.getItem('code'));

document.querySelectorAll(".CodeMirror-code").forEach((c)=>c.parentNode.removeChild(c));
document.querySelectorAll(".CodeMirror").forEach((c)=>c.parentNode.removeChild(c));
colorcoding();
document.querySelectorAll(".cm-invalidchar").forEach((c)=>c.parentNode.removeChild(c));
console.log('CODE LOADED');
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

var _try = `try {
`
    
var _catch = `
} catch (e) {
    console.error(e);
}`

//'<p class="console error"><span class="symbol">&#65310;</span> '+e+'</p>'
script.type = "text/javascript";
script.setAttribute('id','myScript');
document.querySelectorAll(".cm-invalidchar").forEach((c)=>c.parentNode.removeChild(c));
document.getElementById("code").value = window.editor.getValue(); 

//document.querySelector(".CodeMirror-code").innerText;

//script.textContent = _try + 'console.log(eval(`'+document.getElementById("code").value.replace('`','\`').replace(/[\u0000-\u0008\u0010-\u0019\u00ad\u200b-\u200f\u2028\u2029\ufeff]/g,' ') +'`))'+ _catch;

console.log(window.editor.getValue().replace(/`/g,'\\`'));
script.textContent = _try + 'console.log(eval(`'+window.editor.getValue().replace(/`/g,'\\`')+'`))'+ _catch;

//script.textContent = logHack + _try + 'eval(`'+document.getElementById("codearea").innerText.replace('`',"'") +'`)'+ _catch;

myIframe.contentWindow.document.head.appendChild(script);

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
console.log("JS-EDITOR-LOADED")