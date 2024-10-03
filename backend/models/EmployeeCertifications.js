const mongoose = require('mongoose');

const employeeCertificationsSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  certificationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Certification' },
});

const EmployeeCertifications = mongoose.model('EmployeeCertifications', employeeCertificationsSchema);
module.exports = EmployeeCertifications;
