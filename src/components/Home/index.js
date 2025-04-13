import { MdDelete, MdEdit } from 'react-icons/md';
import React, { useState, useEffect } from 'react';
import {Container,TabsContainer,TabButton,JobList,JobCard,DeleteButton,EditLink} from './styles.js'
import { Link } from 'react-router-dom';

const API_BASE = 'https://jobs-backend-3.onrender.com/api/jobs';

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchJobs();
  }, [filter]);

  const fetchJobs = async () => {
    const url = filter ? `${API_BASE}/status?status=${filter}` : API_BASE;
    const res = await fetch(url);
    const data = await res.json();
    setJobs(data);
  };

  const deleteJob = async (id) => {
    await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    fetchJobs();
  };

  return (
   
    <Container>
      <TabsContainer>
  {['All', 'Applied', 'Interview', 'Offer', 'Rejected'].map((status) => {
    const isActive = filter === status || (status === 'All' && filter === '');
    
    return (
      <TabButton
        key={status}
        onClick={() => setFilter(status === 'All' ? '' : status)}
        active={isActive}
      >
        {status}
      </TabButton>
    );
  })}
</TabsContainer>

      <JobList>
        {jobs.map((job) => (
          <JobCard key={job._id}>
            <p>Company: {job.company}</p>
            <p>Role: {job.role}</p>
            <p>Application-Status: {job.status}</p>
            <p>Posted on: {job.dateOfApplication}</p>
            <p>
              Apply <a href={job.link}>Here</a>
            </p>
            <DeleteButton onClick={() => deleteJob(job._id)}>
              <MdDelete size={25} />
            </DeleteButton>
            <EditLink><Link to={`/edit/${job._id}`}>
              <MdEdit size={25} />
            </Link></EditLink>
          </JobCard>
        ))}
      </JobList>
    </Container>
   
  );
}