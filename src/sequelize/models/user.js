module.exports = (sequelize, DataTypes) => {
   
    const user =sequelize.define(
      "user", // 테이블 이름
      {
        // 스키마 정의
        id: {
          // column 이름
          type: DataTypes.STRING(255), // 데이터 타입 설정
          primaryKey: true,
          allowNull: false // null 허용 설정
        },
        password: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
      },
      {
        // 테이블 옵션
        timestamps: true,
        underscored: true,
        paranoid: true
      }
    );

    return user
  };