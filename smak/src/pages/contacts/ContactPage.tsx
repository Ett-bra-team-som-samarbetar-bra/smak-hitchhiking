import SmakContact from "../../components/SmakContact";

const mockUsers = [
  {
    firstName: "Harold",
    lastName: "H. Pain",
    profileImage: "/images/harold.png",
    description: "En passionerad gubbe som älskar bilar babes och båtar.",
    rating: 4,
  },
  {
    firstName: "Kent",
    lastName: "Stark",
    profileImage: "/images/harold.png",
    description: "En äventyrlig själ som alltid är redo för nästa resa.",
    rating: 4,
  },
  {
    firstName: "Lorem",
    lastName: "Ipsumsson",
    profileImage: "/images/harold.png",
    description: "En resglad person som älskar att upptäcka nya platser och kulturer.",
    rating: 2,
  },
  {
    firstName: "Mitsubishi",
    lastName: "Svärd",
    profileImage: "/images/harold.png",
    description: "En naturälskare som finner ro i skogens lugn och fjällens majestät.",
    rating: 5,
  },

];

export default function ContactPage() {
  return (
    <div className="d-flex flex-column gap-3">
      <h2 className="m-0">Dina Kontakter</h2>

      {mockUsers.map((user, index) => (
        <SmakContact key={index} user={user} />
      ))}
    </div>
  )
}
