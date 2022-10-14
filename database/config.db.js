const mongoose = require('mongoose');
require('colors');



const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_ATLAS_CNN)

        console.log(`Base de datos online`.rainbow)

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la DB') //Si la bd no esta on manda este err
    }


}



module.exports = {
    dbConnection
}
