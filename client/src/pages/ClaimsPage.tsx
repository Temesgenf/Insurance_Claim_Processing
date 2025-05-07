import { useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Table from "../components/layout/Table";
import Button from "../components/ui/Button";

const columns = [
  "Claim ID",
  "Policy Holder",
  "Claim Type",
  "Amount",
  "Status",
  "Date Submitted",
];

const claims = [
  {
    claim_id: "CLM123456",
    policy_holder: "John Doe",
    claim_type: "Auto",
    amount: "$1,200",
    status: "Approved",
    date_submitted: "2025-04-01",
  },
  {
    claim_id: "CLM654321",
    policy_holder: "Jane Smith",
    claim_type: "Health",
    amount: "$2,500",
    status: "Pending",
    date_submitted: "2025-04-05",
  },
  {
    claim_id: "CLM789012",
    policy_holder: "Alice Johnson",
    claim_type: "Home",
    amount: "$10,000",
    status: "Rejected",
    date_submitted: "2025-04-12",
  },
];

const ClaimsPage = () => {
  const navigate = useNavigate();
  return (
    <main className="flex flex-row">
      <div>
        <Sidebar />
      </div>
      <div className=" w-screen p-10">
        <h1 className="font-bold text-[1.5rem]">Claims</h1>
        <div className="mt-5">
          <Button
            onClick={() => navigate("/user/new-claim")}
            text="Create a New Claim"
          />
        </div>
        <div>
          <Table columns={columns} data={claims} />
        </div>
      </div>
    </main>
  );
};

export default ClaimsPage;
