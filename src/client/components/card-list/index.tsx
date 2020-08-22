import React, { FC } from 'react';
import './style.css';

interface RepoProps {
  search_type: string;
  login: string;
  id: string;
  repos_url: string;
  avatar_url: string;
  full_name: string;
  private: boolean;
  html_url: string;
  owner: any;
  description: string;
  created_at: string;
  updated_at: string;
  stargazers_count: string;
  watchers_count: string;
  language: string;
  forks_count: string;
  open_issues_count: string;
}

const Card: FC<RepoProps> = (props: RepoProps) => {
  const {
    search_type,
    login,
    id,
    avatar_url,
    html_url,
    owner = {},
    full_name,
    description,
    updated_at = new Date(),
    stargazers_count,
    forks_count,
    open_issues_count,
  } = props;

  return (
    <li key={id} className="card">
      <a
        href={html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-link"
      >
        <img
          src={owner.avatar_url || avatar_url}
          alt={full_name}
          className="card-image"
        />
        <h4 className="card-title">
          {search_type === 'repositories' && (
            <>
              {description} &bull; Author: {full_name}
            </>
          )}
          {search_type === 'users' && <>{login}</>}
        </h4>
        <p className="card-channel">
          {search_type === 'repositories' && (
            <i>Last Updated : {new Date(updated_at).toISOString()}</i>
          )}
        </p>
        <div className="card-metrics">
          {search_type === 'repositories' && (
            <>
              Stars: {stargazers_count} &bull; Forks: {forks_count} &bull; Open
              Issues: {open_issues_count}
            </>
          )}
        </div>
      </a>
    </li>
  );
};

export default Card;
