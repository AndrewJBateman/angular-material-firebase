export class Project {
  id?: string;
  title: string;
  description: string;
  reference: string;
  deadline: Date;
  accessCode: number;
  createdDate: Date;
  updatedDate: Date;

  constructor(
    title: string,
    description: string,
    reference: string,
    accessCode: number,
    deadline: string,
    createdDate: string,
    updatedDate: string
  ) {
    this.title = title;
    this.description = description;
    this.reference = reference;
    this.deadline = new Date();
    this.accessCode = accessCode;
    this.createdDate = new Date();
    this.updatedDate = new Date();
  }
}
