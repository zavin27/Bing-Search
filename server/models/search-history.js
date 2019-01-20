module.exports = function (sequalize, DataTypes) {
    const SearchHistory = sequalize.define("search-history", {
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });
    SearchHistory.associate = function (models) {
        SearchHistory.belongsTo(models.User)
    };
    return SearchHistory;
};
