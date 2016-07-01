export class Registration {
  name: string;
  email: string;
  organization: string;
  organizationType: string;
  
  constructor(obj?: any) {
    this.name                   = obj && obj.name                   || null;
    this.email                  = obj && obj.email                  || null;
    this.organization           = obj && obj.organization           || null;
    this.organizationType       = obj && obj.organizationType       || null;
  }
}