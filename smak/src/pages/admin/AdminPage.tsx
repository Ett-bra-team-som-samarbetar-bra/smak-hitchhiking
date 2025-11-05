import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type User from "../../interfaces/User";
import SmakContact from "../../components/SmakContact";
import SmakButton from "../../components/SmakButton";
import InputFormNumber from "../../components/inputForms/InputFormNumber";

export default function AdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userList, setUserList] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    async function fetchUserList() {
      try {
        const response = await fetch(
          `/api/auth/user?page=${page}&pageSize=${pageSize}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setUserList(data.users);
        setTotalPages(data.totalPages);
        setTotalUsers(data.totalUsers);
      } catch (error) {
      }
    }
    fetchUserList();
  }, [page, pageSize]);

  if (!user || !user.roles.includes("Administrator")) {
    navigate("/");
    return null;
  }

  const handleUserClick = (contact: User) => {
    navigate(`/profile/${contact.id}`, { state: { user: contact } });
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setPageSize(0);
      return;
    }

    const newPageSize = parseInt(e.target.value, 10);
    if (!isNaN(newPageSize) && newPageSize > 0) {
      setPageSize(newPageSize);
      setPage(1);
    }
  };

  return (
    <div className="d-flex flex-column gap-3">
      <h1>Välkommen {user.firstName}!</h1>
      <InputFormNumber
        placeholder="0"
        label="Sidstorlek"
        value={pageSize}
        setFormProp={handlePageSizeChange}
      />
      <p>
        Visar sida {page} med {pageSize} användare{" "}
      </p>
      {userList &&
        userList.map((user) => (
          <SmakContact
            key={user.id}
            user={{
              id: user.id,
              firstName: user.firstName || user.username,
              lastName: user.lastName || "",
              rating: user.rating || 0,
              description: user.description || "",
            }}
            onClick={() => handleUserClick(user)}
          />
        ))}
      <p>Totalt antal användare: {totalUsers}</p>
      <p>Totalt antal sidor: {totalPages}</p>
      <div className="d-flex justify-content-between gap-2">
        <SmakButton
          disabled={page === 1}
          onClick={() => {
            if (page > 1) {
              const newPage = page - 1;
              setPage(newPage);
            }
          }}
          className={page === 1 ? "opacity-50 cursor-not-allowed" : ""}
        >
          Föregående sida
        </SmakButton>
        <SmakButton
          disabled={page === totalPages}
          onClick={() => {
            if (page < totalPages) {
              const newPage = page + 1;
              setPage(newPage);
            }
          }}
          className={page === totalPages ? "opacity-50 cursor-not-allowed" : ""}
        >
          Nästa sida
        </SmakButton>
      </div>
    </div>
  );
}
