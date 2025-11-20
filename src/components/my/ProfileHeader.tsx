import { Profile } from "@/assets/svgs/my";

interface ProfileHeaderProps {
  name: string;
  email: string;
  profileImage: string;
}

const ProfileHeader = ({ name, email }: ProfileHeaderProps) => {
  return (
    <div className="mt-[48px] flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <Profile className="w-12 h-12 rounded-full border" />
        <div>
          <p className="text-reg20 text-darkgrey05">{name}</p>
          <p className="text-reg14 text-darkgrey01">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
