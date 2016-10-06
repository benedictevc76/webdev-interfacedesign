window.onload = function(){
    document.getElementById('butval').onclick = function(){
        document.getElementById('billing_last_name').value = document.getElementById('valbox').value;   
    }
}; 


window.onload = function(){
    document.getElementById('LblEditCustomerInformation').onclick = function(){
        document.getElementById('TxtReadonlyBankAccount').value = document.getElementById('LblReadonlyBankAccount').value;
        document.getElementById('TxtReadonlyCPR').value = document.getElementById('LblReadonlyCPR').value;
        document.getElementById('TxtEditFirstName').value = document.getElementById('LblEditFirstName').value;
        document.getElementById('TxtEditLastName').value = document.getElementById('LblEditLastName').value;
        document.getElementById('TxtEditAddress').value = document.getElementById('LblEditAddress').value;
        document.getElementById('TxtEditPostalCode').value = document.getElementById('LblEditPostalCode').value;
        document.getElementById('TxtEditTown').value = document.getElementById('LblEditTown').value;
        document.getElementById('TxtEditEmail').value = document.getElementById('LblEditEmail').value;
        document.getElementById('TxtReadonlyGender').value = document.getElementById('LblReadonlyGender').value;
        document.getElementById('TxtEditPassword').value = document.getElementById('LblEditPassword').value;
    }
}; 

