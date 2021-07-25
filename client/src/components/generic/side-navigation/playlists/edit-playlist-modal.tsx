import { ChangeEvent, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import spotifyApi from "../../../../api";
import { RootState } from "../../../../redux/reducers";
import { getAverageSizeImage } from "../../../../utils/images";
import Button from "../../button/button";

interface IEditPlaylistModalProps {
  playlist: SpotifyApi.PlaylistObjectFull;
  refetchPlaylist: () => void;
  closeModal: () => void;
}

const EditPlaylistModal = ({
  playlist,
  refetchPlaylist,
  closeModal,
}: IEditPlaylistModalProps) => {
  const { accessToken } = useSelector((state: RootState) => state.session);
  const [name, setName] = useState<string>(playlist.name);
  const [description, setDescription] = useState<string>(
    playlist.description || ""
  );

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleUpdatePlaylist = () => {
    if (accessToken && name) {
      spotifyApi.setAccessToken(accessToken);
      spotifyApi
        .changePlaylistDetails(playlist.id, {
          name,
          description: description || undefined,
        })
        .catch(() => {})
        .finally(() => {
          refetchPlaylist();
          closeModal();
        });
    }
  };

  return (
    <div className="min-w-screen h-screen animated fadeIn fixed left-0 top-0 flex flex-col justify-center items-center inset-0 z-50 outline-none focus:outline-none">
      <div
        onClick={closeModal}
        className="absolute bg-black opacity-75 inset-0 z-0"
      />
      <div className="bg-gray-700 h-min w-full max-w-xs sm:max-w-sm md:max-w-2xl p-8 flex flex-col relative mx-auto my-auto rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-white font-bold text-3xl">Edit details</h1>
          <AiOutlineClose
            onClick={closeModal}
            className="text-gray-400 text-3xl hover:bg-gray-500 rounded-full p-1 cursor-pointer"
          />
        </div>

        <div className="flex flex-row h-full w-full mb-4">
          <img
            src={getAverageSizeImage(playlist.images).url}
            alt="cover"
            className="w-52 h-52 object-cover rounded shadow-md mr-4"
          />

          <div className="flex flex-col h-full w-full">
            <input
              name="name"
              value={name}
              placeholder="Name"
              onChange={handleChangeName}
              className="p-4 mb-4 text-md text-white bg-gray-600 rounded shadow-inner focus:outline-none"
            />

            <textarea
              name="description"
              value={description}
              placeholder="Add an optional description"
              onChange={handleChangeDescription}
              className="py-4 px-4 h-full text-md text-white bg-gray-600 rounded shadow-inner focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <Button
            title="Save"
            variant="button"
            onClick={handleUpdatePlaylist}
            classes="bg-white text-sm w-min pt-2 pb-2"
          />
        </div>

        <h6 className="text-white font-normal text-xs">
          By proceeding, you agree to give Spotify access to the image you
          choose to upload. Please make sure you have the right to upload the
          image.
        </h6>
      </div>
    </div>
  );
};

export default EditPlaylistModal;
