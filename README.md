# TrainReservation


Seat allocation is done in a optimial manner see Utils/seatAllocation.js

seats are indexed like -- rows is in upperCase alphabet(eg A, B, D) and columns has numbers.

A simple matrix is created with perfect distribution of seats and in each row last element keeps the count of remaining seats in the row.

To use: - 

Call the /addData endpoint with json data and it will return the seats allocated.
This will be saved into the mongoDB

To clear the whole data use delete method /deleteWholeData from DB

Inital seats have been allocated.

You can find the schemas in /Models folder.

Server can serve the frontend as well. just need to build the react app first.


 
