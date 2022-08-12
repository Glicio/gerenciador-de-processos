import api from "../Api";

export class Estado {
  private id: string;
  private descricao: string;
  constructor(id: string = "", descricao: string) {
    this.id = id;
    this.descricao = descricao;
  }

  public getId(){
    return this.id
  }

  public getDescicao(){
    return this.descricao
  }


  public async save(): Promise<any> {
    return api.get("/status/create",{descricao: this.descricao})
  }

  public delete(){

  }

}

function getAllEstados(): Estado[] {
    return []
} 
