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

function refreshWindow() {
    window.location.reload();
}

function iFrameSetup(bypass = false) {
    let myIframe = document.getElementById('console-log');
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

    let style = myIframe.contentWindow.document.getElementById('myStyle');
    let myConsoleScript = myIframe.contentWindow.document.getElementById(
        'myConsoleScript'
    );

    if (!myConsoleScript || bypass) {
        var consoleScript = myIframe.contentWindow.document.createElement(
            'script'
        );
        consoleScript.type = 'text/javascript';
        consoleScript.setAttribute('id', 'myConsoleScript');
        consoleScript.textContent = logHack;
        myIframe.contentWindow.document.head.appendChild(consoleScript);
    } else {
        alerts('Error consolescript');
    }

    if (!style || bypass) {
        var cssLink = document.createElement('link');
        cssLink.setAttribute('id', 'myStyle');
        cssLink.href = './css/iframe.css';
        cssLink.rel = 'stylesheet';
        cssLink.type = 'text/css';
        myIframe.contentWindow.document.head.appendChild(cssLink);
    } else {
        alerts('Error stylebypass');
    }
}
function getFileList() {
    //Object.keys(JSON.parse(localStorage.getItem('jsPadSave')||{}))
    const saveObject = JSON.parse(localStorage.getItem('jsPadSave') || {});
    const saveFiles = Object.keys(saveObject);
    let savelist = saveFiles.reduce(
        (l, f) => l +
            `
		<div class="jspad-menu-item small">
<a class="dropdown-item"
href="#"
onclick="loadCode('${f}');"
>${f}</a>
<button type="button" class="close dropdown-menu-right"
data-toggle="tooltip" data-placement="bottom" title="Export Code"
onclick="exportCodeFile('${f}');" aria-label="Close">
            <span aria-hidden="true">^</span>
		  </button>
<button type="button" class="close dropdown-menu-right text-danger" 
data-toggle="tooltip" data-placement="bottom" title="Delete Code"
onclick="deleteCode('${f}');" aria-label="Close">
            <span aria-hidden="true">&empty;</span>
		  </button>
		  </div>
`,
        ''
    );


    document.getElementById('savelist').innerHTML = '';
    document.getElementById('savelist').innerHTML = savelist;
}

function importCode() {
    //import code from a file.
    try {
        const file = document.getElementById('importedFile').files[0];
        if (file) {
            // make sure its a js file.
            // may be we let the user decide.
            // What could go wrong - leo
            const fileReader = new FileReader();
            fileReader.onload = event =>
                window.editor.setValue(event.target.result);
            fileReader.onerror = error => console.error(error.message);
            fileReader.readAsText(file);
            alerts('File (' + file.value + ') imported.');
        } else {
            alerts('No file was selected.');
        }
    } catch (e) {
        alerts(e.message);
    }
}

function exportCode() {
    try {
        const blob = new Blob([window.editor.getValue()], {
            type: 'application/javascript'
        });
        const url = window.URL.createObjectURL(blob);
        const filename = 'jspad_file_' + Date.now() + '.js';
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.innerText = 'Download';
        a.click();
        alerts('File (' + filename + ') Exported', 'success');
    } catch (e) {
        alerts(e.message);
    }
}

function exportCodeFile(slot = '') {
    try {
        if (slot == '') {
            alerts("Selected Code doesn't exist.");
            return;
        }

        const savedJson = localStorage.getItem('jsPadSave')
            ? JSON.parse(localStorage.getItem('jsPadSave'))
            : {};
        const code = JSON.parse(savedJson[slot].toString() || '');
        const blob = new Blob([code], { type: 'application/javascript' });
        const url = window.URL.createObjectURL(blob);
        const filename = slot + '.js';
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.innerText = 'Download';
        a.click();
        alerts('File (' + filename + ') Exported', 'success');
    } catch (e) {
        alerts(e.message);
    }
}

function newSaveCode() {
    try {
        const saveName = document.getElementById('savename').value;
        if (saveName && saveName.length > 0) {
            //alerts(saveName, 'success')
            try {
                JSON.parse('{"' + saveName + '":"test"}');
                saveCode(saveName);
                document.getElementById('savename').value = '';
            } catch (error) {
                alerts(
                    'You must enter a valid savename (Use only alphanumeric Characters)',
                    'danger'
                );
            }
        } else {
            alerts(
                'You must enter a valid savename (Use only alphanumeric Characters)',
                'danger'
            );
        }
    } catch (error) {
        alerts('Error!!! ' + error.message, 'danger');
    }
}

function saveCodeMain() {
    const saveName = document.getElementById('codename').innerText;
    if (saveName && saveName.length > 0 && saveName != 'Unnamed Code') {
        saveCode(saveName);
    } else {
        document.getElementById('saveButton').click();
    }
}

function saveCode(slot = '') {
    // Put the object into storage
    if (slot == '' || slot == 'Unnamed Code') {
        alerts('You must Enter a valid save name.');
        return;
    }
    try {
        const savedJson = localStorage.getItem('jsPadSave')
            ? JSON.parse(localStorage.getItem('jsPadSave'))
            : {};
        savedJson[slot] = JSON.stringify(window.editor.getValue());
        localStorage.setItem('jsPadSave', JSON.stringify(savedJson));
        //console.log('CODE SAVED');
        alerts('Code Saved ( ' + slot + ' )', 'success');
        document.getElementById('codename').innerText = slot;
        getFileList();
    } catch (error) {
        alerts('Error!!! ' + error.message, 'danger');
    }
}

function deleteCode(slot = '') {
    // Put the object into storage
    if (slot == '') {
        return;
    }
    try {
        const savedJson = localStorage.getItem('jsPadSave')
            ? JSON.parse(localStorage.getItem('jsPadSave'))
            : {};
        delete savedJson[slot];
        localStorage.setItem('jsPadSave', JSON.stringify(savedJson));
        getFileList();
        alerts('Code Deleted ( ' + slot + ' )', 'success');
    } catch (error) {
        alerts('Error!!! ' + error.message, 'danger');
    }
}

function loadCode(slot = 'new') {
    // Retrieve the object from storage
    // document.getElementById("code").value = localStorage.getItem('code');
    // console.log(localStorage.getItem('code'));

    // document.querySelectorAll(".CodeMirror-code").forEach((c)=>c.parentNode.removeChild(c));
    // document.querySelectorAll(".CodeMirror").forEach((c)=>c.parentNode.removeChild(c));
    // colorcoding();
    // document.querySelectorAll(".cm-invalidchar").forEach((c)=>c.parentNode.removeChild(c));

    // document.getElementById("code").value = window.editor.getValue();
    try {
        const savedJson = localStorage.getItem('jsPadSave')
            ? JSON.parse(localStorage.getItem('jsPadSave'))
            : {};
        const codeOutput = JSON.parse(savedJson[slot].toString() || '');
        window.editor.setValue(codeOutput);
        console.log(codeOutput);

        //document.getElementById("code").value =
        //= JSON.stringify(window.editor.getValue())
        alerts('Code Loaded ( ' + slot + ' )', 'success');
        document.getElementById('codename').innerText = slot;
        console.log('CODE LOADED');
    } catch (error) {
        alerts(error.message);
    }
}
function clearConsole() {
    console.log('Clear Console');
    let myIframe = document.getElementById('console-log');

    //myIframe.contentWindow.document.body.innerHTML = '';
    //myIframe.contentWindow.document.body.innerText = '';
    //myIframe.contentWindow.document.head.innerHTML = '';
    //myIframe.contentWindow.document.head.innerText = '';

    myIframe.contentWindow.document.location.reload();
    myIframe.contentWindow.document.body.scrollTop =
        myIframe.contentWindow.document.body.scrollHeight;
    document.body.scrollTop = document.body.scrollHeight;
    alerts('Console Cleared.', 'success');
    //myIframe.scrollTop = myIframe.scrollHeight;
    //iFrameSetup();
}

function runCode() {
    console.log('Running Code...');
    let myIframe = document.getElementById('console-log');
    let script = myIframe.contentWindow.document.getElementById('myScript');

    if (script) {
        script.parentNode.removeChild(script);
    }

    script = myIframe.contentWindow.document.createElement('script');

    let _try = `try {`;
    //console.error(e);
    //console.trace();.replace('eval ','js_pad_script ')
    //replace('eval (eval','>>JSpad Script ').replace('(eval ','>>JSpad Script ').
    let _catch = `
} catch (e) {
	console.error(e.stack.replace(/ [(]{1}eval/g,'()').split(" at ").join("<br/>&nbsp;&nbsp;&nbsp;at "));
}`;

    //'<p class="console error"><span class="symbol">&#65310;</span> '+e+'</p>'
    script.type = 'text/javascript';
    script.setAttribute('id', 'myScript');
    // document.querySelectorAll(".cm-invalidchar").forEach((c)=>c.parentNode.removeChild(c));
    // document.getElementById("code").value = window.editor.getValue();

    //document.querySelector(".CodeMirror-code").innerText;

    //script.textContent = _try + 'console.log(eval(`'+document.getElementById("code").value.replace('`','\`').replace(/[\u0000-\u0008\u0010-\u0019\u00ad\u200b-\u200f\u2028\u2029\ufeff]/g,' ') +'`))'+ _catch;

    console.log(window.editor.getValue().replace(/`/g, '\\`'));
    //script.textContent = _try + 'console.log(eval(`'+window.editor.getValue().replace(/`/g,'\\`')+'`))'+ _catch;
    alerts('Excuting code...', 'primary');
    script.textContent =
        'console.log(eval(`' +
        _try +
        window.editor.getValue().replace(/`/g, '\\`') +
        _catch +
        '`))';
    myIframe.contentWindow.document.head.appendChild(script);
    myIframe.contentWindow.document.body.scrollTop =
        myIframe.contentWindow.document.body.scrollHeight;
    alerts('Code excuted.', 'success');
}
function colorcoding() {
    //codeHighlighter(document.getElementById("code"));

    var ua = navigator.userAgent;
    //Opera Mini refreshes the page when trying to edit the textarea.
    if (ua && ua.toUpperCase().indexOf('OPERA MINI') > -1) {
        return false;
    }
    window.editor = CodeMirror.fromTextArea(document.getElementById('code'), {
        mode: 'javascript',
        lineNumbers: true
    });
}

function alerts(msg, type = 'danger') {
    try {
        const notificationDiv = `
<div class="alert alert-${type} alert-dismissible fade show" role="alert">
  ${msg}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
	`;
        document.querySelector('.alerts').innerHTML = '';
        document.querySelector('.alerts').innerHTML = notificationDiv;

        setTimeout(() => {
            document.querySelector('.alerts').innerHTML = '';
        }, 2000);
    } catch (error) {
        alert(msg);
    }
}
