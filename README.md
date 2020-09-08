Simple trip sharing application using Express-JS and MongoDB.

To run the application:

1. Create a file inside the root directory named .env
Inside specify your environment variables such as database URI and your private key strings as well as server port.

EXAMPLE of .env file:
DB_HOST = mongodb://localhost:27017/tripp
JWT_SECRET = SUPER_SECRET_JWT-KEY
BCRYPT_SECRET = SUPER_SECRET_BCRYPT_KEY
SERVER_PORT = 3000

2. Navigate to the root folder with the terminal and type:
npm install  : to install all the dependencies

3. Make sure you've started your local MongoDB service (read mongodb docs for your particular OS)
and then type node index.js into the terminal.

The app is now accessible via localhost on the port you've specified in the .env file.



***This is a demo app from my javascript training course!***



