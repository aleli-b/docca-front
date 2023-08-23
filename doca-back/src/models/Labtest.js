const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'labtest',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            lab_test_url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            labId: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
            },
            doctorId: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
            },
        },
        {
            timestamps: true
        }
    );
};
