"use strict";
var liabilities = 0;
var totalassets = 0;
var ownerequity = 0;
var ownerequitycalc = function () {
    ownerequity = totalassets - liabilities;
    return ownerequity;
};
var totalassetscalc = function () {
    totalassets = liabilities + ownerequity + inventory;
    return totalassets;
};
var liabilitiescalc = function () {
    liabilities = ownerequity - totalassets;
    return liabilities;
};
var profitcalc = function () {
    profit = revenue - expenses;
    $("#profit").click();
    return profit;
};
var inventory = 0;
var inventorycalc = function () {
    inventory = 0;
    for (var i = 0; i < allproducts.length; i++) {
        inventory += allproducts[i][4] * (allproducts[i][2] - allproducts[i][3]);
    }
    expenses = 0;
    for (var i = 0; i < allproducts.length; i++) {
        expenses += allproducts[i][4] * allproducts[i][2];
    }
    console.log(expenses + " :Expense");
    $("#expenses").val(expenses);
    revenue = 0;
    for (var i = 0; i < allproducts.length; i++) {
        revenue += allproducts[i][1] * allproducts[i][3];
    }
    console.log(revenue + " :revenue");
    $("#revenue").val(revenue);
    totalassetscalc();
    $("#totalassets").val(totalassetscalc());
    profitcalc();
    $("#liabilities").val(liabilitiescalc());
    $("#equity").val(ownerequitycalc());
};
var revenue = 0;
var expenses = 0;
var profit = 0;
var draws = 0;
var allproducts = [];
console.log(totalassetscalc());
$("#liabilities").change(function (event) {
    liabilities = Number($("#liabilities").val());
    $("#liabilities").val(liabilities);
    $("#totalassets").val(totalassetscalc());
    $("#equity").val(ownerequitycalc());
    console.log('liabilities changed');
});
$("#equity").change(function (event) {
    ownerequity = Number($("#equity").val());
    $("#equity").val(ownerequity);
    $("#liabilities").val(liabilitiescalc());
    $("#totalassets").val(totalassetscalc());
    console.log('equity changed');
});
$("#totalassets").change(function (event) {
    totalassets = Number($("#totalassets").val());
    $("#totalassets").val(totalassets);
    $("#liabilities").val(liabilitiescalc());
    $("#equity").val(ownerequitycalc());
    console.log('totalassets changed');
});
$("#expenses").change(function (event) {
    expenses = Number($("#expenses").val());
    profitcalc();
});
$("#revenue").change(function (event) {
    revenue = Number($("#revenue").val());
    profitcalc();
});
$("#profit").on('click', function (event) {
    $("#profit").val(profit);
});
$('#addproduct').on('click', function (event) {
    event.preventDefault();
    allproducts.push([$('#productname').val(), $('#productpriceperunit').val(),
        $('#productquantity').val(), $('#productsold').val(), $('#costofproduct').val()]);
    inventorycalc();
    $('#productnamelist').append($("<li>").text("" + $('#productname').val()));
    $('#productpriceperunitlist').append($("<li>").text($('#productpriceperunit').val() + " Price/Unit"));
    $('#costofproductlist').append($("<li>").text($('#costofproduct').val() + " Cost/Unit"));
    $('#productquantitylist').append($("<li>").text("" + $('#productquantity').val()));
    $('#productsoldlist').append($("<li>").text("" + $('#productsold').val()));
});
$('#exportcvs').on('click', function () {
    var cvsFile = "";
    for (var i = 0; i < allproducts; i++) {
        var line = "";
        for (var e = 0; e < allproducts[i]; e++) {
            line += allproducts[i][e] + ",";
        }
        cvsFile += line + "\r\n";
    }
    location.href = "data:text/csv;charset=utf-8," + encodeURI(cvsFile);
});
