namespace sony.metro.reuse;


//create a reusable type - like data element in abap
type Guid : String(32) @title : 'Key';
type empid : String(10) @title : 'Employee ID';

//abap we have structures - group of fields - aspects
aspect address{
    houseNo: Int64;
    landmark: String(255);
    city: String(64);
    country: String(2);
    region: String(4);
}
// ABAP chandra own structure 
aspect salary{
    key empid : empid;
        salary : Decimal(16,2);
        position : String(40);
}