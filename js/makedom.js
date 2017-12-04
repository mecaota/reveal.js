function getURLparam(pair){
    var arg = new Object;
    for(var i = 0;pair[i];i++) {
        var kv = pair[i].split('=');
        arg[kv[0]] = kv[1];
    }
    console.log(arg);
    return arg;
}

function selectDom(key, value){
    ///各メタデータ配置箇所のclass要素をget
    var domList = document.getElementsByClassName(key);
    console.log("selectDom内" + key + ":" + domList);
    return Promise.all(Object.keys(domList).map(function (i) {
        if(key == "image"){
            domList.item(i).insertAdjacentHTML("beforeend", "<img alt='こ↑こ↓僕のサムネ' style='height:20rem;' src='"+ value +"'></img>");
        }else if(key == "url"){
            domList.item(i).insertAdjacentHTML("beforeend", ""+ value+ "");
            domList.item(i).href = value;
        }else{
            domList.item(i).insertAdjacentHTML("beforeend", ""+ value +"");
        }
    })).then(console.log("selectDom finish"));
}

function createDom(meta_json){
    //json内のキーを探査して、キーと同値のクラスへdom書き込み
    console.log("createDOM");
    return Promise.all(Object.keys(meta_json).map(function(key){
        return selectDom(key, meta_json[key]);
    }));
}
