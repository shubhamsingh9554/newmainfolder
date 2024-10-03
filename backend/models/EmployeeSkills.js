const mongoose = require('mongoose');

const employeeSkillSchema = new mongoose.Schema({
  skillId: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  competencyLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'], // Only these values are allowed
    required: true
  }
});

const EmployeeSkill = mongoose.model('EmployeeSkill', employeeSkillSchema);

module.exports = EmployeeSkill;
