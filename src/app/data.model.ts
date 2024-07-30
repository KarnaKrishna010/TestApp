export interface DummyData {
    id: string;
    employeeId: string;
    employeeName: string;
    mobile:string;
    email:string;
    dateOfJoining: Date; // Change to Date type
    dateOfBirth: Date; // Change to Date type
    salary: string;
  }

  export interface DataUpdateResponse{
    Status:boolean;
    Message?: string;
  }

  export interface EmployeeDTOResponse{
    dataUpdateResponse:DataUpdateResponse;
    employeeDTOList: DummyData[];
  }
  