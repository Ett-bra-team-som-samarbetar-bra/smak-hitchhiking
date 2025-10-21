import SmakContact from "../../components/SmakContact";

const mockUsers = [
  {
    firstName: "Harold",
    lastName: "H. Pain",
    profileImage: "/images/harold.png",
    description: "En passionerad gubbe som älskar bilar babes och båtar.",
  },
  {
    firstName: "Kent",
    lastName: "Stark",
    profileImage: "/images/harold.png",
    description: "Jag kör bil!", 
  },
  {
    firstName: "Lorem",
    lastName: "Ipsumsson",
    profileImage: "/images/harold.png",
    description: "Jag har 2 rottweilers som skäller 24/7!", 
  },
  {
    firstName: "Mitsubishi",
    lastName: "Svärd",
    profileImage: "/images/harold.png",
    description: "Älskar kaffe och choklad!", 
  },


];
const isDriver = false;
const isAddedToTrip = false;
export default function ContactPage() {
  return (
    <>
      <h2 className="py-3">Dina Kontakter</h2>

      {mockUsers.map((user, index) => (
        <SmakContact key={index} user={user} isDriver={isDriver} isAddedToTrip={isAddedToTrip} />
      ))}

    </>
  )
}
