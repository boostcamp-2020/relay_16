module.exports = (sequelize, DataTypes) => {

    const userservey = sequelize.define(
        "userservey", // 테이블 이름
        {
            // 스키마 정의
            userid: {
                // column 이름
                type: DataTypes.STRING(255), // 데이터 타입 설정
                primaryKey: true,
            },
            mbti: {
                type:  DataTypes.STRING(255), 
                allowNull: false
            },
            movie: {
                type:  DataTypes.STRING(255), 
                allowNull: false
            },
            music: {
                type:  DataTypes.STRING(255), 
                allowNull: false
            },
            location: {
                type:  DataTypes.STRING(255), 
                allowNull: false
            },
            is_mint: {
                type:  DataTypes.BOOLEAN, 
                allowNull: false
            },
            is_boumeok: {
                type:  DataTypes.BOOLEAN, 
                allowNull: false
            },
            is_earlybird: {
                type:  DataTypes.BOOLEAN, 
                allowNull: false
            },
            like_drink: {
                type:  DataTypes.BOOLEAN, 
                allowNull: false
            },
        }, {
            // 테이블 옵션
            timestamps: true,
            underscored: true,
            paranoid: true
        }
    );

    userservey.associate = m => {
        userservey.belongsTo(m.user, {
          foreignKey: 'userid'
      })
    }
    
    return userservey
};