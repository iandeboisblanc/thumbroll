// id
// name
// date
// classId (fkey to classes id)

"use strict";

module.exports = function(sequelize, DataTypes) {
  var lessons = sequelize.define("lessons", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    // foreign key
    // classId: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        lessons.belongsTo(models.classes, {
          foreignKey: 'class_id',
          onDelete: 'set null',
          onUpdate: 'cascade'
        }); 
        lessons.hasMany(models.polls, {
          foreignKey: 'lesson_id',
          onDelete: 'set null',
          onUpdate: 'cascade'
        }); 
      }
    }
  });
  return lessons;
};