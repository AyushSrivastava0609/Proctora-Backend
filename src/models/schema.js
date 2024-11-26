module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("order", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            type: DataTypes.INTEGER
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        order_status: {
            type: DataTypes.ENUM('initiate', 'order-placed', 'delivered', 'return', 'refunded'),
            defaultValue: 'initiate'
        },
        order_number: {
            type: DataTypes.STRING,
            allowNull: true
        },
        invoice_number: {
            type: DataTypes.STRING,
            allowNull: true
        },
        order_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        products: {
            type: DataTypes.JSON,
            allowNull: true
        },
        billing_address: {
            type: DataTypes.JSON,
            allowNull: true
        },
        shipping_address: {
            type: DataTypes.JSON,
            allowNull: true
        },
        expected_delivery: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        total_item: {
            type: DataTypes.INTEGER,
        },
        sub_total: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        tax_amount: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        total_amount: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        currency: {
            type: DataTypes.ENUM('USD', 'INR'),
            defaultValue: "USD",
        },
        payment_method: {
            type: DataTypes.STRING,
            allowNull: true
        },
    }, {
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
    })

    Order.associate = models => {
        Order.belongsTo(models.users, {
            foreignKey: 'user_id',
            as: 'user'
        });
    }

    return Order;
};
