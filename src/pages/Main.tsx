import React, { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { IEmployee } from '../types/type';
import BasicSearchForm from '../components/Main/SearchBasic';
import SearchAdvanced from '../components/Main/SearchAdvanced';
import EmployeeHeader from '../components/Main/EmployeeHeader';
import EmployeeContainer from '../components/Main/EmployeeContainer';
import { getLoggedInUser } from '../core.tsx';

import { useGetUsersQuery } from '../features/usersApi';

interface SearchCriteria {
  fullname: string;
}

interface AdvancedSearchCriteria {
  name: string;
  email: string;
  phone: string;
  zoom: string;
  building: string;
  room: string;
  department: string;
}

interface SearchToggleProps {
  isBasicSearch: boolean;
  onToggleMode: (isBasic: boolean) => void;
}

export function SearchToggle({
  isBasicSearch,
  onToggleMode,
}: SearchToggleProps): React.ReactElement {
  return (
    <div className="search flex--horizontal">
      <button
        className={`search__basic ${isBasicSearch ? 'active' : ''}`}
        onClick={() => onToggleMode(true)}
      >
        basic search
      </button>
      <button
        className={`search__advanced ${!isBasicSearch ? 'active' : ''}`}
        onClick={() => onToggleMode(false)}
      >
        advanced search
      </button>
    </div>
  );
}

const filterUsers = (
  users: IEmployee[],
  criteria: SearchCriteria
): IEmployee | undefined => {
  const { fullname } = criteria;

  const searchFullName = fullname.trim().toLowerCase();

  if (!searchFullName) {
    return undefined;
  }

  return users.find((u) => {
    const userFullName = `${u.first_name} ${u.last_name}`.toLowerCase();

    return searchFullName && userFullName.includes(searchFullName);
  });
};

const filterAdvancedUsers = (
  users: IEmployee[],
  criteria: AdvancedSearchCriteria
): IEmployee | undefined => {
  const { name, email, phone, zoom, building, room, department } = criteria;

  const searchName = name.trim().toLowerCase();
  const searchEmail = email.trim().toLowerCase();
  const searchPhone = phone.trim();
  const searchZoom = zoom.trim();
  const searchBuilding = building.trim().toLowerCase();
  const searchRoom = room.trim().toLowerCase();
  const searchDepartment = department.trim().toLowerCase();

  if (
    !searchName &&
    !searchEmail &&
    !searchPhone &&
    !searchZoom &&
    searchBuilding === 'any' &&
    !searchRoom &&
    searchDepartment === 'any'
  ) {
    return undefined;
  }

  return users.find(
    (u) =>
      (searchName &&
        `${u.first_name} ${u.last_name}`.toLowerCase().includes(searchName)) ||
      (searchEmail && u.email.toLowerCase() === searchEmail) ||
      (searchPhone && u.phone === searchPhone) ||
      (searchZoom && u.zoom_id === searchZoom) ||
      (searchBuilding !== 'any' &&
        u.building.toLowerCase() === searchBuilding) ||
      (searchRoom && u.room.toLowerCase() === searchRoom) ||
      (searchDepartment !== 'any' &&
        u.department.toLowerCase() === searchDepartment)
  );
};

export default function Main(): React.ReactElement {
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isBasicSearch, setIsBasicSearch] = useState(true);
  const navigate = useNavigate();

  const { data: allUsers = [] } = useGetUsersQuery();

  const loggedUser = useMemo(
    () => getLoggedInUser(allUsers) || null,
    [allUsers]
  );

  const isAdmin = useMemo(() => loggedUser?.role === 'Admin', [loggedUser]);

  const handleSearchSubmit = (criteria: SearchCriteria) => {
    const foundUser = filterUsers(allUsers, criteria);

    if (foundUser) {
      navigate(`/details/${foundUser._id}`);
    } else {
      setSearchError('No employee found matching the criteria.');
    }
  };

  const handleAdvancedSearchSubmit = (criteria: AdvancedSearchCriteria) => {
    const foundUser = filterAdvancedUsers(allUsers, criteria);

    if (foundUser) {
      navigate(`/details/${foundUser._id}`);
    } else {
      setSearchError('No employee found matching the criteria.');
    }
  };

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleViewChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
  };

  return (
    <>
      <Header loggedInUser={loggedUser} isAdmin={isAdmin} />
      <div className="page">
        <div className="grid-container">
          <SearchToggle
            isBasicSearch={isBasicSearch}
            onToggleMode={setIsBasicSearch}
          />
          <EmployeeHeader users={allUsers} onViewChange={handleViewChange} />
          {isBasicSearch ? (
            <BasicSearchForm onSearchSubmit={handleSearchSubmit} />
          ) : (
            <SearchAdvanced onSearchSubmit={handleAdvancedSearchSubmit} />
          )}
          {searchError ? (
            <img
              src="./svgs/not-found.jpg"
              alt="nothing found"
              className="nothing-found"
            />
          ) : (
            <EmployeeContainer users={allUsers} viewMode={viewMode} />
          )}
        </div>
      </div>
    </>
  );
}
