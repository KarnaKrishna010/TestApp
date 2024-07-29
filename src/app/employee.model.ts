export interface IDataUpdateResponse
{
    status:Boolean;
    description:string;
    recordCount:number;
}

export interface IEmployeeDTOResponse{
    dataUpdateResponse:IDataUpdateResponse;
    employeeDTOList:IEmployeeDTOList;
}

export interface IEmployeeDTOList{
    employeeId: number;
    employeeName: string;
    mobile:string;
    email:string;
}