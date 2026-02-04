using{ anubhav.db } from '../db/datamodel';
service CatalogService @(path:'CatalogService',
                        ///Authentication
                        requires: 'authenticated-user'
) {


    //expose my database table as a odata entity
    //No coding required to handle CRUDQ - Create, Read, Update, Delete and Query data
    //@readonly
    entity EmployeeSrv  ///Authorization
        @(restrict: [
            { grant: ['READ'], to: 'Viewer', where :'bankName = $user.BankName' },
            { grant: ['WRITE','READ'], to: 'Admin' }
        ]
        )as projection on db.master.employees;
    //Other entities
    entity BusinessPartnerSet as projection on db.master.businesspartner;
    entity AddressSet as projection on db.master.address;
    entity ProductSet as projection on db.master.product;
    entity PurchaseOrderSet @( odata.draft.enabled:true,
                             Common.DefaultValuesFunction: 'getOrderDefault',
                             restrict: [
            { grant: ['READ'], to: 'Viewer' },
            { grant: ['WRITE','READ'], to: 'Admin' }
        ]) as projection on db.transaction.purchaseorder{
        *,
        //expression
        case OVERALL_STATUS
            when 'P' then 'Pending'
            when 'A' then 'Approved'
            when 'X' then 'Rejected'
            when 'N' then 'New'
                end as OverallStatus : String(32),
        case OVERALL_STATUS
            when 'P' then 2
            when 'A' then 3
            when 'X' then 1
            when 'N' then 2
                end as IconColor : Int16
    }
    actions {
        //system will automatically pass the primary key as input
        action boost() returns PurchaseOrderSet;
    };
    entity POItems as projection on db.transaction.poitems;
    function getLargestPurchaseOrder() returns array of ProductSet;
    function getOrderDefault() returns PurchaseOrderSet; 

}
