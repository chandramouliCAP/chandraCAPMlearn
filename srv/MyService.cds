using{ anubhav.db.master} from '../db/datamodel';
using{ cappo.cds.CDSViews } from '../db/CDSViews';
//service definition
service MyService @(path:'MyService') {
    //service end point /hello
    function hello(name:String) returns String;
     @readonly
    entity ReadEmployeeSrv as projection on master.employees;
    @insertonly
    entity InsertEmployeeSrv as projection on master.employees;
    @updateonly
    entity UpdateEmployeeSrv as projection on master.employees;
    @deleteonly
    entity DeleteEmployeeSrv as projection on master.employees;
    @readonly
  entity itemdata as projection on CDSViews.ItemView;
}

