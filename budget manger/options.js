chrome.storage.sync.get('limit',function(budget){
    if(budget.limit){
        document.getElementById('limit').value = budget.limit;
    }else{
        chrome.storage.sync.set({'limit':0});
    }

})


document.getElementById('savelimit').addEventListener("click",function(){
    var limit=document.getElementById('limit').value;
    if(limit){
        chrome.storage.sync.set({'limit':limit},function(){
            close();
        })
    }
})
document.getElementById('resettotal').addEventListener("click",function(){
    chrome.storage.sync.set({'total':0});
    chrome.storage.sync.get('total',function(budjet){
        if(budjet.total==0){
        var notifOption = {
            type:"basic",
            iconUrl:"icon48.png",
            title:"total reset",
            message:"total has been reset to 0"
        };
        chrome.notifications.create('limitNotif1', notifOption );
        chrome.notifications.clear('limitNotif1');
         }
    });

    setTimeout(() => {
        close();
    }, 200);
    
    });
    