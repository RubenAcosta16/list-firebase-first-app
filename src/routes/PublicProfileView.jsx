// permite obtener info del url
import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import {
  existsUsername,
  getProfilePhotoUrl,
  getUserPublicProfileInfo,
} from "../firebase/firebase";

import PublicLink from '../components/publicLink'

const PublicProfileView = () => {
  const params = useParams();

  const [profile, setProfile] = useState(null);

  const [url, setUrl] = useState("");

  const [state, setState] = useState(0)

  useEffect(() => {
    getProfile();

    async function getProfile() {
      const username = params.username;
      console.log(username);

      try {
        const userUid = await existsUsername(username);
        console.log(userUid);

        if (userUid) {
          const userInfo = await getUserPublicProfileInfo(userUid);
          console.log(userInfo);
          setProfile(userInfo);

          console.log(userInfo.profileInfo.profilePicture);

          const url = await getProfilePhotoUrl(
            userInfo.profileInfo.profilePicture
          );

          console.log(url);
          setUrl(url);
        }else{
          setState(7)
        }
      } catch (error) {}
    }
  }, [params]);


  if(state===7){
    return <div>
      <h1>Username "{params.username}" no existe</h1>
    </div>
  }

  console.log(profile);
  console.log(url);

  return (
    <div>
      <div>
        <img src={url} alt="" width={300} />
      </div>
      <h2>{profile?.profileInfo?.userName}</h2>
      <h3>{profile?.profileInfo?.displayName}</h3>
      <div>
        {profile?.linksInfo.map((link) => (
          <PublicLink key={link.docId} title={link.title} url={link.url}></PublicLink>
        ))}
      </div>
    </div>
  );
};

//

export default PublicProfileView;

//3:05:28