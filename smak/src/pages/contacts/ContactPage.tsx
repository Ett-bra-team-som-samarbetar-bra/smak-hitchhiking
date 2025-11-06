import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SmakContact from "../../components/SmakContact";
import { useAuth } from "../../hooks/useAuth";
import type User from "../../interfaces/User";

export default function ContactPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [contacts, setContacts] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    async function fetchContacts() {
      try {
        const response = await fetch(`/api/expand/Contact`);
        if (!response.ok) throw new Error('Failed to fetch contacts');
        const allContacts: any[] = await response.json();

        const userContacts = allContacts
          .filter(contact => contact.user?.[0]?.id === user!.id)
          .map(contact => {
            const contactUser = contact.contact[0];
            return {
              id: contactUser.id,
              username: contactUser.username,
              email: contactUser.email || '',
              firstName: contactUser.firstName || '',
              lastName: contactUser.lastName || '',
              phoneNumber: contactUser.phone || '',
              description: contactUser.description || '',
              rating: contactUser.rating || 0,
              tripCount: contactUser.tripCount || 0,
              preferences: contactUser.preferences || [],
              roles: contactUser.roles || [],
            };
          });

        setContacts(userContacts);
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
              id: contact.id,
              firstName: contact.firstName || "",
              lastName: contact.lastName || "",
              rating: contact.rating || 0,
              description: contact.description || ""
            }}
            onClick={() => handleUserClick(contact)}
          />
        ))
      )}
    </div>
  );
}
