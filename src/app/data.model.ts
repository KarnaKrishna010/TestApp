export interface EmployeeDTOList {
    employeeId: string;
    employeeName: string;
    mobile:string;
    email:string;
    dateOfJoining: Date; 
    dateOfBirth: Date; 
    salary: string;
  }

  export interface DataUpdateResponse{
    status:boolean;
    description: string;
    recordCount:number;
  }

  export interface EmployeeDTODeletedList{
    employeeId:string;
    employeeName:string;
    mobile:string;
    email:string;
    dateOfBirth:Date;
    dateOfJoining:Date;
    salary:string;
  }

  export interface EmployeeDTOResponse{
    dataUpdateResponse:DataUpdateResponse;
    employeeDTOList: EmployeeDTOList[];
  }

  export interface EmployeeDeletedDTOResponse{
    dataUpdateResponse:DataUpdateResponse;
    employeeDTODeletedList:EmployeeDTODeletedList[];
  }

  export interface EmployeeDTOAdd{
    employeeName:string;
    mobile:string;
    email:string;
    dateOfJoining:Date;
    dateOfBirth:Date;
    salary:string;
  }

  export interface EmployeeDTOEdit{
    employeeId:string;
    employeeName:string;
    mobile:string;
    email:string;
    dateOfJoining:Date;
    dateOfBirth:Date;
    salary:string;
  }


  