import { useEffect, useState } from 'react';
import { AdminData } from '@/types/admindata';
import UserCard from './UserCard';
import styled from 'styled-components';
import { fetchAdminData } from '@/apis/admin.api';

// Styled Components
const UserListContainer = styled.div`
  width: 600px;
  margin: 0;
  padding-left: 10px;
  max-height: 500px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const ListItem = styled.div`
  margin-bottom: 12px; /* 리스트 아이템 간 간격 추가 */
  margin-top: 12px;
  margin-right: 12px;
`;

const DropdownContent = styled.div`
  background-color: #f9f9f9;
  padding: 16px;
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 0 0 8px 8px;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const DeleteButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e33e3e;
  }
`;

const UserList = () => {
  const [users, setUsers] = useState<AdminData[]>([]);
  const [openUserId, setOpenUserId] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    setOpenUserId((prev) => (prev === id ? null : id));
  };

  const handleDeleteUser = (id: number) => {
    alert(`회원탈퇴: 유저 ID ${id}`);
  };

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchAdminData();
        setUsers(data);
      } catch (error) {
        console.error('Failed to load users:', error);
      }
    };

    loadUsers();
  }, []);

  return (
    <UserListContainer>
      {users.map((user) => (
        <ListItem key={user.id}>
          <div onClick={() => toggleDropdown(user.id)}>
            <UserCard
              nickname={user.nickname}
              email={user.email}
              createdAt={user.created_at}
              icon={user.icon}
              isOpen={openUserId === user.id}
            />
          </div>

          {openUserId === user.id && (
            <DropdownContent>
              <p>유저 ID: {user.id}</p>
              <p>닉네임: {user.nickname}</p>
              <p>이메일: {user.email}</p>
              <p>가입 일자: {user.created_at}</p>
              <DeleteButton onClick={() => handleDeleteUser(user.id)}>
                회원탈퇴
              </DeleteButton>
            </DropdownContent>
          )}
        </ListItem>
      ))}
    </UserListContainer>
  );
};

export default UserList;
