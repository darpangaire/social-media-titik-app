import { useProfile } from "@/lib/react-query/useProfile"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ProfileSkeleton from "@/components/shared/ProfileSkeleton";

const Stat = ({ label, value }: { label: string; value: number }) => (
  <div className="cursor-pointer flex gap-1 font-semibold">
    <span>{value}</span> <span>{label}</span>
  </div>
)

const Profile = () => {
  const { data: profile, isLoading } = useProfile()

  if (isLoading) return <ProfileSkeleton />

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <main className="max-w-4xl w-full mx-auto px-4 py-10">
        <div className="flex flex-col items-center gap-8 w-full">

          {/* Profile Header */}
          <div className="
            flex w-full gap-6 items-center 
            flex-col sm:flex-row sm:items-start
          ">
            {/* Profile Picture */}
            <img
              src={profile?.profile_picture || "/assets/images/profile.png"}
              className="
                w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 
                rounded-full object-cover border shadow
              "
              alt="Profile Picture"
            />

            {/* User Info */}
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xl font-bold text-center sm:text-left">
                    {profile?.name}
                  </p>
                  <p className="text-gray-500 text-center sm:text-left">
                    @{profile?.username}
                  </p>
                </div>

                {/* Follow Button */}
                <Button 
                  variant="outline" 
                  className="text-blue-600 border-blue-500 w-fit"
                >
                  Follow
                </Button>
              </div>

              {/* Stats */}
              <div className="
                flex gap-6 justify-center sm:justify-start 
                text-sm flex-wrap
              ">
                <Stat label="Posts" value={profile?.posts_count} />
                <Stat label="Followers" value={profile?.followers_count} />
                <Stat label="Following" value={profile?.following_count} />
              </div>

              {/* Bio */}
              <div className="text-center sm:text-left">
                <p className="font-semibold">Bio</p>
                <p className="text-gray-700 text-sm">
                  {profile?.bio || "No bio added yet."}
                </p>
              </div>
            </div>
          </div>

          {/* Posts Section */}
          <div className="w-full flex flex-col gap-6">
            <h2 className="text-xl font-semibold">Posts</h2>

            <div className="flex flex-col gap-6">
              {profile?.posts?.length ? (
                profile.posts.map((post: any) => (
                  <Card key={post.id} className="shadow w-full">
                    <CardContent className="p-4">
                      <p className="font-medium">{post.content}</p>

                      {post.image && (
                        <img
                          src={post.image}
                          className="mt-3 w-full rounded-lg object-cover"
                          alt="Post Image"
                        />
                      )}

                      {post.video && (
                        <video
                          src={post.video}
                          controls
                          className="mt-3 w-full rounded-lg"
                        />
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">No posts yet.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default Profile
