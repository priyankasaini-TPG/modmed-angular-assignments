export class UserService{

    usersArray: string[] = [];
    userShow: boolean = true;

    loginUserName: string = "Priyankasaini";
    loginPassword: string = "12345";

    userAdded(item: string){
        this.usersArray.push(item);
        console.log("New user is added.");
    }
}