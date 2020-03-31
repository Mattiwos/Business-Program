

var liabilities: number = 0 //dollars
var totalassets: number = 0
var ownerequity: number = 0


var ownerequitycalc = ()=>{
    ownerequity = totalassets - liabilities;
    return ownerequity;
}; //its owner's investment minus the owner's draws or withdrawals from the business plus the net income (or minus the net loss) since the business began
var totalassetscalc = ()=>{
    totalassets = liabilities + ownerequity + inventory;
    return totalassets;
};
var liabilitiescalc = ()=>{
    liabilities = ownerequity - totalassets;
    return liabilities;

}//Subtract total stockholders' equity from total totalassets to

var profitcalc = ()=>{
    profit = revenue - expenses;
    $("#profit").click()
    return profit;
}
var inventory: number =0;

var inventorycalc = ()=>{
    //name,productpriceperunit,productquantity,productsold, costof product
    
    inventory = 0; 
    for (var i: number = 0;i < allproducts.length; i++){
        inventory+= allproducts[i][4] * (allproducts[i][2]- allproducts[i][3])
        
    }
    expenses= 0
    for (var i: number = 0;i < allproducts.length; i++){
        expenses+= allproducts[i][4] * allproducts[i][2]
    }
    console.log(expenses + " :Expense")

    $("#expenses").val(expenses);

    revenue = 0; 
   
    for (var i: number = 0;i < allproducts.length; i++){
        revenue+= allproducts[i][1] * allproducts[i][3]
    }
    console.log(revenue + " :revenue")
    $("#revenue").val(revenue)

    totalassetscalc()
    $("#totalassets").val(totalassetscalc()) 
    
    profitcalc()
    $("#liabilities").val(liabilitiescalc())
    $("#equity").val(ownerequitycalc())
     

}

var revenue: number = 0; //amount made
var expenses: number = 0; //money used to buy resources

var profit: number = 0; // total revenue – total expenses

var draws: number = 0 //withdrawal of business cash
//name,productpriceperunit,productquantity,productsold
var allproducts: any = [];

console.log(totalassetscalc())

$("#liabilities").change(function( event: any ) {
    liabilities = Number($("#liabilities").val())
    $("#liabilities").val(liabilities) 
    $("#totalassets").val(totalassetscalc()) 
    $("#equity").val(ownerequitycalc()) 
    console.log('liabilities changed')

});
$("#equity").change(function( event: any ) {
    ownerequity = Number($("#equity").val())
    $("#equity").val(ownerequity) 
    $("#liabilities").val(liabilitiescalc())
    $("#totalassets").val(totalassetscalc()) 
    console.log('equity changed')

});
$("#totalassets").change(function( event: any ) {
    totalassets = Number($("#totalassets").val())
    $("#totalassets").val(totalassets) 
    $("#liabilities").val(liabilitiescalc())
    $("#equity").val(ownerequitycalc()) 
  
    console.log('totalassets changed')

});
$("#expenses").change((event: any)=>{
    expenses = Number($("#expenses").val());
    profitcalc()

})
$("#revenue").change((event: any)=>{
    revenue = Number($("#revenue").val());
    profitcalc()
})


$("#profit").on('click',(event:any)=>{
    $("#profit").val(profit)
})
$('#addproduct').on('click',(event:any)=>{
    event.preventDefault();
    //name,productpriceperunit,productquantity,productsold, costof product
    allproducts.push([$('#productname').val(), $('#productpriceperunit').val(),
    $('#productquantity').val(), $('#productsold').val(), $('#costofproduct').val()]) 
    
    inventorycalc()

    $('#productnamelist').append( $("<li>").text(`${$('#productname').val()}`) )

    $('#productpriceperunitlist').append( $("<li>").text(`${$('#productpriceperunit').val()} Price/Unit`) )

    $('#costofproductlist').append( $("<li>").text(`${$('#costofproduct').val()} Cost/Unit`) )

    $('#productquantitylist').append( $("<li>").text(`${$('#productquantity').val()}`) )

    $('#productsoldlist').append( $("<li>").text(`${$('#productsold').val()}`) )

    
})
$('#exportcvs').on('click',()=>{
    let cvsFile: string = ""
    for (var i = 0; i <allproducts;i++){
        var line: string ="";
        for (var e = 0; e < allproducts[i]; e++){
            line +=  allproducts[i][e] +","
        }
        cvsFile+= line + "\r\n"
    }
    location.href = "data:text/csv;charset=utf-8," + encodeURI(cvsFile)
    // const data  = encodeURI(cvsFile);

    // const link = document.createElement('a');
    //     link.setAttribute('href', data);
    //     link.setAttribute('download', "Business Program");
    //     link.click();
        
    // console.log('downloading')


})


