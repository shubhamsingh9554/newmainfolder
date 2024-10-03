import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeProfile = () => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]); // For available skills
  const [certifications, setCertifications] = useState([]); // For available certifications
  const [selectedSkill, setSelectedSkill] = useState(''); // For selected skill
  const [competencyLevel, setCompetencyLevel] = useState('');
  const [selectedCertification, setSelectedCertification] = useState(''); // For selected certification

  // Fetch profile data
  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/employee/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch available skills and certifications
  const fetchAvailableSkillsAndCertifications = async () => {
    const token = localStorage.getItem('token');
    try {
      const skillsRes = await axios.get('http://localhost:5000/api/admin/skills', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSkills(skillsRes.data); // Store the available skills

      const certsRes = await axios.get('http://localhost:5000/api/admin/certifications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCertifications(certsRes.data); // Store the available certifications
    } catch (err) {
      console.error(err);
    }
  };

  // Call fetchProfile and fetchAvailableSkillsAndCertifications on component mount
  useEffect(() => {
    fetchProfile();
    fetchAvailableSkillsAndCertifications();
  }, []);

  // Handle adding a skill
  const handleAddSkill = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/employee/add-skill', { skillId: selectedSkill, competencyLevel }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedSkill('');
      setCompetencyLevel('');
      fetchProfile(); // Refresh profile after adding a skill
    } catch (err) {
      console.error(err);
    }
  };

  // Handle adding a certification
  const handleAddCertification = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/employee/add-certification', { certificationId: selectedCertification }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedCertification('');
      fetchProfile(); // Refresh profile after adding a certification
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Employee Profile</h2>
      {profile ? (
        <div>
          <h3>Name: {profile.name}</h3>
          <p>Email: {profile.email}</p>

          <h4>Skills:</h4>
          <ul>
            {profile.skills.map(skill => (
              <li key={skill._id}>
                {skill.skillName} - {skill.competencyLevel}
              </li>
            ))}
          </ul>

          <h4>Certifications:</h4>
          <ul>
            {profile.certifications.map(cert => (
              <li key={cert._id}>{cert.certificationName}</li>
            ))}
          </ul>

          <h4>Add Skill</h4>
          <form onSubmit={handleAddSkill}>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              required
            >
              <option value="">Select a skill</option>
              {skills.map(skill => (
                <option key={skill._id} value={skill._id}>
                  {skill.skillName}
                </option>
              ))}
            </select>
            <select
  value={competencyLevel}
  onChange={(e) => setCompetencyLevel(e.target.value)}
  required
>
  <option value="">Select competency level</option>
  <option value="Beginner">Beginner</option>
  <option value="Intermediate">Intermediate</option>
  <option value="Advanced">Advanced</option>
</select>

            <button type="submit">Add Skill</button>
          </form>

          <h4>Add Certification</h4>
          <form onSubmit={handleAddCertification}>
            <select
              value={selectedCertification}
              onChange={(e) => setSelectedCertification(e.target.value)}
              required
            >
              <option value="">Select a certification</option>
              {certifications.map(cert => (
                <option key={cert._id} value={cert._id}>
                  {cert.certificationName}
                </option>
              ))}
            </select>
            <button type="submit">Add Certification</button>
          </form>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default EmployeeProfile;
