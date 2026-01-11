import React, { use, useRef} from "react";

import { toast } from "react-toastify";
import { Authcontext } from "../../../Components/Context/Authcontext";
import useAxiosHook from "../../../Components/CustomHooks/useAxiosHook";

const UpdateProfile = ({refetch}) => {
  const modalRef = useRef(null);
  const {user,profileUpdate}=use(Authcontext)
  const axioshook=useAxiosHook()

  const handleModal = () => {
    modalRef.current.showModal();
  };

  const handleupdate = async(e) => {



    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const  photoURL = form.photo.value;
const profile = {
                 displayName:name, photoURL
            }
            console.log(profile)
     await profileUpdate( profile )
      .then(() => {
          
       
        modalRef.current.close(); 
      })
      .catch(err => console.error(err));

      const updateinfo={
name, image:photoURL
      }

    await  axioshook.patch(`/porfileUpdate/${user?.email}`, updateinfo)
      .then(res => {
        if (res.data.modifiedCount) {
 toast('profile updated')
          refetch();
        }
      });

  };

  return (
    <div>
        <div className="flex justify-center">

      <button onClick={handleModal} className="py-3 px-5 rounded bg-black text-white ">
        Update Profile
      </button>
        </div>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <form onSubmit={handleupdate} className="card-body">
            <h1 className="text-2xl text-center my-3 font-bold">
              Update Profile
            </h1>

            {/* Name */}
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered"
              placeholder="Your name"
              defaultValue={user?.displayName}
            />

            {/* Photo */}
            <label className="label">Photo URL</label>
            <input
              type="text"
              name="photo"
              className="input input-bordered"
              placeholder="Photo URL"
                defaultValue={user?.photoURL}
            />

            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => modalRef.current.close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default UpdateProfile;