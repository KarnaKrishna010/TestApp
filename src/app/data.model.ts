export interface DummyData {
    id: string;
    EmployeeId: string;
    EmployeeName: string;
    Mobile:string;
    Email:string;
    DateOfJoining: Date; // Change to Date type
    DateOfBirth: Date; // Change to Date type
    Salary: string;
  }

  export interface DataUpdateResponse{
    Status:boolean;
    Message?: string;
  }

  export interface EmployeeDTOResponse{
    dataUpdateResponse:DataUpdateResponse;
    employeeDTOList: DummyData[];
  }
  