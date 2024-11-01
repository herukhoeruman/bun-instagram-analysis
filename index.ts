type StringListData = {
  href: string;
  value: string;
  timestamp: number;
};

type MediaListData = any[];

type FollowerItem = {
  title: string;
  media_list_data: MediaListData;
  string_list_data: StringListData[];
};

type FollowingData = {
  relationships_following: FollowerItem[];
};

const followersFile = Bun.file("./data/followers_1.json");
const followers: FollowerItem[] = await followersFile.json();
const followingFile = Bun.file("./data/following.json");
const following: FollowingData = await followingFile.json();

const followerData = followers.map(
  (item: FollowerItem) => item.string_list_data[0].value
);

const followingData = following.relationships_following.map(
  (item: FollowerItem) => item.string_list_data[0].value
);

// console.log(followingData);
// console.log(followerData);

const notFollowingBack = followingData.filter(
  (user) => !followerData.includes(user)
);

const youDontFollowBack = followerData.filter(
  (user) => !followingData.includes(user)
);

console.log("\n=== Instagram Relationship Analysis ===\n");

console.log("Users who don't follow you back:");
if (notFollowingBack.length > 0) {
  notFollowingBack.forEach((user, index) => {
    console.log(`${index + 1}. @${user}`);
  });
} else {
  console.log("Everyone you follow is following you back!");
}

console.log("\nUsers you don't follow back:");
if (youDontFollowBack.length > 0) {
  youDontFollowBack.forEach((user, index) => {
    console.log(`${index + 1}. @${user}`);
  });
} else {
  console.log("You follow everyone who follows you!");
}

console.log("\nSummary:");
console.log(`Total followers: ${followerData.length}`);
console.log(`Total following: ${followingData.length}`);
console.log(`Users not following back: ${notFollowingBack.length}`);
console.log(`Users you don't follow back: ${youDontFollowBack.length}`);
