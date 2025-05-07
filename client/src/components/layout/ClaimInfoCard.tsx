const ClaimInfoCard = () => {
  return (
    <div className="flex flex-col border border-gray-200 shadow-md min-h-[10rem]">
      <div className="bg-gray-100 p-2">
        <h1 className="font-bold">Claim Information</h1>
      </div>
      <div className="p-2 pb-8 pt-4">
        <p className="text-sm">Claim Status</p>
        <p className="font-bold text-sm">Pending, Submitted</p>
      </div>
    </div>
  );
};

export default ClaimInfoCard;
