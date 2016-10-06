/*--------------------------------------------
        Global
 ---------------------------------------------*/
/*----  Customers ----*/
var arrayOfCustomers = [];

var oCustomerOne = {
    "accessId": 1,
    "account": "BA111",
    "username":"Klaus",
    "userlastname":"Hansen",
    "adress":"Krattet 12",
    "postalCode": 3456,
    "town":"Bullerby",
    "password":"321",
    "cpr":"12-34",
    "email":"klaus@xyz.dk",
    "amount": 545,
    "gender": "Male",
    "totalTransferAmount": 0
};

var oCustomerTwo = {
    "accessId": 1,
    "account": "BA222",
    "username":"Magnus",
    "userlastname":"Jensen",
    "adress":"Højdevang 76",
    "postalCode": 9876,
    "town":"Ebleby",
    "password":"654",
    "cpr":"13-67",
    "email":"magnus@abc.dk",
    "amount": 88,
    "gender": "Male",
    "totalTransferAmount": 0
};

var oCustomerThree = {
    "accessId": 1,
    "account": "BA333",
    "username":"Ida",
    "userlastname":"Pedersen",
    "adress":"Viskegade 65",
    "postalCode": 4583,
    "town":"Hundelev",
    "password":"987",
    "cpr":"78-98",
    "email":"ida@cdu.dk",
    "amount": 1999,
    "gender": "Female",
    "totalTransferAmount": 0
};

if(!localStorage.sStoredCustomers){
    arrayOfCustomers.push(oCustomerOne);
    arrayOfCustomers.push(oCustomerTwo);
    arrayOfCustomers.push(oCustomerThree);
    //Save Customers in LocalStorage
    sCustomers = JSON.stringify(arrayOfCustomers);
    localStorage.sStoredCustomers = sCustomers;    
}
else{
    arrayOfCustomers = JSON.parse(localStorage.sStoredCustomers);
}

var arrayOfTransfersHistory = [];
var iNewTransferId = 0;

//Load Transfer History from Local Storage
if(localStorage.sCustomerTransfers){
    arrayOfTransfersHistory = JSON.parse(localStorage.sCustomerTransfers);
}

//Sets new TransferID
for(var i = 0; i < arrayOfTransfersHistory.length; i++){
    if(arrayOfTransfersHistory[i].transferId > iNewTransferId){
        iNewTransferId = arrayOfTransfersHistory[i].transferId;
    }
}
iNewTransferId = iNewTransferId + 1;

/*----  Employees ----*/
var arrayOfEmloyees =[];

var oEmployeeOne = {
    "accessId": 2,
    "username":"Mark",
    "password":"123"
};

var oEmployeeTwo = {
    "accessId": 2,
    "username":"Ester",
    "password":"456"
};

var oEmployeeThree = {
    "accessId": 2,
    "username":"Sofie",
    "password":"789"
};

arrayOfEmloyees.push(oEmployeeOne);
arrayOfEmloyees.push(oEmployeeTwo);
arrayOfEmloyees.push(oEmployeeThree);

//Save Employees in LocalStorage
sEmployees = JSON.stringify(arrayOfEmloyees);
localStorage.sStoredEmployees = sEmployees;
//console.log('999');

//Add new area in Local Storage
var sLoginUser;
if(!localStorage.sLoginUser)
{
    localStorage.sLoginUser = false;  
}
else
{
  sLoginUser = JSON.parse(localStorage.sLoginUser);
  if(sLoginUser !== false)
  {
      if(!sLoginUser.account)
      {
        ShowLogin("Employees", sLoginUser);  
      }
      else
      {
        ShowLogin("Customers", sLoginUser); 
      }
  }
  else{
      $(".Menu").hide();
      $("#navbarMain").show();
      
  }
}

if(!localStorage.sLastVisitedPage){
    localStorage.sLastVisitedPage = "home";
}

// Set the from and to options for transfering money from one customer to another customer
for(var i = 0; i < arrayOfCustomers.length; i++)
{
     //console.log(arrayOfCustomers[i]);
    $("#LblCustomerSelectBoxTo").append("<option value="+arrayOfCustomers[i].account+">"+arrayOfCustomers[i].username+"</option>");
    $("#LblEmployeeSelectBoxTo").append("<option value="+arrayOfCustomers[i].account+">"+arrayOfCustomers[i].username+"</option>");
}

for(var i = 0; i < arrayOfCustomers.length; i++)
{
     //console.log(arrayOfCustomers[i]);
    $("#LblEmployeeSelectBoxFrom").append("<option value="+arrayOfCustomers[i].account+">"+arrayOfCustomers[i].username+"</option>");
}

var arrayOfMessage =[];


/*--------------------------------------------
        Functions
 ---------------------------------------------*/
$('.dropdown-menu').click(function (e)
{                   
    e.stopPropagation();
});

function openModal(){
    $('#ModalSaveCustomerInformation').modal();
    ShowEditCustomerProfile();
}

//Go to a new page within the same page
$(document).on("click", ".MyLink", function(){
    $(".MyPage").css({"display":"none"});
   
    var sText = $(this).attr("data-link");
    //$("#"+sText).show();
    //console.log(sText);
    console.dir($('*[data-page="'+sText+'"]'));
    $('*[data-page="'+sText+'"]').fadeIn("slow");
    $('li.active').removeClass('active');
    $(this).addClass("active");
});

//Go to the pages within a dropdown menu
$("#btnCompanyProfile, #btnCareer, #btnOrganisation, #btnStatisticsTable, #btnStatisticsChart, #btnAddCustomer, #btnExistingCustomers, #btnAddEmployee, #btnExistingEmployee").click(function(){
    var oThis = $(this);
    var sThisDataLink = oThis.attr("data-link");
    
    $(".MyPage").css({"display":"none"});
    $('*[data-page="'+sThisDataLink+'"]').fadeIn("slow");
});

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
// INDEX.HTML

// Login
function Login(){
    var sUsername = $("#TxtLoginName").val();
    var sPassword = $("#TxtLoginPassword").val();
    
    var found = false;
    
    for(var i = 0; i < arrayOfEmloyees.length; i++)
    {
        if(sUsername === arrayOfEmloyees[i].username && sPassword === arrayOfEmloyees[i].password)
        {
            ShowLogin("Employees", arrayOfEmloyees[i]);
            found = true;

            UpdateApprovalsView();
            UpdateExistingEmployees();
        }
    }
    
    for(var i = 0; i < arrayOfCustomers.length; i++)
    {
        if(sUsername === arrayOfCustomers[i].username && sPassword === arrayOfCustomers[i].password)
        {
            ShowLogin("Customers", arrayOfCustomers[i]); 
            found = true;
            
//            $("#TxtContactName").val(arrayOfCustomers[i].username);
//            $("#TxtContactEmail").val(arrayOfCustomers[i].email);
            
            UpdateCustomerHistoryView();
            UpdateExistingCustomers();
            break;
        }
    }
    
    if(!found)
    {
        alert("No Match");
    } 
}

// Show who logged in
function ShowLogin(type, user){
    $("#LblLoginContainer").css({"display":"none"});
    $('#LblLogout').fadeIn("slow"); 
    console.log(user);
    ShowPage(type);
    
    var iAccess = user.accessId;
    
    $(".Menu").hide();
    if(iAccess === 2){
        $("#navbarEmployee").show();
    } 
    else{
        $("#navbarCustomer").show();
        $("#TxtContactName").val(user.username);   
        $("#TxtContactEmail").val(user.email);
    }
    
    $("#CustomerProfile").html('<tr><td>'+user.account+'</td><td>'+user.cpr+'</td><td>'+user.username+'</td><td>'+user.userlastname+'</td><td>'+user.adress+'</td><td>'+user.postalCode+'</td><td>'+user.town+'</td><td>'+user.email+'</td><td>'+user.gender+'</td><td>'+user.password+'</td></tr>');

    localStorage.sLoginUser = JSON.stringify(user);
    $("#LblWelcome").html(user.username);  
    
    $("#LblDisplayBalance").val(user.amount);  
}

// Log out
function Logout()
{
    $("#LblLogout").css({"display":"none"});
    $('#LblLoginContainer').fadeIn("slow");
    
    ShowPage("Home");
   
    localStorage.sLoginUser = false;  
    
    $("#navbarMain").show();
    $("#navbarEmployee").hide();
    $("#navbarCustomer").hide(); 
}

function ShowNewCustomerPage()
{
     ShowPage("NewCustomer");
}

function ShowPage(page)
{
    $(".MyPage").css({"display":"none"});
    $('*[data-page="'+page+'"]').fadeIn("slow"); 
}

//Edit Customer Profile
function ShowEditCustomerProfile(){
    var sEditCustomer = JSON.parse(localStorage.sLoginUser);
    
    $("#LblReadonlyBankAccount").val(sEditCustomer.account);
    $("#LblReadonlyCPR").val(sEditCustomer.cpr);
    $("#LblEditFirstName").val(sEditCustomer.username);
    $("#LblEditLastName").val(sEditCustomer.userlastname);
    $("#LblEditAddress").val(sEditCustomer.adress);
    $("#LblEditPostalCode").val(sEditCustomer.postalCode);
    $("#LblEditTown").val(sEditCustomer.town);
    $("#LblEditEmail").val(sEditCustomer.email);
    $("#LblReadonlyGender").val(sEditCustomer.gender);
    $("#LblEditPassword").val(sEditCustomer.password);
    
    $("#LblEditFirstName").val('');
    $("#LblEditLastName").val('');
    $("#LblEditAddress").val('');
    $("#LblEditPostalCode").val('');
    $("#LblEditTown").val('');
    $("#LblEditEmail").val('');
    $("#LblEditPassword").val('');
} 

function SaveEditCustomerProfile(){
    var sEditCustomer = JSON.parse(localStorage.sLoginUser);
    sEditCustomer.account = $("#LblReadonlyBankAccount").val();
    sEditCustomer.cpr = $("#LblReadonlyCPR").val();
    sEditCustomer.username = $("#LblEditFirstName").val();
    sEditCustomer.userlastname = $("#LblEditLastName").val();
    sEditCustomer.adress = $("#LblEditAddress").val();
    sEditCustomer.postalCode = $("#LblEditPostalCode").val();
    sEditCustomer.town = $("#LblEditTown").val();
    sEditCustomer.email =  $("#LblEditEmail").val();
    sEditCustomer.gender =  $("#LblReadonlyGender").val();
    sEditCustomer.password = $("#LblEditPassword").val();
    
    localStorage.sLoginUser = JSON.stringify(sEditCustomer);
   
    var arrayOfCustomers = JSON.parse(localStorage.sStoredCustomers);
    for(var i = 0; i < arrayOfCustomers.length; i++){
        if(arrayOfCustomers[i].username === sEditCustomer.username){
            arrayOfCustomers[i].account = sEditCustomer.account;
            arrayOfCustomers[i].cpr = sEditCustomer.cpr;
            arrayOfCustomers[i].userlastname = sEditCustomer.userlastname;
            arrayOfCustomers[i].adress = sEditCustomer.adress;
            arrayOfCustomers[i].postalCode = sEditCustomer.postalCode;
            arrayOfCustomers[i].town = sEditCustomer.town;
            arrayOfCustomers[i].email = sEditCustomer.email;
            arrayOfCustomers[i].gender = sEditCustomer.gender;
            arrayOfCustomers[i].password = sEditCustomer.password;
        }
    }
   
   localStorage.sStoredCustomers = JSON.stringify(arrayOfCustomers);
   
   $("#CustomerProfile").html('<tr><td>'+sEditCustomer.account+'</td><td>'+sEditCustomer.cpr+'</td><td>'+sEditCustomer.username+'</td><td>'+sEditCustomer.userlastname+'</td><td>'+sEditCustomer.adress+'</td><td>'+sEditCustomer.postalCode+'</td><td>'+sEditCustomer.town+'</td><td>'+sEditCustomer.email+'</td><td>'+sEditCustomer.gender+'</td><td>'+sEditCustomer.password+'</td></tr>');
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
// EMPLOYEES

// Add customer
function AddCustomer(){
    var sAccount = $("#TxtNewCustomerAccount").val();
    var sName = $("#TxtNewCustomerName").val();
    var sLastName = $("#TxtNewCustomerLastName").val();
    var sAddress = $("#TxtNewCustomerAddress").val();
    var iPostalCode = $("#TxtNewCustomerPostal").val();
    var sTown = $("#TxtNewCustomerTown").val();
    var sCPR = $("#TxtNewCustomerCPR").val();
    var sEmail = $("#TxtNewCustomerEmail").val();
    var iAmount = $("#TxtNewCustomerAmount").val();
    var sGender = $("input[name='gender']:checked").val();
    var sPassword = $("TxtNewCustomerPassword").val();
    var iTotalTransferAmount = 0;
    var UserNameExists = 0;
    
    var oNewCustomers = {
        "accessId": 1,
        "account":sAccount,
        "cpr":sCPR,
        "username": sName,
        "userlastname": sLastName,
        "adress": sAddress,
        "postalCode": iPostalCode,
        "town": sTown,
        "email":sEmail,
        "amount":iAmount,
        "gender":sGender,
        "password": sPassword,
        "totalTransferAmount": iTotalTransferAmount
    };
        
    for(var i =  0; i < arrayOfCustomers.length; i++){
        if(arrayOfCustomers[i].username === sName){
            UserNameExists = 1;
            alert('Username taken! Please try another');
        }
    }
    if(UserNameExists === 0){
        //Push new customers to array
        arrayOfCustomers.push(oNewCustomers);

        //Save Customers in LocalStorage
        localStorage.sStoredCustomers = JSON.stringify(arrayOfCustomers);
        
        UpdateExistingCustomers();
        
        $("#TxtNewCustomerAccount").val('');
        $("#TxtNewCustomerName").val('');
        $("#TxtNewCustomerLastName").val('');
        $("#TxtNewCustomerAddress").val('');
        $("#TxtNewCustomerPostal").val('');
        $("#TxtNewCustomerTown").val('');
        $("#TxtNewCustomerCPR").val('');
        $("#TxtNewCustomerEmail").val('');
        $("#TxtNewCustomerAmount").val('');
        $("input[name='gender']:checked").val('');
        $("TxtNewCustomerPassword").val(''); 
    }
}

function UpdateExistingCustomers(){
    $("#TableExistingCustomers tr").remove();
    
    for(var i = 0; i < arrayOfCustomers.length; i++){
        var newPosition = i+1;
        $("#TableExistingCustomers").append("<tr><td>"+newPosition+"</td><td>"+arrayOfCustomers[i].account+"</td><td>"+arrayOfCustomers[i].cpr+"</td><td>"+arrayOfCustomers[i].username+"</td><td>"+arrayOfCustomers[i].userlastname+"</td><td>"+arrayOfCustomers[i].adress+"</td><td>"+arrayOfCustomers[i].postalCode+"</td><td>"+arrayOfCustomers[i].town+"</td><td>"+arrayOfCustomers[i].email+"</td><td>"+arrayOfCustomers[i].gender+"</td><td>"+arrayOfCustomers[i].amount+"</td><td>"+arrayOfCustomers[i].totalTransferAmount+"</td><td>"+arrayOfCustomers[i].password+"</td></tr>");
    }
}

//Add Employee
function AddEmployee(){
    var sNewEmployeeName = $("#TxtNewEmployeeName").val();
    var sNewEmployeePassword = $("#TxtNewEmployeePassword").val();
    var UserNameExists = 0;
    
    var oNewEmployees = {
    "accessId": 2,
    "username":sNewEmployeeName,
    "password":sNewEmployeePassword
    };
    
    for(var i =  0; i < arrayOfEmloyees.length; i++){
        if(arrayOfEmloyees[i].username === sNewEmployeeName){
            UserNameExists = 1;
            alert('Username taken! Please try another');
        }
    }
    if(UserNameExists === 0){
        //Push new employees to array
        arrayOfEmloyees.push(oNewEmployees);
    
        //Save Employees in LocalStorage
        localStorage.sStoredEmployees = JSON.stringify(arrayOfEmloyees);
        
        $("#TxtNewEmployeeName").val('');
        $("#TxtNewEmployeePassword").val('');
        
        UpdateExistingEmployees();
    }
}

function UpdateExistingEmployees(){
    $("#TableExistingEmployees tr").remove();
    
    for(var i = 0; i < arrayOfEmloyees.length; i++){
        var newPosition = i+1;
        $("#TableExistingEmployees").append("<tr><td>"+newPosition+"</td><td>"+arrayOfEmloyees[i].username+"</td><td>"+arrayOfEmloyees[i].password+"</td></tr>");
    }  
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
// EMPLOYEE STATISTICS

function StatisticsEmployees(){ 
    //Male, Female
    var iMale = 0;
    var iFemale = 0;
    
    //Poor, Middle, Rich
    var iPoor = 0;
    var iMiddle = 0;
    var iRich = 0;
    
    //Female Poor, Middle, Rich
    var iFemalePoor = 0;
    var iFemaleMiddle = 0;
    var iFemaleRich = 0;
    
    //Male Poor, Middle, Rich
    var iMalePoor = 0;
    var iMaleMiddle = 0;
    var iMaleRich = 0;
    
    var sCSSClass = "";

    // Get customers from localStorage
    var aCustomers = JSON.parse(localStorage.sStoredCustomers );
    //console.dir(aCustomers);
    
    // Loop through the customers and count how many are rich, middle and poor
    for(var i=0; i < aCustomers.length; i++)
    {
        if(aCustomers[i].amount < 100){
            iPoor++;
            iFemalePoor++;
            sCSSClass = 'danger';
            if('Female' === aCustomers[i].gender){
                iFemalePoor ++; 
            } 
            else {
                iMalePoor ++;
            }
        }
        if(aCustomers[i].amount >= 100 && aCustomers[i].amount <= 1000){
            iMiddle++;
            iFemaleMiddle++;
            sCSSClass = 'warning';
            if('Female' === aCustomers[i].gender){
                iFemaleMiddle ++;
            } 
            else {
                iMaleMiddle ++; 
            }
        }
        if(aCustomers[i].amount > 1000){
            iRich++;
            iFemaleRich++;
            sCSSClass = 'success';
            if('Female' === aCustomers[i].gender){
                iFemaleRich ++;
            } 
            else {
                iMaleRich ++;
            }
        }
        var newPosition = i+1;
        
        $("#TableStatistics").append("<tr class="+sCSSClass+"><td>"+newPosition+"</td><td>"+aCustomers[i].account+"</td><td>"+aCustomers[i].cpr+"</td><td>"+aCustomers[i].username+" "+aCustomers[i].userlastname+"</td><td>"+aCustomers[i].amount+"</td></tr>");
    }
    
    iMale = iMalePoor + iMaleMiddle + iMaleRich;
    iFemale = iFemalePoor + iFemaleMiddle + iFemaleRich;

    //console.log(iRich, iMiddle, iPoor);
    document.getElementById('ContainerImageChart').innerHTML = '<img src="http://chart.googleapis.com/chart?chs=500x180&chd=t:'+iPoor+','+iMiddle+','+iRich+'&cht=p3&chl=Poor|Middle|Rich&chco=abcded|123456|876543" alt="Image test" title="Image test"/>';

    //Male and Female
    document.getElementById('ContainerImageBarMaleFemale').innerHTML = '<img src="http://chart.googleapis.com/chart?chs=500x180&chd=t:'+iMale+','+iFemale+'&cht=p3&chl=Male|Female&chco=abcded|876543" alt="Image test" title="Image test"/>';

    //Female Poor, Middle, Rich
    document.getElementById('ContainerImageChartFemale').innerHTML = '<img src="http://chart.googleapis.com/chart?chs=500x180&chd=t:'+iFemalePoor+','+iFemaleMiddle+','+iFemaleRich+'&cht=p3&chl=FemalePoor|FemaleMiddle|FemaleRich&chco=abcded|123456|876543" alt="Image test" title="Image test"/>';
    
    //Male Poor, Middle, Rich
    document.getElementById('ContainerImageChartMale').innerHTML = '<img src="http://chart.googleapis.com/chart?chs=500x180&chd=t:'+iMalePoor+','+iMaleMiddle+','+iMaleRich+'&cht=p3&chl=MalePoor|MaleMiddle|MaleRich&chco=abcded|123456|876543" alt="Image test" title="Image test"/>';   
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
// CONTACT

function SendMessage(){
    if(localStorage.sMessages){
        arrayOfMessage = JSON.parse(localStorage.sMessages);
    }
    var oFromUser = JSON.parse(localStorage.sLoginUser);
    //console.log('hello'+oFromUser.username);
    
    var sSubject = $("#TxtSubject").val();
    var sMessage = $("#TxtContactMessage").val();
    
   //Display Date
    var dNow = new Date();
    var utcdate= (dNow.getMonth()+ 1) + '/' + dNow.getDate() + '/' + dNow.getFullYear();
    
    var oMessages = {
        "messageId": arrayOfMessage.length,
        "from":oFromUser.username,
        "date":utcdate,
        "email": oFromUser.email,
        "subject": sSubject,
        "message": sMessage
    };

    arrayOfMessage.push(oMessages);
    
    localStorage.sMessages = JSON.stringify(arrayOfMessage);
    
    $("#TxtSubject").val('');
    $("#TxtContactMessage").val(''); 
}

function UpdateMessageBoard(){
    $("#TableMessages tr").remove();
    
    if(localStorage.sMessages){
        arrayOfMessage = JSON.parse(localStorage.sMessages);
        
        for(var i = 0; i < arrayOfMessage.length; i++){
            $("#TableMessages").append("<tr><td><span class=\"glyphicon glyphicon-envelope\"></span></td><td>"+arrayOfMessage[i].messageId+"</td><td>"+arrayOfMessage[i].subject+"</td><td>"+arrayOfMessage[i].date+"</td><td>"+arrayOfMessage[i].from+"</td></tr>");
        }
        
        $("#TableMessages tr").click(function (){
           var MessageIndex = this.rowIndex - 1; //start from position 0. That is why we minus by 1
           var iMessagId = Number($("#TableMessages tr:eq("+MessageIndex+") td:eq(1)").html());
           
           for(var i = 0; i < arrayOfMessage.length; i++){
               if(arrayOfMessage[i].messageId === iMessagId){
                   $("#LblDisplayMessageName").val(arrayOfMessage[i].from);
                   $("#LblDisplayMessageEmail").val(arrayOfMessage[i].email);
                   $("#LblDisplayMessageDate").val(arrayOfMessage[i].date);
                   $("#LblDisplayMessageSubject").val(arrayOfMessage[i].subject);
                   $("#LblDisplayMessage").val(arrayOfMessage[i].message);
                   $('#ModalMessageBoard').modal();
               }
           }
        });
    }
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
// CUSTOMERS

//Customer History

//var oTransferOne = {
//    "transferdate":"12-12-2004",
//    "transfername":"Nørrebro Bycenter",
//    "transferamount": 88
//};
//    
//var oTransferTwo = {
//    "transferdate":"03-05-2009",
//    "transfername":"Føtex",
//    "transferamount":45
//};
//
//arrayOfTransfers.push(oTransferOne);
//arrayOfTransfers.push(oTransferTwo);

function AddTransferHistory(sTransferDate,sTransferFrom, sTransferTo, iTransferAmount, iAmountAfterTransfer, iApproved){
   
    var oTransfers = {
        "transferId": iNewTransferId,
        "transferDate": sTransferDate,
        "transferFrom": sTransferFrom,
        "transferTo": sTransferTo,
        "transferAmount": iTransferAmount,
        "amountAfterTransfer":iAmountAfterTransfer,
        "transferApproved": iApproved
    };
    
    iNewTransferId = iNewTransferId + 1;
    arrayOfTransfersHistory.push(oTransfers);
    localStorage.sCustomerTransfers = JSON.stringify(arrayOfTransfersHistory);
}
    
function UpdateCustomerHistoryView(){
    $("#CustomerHistoryTable tr").remove();
    
    var oLoggedInCustomer = JSON.parse(localStorage.sLoginUser);
    var sLoggedInCustomer = oLoggedInCustomer.username;
    
    for(var i = 0; i < arrayOfTransfersHistory.length; i++){ 
        if(arrayOfTransfersHistory[i].transferFrom === sLoggedInCustomer){
            var newPosition = i+1;
            var amountAfterTranfer;
            if(arrayOfTransfersHistory[i].transferApproved === 1){
                amountAfterTranfer = arrayOfTransfersHistory[i].amountAfterTransfer;
            }
            else{
                amountAfterTranfer ='Pending Approval';
            }
            $("#CustomerHistoryTable").append('<tr><td>'+newPosition+'</td><td>'+arrayOfTransfersHistory[i].transferDate+'</td><td>'+arrayOfTransfersHistory[i].transferTo+'</td><td>'+arrayOfTransfersHistory[i].transferAmount+'</td><td>'+amountAfterTranfer+'</td></tr>');  
        }   
    }
}

function CustomerTransfer(){
    //Display From whom is paid
    var oFrom = JSON.parse(localStorage.sLoginUser);
    var sFrom = oFrom.username;
    var oCustomerTransferAmount = oFrom.totalTransferAmount;
    var iApproved; // 0 = false, 1 = true
    
    $("#LblCustomerDisplayFrom").text(sFrom);
    
    //Display Amount
    var sAmount = $("#TxtCustomerAmount").val();
    $("#LblCustomerDisplayAmount").text(sAmount);
    
    if(Number(oCustomerTransferAmount) + Number(sAmount) > 5000){
        alert('The Amount cannot be transferred. The Total Amount of Transfer exceeds 5000');
    }
    else
    {
        //From Customer is found and the amount is deducted from the account, and the new amount is seen in arrayOfCustomers[i].amount
        var iNewTotalAmount;
        for(var i = 0; i < arrayOfCustomers.length; i++){
            if(arrayOfCustomers[i].username === sFrom){
                if(Number(sAmount) > 100){
                    iApproved = 0;
                    iNewTotalAmount = Number(arrayOfCustomers[i].amount);
                }
                else{
                    iApproved = 1;

                    var iTransferAmount = Number(oCustomerTransferAmount) + Number(sAmount);
                    arrayOfCustomers[i].totalTransferAmount = iTransferAmount;
                    
                    iNewTotalAmount = Number(arrayOfCustomers[i].amount) - Number(sAmount);
                    arrayOfCustomers[i].amount = iNewTotalAmount;
                    
                    $("#LblDisplayBalance").val(arrayOfCustomers[i].amount);
                }
                //oFrom = arrayOfCustomers[i]; not used reminiscence of an old idea
            }
        }

        //Customer - Display Name paid To
        var sUsernameCustomer = $("#LblCustomerSelectBoxTo option:Selected").text();
        $("#LblCustomerDisplayNameTo").text(sUsernameCustomer);
        
        for(var i = 0; i < arrayOfCustomers.length; i++)
        {
            if(arrayOfCustomers[i].username === sUsernameCustomer && iApproved === 1)
            {
                arrayOfCustomers[i].amount = arrayOfCustomers[i].amount + Number(sAmount);
            }
        }

        //Display Date
        var dNow = new Date();
        var utcdate= (dNow.getMonth()+ 1) + '/' + dNow.getDate() + '/' + dNow.getFullYear();
        $('#LblCustomerDisplayDate').text(utcdate);
        
       if(iApproved === 0){
           $("#LblCustomerDisplayPendingApproval").text('Pending Approval');
       }
        
        localStorage.sStoredCustomers = JSON.stringify(arrayOfCustomers);
        //localStorage.sLoginUser = JSON.stringify(oFrom);

        $("#LblCustomerPaper").slideDown(3000);
        AddTransferHistory(utcdate, sFrom, sUsernameCustomer, sAmount, iNewTotalAmount, iApproved);
        UpdateCustomerHistoryView();
    }
}

function SaveChangedCustomerInformation(){
    var oUserInformation = JSON.parse(localStorage.sLoginUser);
 
    var sEditName = $("#TxtEditName").val();
    var sEditAdress = $("#TxtEditAddress").val();
    var sEditPostalCode = $("#TxtEditPostalCode").val();
    var sEditTown = $("#TxtEditTown").val();
    var sEditPassword = $("#TxtEditPassword").val();
    
    var sNewName = oUserInformation.name;
    var sNewAdress = oUserInformation.adress;
    var sNewPostalCode = oUserInformation.postalCode;
    var sNewTown = oUserInformation.town;
    var sNewPassword = oUserInformation.password;
}

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
// EMPLOYEE.HTML

//Employee transfer money from one customer to another
function EmployeeTransfer(){
    //Display From whom is paid
    var oFrom = JSON.parse(localStorage.sLoginUser);
    var sFrom = oFrom.username;
    $("#LblEmployeeDisplayFromCustomer").text(sFrom);
    //console.log(sFrom);
    var oCustomerTransferAmount = oFrom.totalTransferAmount;
    //console.log(oCustomerTransferAmount);
    
    var sUsernameFromCustomer = $("#LblEmployeeSelectBoxFrom option:Selected").text();
    $("#LblEmployeeDisplayFromCustomer").text(sUsernameFromCustomer);
    
    //Display Amount
    var sAmount = $("#TxtEmployeeAmount").val();
    $("#LblEmployeeDisplayAmount").text(sAmount);

    if(Number(oCustomerTransferAmount) + Number(sAmount) > 5000)
    {
        alert('The Amount cannot be transferred. The Total Amount of Transfer exceeds 5000');
    }
    else
    {
        //From Customer is found and the amount is deducted from the account. So the new amount is seen in arrayOfCustomers[i].amount
        for(var i = 0; i < arrayOfCustomers.length; i++)
        {
            if(arrayOfCustomers[i].username === sUsernameFromCustomer)
            {
                var iTransferAmount = Number(arrayOfCustomers[i].totalTransferAmount) + Number(sAmount);
                arrayOfCustomers[i].totalTransferAmount = iTransferAmount;
                var iNewTotalAmount = Number(arrayOfCustomers[i].amount) - Number(sAmount);
                arrayOfCustomers[i].amount = iNewTotalAmount;
            }
        }
    
    //Customer - Display Name paid To
    var sUsernameToCustomer = $("#LblEmployeeSelectBoxTo option:Selected").text();
    $("#LblEmployeeDisplayNameToCustomer").text(sUsernameToCustomer);
    
    for(var i = 0; i < arrayOfCustomers.length; i++){
            if(arrayOfCustomers[i].username === sUsernameToCustomer){
                arrayOfCustomers[i].amount = arrayOfCustomers[i].amount + Number(sAmount);
            }
        }

    //Display Date
    var dNow = new Date();
    var utcdate= (dNow.getMonth()+ 1) + '/' + dNow.getDate() + '/' + dNow.getFullYear();
    $('#LblEmployeeDisplayDate').text(utcdate);
    
    $("#LblEmployeePaper").slideDown(3000);
    
    //Husk information gemmes i localStorage
    localStorage.sStoredCustomers = JSON.stringify(arrayOfCustomers);
    }
}

function SaveApprovals()
{
    var iTransferFrom;
    var iTransferTo;
    var iTheCurrentTransfer;
    
    var tableApproved = document.getElementById("PendingApprovalTable");
    for(var i= 0; i < tableApproved.rows.length; i++)
    {          
        if(tableApproved.rows[i].cells[4].childNodes[0].checked === true)
        {
            var iTransferId = Number(tableApproved.rows[i].cells[0].innerHTML);
            for(var i =0; i < arrayOfTransfersHistory.length; i++){
                if(arrayOfTransfersHistory[i].transferId === iTransferId){
                    iTheCurrentTransfer = i;
                }
            }
            
            //placeringen af from i arrayOfCustomers
            for(var i =0; i < arrayOfCustomers.length; i++){
                if(arrayOfCustomers[i].username === arrayOfTransfersHistory[iTheCurrentTransfer].transferFrom){
                    iTransferFrom = i;
                }
            }
          
          //placeringen af to i arrayOfCustomers
            for(var i =0; i < arrayOfCustomers.length; i++){
                if(arrayOfCustomers[i].username === arrayOfTransfersHistory[iTheCurrentTransfer].transferTo){
                   iTransferTo = i;
                }
            }
            
            arrayOfTransfersHistory[iTheCurrentTransfer].transferApproved = 1;
            arrayOfTransfersHistory[iTheCurrentTransfer].amountAfterTransfer = Number(arrayOfTransfersHistory[iTheCurrentTransfer].amountAfterTransfer) - Number(arrayOfTransfersHistory[iTheCurrentTransfer].transferAmount);
            
            arrayOfCustomers[iTransferFrom].amount = Number(arrayOfCustomers[iTransferFrom].amount) - Number(arrayOfTransfersHistory[iTheCurrentTransfer].transferAmount);
            arrayOfCustomers[iTransferFrom].totalTransferAmount = Number(arrayOfCustomers[iTransferFrom].totalTransferAmount) + Number(arrayOfTransfersHistory[iTheCurrentTransfer].transferAmount);
            
            arrayOfCustomers[iTransferTo].amount = Number(arrayOfCustomers[iTransferTo].amount) + Number(arrayOfTransfersHistory[iTheCurrentTransfer].transferAmount);
        }
    }
        
    localStorage.sStoredCustomers = JSON.stringify(arrayOfCustomers);
    localStorage.sCustomerTransfers = JSON.stringify(arrayOfTransfersHistory);

    UpdateApprovalsView();
}

function UpdateApprovalsView(){
    $("#PendingApprovalTable tr").remove();
    
    if(localStorage.sCustomerTransfers){
        var oAllTransfers= JSON.parse(localStorage.sCustomerTransfers);

        for(var i= 0; i < oAllTransfers.length; i++){
            if(oAllTransfers[i].transferApproved === 0){
                $("#PendingApprovalTable").append('<tr><td>'+oAllTransfers[i].transferId+'</td><td>'+oAllTransfers[i].transferDate+'</td><td>'+oAllTransfers[i].transferTo+'</td><td>'+oAllTransfers[i].transferAmount+'</td><td><input type="checkbox"></td></tr>');  
            }
        }
    }
}