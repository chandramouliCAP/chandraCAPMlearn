const cds = require('@sap/cds')

module.exports = class MyService extends cds.ApplicationService { init() {



  this.on ('hello', async (req) => {
    return "Hey Amigo!! " + req.data.name + " Welcome to CAP Service";

  })
 let { ReadEmployeeSrv, InsertEmployeeSrv, UpdateEmployeeSrv, DeleteEmployeeSrv } = cds.entities('MyService');


  this.on('READ', ReadEmployeeSrv, async (req) => {


    let results = await SELECT.from(ReadEmployeeSrv).limit(5);
    for(let record of results){
      record.nameMiddle = '***Changeed***';
    }


    return results;


  });


  this.on('CREATE', InsertEmployeeSrv, async (req) => {


    let myData = req.data;


    let results = await INSERT.into(InsertEmployeeSrv).entries(myData);


    return results;


  });


  this.on('UPDATE', UpdateEmployeeSrv, async (req) => {


    let myData = req.data;


    let results = await UPDATE.into(UpdateEmployeeSrv).set({nameFirst : myData.nameFirst})
                              .where({ID: myData.ID});




    return results;


  });


  this.on('DELETE', DeleteEmployeeSrv, async (req) => {


    let myData = req.data;


    let results = await DELETE.from(DeleteEmployeeSrv)
                              .where({ID: myData.ID});




    return results;


  });


  return super.init()
}}
