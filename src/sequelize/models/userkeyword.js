module.exports = (sequelize, DataTypes) => {

    const userkeyword = sequelize.define(
        "userkeyword", // 테이블 이름
        {
            // 스키마 정의
            id: {
                // column 이름
                type: DataTypes.INTEGER(11), // 데이터 타입 설정
                primaryKey: true,
                allowNull: false, // null 허용 설정
                autoIncrement: true
            },
            userid: {
                type: DataTypes.STRING(255), // 데이터 타입 설정
                primaryKey: true,
                allowNull: false // null 허용 설정
            },
            keyword: {
                type:  DataTypes.STRING(255), 
                allowNull: false
            },
        }, {
            // 테이블 옵션
            timestamps: true,
            underscored: true,
            paranoid: true
        }
    );

    userkeyword.associate = m => {
        userkeyword.belongsTo(m.user, {
            foreignKey: 'userid'
        })
    }
    return userkeyword
};