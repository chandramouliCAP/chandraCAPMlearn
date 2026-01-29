namespace sony.metro;
//include program where we write reusable code in a seprate file
using { sony.metro.reuse as reuse } from './myreuse';
//consuming standard reusable aspect from SAP --> Ctrl+click @sap/cds/common
using { cuid, managed, temporal  } from '@sap/cds/common';




//INCLUDE structure in ABAP
entity student: reuse.address{
    //consume the reusable type from another file
    key id: reuse.Guid;
    name: String(255);
    age: Int32;
    gender: String(2);
    rollNo: Integer64;
    //foreign key = name(class)+pk_of_fk(id) = class_id
    class: Association to one class;
}


entity class{
    key id : reuse.Guid;
    specialization: String(255);
    semester: Int16;
    hod: String(255);
    //cyclic relationship - foreign key
    //student: Association to many student on student.class = $self;
};


entity book{
    key id : reuse.Guid;
    bookName: localized String(250);
    author: String(250);
}


entity Subs : cuid, managed, temporal{
    student: Association to one student;
    book: Association to one book;
}
