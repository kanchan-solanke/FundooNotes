import { optional } from '@hapi/joi';
import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        Title: {
            type: String,
            required: true,
        },
        Descreption: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: optional
        },
        isArchived: {
            type: Boolean,
        },
        isDeleted: {
            type: Boolean,
        },
        UserID: {
            type: String
        }
    },

    {
        timestamps: true
    }
);

export default model('Note', userSchema);