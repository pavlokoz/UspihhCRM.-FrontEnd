import { Role } from 'src/app/models/role';

export class Constants {
    static CurrentBackEndHost: string = 'https://localhost:44317/';
    
    //Constants for AuthorizationService
    static AuthorizationServiceConstants = class {

        static UrlForAuthorization: string = Constants.CurrentBackEndHost + 'Token';

        static UrlForRegistration: string = Constants.CurrentBackEndHost + 'api/Account/Register';
    }

    //Constants for data validation
    static DataValidationConstants = class {

        static NamePattern: string = "^[а-яА-ЯёЁa-zA-Zʼ'ї Ї і І є Є-]{2,40}$";

        static PasswordPattern: string = '((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!]).{8,20})';

        static EmailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$';
    }    

    static RegistrationConstants = class {
        static UserRoles: Role[] = [
            {
                RoleId: 1,
                RoleDescription: 'Director' 
            },
            {
                RoleId: 2,
                RoleDescription: 'Teacher' 
            },
            {
                RoleId: 3,
                RoleDescription: 'Accountant' 
            }
         ];
         static GrantType: string = 'grant_type=password';
         static Email: string = 'Email=';
         static Password: string = 'Password=';
         static ConfirmPassword: string = 'ConfirmPassword=';
         static FirstName: string = 'FirstName=';         
         static LastName: string = 'LastName=';
         static Role: string = 'Role=';
         static DateOfBirth: string = 'DateOfBirth=';
    }
}