const Employee = require('../models/Employee');
const EmployeeSkills = require('../models/EmployeeSkills');
const EmployeeCertifications = require('../models/EmployeeCertifications');

exports.getEmployeeProfile = async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.userId)
      .populate('skills')
      .populate('certifications');
    res.json(employee);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.addEmployeeSkill = async (req, res) => {
  const { skillId, competencyLevel } = req.body;

  try {
    const newSkill = new EmployeeSkills({
      employeeId: req.user.userId,
      skillId,
      competencyLevel,
    });
    await newSkill.save();

    res.json(newSkill);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.addEmployeeCertification = async (req, res) => {
  const { certificationId } = req.body;

  try {
    const newCertification = new EmployeeCertifications({
      employeeId: req.user.userId,
      certificationId,
    });
    await newCertification.save();

    res.json(newCertification);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
