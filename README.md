
![logo](https://github.com/Akshay-Tomar-1135/AutoRem/assets/75598614/7ef5a9e4-8769-4bd8-9214-a408413acbf7)



# AutoRem Project

AutoRem is a web application designed to help users manage appointments, reminders, and schedules efficiently. The application aims to streamline the appointment scheduling process, send reminders to users, and keep track of their appointments.

## Features

- User registration and login.
- User profile management.
- Appointment creation and management.
- Automated email reminders for appointments.
- User-friendly interface.


## Tech Stack

**Client:** 
- Frontend: React.js, CDBReact (Component Library)
- Styling: CSS, Bootstrap

**Server:** 

- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- Email Sending: Nodemailer
## Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/AutoRem.git
   ```

2. Install dependencies:

   ```bash
   cd AutoRem
   npm install
   ```
3. Set up environment variables:

Create a .env file in the root directory and add the following variables:
   ```bash
   MONGO_URL=<your-mongodb-connection-url>
   SECRET_KEY=<your-secret-key>
   EMAIL=<your-email>
   PASSWORD=<your-email-password>
   ```
- The PASSWORD to be used here is Google App-password which can be created by going to google account settings.
- SECRET_KEY can be any 32 character long text

4. Run the development server:
```bash
npm start
```


## Usage

- Register a new account using your email and password.
- Log in with your registered credentials.
- Create appointments, provide details, and set reminders.
- Edit and delete appointments as needed.
- View your appointments on the dashboard.
- Receive automated email reminders for your appointments.
- Log out when you're done.
## Screenshots

### Login Page
![image](https://github.com/Akshay-Tomar-1135/AutoRem/assets/75598614/9cfeae8f-39eb-457e-9dc7-ff7e729f0d1e)


### Sign up Page
![image](https://github.com/Akshay-Tomar-1135/AutoRem/assets/75598614/d2b7a644-7bef-44d7-bc83-efc641502bf6)

### Home Page
![image](https://github.com/Akshay-Tomar-1135/AutoRem/assets/75598614/74b6900c-ade6-4c87-918e-5709a00d7f8c)



## Contributing

Contributions are welcome! 

Feel free to submit pull requests or open issues if you encounter any problems or have suggestions for improvements.


## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.


## Authors

[@Akshay Tomar](https://www.github.com/Akshay-Tomar-1135)

