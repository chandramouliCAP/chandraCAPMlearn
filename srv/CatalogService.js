const cds = require('@sap/cds')

module.exports = class CatalogService extends cds.ApplicationService { init() {

  const { EmployeeSrv, BusinessPartnerSet, AddressSet, ProductSet, PurchaseOrderSet, POItems } = cds.entities('CatalogService')

  this.before (['CREATE', 'UPDATE'], EmployeeSrv, async (req) => {
    console.log('Before CREATE/UPDATE EmployeeSrv', req.data)
    var salary = parseFloat(req.data.salaryAmount);
    if ( salary >= 1000000){
       req.error(500,"salary is greater than others salary")
    }
    else{
      req.notify(200,"salary is correct")
      req.warn();
      
    }
  })
  this.after ('READ', EmployeeSrv, async (employeeSrv, req) => {
    console.log('After READ EmployeeSrv', employeeSrv)
  })
  this.before (['CREATE', 'UPDATE'], BusinessPartnerSet, async (req) => {
    console.log('Before CREATE/UPDATE BusinessPartnerSet', req.data)
  })
  this.after ('READ', BusinessPartnerSet, async (businessPartnerSet, req) => {
    console.log('After READ BusinessPartnerSet', businessPartnerSet)
  })
  this.before (['CREATE', 'UPDATE'], AddressSet, async (req) => {
    console.log('Before CREATE/UPDATE AddressSet', req.data)
  })
  this.after ('READ', AddressSet, async (addressSet, req) => {
    console.log('After READ AddressSet', addressSet)
  })
  this.before (['CREATE', 'UPDATE'], ProductSet, async (req) => {
    console.log('Before CREATE/UPDATE ProductSet', req.data)
  })
  this.after ('READ', ProductSet, async (productSet, req) => {
    console.log('After READ ProductSet', productSet)
  })
  this.before (['CREATE', 'UPDATE'], PurchaseOrderSet, async (req) => {
    console.log('Before CREATE/UPDATE PurchaseOrderSet', req.data)
  })
  this.after ('READ', PurchaseOrderSet, async (purchaseOrderSet, req) => {
    console.log('After READ PurchaseOrderSet', purchaseOrderSet)
    //step 1: get all the order id's
    //let ids = purchaseOrderSet.map(rec => rec.NODE_KEY);
    //console.log(ids);
    //const partnerCount = await SELECT.from(PurchaseOrderSet)
    //                                 .columns('PARTNER_GUID', {func : 'count'})
    //                                 .where({NODE_KEY : {in: ids}})
    //                                 .groupBy('PARTNER_GUID');


   
    for(let record of purchaseOrderSet){
      //const myData = partnerCount.find(partnerCount => partnerCount.NODE_KEY = record.NODE_KEY)
      //record.PARTNER_COUNT = myData.count;
      if(!record.NOTE){
        record.NOTE = '(No Value found)**'
      }

    }

  })
  this.before (['CREATE', 'UPDATE'], POItems, async (req) => {
    console.log('Before CREATE/UPDATE POItems', req.data)
  })
  this.after ('READ', POItems, async (pOItems, req) => {
    console.log('After READ POItems', pOItems)
  })
 //implement the action
  this.on ('boost', async (req) => {
   
    try {
      //fetch the incoming key data -- {NODE_KEY: 'jsdjij9839893kdkj'}
      const nodeKey = req.params[0];
      //create a db tx handler object
      const tx = cds.tx(req);
      //Fire an update on DB
      await tx.update(PurchaseOrderSet).with({
        GROSS_AMOUNT: {'+=' : 20000},
        NOTE: 'boosted!!'
      }).where(nodeKey);
      //use this object to fetch the data from db
      //sort order by amount in desc and get the top 1st record
      const reply = await tx.read(PurchaseOrderSet).
                          where(nodeKey);
     
      console.log(reply);
      return reply;


    } catch (error) {
     
    }


  });

  this.on ('getLargestPurchaseOrder', async (req) => {
    try {
      console.log("reached code");
      //create a db tx handler object
      const tx = cds.tx(req);


      //use this object to fetch the data from db
      //sort order by amount in desc and get the top 1st record
      const reply = await tx.read(PurchaseOrderSet).
                          orderBy({
                            "GROSS_AMOUNT": 'desc'
                          }).limit(1);
      const cha = await tx.read(PurchaseOrderSet).
                          where({
                            "PO_ID": '300000045'
                          });

      console.log(reply,cha);
      return [ reply,cha ];


    } catch (error) {
     
    }

  })
this.on ('getOrderDefault', async (req) => {
   
    try {
      let reply = {
        OVERALL_STATUS : 'N'
      }
      return reply;


    } catch (error) {
     
    }


  })

  return super.init()
}}
