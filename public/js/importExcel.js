
/*jshint browser:true */
/*global XLSX */
var X = XLSX;
var XW = {
    /* worker message */
    msg: 'xlsx',
    /* worker scripts */
    rABS: '/js/xlsx/xlsxworker2.js',
    norABS: '/js/xlsx/xlsxworker1.js',
    noxfer: '/js/xlsx/xlsxworker.js'
};

// READ DATA  //

var rABS = typeof FileReader !== "undefined" && typeof FileReader.prototype !== "undefined" && typeof FileReader.prototype.readAsBinaryString !== "undefined";
if(!rABS) {
    document.getElementsByName("userabs")[0].disabled = true;
    document.getElementsByName("userabs")[0].checked = false;
}

var use_worker = typeof Worker !== 'undefined';
if(!use_worker) {
    document.getElementsByName("useworker")[0].disabled = true;
    document.getElementsByName("useworker")[0].checked = false;
}

var transferable = use_worker;
if(!transferable) {
    document.getElementsByName("xferable")[0].disabled = true;
    document.getElementsByName("xferable")[0].checked = false;
}

var wtf_mode = false;

function fixdata(data) {
    var o = "", l = 0, w = 10240;
    for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
    o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
    return o;
}

function ab2str(data) {
    var o = "", l = 0, w = 10240;
    for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint16Array(data.slice(l*w,l*w+w)));
    o+=String.fromCharCode.apply(null, new Uint16Array(data.slice(l*w)));
    return o;
}

function s2ab(s) {
    var b = new ArrayBuffer(s.length*2), v = new Uint16Array(b);
    for (var i=0; i != s.length; ++i) v[i] = s.charCodeAt(i);
    return [v, b];
}

function xw_noxfer(data, cb) {
    var worker = new Worker(XW.noxfer);
    worker.onmessage = function(e) {
        switch(e.data.t) {
            case 'ready': break;
            case 'e': console.error(e.data.d); break;
            case XW.msg: cb(JSON.parse(e.data.d)); break;
        }
    };
    var arr = rABS ? data : btoa(fixdata(data));
    worker.postMessage({d:arr,b:rABS});
}

function xw_xfer(data, cb) {
    var worker = new Worker(rABS ? XW.rABS : XW.norABS);
    worker.onmessage = function(e) {
        switch(e.data.t) {
            case 'ready': break;
            case 'e': console.error(e.data.d); break;
            default: xx=ab2str(e.data).replace(/\n/g,"\\n").replace(/\r/g,"\\r"); console.log("done"); cb(JSON.parse(xx)); break;
        }
    };
    if(rABS) {
        var val = s2ab(data);
        worker.postMessage(val[1], [val[1]]);
    } else {
        worker.postMessage(data, [data]);
    }
}

function xw(data, cb) {
    transferable = document.getElementsByName("xferable")[0].checked;
    if(transferable) xw_xfer(data, cb);
    else xw_noxfer(data, cb);
}

function get_radio_value( radioName ) {
    var radios = document.getElementsByName( radioName );
    for( var i = 0; i < radios.length; i++ ) {
        if( radios[i].checked || radios.length === 1 ) {
            return radios[i].value;
        }
    }
}

// TRANSFORM TO JSON FORMAT //

function to_json(workbook) {
    var result = {};
    workbook.SheetNames.forEach(function(sheetName) {
        var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        if(roa.length > 0){
            result = roa;
            console.log("Result first: " + result[0].company);
            //result[sheetName] = roa;
        }
    });
    return result;
}


// CHANGE FORMAT OF OUTPUT AND PRINT OUTPUT //
var global_wb;
function process_wb(wb) {
    global_wb = wb;
    var output = "";
    switch("json"/*get_radio_value("format")*/) {
        case "json":
            output = to_json(wb);//JSON.stringify(to_json(wb), 2, 2);
            break;
        case "form":
            output = to_formulae(wb);
            break;
        default:
            output = to_csv(wb);
    }
    console.log("Output: " + output);
    console.log("Output length: " + output.length);

    for (i = 0; i < output.length; i++) {

        counter++;

        $('#no').append(
            "<div class='row'>" +
            "<div class='col-md-1'><input class='index' type='text' name='number' value='"+counter+"' readonly></div>" +
            "<input class='input-short' type='hidden' name='email' value='" + output[i].email + "' readonly>" +
            "<div class='col-md-2'><input class='input-medium' type='text' name='first_name' value='" + output[i].first_name + "'  readonly></div>" +
            "<div class='col-md-3'><input class='input-medium' type='text' name='last_name' value='" + output[i].last_name + "'  readonly></div>" +
            "<div class='col-md-4'><i class='fa fa-envelope-o' title='" + output[i].email + "'></i>&nbsp &nbsp<i class='fa fa-briefcase' title='" + output[i].job_title + "'></i>&nbsp &nbsp<i class='fa fa-building-o' title='" + output[i].company + "'></i>&nbsp &nbsp<i class='fa fa-users' title='" + output[i].department + "'></i></div>" +
            "<input class='input-medium' type='hidden' name='job_title' value='" + output[i].job_title + "' required>" +
            "<input class='input-medium' type='hidden' name='company' value='" + output[i].company + "' readonly>" +
            "<input class='input-medium' type='hidden' name='department' value='" + output[i].department + "' readonly>" +
            "<div class='col-md-2'><div align='center'><a class='action-icons'><i class='fa fa-trash-o fa-lg' id='delete'></i></a></div></div>" +
            "</div>"
        );
    }

    document.getElementById("number_evaluers").value = counter;
    document.getElementById("start-msg").remove();
    $('#import-modal').modal('hide');
}
function setfmt() {if(global_wb) process_wb(global_wb); }


// TRANSFORM FILE FROM DROP FIELD //
var drop = document.getElementById('drop');
function handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    rABS = document.getElementsByName("userabs")[0].checked;
    use_worker = document.getElementsByName("useworker")[0].checked;
    var files = e.dataTransfer.files;
    var f = files[0];
    {
        var reader = new FileReader();
        var name = f.name;
        reader.onload = function(e) {
            if(typeof console !== 'undefined') console.log("onload", new Date(), rABS, use_worker);
            var data = e.target.result;
            if(use_worker) {
                xw(data, process_wb);
            } else {
                var wb;
                if(rABS) {
                    wb = X.read(data, {type: 'binary'});
                } else {
                    var arr = fixdata(data);
                    wb = X.read(btoa(arr), {type: 'base64'});
                }
                process_wb(wb);
            }
        };
        if(rABS) reader.readAsBinaryString(f);
        else reader.readAsArrayBuffer(f);
    }
}

function handleDragover(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
}

if(drop.addEventListener) {
    drop.addEventListener('dragenter', handleDragover, false);
    drop.addEventListener('dragover', handleDragover, false);
    drop.addEventListener('drop', handleDrop, false);
}

// TRANSFORM FILE FROM CHOOSE FILE //
var xlf = document.getElementById('xlf');
function handleFile(e) {
    rABS = document.getElementsByName("userabs")[0].checked;
    use_worker = document.getElementsByName("useworker")[0].checked;
    var files = e.target.files;
    var f = files[0];
    {
        var reader = new FileReader();
        var name = f.name;
        reader.onload = function(e) {
            if(typeof console !== 'undefined') console.log("onload", new Date(), rABS, use_worker);
            var data = e.target.result;
            if(use_worker) {
                xw(data, process_wb);
            } else {
                var wb;
                if(rABS) {
                    wb = X.read(data, {type: 'binary'});
                } else {
                    var arr = fixdata(data);
                    wb = X.read(btoa(arr), {type: 'base64'});
                }
                process_wb(wb);
            }
        };
        if(rABS) reader.readAsBinaryString(f);
        else reader.readAsArrayBuffer(f);
    }
}

if(xlf.addEventListener) xlf.addEventListener('change', handleFile, false);


