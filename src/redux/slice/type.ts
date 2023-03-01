export interface IData { 
    id: number,
    title: string,
    description: string,
  status: boolean;
  
}
export interface IState {
  data: IData[],
}