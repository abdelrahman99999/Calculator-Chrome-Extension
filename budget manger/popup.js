chrome.storage.sync.get(['total','limit'],function(budjet){
    if(budjet.total){
        document.getElementById("total").innerHTML= budjet.total;
    }else{
        document.getElementById("total").innerHTML=0;
    }
    if(budjet.limit){
        document.getElementById("limit").innerHTML= budjet.limit;
    }else{
        document.getElementById("limit").innerHTML=0;
    }
    
})

document.getElementById("spendamount").addEventListener("click",function(){
    chrome.storage.sync.get(['total','limit'],function(budjet){
        var newtotal=0;
        if(budjet.total){ //if ther is any old value in chrome storage 
            newtotal+=parseInt(budjet.total);
            //newtotal=old value
            //else--> newtotal=0
        }

        var amount=document.getElementById("amount").value;
        if(amount){
            newtotal+=parseInt(amount);
        }
        chrome.storage.sync.set({'total': newtotal },function(){
            if (amount && newtotal >= budjet.limit){
                var notifOption = {
                    type:"basic",
                    iconUrl:"icon48.png",
                    title:"limit reached",
                    message:"uh oh! looks you have reached the limit"
                };
                chrome.notifications.create('limitNotif', notifOption );
                chrome.notifications.clear('limitNotif');
            }
        } );
        document.getElementById("total").innerHTML=newtotal;
        document.getElementById("amount").value="";
    });
});