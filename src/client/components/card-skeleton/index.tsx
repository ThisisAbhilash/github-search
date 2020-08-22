import React, { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import './style.css';

interface SkeletonProps {
  ref?: any;
  size: number;
  page: number;
}

const CardSkeleton: FC<SkeletonProps> = (props: SkeletonProps) => {
  return (
    <>
      {props.page === 1 && (
        <h2 className="section-title">
          <Skeleton height={28} width={300} />
        </h2>
      )}

      <ul className="list">
        {new Array(props.size).fill(0).map((item, index) => (
          <li className="card" key={index}>
            <Skeleton height={180} />
            <h4 className="card-title">
              <Skeleton height={36} width={`80%`} />
            </h4>
            <p className="card-channel">
              <Skeleton width={`60%`} />
            </p>
            <div>
              <Skeleton width={`90%`} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CardSkeleton;
