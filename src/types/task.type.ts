

export interface Task {
    id : number;
    title : string;
    description : string;
    createAt : Date;
    type : "todo" | "done",
}