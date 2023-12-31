import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: [true, "Account already exists"],
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, "Please enter your email"],
        minLength: [4, "Your password must be at least 4 characters long"],
        select: false, //don't send back password after request
    },
    name: {
        type: String,
    },
    role: {
        type: String,
        default: 'driver',
        enum: {
            values: [
                'admin',
                'manager',
                'driver'
            ],
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

// ENCRYPTION 
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}


export default mongoose.models.User || mongoose.model('User', userSchema)