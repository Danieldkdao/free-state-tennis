import Image from "next/image";
import Logo from "@/public/free-state-logo.png";
import UploadAreaImage from "@/public/upload_area_player.png";

const RosterFormPage = () => {
  const isFormEnabled = false;

  if (!isFormEnabled) {
    return (
      <div className="container mx-auto p-4 text-center">
        <Image src={Logo} alt="Free state logo" className="mx-auto w-48 h-48" />
        <h1 className="text-2xl font-bold mt-8">The Roster Form is Currently Closed</h1>
        <p className="mt-4 text-lg text-gray-600">
          We are not accepting new submissions at this time. Please check back again soon!
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Image src={Logo} alt="Free state logo" className="mx-auto" />
      <form action="" className="space-y-4 mt-4">
        <div className="space-y-2">
          <label htmlFor="image" className="block font-medium text-gray-700">
            Player Image
          </label>

          <label htmlFor="image" className="cursor-pointer">
            <Image src={UploadAreaImage} alt="Upload area image" height={150} />
          </label>
          <input id="image" name="image" type="file" className="hidden" />
        </div>
        <div>
          <label htmlFor="name" className="block  font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="mt-1 block w-full shadow-sm border border-gray-300 py-2 px-3 outline-0"
            required
          />
        </div>
        <div>
          <label htmlFor="bio" className="block  font-medium text-gray-700">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={3}
            className="mt-1 block w-full shadow-sm border border-gray-300 py-2 px-3 outline-0 resize-none"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="class" className="block font-medium text-gray-700">
            Class
          </label>
          <select
            id="class"
            name="class"
            className="mt-1 block w-full shadow-sm border border-gray-300 py-2 px-3 outline-0"
            required
          >
            <option>Freshman</option>
            <option>Sophomore</option>
            <option>Junior</option>
            <option>Senior</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="heightFt"
              className="block font-medium text-gray-700"
            >
              Height (ft)
            </label>
            <input
              type="number"
              name="heightFt"
              id="heightFt"
              className="mt-1 block w-full shadow-sm border border-gray-300 outline-0 py-2 px-3"
            />
          </div>
          <div>
            <label
              htmlFor="heightIn"
              className="block  font-medium text-gray-700"
            >
              Height (in)
            </label>
            <input
              type="number"
              name="heightIn"
              id="heightIn"
              className="mt-1 block w-full shadow-sm border border-gray-300 py-2 px-3 outline-0"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="playingStyle"
            className="block  font-medium text-gray-700"
          >
            Playing Style
          </label>
          <select
            id="playingStyle"
            name="playingStyle"
            className="mt-1 block w-full shadow-sm border border-gray-300 py-2 px-3 outline-0"
            required
          >
            <option>Unknown</option>
            <option>Aggressive Baseliner</option>
            <option>Counter-Puncher</option>
            <option>Serve and Volley</option>
            <option>All-Court Player</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="yearsOnVarsity"
            className="block  font-medium text-gray-700"
          >
            Years on Varsity
          </label>
          <select
            id="yearsOnVarsity"
            name="yearsOnVarsity"
            className="mt-1 block w-full shadow-sm border border-gray-300 py-2 px-3 outline-0"
            required
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="seasonsPlayed"
            className="block font-medium text-gray-700"
          >
            Seasons Played (comma separated)
          </label>
          <input
            type="text"
            name="seasonsPlayed"
            id="seasonsPlayed"
            className="mt-1 block w-full shadow-sm border border-gray-300 py-2 px-3 outline-0"
            required
          />
        </div>
        <div>
          <label
            htmlFor="team"
            className="block font-medium text-gray-700"
          >
            Team
          </label>
          <select
            id="team"
            name="team"
            className="mt-1 block w-full shadow-sm border border-gray-300 py-2 px-3 outline-0"
            required
          >
            <option>Boy</option>
            <option>Girl</option>
          </select>
        </div>
        <button
          type="submit"
          className="py-2 px-5 free-green-bg text-white cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RosterFormPage;
