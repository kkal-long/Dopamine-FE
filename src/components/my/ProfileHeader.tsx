interface ProfileHeaderProps {
  name: string;
  profileImage: string;
}

const ProfileHeader = ({ name, profileImage }: ProfileHeaderProps) => {
  return (
    <div className="mt-6 flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <img
          src={profileImage}
          className="w-16 h-16 rounded-full border-2 border-grey04"
        />
        <div>
          <p className="text-semibold20 text-darkgrey05">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
