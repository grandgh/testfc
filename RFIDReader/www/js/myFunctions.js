
/* ID CARD1 = 802A3F5A4A0404 */
/* ID CARD2 = F514D3EB*/


var multySelect = null;
var dataCardSessionID = null;
var dataCardID = null;
var userID = null, sessionHash = null;
//var tl= null;




function restartProg(){
    
multySelect = null;
dataCardSessionID = null;
dataCardID = null;    
    $("#btnSend").hide();
    getDataStore();
    stopEventRFID();
    myEventRFID(); 
    dbN();
    carN();
    cardN();
     $("#initStr").text("Готов считывать карточку!!!");
    

    
    
}


function getDataStore(){
    
   
var dateIn = null;
    

multySelect = $('#nameItem').multiselect(); 
    console.log("Local Data", localData);
   
    $.ajax({
  method: "POST",
  url: 'http://entryapps.foodcity.ru/operator/getinfo',
  data: { sec: "LdEcgfk;C5~G8we",user_id: userID }
})
  .done(function( msg ) {
        
        
        
       // console.log('Msg data = ',msg);
        
        clearListInput();
         wifiOn();
        
        
      if (msg != 'авторизация не прошла')  {
          

        
   
        var objMsg = JSON.parse(msg);
        
            //console.log('data places = ',objMsg.podiums);
        $("#typeAutoNum").append( " <option value= ''>Выберите тип номера</option>" ); // Справочник типов номеров Авто
        $("#countryUse").append( " <option value= ''>Выберите страну</option>" ); // Справочник Стран
        $("#numStore").append( " <option value= ''>Выберите склад</option>" ); // Спарвочник Складов
        $.each(objMsg, function (index, value) {
           // console.log("Index = ",index,"Значение = ",value);

              $.each(value, function (index2, value2) {
                 if(index == 'floors')  { 
                    $("#numStore").append( " <option value="+value2.Id+">"+value2.Name+"</option>" ); // Спарвочник Складов
                    //console.log("Index2 = ",index2," || № Склада = ",value2.Name," || ID Склада = ",value2.Id); 
                                        }
                  if(index == 'goodstypes')  { 
                    $("#nameItem").append( " <option value="+value2.Id+">"+value2.Name+"</option>" ); // Справочник товаров
                  
                    
                                        }
                  if(index == 'countries')  { 
                    $("#countryUse").append( " <option value="+value2.Id+">"+value2.Name+"</option>" ); // Справочник Стран
                    
                                        }
                 if(index == 'types')  { 
                    $("#typeAutoNum").append( " <option value="+index2+">"+index2+" : "+value2+"</option>" ); // Справочник типов номеров Авто
                     //console.log("Index2 = ",index2," || Тип номера = ",value2); 
                     
                                        }
                  
            }); 
            
            });
          
          //console.log("MultySelect var = ", multySelect);
          multySelect.multiselect('rebuild');
          inputDisable (); 
          //fillSelect(objMsg, 4);
                $( "#numStore" ).change(function() {
                    var selectFloor = $(this).val();
                    console.log( "Смена склада => ", selectFloor);
                     $("#numPlace").html("");
                     fillSelect(objMsg, selectFloor);

                    });

                    $(function () {
                      dateIn = $('#datetimepicker2').datetimepicker({
                            locale: 'ru'
                        });
                    });        
                    $("#datetimepicker2").on("dp.change", function(e) {
                         //alert('hey');
                        console.log( "Data => ", e.date.format('dddd, MMMM Do YYYY, HH:mm'));
                        console.log( "Data X => ", e.date.format('X'));
                    });
          
                                 
          
                    }
        
         else {
              showPush('Секретный код сменился', 'error' );
                  
        }
        
        
  })
    .error (function(errmsg){
         wifiOff();
        //alert( "Ошибка загрузки данных! Введите номер вручную и сохраните данные на авто."); 
        showPush('Ошибка загрузки данных! Возможно нет связи с сервером!', 'error' );
            
        inputDisable ();        
        clearListInput();
        
        //$("#numAuto").attr('placeholder','Введите номер авто вручную');
        
        var objMsg = localData;
        
            console.log('data places = ',objMsg.podiums);
        
        $("#typeAutoNum").append( " <option value= ''>Выберите тип номера</option>" ); // Справочник типов номеров Авто
        $("#countryUse").append( " <option value= ''>Выберите страну</option>" ); // Справочник Стран
        $("#numStore").append( " <option value= ''>Выберите склад</option>" ); // Спарвочник Складов
        $.each(objMsg, function (index, value) {
            //console.log("Index = ",index,"Значение = ",value);

              $.each(value, function (index2, value2) {
                 if(index == 'floors')  { 
                    $("#numStore").append( " <option value="+value2.Id+">"+value2.Name+"</option>" ); // Спарвочник Складов
                    //console.log("Index2 = ",index2," || № Склада = ",value2.Name," || ID Склада = ",value2.Id); 
                                        }
                  if(index == 'goodstypes')  { 
                    $("#nameItem").append( " <option value="+value2.Id+">"+value2.Name+"</option>" ); // Справочник товаров
                  
                    
                                        }
                  if(index == 'countries')  { 
                    $("#countryUse").append( " <option value="+value2.Id+">"+value2.Name+"</option>" ); // Справочник Стран
                    
                                        }
                 if(index == 'types')  { 
                    $("#typeAutoNum").append( " <option value="+index2+">"+index2+" : "+value2+"</option>" ); // Справочник типов номеров Авто
                     //console.log("Index2 = ",index2," || Тип номера = ",value2); 
                     
                                        }
                  
            }); 
            
            }); 
         multySelect.multiselect('rebuild');
        //fillSelect(objMsg, 4);
        
        
        $( "#numStore" ).change(function() {
            var selectFloor = $(this).val();
            console.log( "Смена склада => ", selectFloor);
             $("#numPlace").html("");
             fillSelect(objMsg, selectFloor);
            
            });
        
            $(function () {
              dateIn = $('#datetimepicker2').datetimepicker({
                    locale: 'ru'
                });
            });        
$("#datetimepicker2").on("dp.change", function(e) {
     //alert('hey');
    console.log( "Data => ", e.date.format('dddd, MMMM Do YYYY, HH:mm'));
    console.log( "Data X => ", e.date.format('X'));
});        
        
        //alert( "ERROR SEND: " + errmsg );

        
        
    });  
    
    
}


function fillSelect(objMsgData, idFloor){
    $("#numPlace").append( " <option  value= ''>Выберите место</option>" ); // Спарвочник Складов
                  $.each(objMsgData.podiums, function (index, value) {
                      $.each(value, function (index2, value2) {
                     // console.log("Индекс = ",index2," || № Места = ",value2," || Этаж = ",value2.FloorId); 
                    if(value2.FloorId == idFloor)  { 
                    $("#numPlace").append( " <option  value="+value2.UId+">"+value2.Name+"</option>" );
                    //console.log("Индекс = ",index2," || № Места = ",value2.Name," || Этаж = ",value2.FloorId); 
                                        }
                  
                  
                        }); 
                }); 

    
    
    
}







 function myEventRFID() {
     
var tempArr = [-21,-45,20,-11];


    console.log('Start');
     chkNFCReady();
       nfc.addNdefFormatableListener(function(nfcEvent)
                                     {

        var tag = nfcEvent.tag;
        var textHEXIDCard = convertID(nfcEvent.tag.id);
       sendNumCard(textHEXIDCard);
 },
                function() {
                    //showPush('Приложите карточку к тыльной стороне смртфона', 'success' );
                    //$("#initStr").text("Готов считывать карточку!!!");
                    //alert("Listening for non-NDEF tags.");
                },
                noConnect()
                
            );

 }



function chkNFCReady(){
    nfc.enabled(function(ev){
        $("#nfcOnOff").attr('src','images/nfc-on.png');
        
    }, 
                function(err){
        
        //alert('Сбой работы модуля считывания карточки: '+ err);
        showPush('Сбой работы модуля считывания карточки: '+ err , 'error' );
        $("#nfcOnOff").attr('src','images/nfc-off.png');
        nfc.showSettings();
        
    }
               );
    
}

 function myNDEFEventRFID() {
    console.log('Start');
    $("#initCard").text("Загрузка!!!");
        nfc.addNdefFormatableListener(function(nfcEvent)
                                     {
        $("#initStr").text("OK! Считали!!!"); 
        //alert("DATA = "+JSON.stringify(nfcEvent.tag));
        var tag = nfcEvent.tag;
        $("#initStr2").html(JSON.stringify(nfcEvent.tag)); 
        $("#initCard").html('DATA CARD = '+tag.serialNumber);
 },
                function() {
                    $("#initStr").text("Готов считывать!!!");
                    //alert("Listening for non-NDEF tags.");
                },
                noConnect()
                
            );

 }


function stopEventRFID() {
    $("#initStr").text("STOP Event RFID");
    
    nfc.removeTagDiscoveredListener(function(nfcEvent)
                                     {
        $("#initStr").html("Остановили считывание!!!"); 
      
        
 }
                          );
    
}

    function onNfc(nfcEvent) {
        alert("",nfcEvent);
        var tag = nfcEvent.tag;
        $("#initCard").text(JSON.stringify(nfcEvent.tag));
        //console.log(JSON.stringify(nfcEvent.tag));
        //app.clearScreen();

        
    }



 function onNdef(nfcEvent) {
        
        console.log(JSON.stringify(nfcEvent.tag));
        app.clearScreen();

        var tag = nfcEvent.tag;

        // BB7 has different names, copy to Android names
        if (tag.serialNumber) {
            tag.id = tag.serialNumber;
            tag.isWritable = !tag.isLocked;
            tag.canMakeReadOnly = tag.isLockable;
        }

        tagContents.innerHTML = app.tagTemplate(tag);

        navigator.notification.vibrate(100);        
    }


function showSettingsNFC(){
    
    $("#initCard").text("Считываем карточку");
    //console.log(JSON.stringify(nfcEvent.tag));
   // nfc.showSettings();
    onNfc();
}

function noConnect(){
    $("#initStr").text("ОШИБКА!!!"); 
    console.log("ERROR!!!");
}

function convertID(tagid){
    
    var strID = '';
    
    for (var i=tagid.length; i>=0; i--)
        
    {
        
        if (tagid[i]>=0) strID += convert(tagid[i]);
        if (tagid[i]<0) strID += convert(256+tagid[i]);
        
    }
    
    return strID;
}

function convert(integer) {
    var str = Number(integer).toString(16);
    return str.length == 1 ? "0" + str : str;
}


function sendNumCard(idNFCCard) {
    
    $.ajax({
  method: "POST",
  url: "http://foodcity.ru/api/getNumber.php",
  //data: { CardId: "D06888FE"}
 data: { CardId: idNFCCard}
})
  .done(function( msg ) {
   // alert("Номер Авто: " + msg.Number + "Все данные: " + JSON.stringify(msg) );
        //if (msg.error == 'Card not found') { 
        if (msg.error ) { 
        showPush('Ошибка определения авто по карте!', 'error' );
         //$("#initStr").html("Ошибка определения авто по карте!");
        dbOn();
        carOff();
        cardOff();        
       // clearListInput ();
        inputDisable ();
        $("#btnSend").hide();            
                             
        }
        
        else {
                             
        dbOn();
        carOn();
        cardOn();
                             
       // $("#initCard").html("Данные получили!!! <br> Номер Авто: " + msg.Number + "<br> Все данные: " + JSON.stringify(msg));
        $("#btnSend").show();
        $("#numAuto").val(msg.Number);
        dataCardID = msg.CardID;
        dataCardSessionID = msg.SessionID;
        inputEnable ();
            
            }
        
        
  })
    .error (function(errmsg){
        dbOff();
        carOff();
        cardOff();
       
        //clearListInput ();
        inputDisable ();
        $("#btnSend").hide();
        alert( "Ошибка определения карты: " + errmsg );
         restartProg();
        
    });
}



function sendDataForm() {
    
    //var dateUnix = Math.round(+new Date()/1000);
    
    var dateUnix = new Date();
    var curr_date = dateUnix.getDate();
    if (curr_date < 10) curr_date = '0'+curr_date;
    var curr_month = dateUnix.getMonth() + 1;
    
    if (curr_month < 10) curr_month = '0'+curr_month;
    
    var curr_year = dateUnix.getFullYear();
    
    var curr_hour = dateUnix.getHours();
     if (curr_hour < 10) curr_hour = '0'+curr_hour;
    var curr_min = dateUnix.getMinutes();
     if (curr_min < 10) curr_min = '0'+curr_min;
    var curr_sec = dateUnix.getSeconds();
     if (curr_sec < 10) curr_sec = '0'+curr_sec;
    
    var dateFormat = curr_year+'-'+curr_month+'-'+curr_date+' '+curr_hour+':'+curr_min+':'+curr_sec;
    
    var dataForm = {};
    dataForm.car_typenum = $("#typeAutoNum").val();
  
    if(dataForm.car_typenum == '') {
        showPush( "Вы не выбрали тип номера!", 'error' ); 
        return;
    }
     
    dataForm.car_number = $("#numAuto").val();
    
   if(dataForm.car_number == '') {
        showPush( "Вы не ввели номер авто!", 'error' ); 
        return;
    }
     
    
    dataForm.country_id = $("#countryUse").val();
  
   if(dataForm.country_id == '') {
        showPush( "Вы не выбрали страну!", 'error' ); 
        return;
    }
    
    dataForm.podium_uid = $("#numPlace").val();
   
   if(dataForm.podium_uid == '') {
        showPush( "Вы не выбрали место!", 'error' ); 
        return;
    }
    
    
    dataForm.tonnage = $("#autoWeight").val();
    
  
   if(dataForm.tonnage == '') {
        showPush( "Вы не выбрали тоннаж!", 'error' ); 
        return;
    }
    

    
    dataForm.goodstypes = $("#nameItem").val();
    
    if(dataForm.goodstypes === null) {
        showPush( "Вы не выбрали товар!", 'error' );        
        return;
    }
    
    
    dataForm.arrival_date = dateFormat;
    dataForm.sec = "LdEcgfk;C5~G8we";
    dataForm.card_id = dataCardID;
    dataForm.session_id = dataCardSessionID;
    dataForm.debug = 1;
    dataForm.user_id = userID;
    dataForm.session_hash = sessionHash;
    
    
    
    console.log("DataForm = ", JSON.stringify(dataForm));
    //alert("DataForm = "+ JSON.stringify(dataForm));
    
   
    $.ajax({
  method: "POST",
  url: "http://entryapps.foodcity.ru/operator/sendapp",
  data: dataForm
})
  .done(function( msg ) {
    //alert("Номер Авто: " + msg.Number + "Все данные: " + JSON.stringify(msg) );
        console.log("MSG = ", msg);
        $("#btnSend").hide();
         showPush('Передача усешна! Готов считывать карточку!!!', 'success' );
         //$("#initStr").text("Передача усешна! Готов считывать карточку!!!");
        //multySelect.multiselect('destroy');
        getDataStore();
        dbN();
        carN();
        cardN();
        
  })
    .error (function(errmsg){
        showPush( "Ошибка передачи данных: " + errmsg , 'error' );
        //alert( "Ошибка передачи данных: " + errmsg );
        wifiOff();
        
    });
    
    
    
}



function clearListInput (){
    
        $("#nameItem").html("");
        $("#countryUse").html("");
        $("#numStore").html("");
        $("#numPlace").html("");
        $("#typeAutoNum").html("");
        $("#autoWeight").html("");
        $("#numAuto").val("");
        
 $("#autoWeight").append( " <option  value= ''>Выберите тоннаж </option>" );     
$("#numPlace").append( " <option  value= ''>Выберите место </option>" );     
    for (var i = 1; i<=30; i++) {
 $("#autoWeight").append( " <option  value="+i+">"+i+" т. </option>" );        
        
    }
    
  console.log("ALL Clear!!!");
    
}


function inputDisable (){
    
        $("#nameItem").prop( "disabled", true );
        $("#countryUse").prop( "disabled", true );
        $("#numStore").prop( "disabled", true );
        $("#numPlace").prop( "disabled", true );
        $("#typeAutoNum").prop( "disabled", true );
        $("#autoWeight").prop( "disabled", true );
        $("#numAuto").prop( "disabled", true );
        $(".multiselect").prop( "disabled", true );
        

    
  console.log("ALL Input Disable");
    
}



function inputEnable (){
    
        $("#nameItem").prop( "disabled", false );
        $("#countryUse").prop( "disabled", false );
        $("#numStore").prop( "disabled", false );
        $("#numPlace").prop( "disabled", false );
        $("#typeAutoNum").prop( "disabled", false );
        $("#autoWeight").prop( "disabled", false );
        $("#numAuto").prop( "disabled", false );
        $(".multiselect").prop( "disabled", false );
        

    
  console.log("ALL Input Enable");
    
}


function wifiOn(){
    $("#wifiOnOff").attr('src','images/wifi-on.svg');
    
}

function dbOn(){
    $("#dbOnOff").attr('src','images/db-on.svg');
    
}

function cardOn(){
    $("#cardOnOff").attr('src','images/card-on.svg');
    
}

function carOn(){
    $("#carOnOff").attr('src','images/car-on.svg');
    
}

function wifiN(){
    $("#wifiOnOff").attr('src','images/wifi-n.svg');
    
}

function dbN(){
    $("#dbOnOff").attr('src','images/db-n.svg');
    
}

function cardN(){
    $("#cardOnOff").attr('src','images/card-n.svg');
    
}

function carN(){
    $("#carOnOff").attr('src','images/car-n.svg');
    
}


function wifiOff(){
    $("#wifiOnOff").attr('src','images/wifi-off.svg');
    
}

function dbOff(){
    $("#dbOnOff").attr('src','images/db-off.svg');
    
}

function cardOff(){
    $("#cardOnOff").attr('src','images/card-off.svg');
    
}

function carOff(){
    $("#carOnOff").attr('src','images/car-off.svg');
    
}

function sendLogin(){
    
    console.log("Click SEND!!!");
    var nameL = $("#namel").val();
    var passL = $("#passl").val();
    console.log("name = ",nameL,"pass = ",passL );
    
    $.ajax({
  method: "POST",
  url: "http://entryapps.foodcity.ru/operator/login ",
  data: { login: nameL ,password: passL }
})
  .done(function( msg ) {
        
        console.log("RET -> ", msg);
         
        // alert("Номер Авто: " + msg.Number + "Все данные: " + JSON.stringify(msg) );
        //if (msg.error == 'Card not found') { 
        if (msg == 'Неудачная авторизация' ) { 
          showPush('Неверный логин или пароль', 'error' );
          //showPush('Что-то пошло не так', 'info' );
                             
        }
        
        else {
            
            var objMsg = JSON.parse(msg);
            showPush('Вход разрешен', 'success');
            //showPush('Готов считывать карточку', 'info'); 
            showPush('Приложите карточку к тыльной стороне смартфона', 'info');
            
            userID = objMsg.user_id;
            sessionHash = objMsg.session_hash;
           // console.log("USER ID -> ", userID);
            //console.log("SESSION -> ", sessionHash);
            $("#modLOG").hide();
            
             restartProg();
            
            }
        
        
  })
    .error (function(errmsg){
        showPush('Неверный логин или пароль', 'error' );
        //console.log("ERROR RET -> ", errmsg);
       $("#initStr").html("Ошибка определения авторизации!");  
         //restartProg();
        
    });    
    
    
}


function showPush(textPush, stylePush ){
    // stylePush => 'success' or 'warning' or 'info' or 'error' 
    var colorBg= null;
    var panel = document.getElementById("push");
    var bgText = document.getElementById("textpush");
    var textPushEl = document.getElementById("textpushel");
    
    switch (stylePush) {
        case 'success':
            colorBg = "rgba(0, 136, 16, 0.8)";
            break;
        case 'warning':
            colorBg = "rgba(227, 193, 6, 0.8)";
            break;
        case 'info':
            colorBg = "rgba(6, 125, 227, 0.8)";
            break;
        case 'error':
            colorBg = "rgba(199, 0, 0, 0.8)";
            break;
        default:
            colorBg = "rgba(136, 136, 136, 0.8)";
            break;
            
    }    
    
    
    
   // tl = new TimelineMax({repeat:0, repeatDelay:0});  
     console.log("Time Line = ", tl);
     console.log("Time Line = ", colorBg);
    //var tl = new TweenLite(panel, {y:-150});
    
     tl.set(bgText, {backgroundColor: colorBg});
     tl.set(panel, {y:-150});
     tl.to(textPushEl,0, {text:textPush});
    tl.to(panel, 1, {y: 0,opacity:1, ease:Power2.easeInOut});
   
    tl.to(panel, 1, {y: -150,opacity:1, delay: 1, ease:Power2.easeInOut});
   


    
    console.log("color push = ", colorBg);
    console.log("push = ", panel);
    
   // $(".push-text").css('background-color', colorBg);
    //$(".push-text p").text(textPush);
    
 
    
// tl.add(TweenMax.to(panel, 1, {y: 0,opacity:1, delay: delayPlay, ease:Power2.easeInOut}));
        
// tl.add(TweenMax.to(panel, 1, {y: -150, delay: 2,opacity:0,ease:Power2.easeInOut})); 
    
    
    
}

function logOut (){
    
    $("#namel").val('');
    $("#passl").val('');
    $("#modLOG").show();
    restartProg();
    
    
}


function validateNumber(){
 	nowEnter = $("#numAuto").val();
    
    if (nowEnter != '') {
	var vPattern = /^\w+$/;
	//var noneD = /\D/g;
	var noneD = /[^a-z0-9]/gi;
	var result = vPattern.test(nowEnter);
    
$("#numAuto").val(nowEnter.toUpperCase());
if (result != true)
{
    
	nowEnter = nowEnter.replace(noneD, "") ;
	 $("#numAuto").val(nowEnter.toUpperCase());
    showPush('Недопустимый знак', 'error' );
   // showPush(nowEnter, 'info' );
    
}

        }
        
/*	
	if ( nowEnter.length > 9) {
		alert('You enter more 12 digit');
		nowEnter = nowEnter.substring(0,9);
		$("#numAuto").val(nowEnter.toUpperCase());
		
		}
	
  */ 
    
    }