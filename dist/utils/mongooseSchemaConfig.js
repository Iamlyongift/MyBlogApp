"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongooseSchemaConfig = {
    id: true,
    versionKey: false,
    timestamps: true,
    autoIndex: true,
    toJSON: {
        virtuals: true,
        transform: (_, ret) => {
            delete ret.password;
            delete ret.salt;
            delete ret.visible;
            delete ret.code;
            delete ret.secretQuestions;
            ret.id = ret._id;
            delete ret._id;
            return ret;
        },
    },
    toObject: {
        virtuals: true,
        transform: (_, ret) => {
            delete ret.password;
            delete ret.salt;
            delete ret.visible;
            delete ret.code;
            delete ret.secretQuestions;
            ret.id = ret._id;
            delete ret._id;
            return ret;
        },
    },
};
exports.default = mongooseSchemaConfig;
