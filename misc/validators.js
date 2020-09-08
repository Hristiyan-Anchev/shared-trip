module.exports = {
    isValidEmail: function(email){
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
        const error = new Error("Invalid credentials!");

        if(regex.test(email)){
            return true;
        }
        throw error;
    },
    isValidPassword: function(password){
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
        const error = new Error("Invalid credentials!");

        if(regex.test(password)){
            return true;
        }
        throw error;
    },
    returnDBError: function(props){
        return props.reason.message;
    },
    isValidURL:function(URL){
        const regex = /(^http[s]?:\/{2})|(^www)|(^\/{1,2})/gim;
        const error = new Error("Invalid URL!");

        if(regex.test(URL)){
            return true;
        }
        throw error;
    },
    validateSeats:function(seatsNumber){
        const regex = /[123456]/g
        const result = regex.test(seatsNumber) && !isNaN(seatsNumber);

        const error =  new Error("Seats must be between 1-6");
        if(result){
            return true;
        }
        throw error;
    },isValidDestination:function(destination){
        const regex = /[\w\d ]+/;
        const error = new Error("Origin-Destination contains invalid symbols!");
        const tripEndPoints = destination.split("-");
        const result = regex.test(tripEndPoints[0] && regex.test(tripEndPoints[1]))

        if(result){
            return true;
        }
        throw error;

    },isValidDate(date){
        const regex = /^\d{1,2} [a-zA-Z]+ \d{4} - [012]\d:[012345]\d$/g;
        const error = new Error("Invalid date!");
        const result = regex.test(date);

        if(result){
            return true;
        }

        throw error;
    }
}