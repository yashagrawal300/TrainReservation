var seats = [
    [0, 0, 0, 0, 0, 0, 0, 7],
    [0, 0, 0, 0, 0, 0, 0, 7],
    [0, 0, 0, 0, 0, 0, 0, 7],
    [0, 0, 0, 0, 0, 0, 0, 7],
    [0, 0, 0, 0, 0, 0, 0, 7],
    [0, 0, 0, 0, 0, 0, 0, 7],
    [0, 0, 0, 0, 0, 0, 0, 7],
    [0, 0, 0, 0, 0, 0, 0, 7],
    [0, 0, 0, 0, 0, 0, 0, 7],
    [0, 0, 0, 0, 0, 0, 0, 7],
    [0, 0, 0, 0, 0, 0, 0, 7],
    [0, 0, 0, 3]
]

function fillSeatsArrayFromDB(filledSeatData){
    filledSeatData.forEach(seat=>{
        const row = seat.charCodeAt(0) -65;
        const index = parseInt(seat[1]) -1;
        seats[row][index] = 1;
        seats[row][seats[row].length - 1] -=1
    })
}

function getTotalEmptySeats(){
    var totalCount = 0;

    seats.forEach(seat => {
        totalCount+= seat[seat.length -1]
    });

    return totalCount;

}



function getSeatNumber(arr, index, numberOfSeats){
    const seatNumber = []
    
    for(let i=0; i<arr.length-1; i++){

        if(arr[i] === 0){
            if(numberOfSeats > 0){
                numberOfSeats-=1
                seatNumber.push(String.fromCharCode(index+65) + (i+1))
                seats[index][i] = 1;
                seats[index][seats[index].length-1] -=1;
                
            }
        }
    }
    return seatNumber;
}

function bruteForce(numberOfSeats){
    const seatsReserved = [];
    console.log("runing brute force");

    const totalSeats = getTotalEmptySeats();
    if(totalSeats< numberOfSeats){
        return ["Less Seats Available"]
    }



    for(let i=0; i<seats.length; i++){
        for(let j=0; j<seats[i].length-1; j++){

            if(seats[i][j] === 0 && numberOfSeats>0){

                seatsReserved.push(String.fromCharCode(i+65) + (j+1))
                numberOfSeats-=1
                seats[i][j] = 1
                seats[i][seats[i].length -1] -= 1
            }
            else if(numberOfSeats===0){
                return seatsReserved
            }
        }
    }

    return seatsReserved;

}



function allocationSeats(numberOfSeats){
    let minimumIndex = 0;
    let minimumNumber = 100;
    let flag = true;


    for(let i=0; i<seats.length; i++){
        const seatsLeft = seats[i][seats[i].length-1];

        if(numberOfSeats === seatsLeft){
            console.log(numberOfSeats, "seatsLeft", seatsLeft);
            return getSeatNumber(seats[i], i, numberOfSeats)
        }

        else if(minimumNumber> numberOfSeats && numberOfSeats < seatsLeft){
            minimumNumber = numberOfSeats;
            minimumIndex = i;
            flag =false

        }

    }

    if(flag){
        return bruteForce(numberOfSeats)
    }

    return getSeatNumber(seats[minimumIndex], minimumIndex, numberOfSeats)

}



function oneTimeRun(){
    console.log("Running oneTimeRun")
    const filledSeatData = ["A1", 'B4', 'B5', 'B6','B7', 'C4', 'C5', 'C6','C7']

    fillSeatsArrayFromDB(filledSeatData);
}


function seatAllocation(NumberOfSeats){
    //Get the array with filled seats
   
    const totalSeatsLeft = getTotalEmptySeats();
    console.log(totalSeatsLeft, NumberOfSeats, typeof NumberOfSeats);

    if(NumberOfSeats>7 || totalSeatsLeft<NumberOfSeats){
        return ["Not allowed"]
    }

    console.log(seats);
    return allocationSeats(NumberOfSeats)

}
oneTimeRun();


module.exports = {
    seatAllocation
}