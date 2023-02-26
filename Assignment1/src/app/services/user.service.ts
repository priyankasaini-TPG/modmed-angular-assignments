export class UserService{

    usersArray: string[] = ["hariom","priyanka"];
    loginUserName: string = "Priyankasaini";
    password: string = "1234";

    userAdded(item: string){
        this.usersArray.push(item);
        console.log("New user is added.");
    }
}