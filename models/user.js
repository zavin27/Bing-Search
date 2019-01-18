module.exports = function (sequalize, DataTypes) {
    const User = sequalize.define("users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            
        }
    });
    User.associate = function (models) {
    
    };
    return User;
};
