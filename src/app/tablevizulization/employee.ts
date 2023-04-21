export class Employee {
    Id: string;
    EmployeeName: string;
    StartTimeUtc: string;
    EndTimeUtc: string;
    EntryNotes: string;
    DeletedOn: null;
  
    constructor(id: string, employeeName: string, startTimeUtc: string, endTimeUtc: string, entryNotes: string, deletedOn: null) {
      this.Id = id;
      this.EmployeeName = employeeName;
      this.StartTimeUtc = startTimeUtc;
      this.EndTimeUtc = endTimeUtc;
      this.EntryNotes = entryNotes;
      this.DeletedOn = deletedOn;
    }
}

