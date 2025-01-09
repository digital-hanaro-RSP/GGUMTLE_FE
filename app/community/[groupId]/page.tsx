export default function CommunityGroupPage({
  params,
}: {
  params: { groupId: string };
}) {
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>커뮤니티 그룹 {params.groupId}</h1>
    </div>
  );
}
