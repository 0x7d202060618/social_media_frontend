import Avatar from 'components/Avatar'
import logo from 'assets/logo.svg'
import { FaFacebook, FaFacebookF, FaInstagram } from 'react-icons/fa6'
import { CiCamera, CiTwitter, CiYoutube } from 'react-icons/ci'
import { FiLinkedin } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import axios from 'axios'


const randoms = [
  [1, 2],
  [3, 4, 5],
  [6, 7]
]

function App() {

  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");
  const [profile, setProfile] = useState({
    facebook: 0,
    instagram: 0,
    twitter: 0,
    snapchat: 0,
    youtube: 0,
    linkedin: 0
  });

  const onFetchFollowers = async () => {
    if(platform == "") return alert("Select the platform!");
    if(url == "") return alert("Input profile url!");
    const response = await axios.post(`http://44.211.206.81/social/api/get_${platform}_followers`, {
      profile_url: url
    })
    let _profile = {...profile};
    _profile[platform] = response.data.followers_count;
    setProfile(_profile);
  }

  return (
    <div className="relative overflow-hidden bg-white flex justify-center">
      <div className='bg-green-400 px-4 py-8 w-1/2 h-[100vh]'>
        <h1 className='text-3xl font-bold'>Social Media Dashboard</h1>
        <div className='flex gap-2 flex-wrap'>
          <select defaultValue={""} className='p-2 border border-gray-600 rounded' onChange={(e) => setPlatform(e.target.value)}>
            <option value={""}>Select platform</option>
            <option value={"facebook"}>Facebook</option>
            <option value={"instagram"}>Instagram</option>
            <option value={"twitter"}>X(Twitter)</option>
            <option value={"snapchat"}>SnapChat</option>
            <option value={"youtube"}>YouTube</option>
            <option value={"linkedin"}>LinkedIn</option>
          </select>
          <input placeholder='Enter social media handle' className='p-2 min-w-[300px] border border-gray-600 rounded' onChange={e => setUrl(e.target.value)}></input>
          <button className='bg-black text-white border border-gray-600 rounded p-2' onClick={onFetchFollowers}>Fetch Followers</button>
        </div>
        <div className='grid grid-rows-3 grid-cols-2 m-4 gap-4'>
          <div className='flex flex-col items-center bg-green-900 rounded-xl p-6 text-white'>
            <h1>Facebook</h1>
            <FaFacebookF/>
            <span className='text-2xl font-bold'>{profile.facebook}</span>
          </div>
          <div className='flex flex-col items-center bg-green-900 rounded-xl p-6 text-white'>
            <h1>Instagram</h1>
            <FaInstagram/>
            <span className='text-2xl font-bold'>{profile.instagram}</span>
          </div>
          <div className='flex flex-col items-center bg-green-900 rounded-xl p-6 text-white'>
            <h1>X(Twitter)</h1>
            <CiTwitter />
            <span className='text-2xl font-bold'>{profile.twitter}</span>
          </div>
          <div className='flex flex-col items-center bg-green-900 rounded-xl p-6 text-white'>
            <h1>Snapchat</h1>
            <CiCamera/>
            <span className='text-2xl font-bold'>{profile.snapchat}</span>
          </div>
          <div className='flex flex-col items-center bg-green-900 rounded-xl p-6 text-white'>
            <h1>YouTube</h1>
            <CiYoutube/>
            <span className='text-2xl font-bold'>{profile.youtube}</span>
          </div>
          <div className='flex flex-col items-center bg-green-900 rounded-xl p-6 text-white'>
            <h1>LinkedIn</h1>
            <FiLinkedin/>
            <span className='text-2xl font-bold'>{profile.linkedin}</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default App
