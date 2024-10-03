import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [skillName, setSkillName] = useState('');
  const [certificationName, setCertificationName] = useState('');
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchSkills();
    fetchCertifications();
    fetchEmployees(); // Fetch employees when the component mounts
  }, []);

  const fetchSkills = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/admin/skills', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSkills(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCertifications = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/admin/certifications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCertifications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchEmployees = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/admin/employees', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/admin/add-skill', { skillName }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSkillName('');
      fetchSkills(); // Refresh skills list after adding a new skill
    } catch (err) {
      console.error(err);
    }
  };

  const handleCertificationSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/admin/add-certification', { certificationName }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCertificationName('');
      fetchCertifications(); // Refresh certifications list after adding a new certification
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSkill = async (skillId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/admin/skills/${skillId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSkills(); // Refresh skills list after deletion
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCertification = async (certificationId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/admin/certifications/${certificationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCertifications(); // Refresh certifications list after deletion
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* Add Skill Form */}
      <form onSubmit={handleSkillSubmit}>
        <input
          type="text"
          placeholder="Skill Name"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
        />
        <button type="submit">Add Skill</button>
      </form>

      {/* Add Certification Form */}
      <form onSubmit={handleCertificationSubmit}>
        <input
          type="text"
          placeholder="Certification Name"
          value={certificationName}
          onChange={(e) => setCertificationName(e.target.value)}
        />
        <button type="submit">Add Certification</button>
      </form>

      {/* Skills List */}
      <h3>Available Skills</h3>
      <ul>
        {skills.map(skill => (
          <li key={skill._id}>
            {skill.skillName}
            <button onClick={() => handleDeleteSkill(skill._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Certifications List */}
      <h3>Available Certifications</h3>
      <ul>
        {certifications.map(cert => (
          <li key={cert._id}>
            {cert.certificationName}
            <button onClick={() => handleDeleteCertification(cert._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Employees List */}
      <h3>Employee Profiles</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Skills</th>
            <th>Certifications</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              {/* <td>
                {employee.skills.map(skill => skill.skillName).join(', ') || 'N/A'}
              </td>
              <td>
                {employee.certifications.map(cert => cert.certificationName).join(', ') || 'N/A'}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
