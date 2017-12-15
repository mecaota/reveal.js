function getURLparam(pair){
    var arg = new Object;
    for(var i = 0;pair[i];i++) {
        var kv = pair[i].split('=');
        arg[kv[0]] = kv[1];
    }
    return arg;
}

function getInfo(callback){
    var arg = getURLparam(location.search.substring(1).split('&'));
    ///プロフィールAPI(自作GASアプリ)より取得
    var url = "https://script.google.com/macros/s/AKfycbw8N3XY7HGnrr4uB2nyDCy4gmrxFBM2SjvE19d_R6w4_VeCIEw/exec";
    var param = {};
    param["mode"]=arg["mode"];
    param = JSON.stringify(param);
    return fetch(url,{
        method: 'POST',
        mode: 'cors',
        body: param
    }).then(function(response) {
        return response.text();
    }).then(function(json) {
        var json = JSON.parse(json||"null");
        return json;
    }).then(json => createDom(json)
    ).then(function(json){
        fetch(json["slideurl"]).then(function(response) {
            return response.text();
        }).then(function(slidebody){
            document.getElementById("slideurl").insertAdjacentHTML("beforeend", ""+ slidebody +"");
            return true;
        }).then(callback);
    });
    return true;
}

function selectDom(key, value){
    ///各メタデータ配置箇所のclass要素をget
    var domList = document.getElementsByClassName(key);
    return Promise.all(Object.keys(domList).map(function (i) {
        if(key == "image"){
            domList.item(i).insertAdjacentHTML("beforeend", "<img alt='こ↑こ↓僕のサムネ' style='height:20rem;' src='"+ value +"'></img>");
        }else if(key == "url"){
            domList.item(i).insertAdjacentHTML("beforeend", ""+ value+ "");
            domList.item(i).href = value;
        }else{
            domList.item(i).insertAdjacentHTML("beforeend", ""+ value +"");
        }
    }));
}

function createDom(meta_json){
    //json内のキーを探査して、キーと同値のクラスへdom書き込み
    return Promise.all(Object.keys(meta_json).map(function(key){
        return selectDom(key, meta_json[key]);
    })).then(function(){
        return meta_json;
    });
}
