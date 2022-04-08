import $ from 'jquery'


export function PostData(url,data) {
    let result=[];
    $.ajax({
        type: "POST",
        contentType: "application/json",
        data: data ? JSON.stringify({json: {...data}}) :undefined,
        url: url,
        async: false,
       
    })
    .done(function(json){
        result=json;
    })

    return result;

}