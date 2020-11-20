module.exports = mongoose => {
    const City = mongoose.model(
      "city",
      mongoose.Schema(
        {
          title: String,
        
          published: Boolean
        },
        { timestamps: true }
      )
    );
  
    return City;
  };