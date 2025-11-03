import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SmakContact from "../../components/SmakContact";
import { useAuth } from "../../hooks/useAuth";
import type User from "../../interfaces/User";

interface Contact {
  id: string;
  userId: {
    userIds: string[];
  };
  contactId: {
    userIds: string[];
  };
}

export default function ContactPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [contacts, setContacts] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    async function fetchContacts() {
      try {
        const response = await fetch(`/api/Contact`);
        if (!response.ok) throw new Error('Failed to fetch contacts');
        const allContacts: Contact[] = await response.json();
        
        const userContacts = allContacts.filter(contact => 
          contact.userId.userIds[0] === user!.id
        );

        const contactsWithUserData = await Promise.all(
          userContacts.map(async (contact) => {
            const userResponse = await fetch(`/api/auth/user/${contact.contactId.userIds[0]}`);
            const userData = await userResponse.json();
            return userData;
          })
        );

        setContacts(contactsWithUserData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setLoading(false);
      }
    }

    fetchContacts();
  }, [user]);

  const handleUserClick = (contact: User) => {
    navigate(`/profile/${contact.id}`, { state: { user: contact } });
  };

  return (
    <div className="d-flex flex-column gap-3">
      <h2 className="m-0">Dina Kontakter</h2>

      {loading ? (
        <p className="text-muted">Laddar kontakter...</p>
      ) : contacts.length === 0 ? (
        <p className="text-muted">Inga kontakter ännu</p>
      ) : (
        contacts.map((contact) => (
          <SmakContact 
            key={contact.id} 
            user={{
              firstName: contact.firstName || contact.username,
              lastName: contact.lastName || '',
              profileImage: `/media/_Users/${contact.id}/${contact.id}`,
              rating: contact.rating || 0,
              description: contact.description || ''
            }}
            onClick={() => handleUserClick(contact)} 
          />
        ))
      )}
    </div>
  );
}
