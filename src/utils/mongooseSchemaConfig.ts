const mongooseSchemaConfig = {
  id: true,
  versionKey: false,
  timestamps: true,
  autoIndex: true,
  toJSON: {
    virtuals: true,
    transform: (_: any, ret: any) => {
      // Remove sensitive and unnecessary fields before sending data to the frontend
      delete ret.password; // Ensure this matches the schema field name
      delete ret.salt;
      delete ret.visible;
      delete ret.code;
      delete ret.secretQuestions;

      // Optionally remove the _id field and replace it with id (if needed)
      ret.id = ret._id;
      delete ret._id;

      return ret;
    },
  },
  toObject: {
    virtuals: true,
    transform: (_: any, ret: Record<string, any>) => {
      delete ret.password; // Ensure this matches the schema field name
      delete ret.salt;
      delete ret.visible;
      delete ret.code;
      delete ret.secretQuestions;

      // Optionally remove the _id field and replace it with id (if needed)
      ret.id = ret._id;
      delete ret._id;

      return ret;
    },
  },
};

export default mongooseSchemaConfig;
