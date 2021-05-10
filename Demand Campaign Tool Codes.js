
//Sheet method
function onOpen(e) {
  // Logger.log('Allen is the best');
  //Create Menu
 
  ui= SpreadsheetApp.getUi()
      .createMenu('Management API Start')
      .addItem('Create UI','createUI')
      .addItem('Generate Token','GenerateToken')
      .addItem('Bid Operation Run','bidOperationRun')
      .addItem('Budget Operation Run','budgetOperationRun')
      .addToUi();

   
}

function createUI(){
  //Create Ui
  var activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  activeSheet.setColumnWidth(1,250)
  activeSheet.setColumnWidth(2,250)
  activeSheet.setColumnWidth(6,150)
  activeSheet.setColumnWidth(7,250)
  activeSheet.setColumnWidth(8,250)
  activeSheet.setColumnWidth(12,450)
  activeSheet.setColumnWidth(13,250)
  activeSheet.setRowHeight(6,100)
  activeSheet.getRange("A1:F1").merge().setValue("Before You Begin ").setBackgroundRGB(221, 136, 17).setFontSize(14).setHorizontalAlignment("center").setVerticalAlignment("middle")
  activeSheet.getRange("A2:F2").merge().setValue("Please enter your secret key and refresh token here:").setFontSize(14).setHorizontalAlignment("center").setVerticalAlignment("middle")
  activeSheet.getRange("A3").setValue("secret key").setHorizontalAlignment("center").setVerticalAlignment("middle")
  activeSheet.getRange("A4").setValue("refresh token").setHorizontalAlignment("center").setVerticalAlignment("middle")
  activeSheet.getRange("B3:F3").merge().setBorder(true, true, true, true, true, true, "black", SpreadsheetApp.BorderStyle.SOLID_MEDIUM).setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP)
  activeSheet.getRange("B4:F4").merge().setBorder(true, true, true, true, true, true, "black", SpreadsheetApp.BorderStyle.SOLID_MEDIUM).setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP)
  activeSheet.getRange("A3:A4").setBorder(true, true, true, true, true, true, "black", SpreadsheetApp.BorderStyle.SOLID_MEDIUM)
  activeSheet.getRange("A5:F5").merge().setValue("Click \"GenerateToken\" which is under \"Managerment API Start\" in the menu bar").setFontSize(14).setHorizontalAlignment("center").setVerticalAlignment("middle").setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP)
  activeSheet.getRange("A6").setBorder(true, true, true, true, true, true, "black", SpreadsheetApp.BorderStyle.SOLID_MEDIUM).setHorizontalAlignment("center").setVerticalAlignment("middle").setValue("Bearer Token")
  activeSheet.getRange("B6:F6").merge().setBorder(true, true, true, true, true, true, "black", SpreadsheetApp.BorderStyle.SOLID_MEDIUM).setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP)
  activeSheet.getRange("A7:M7").merge().setValue("Let's do it!").setBackgroundRGB(221, 136, 17).setFontSize(18).setHorizontalAlignment("center").setVerticalAlignment("middle")
  activeSheet.getRange("A8:F8").merge().setValue("The Range of  pending list \n1.Please add your  pending list  to the below range. \n2.Select the data range where need to be operated \n3.Click the \"Bid Operation Run\" which is under the \"Managerment API Start\" in the menu bar").setFontSize(14).setHorizontalAlignment("left").setVerticalAlignment("middle").setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP).setBorder(true, true, true, true, true, true, "black", SpreadsheetApp.BorderStyle.SOLID_MEDIUM).setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP)
  activeSheet.getRange("H8:K8").merge().setValue("The Range of  pending list \n1.Please add your  pending list  to the below range. \n2.Select the data range where need to be operated \n3.Click the \"Budget Operation Run'\" which is under the \"Managerment API Start\" in the menu bar").setFontSize(14).setHorizontalAlignment("left").setVerticalAlignment("middle").setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP).setBorder(true, true, true, true, true, true, "black", SpreadsheetApp.BorderStyle.SOLID_MEDIUM).setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP)
  var initValuesArray=[["campaign_id","pub_app_id","pub_name","geo","rate","update_or_delete","status","campaign_id","campaign_bid","daily_budget","total_budget","Campaign_bid_type (only 'install' is allowed)","status"]]
  activeSheet.getRange("A9:M9").setBorder(true, true, true, true, true, true, "black", SpreadsheetApp.BorderStyle.SOLID).setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP).setValues(initValuesArray).setHorizontalAlignment("center").setVerticalAlignment("middle").setBackgroundRGB(238, 238, 0);
}

//API method
function getTokenThroughAPI(sceretKey,refreshToken) {
  const endPoint = "https://manage-ext.api.vungle.com/generate"
  const headers = {
    'secret-key' : sceretKey,
    'refresh-token' : refreshToken
  }
   var token =  getFunc(endPoint,headers)
  console.log(" method :getTokenThroughAPI   bearerToken :::::"+token)
  return token
}




function UpdateInsertBidThroughAPI(i,campaignId,data,bearerToken) {
  const endPoint = "https://manage-ext.api.vungle.com/campaigns/"+campaignId+"/multibidding"
  var promise =  postFunc(endPoint,data,bearerToken)
  promise.then((data) => {
        if(data="success"){
        var activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        activeSheet.getRange(i+10,7).setBackgroundRGB(0,200,0)
        activeSheet.getRange(i+10,7).setValue("success")
        }
    }).catch((err)=>{
       var activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        activeSheet.getRange(i+10,7).setBackgroundRGB(200,0,0)
        activeSheet.getRange(i+10,7).setValue(err)
    });
  console.log(" method :UpdateInsertBidThroughAPI   endPoint :::::"+endPoint)

}


 function DeleteBidThroughAPI(i,campaignId,data,bearerToken) {
  const endPoint = "https://manage-ext.api.vungle.com/campaigns/"+campaignId+"/multibidding"
  var promise =  DeleteFunc(endPoint,data,bearerToken)
  promise.then((data) => {
        if(data="success"){
        var activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        activeSheet.getRange(i+10,7).setBackgroundRGB(0,200,0)
        activeSheet.getRange(i+10,7).setValue("success")
        }
    }).catch((err)=>{
       var activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        activeSheet.getRange(i+10,7).setBackgroundRGB(200,0,0)
        activeSheet.getRange(i+10,7).setValue(err)
    });
  console.log(" method :DeleteBidThroughAPI   endPoint :::::"+endPoint)
}

   function  SetBudgetThroughAPI(i,campaignId,data,bearerToken) {
  const endPoint = "https://manage-ext.api.vungle.com/campaigns/"+campaignId+"/budget"
  const promise =   PutFunc(endPoint,data,bearerToken)
  promise.then((data) => {
        if(data="success"){
        console.log(" method :SetBudgetThroughAPI   endPoint  insideinside :::::"+endPoint)
        var activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        activeSheet.getRange(i+10,13).setBackgroundRGB(0,200,0)
        activeSheet.getRange(i+10,13).setValue("success")
        }
    }).catch((err)=>{
       var activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        activeSheet.getRange(i+10,13).setBackgroundRGB(200,0,0)
        activeSheet.getRange(i+10,13).setValue(err)
    });
  console.log(" method :SetBudgetThroughAPI   endPoint  endend :::::"+endPoint)

}



//GET 
const getFunc =  (url,headers) => {
  const options = {
    'method' : 'get',
    'headers' : headers
  }
  const res = UrlFetchApp.fetch(url,options)
  console.log("res"+res.getResponseCode());
  const resJson = JSON.parse(res.getContentText());
  var bearerToken=resJson["token"];
  
  return bearerToken
}



//Post
const postFunc =  (url,data,bearerToken) => {
  return new Promise((resolve,reject)=>{
	const headers = {
    'vungle-version': 1,
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ bearerToken
  }
  const options = {
    'method' : 'post',
    'Content-Type': 'application/json',
    'headers' : headers,
    'payload' : data
  }

     const res = UrlFetchApp.fetch(url,options)
     resolve('success') 
    Logger.log("code: " + result.getResponseCode());
    Logger.log("text: " + result.getContentText());
	})
}

//Delete
const DeleteFunc =  (url,data,bearerToken) => {

    return new Promise((resolve,reject)=>{
	const headers = {
    'vungle-version': 1,
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ bearerToken
  }
  const options = {
    'method' : 'delete',
    'Content-Type': 'application/json',
    'headers' : headers,
    'payload' : data
  }
     const res = UrlFetchApp.fetch(url,options)
     resolve('success') 
    Logger.log("code: " + result.getResponseCode());
    Logger.log("text: " + result.getContentText());
	})
}
//Put

  const  PutFunc =  (url,data,bearerToken) => {
 
  return new Promise((resolve,reject)=>{
	const headers = {
    'vungle-version': 1,
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ bearerToken
  }
  const options = {
    'method' : 'put',
    'Content-Type': 'application/json',
    'headers' : headers,
    'payload' : data
  }

     const res = UrlFetchApp.fetch(url,options)
     resolve('success') 

    Logger.log("code: " + result.getResponseCode());
    Logger.log("text: " + result.getContentText());
	})
}


//Menu method


/*  json templete
{
  "publisher_rates": [
    {
      "pub_app_id": "5df0a8838d9ee70011ddbfb0",
      "name": "Fun game 1",
      "geo": "CN",
      "rate": 0.22
    },
    {
      "pub_app_id": "5df0a8838d9ee70011ddbfb0",
      "name": "Fun game 2",
      "geo": "ID",
      "rate": 0.33
    }
  ]
}
*/


/*
{
  "budget": {
    "bid": 20.50,
    "daily": 10000,
    "total": 1000000,
    "type": "install"
  }
}*/



function GenerateToken(){ 
  var activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var sceretKey=activeSheet.getRange("B3:F3").getValue().toString();
  var refreshToken=activeSheet.getRange("B4:F4").getValue().toString();
  
  Logger.log('method-GenerateToken sceretKey: '+sceretKey);
  Logger.log('method:GenerateToken refreshToken: '+refreshToken);
  var bearerToken=getTokenThroughAPI(sceretKey,refreshToken);
  activeSheet.getRange("B6:F6").setValue(bearerToken);
   Logger.log('method-GenerateToken bearerToken: '+bearerToken);
}






function UpdateInsertBid(i,campaignId,jsonBody){
 var activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var bearerToken=activeSheet.getRange("B6:F6").getValue();
  Logger.log('method-UpdateInsertBid bearerToken: '+bearerToken);
 if(bearerToken!=null&&bearerToken!=""){
     Logger.log('method-UpdateInsertBid jsonBody: '+jsonBody);
   if(jsonBody!=null&&jsonBody!=""){
         UpdateInsertBidThroughAPI(i,campaignId,jsonBody,bearerToken);
   }  
 }
}

 function DeleteBid(i,campaignId,jsonBody){
 var activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var bearerToken=activeSheet.getRange("B6:F6").getValue();
  Logger.log('method-DeleteBid bearerToken: '+bearerToken);
 if(bearerToken!=null&&bearerToken!=""){
     Logger.log('method-DeleteBid jsonBody: '+jsonBody);
   if(jsonBody!=null&&jsonBody!=""){
       DeleteBidThroughAPI(i,campaignId,jsonBody,bearerToken);
   }  
 }
}


 function SetBudget(i,campaignId,jsonBody){
 var response
 var activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var bearerToken=activeSheet.getRange("B6:F6").getValue();
  Logger.log('method-SetBudget bearerToken: '+bearerToken);
 if(bearerToken!=null&&bearerToken!=""){
     Logger.log('method-SetBudget jsonBody: '+jsonBody);
   if(jsonBody!=null&&jsonBody!=""){
      SetBudgetThroughAPI(i,campaignId,jsonBody,bearerToken);
   }  
 }
}


//Tools

 function   bidOperationRun(){
  var activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var jsonarray=activeSheet.getActiveRange().getValues();
  activeSheet.getRange(10,7,500).clear();
  Logger.log('method-bidOperationRun jsonarray: '+jsonarray);
  for (var i=0,len=jsonarray.length; i<len; i++)
{ 
    activeSheet.getRange(i+10,7).setBackgroundRGB(205,127,50)
    activeSheet.getRange(i+10,7).setValue("running")
    //获取campaignID
      var campaignId=jsonarray[i][0];
      var tagRun=jsonarray[i][5];
      var jsonBodyArray=[[jsonarray[i][1],jsonarray[i][2],jsonarray[i][3],jsonarray[i][4]]]
      Logger.log('method-bidOperationRun jsonBodyArray: '+jsonBodyArray)
      Logger.log('method-bidOperationRun campaignId: '+campaignId);
      Logger.log('method-bidOperationRun tagRun: '+tagRun);
      var result1 = JSON.stringify(jsonBodyArray.map(([a,b,c,d]) => ({pub_app_id: a,name:b,geo:c,rate:d})));
      var result2="{\"publisher_rates\":"+result1+"}";
      Logger.log('method-bidOperationRun jsonBody: '+result2);
      if(tagRun=="update"){
         UpdateInsertBid(i,campaignId,result2)
        
        // var responseArrar=response.split(':');
        // activeSheet.getRange(i+10,7).setBackgroundRGB(0,200,0)
        // activeSheet.getRange(i+10,7).setValue(response)
        // Logger.log('method-bidOperationRun response: '+response);
      }else if(tagRun=="delete"){
          DeleteBid(i,campaignId,result2)
      }
    }
}




function  budgetOperationRun(){

   var activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var jsonarray=activeSheet.getActiveRange().getValues();
  activeSheet.getRange(10,13,500).clear();
  Logger.log('method-budgetOperationRun jsonarray: '+jsonarray);
  for (var i=0,len=jsonarray.length; i<len; i++)
{ 
    //获取campaignID
     activeSheet.getRange(i+10,13).setBackgroundRGB(205,127,50)
     activeSheet.getRange(i+10,13).setValue("running")
      var campaignId=jsonarray[i][0];
      var jsonBodyArray=[[jsonarray[i][1],jsonarray[i][2],jsonarray[i][3],jsonarray[i][4]]]
      Logger.log('method-budgetOperationRun jsonBodyArray: '+jsonBodyArray)
      Logger.log('method-budgetOperationRun campaignId: '+campaignId);
      var result1 = JSON.stringify(jsonBodyArray.map(([a,b,c,d]) => ({bid: a,daily:b,total:c,type:"install"})));
      var result2="{\"budget\":"+result1+"}";
      //去掉中括号，暂时想不到其他方法。
      var result2=result2.split("[").join("");
      var result2=result2.split("]").join("");
      Logger.log('method-budgetOperationRun jsonBody: '+result2);
     SetBudget(i,campaignId,result2)
    }
}



