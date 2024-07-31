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

  export interface EmployeeDTOResponse{
    dataUpdateResponse:DataUpdateResponse;
    employeeDTOList: EmployeeDTOList[];
  }
  