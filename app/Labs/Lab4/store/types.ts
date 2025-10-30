export interface Todo {
    id: string;
    title: string;
  }
  
  export interface HelloState {
    message: string;
  }
  
  export interface CounterState {
    count: number;
  }
  
  export interface AddState {
    sum: number;
  }
  
  export interface TodosState {
    todos: Todo[];
    todo: Todo;
  }
  
  export interface Lab4State {
    helloReducer: HelloState;
    counterReducer: CounterState;
    addReducer: AddState;
    todosReducer: TodosState;
  }
  