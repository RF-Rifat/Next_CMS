import Table from "@/components/ui/Table";

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "David" },
  { id: 5, name: "Eve" },
  { id: 6, name: "Frank" },
  { id: 7, name: "Grace" },
  { id: 8, name: "Hannah" },
  { id: 9, name: "Ivy" },
  { id: 10, name: "Jack" },
  { id: 11, name: "Kevin" },
  { id: 12, name: "Liam" },
];

const Page = () => {
  return (
    <div className="container p-4">
        <Table name="Menu" link="/nx-admin/menu/add">
        {users.map((user) => (
            <div key={user.id} className="p-2 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
                {user.name}
            </div>
            <div className="flex items-center md:justify-end justify-center md:gap-3 gap-6">
                <button>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                >
                    <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    >
                    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path>
                    </g>
                </svg>
                </button>
                <button>
                <svg
                    className="text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    viewBox="0 0 24 24"
                >
                    <path
                    fill="currentColor"
                    d="M7.616 20q-.672 0-1.144-.472T6 18.385V6H5V5h4v-.77h6V5h4v1h-1v12.385q0 .69-.462 1.153T16.384 20zM17 6H7v12.385q0 .269.173.442t.443.173h8.769q.23 0 .423-.192t.192-.424zM9.808 17h1V8h-1zm3.384 0h1V8h-1zM7 6v13z"
                    ></path>
                </svg>
                </button>
            </div>
            </div>
        ))}
        </Table>
    </div>
  );
};

export default Page;