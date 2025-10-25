import Image from "next/image";
import React from "react";
import UploadAreaImage from "@/public/upload_area_player.png";

export const classes = ["Freshman", "Sophomore", "Junior", "Senior"];

export const playingStyles = [
  "Unknown",
  "Aggressive Baseliner",
  "Counter-Puncher",
  "Serve and Volley",
  "All-Court Player",
];

export const yearsOnVarsity = ["1", "2", "3", "4"];

export const isVarsity = ["Varsity", "Junior Varsity"];

export const genders = ["Boy", "Girl"];

const PlayerSSRow = () => {
  return (
    <tr className="border">
      <td>
        <label htmlFor="image" className="cursor-pointer">
          <Image src={UploadAreaImage} alt="Upload area image" width={180} />
        </label>
        <input type="file" id="image" accept="image/*" className="hidden" />
      </td>
      <td className="border">
        <input type="text" id="name" className="py-1 px-2 outline-0" />
      </td>
      <td className="border">
        <textarea
          name=""
          id="bio"
          rows={3}
          className="py-1 px-2 resize-none outline-0"
        ></textarea>
      </td>
      <td className="border pr-2">
        <select name="" id="class" className="py-1 px-2 outline-0">
          {classes.map((item, i) => {
            return (
              <option key={i} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </td>
      <td className="border">
        <input
          type="number"
          name=""
          id="wins"
          className="py-1 px-2 w-full outline-0"
        />
      </td>
      <td className="border">
        <input
          type="number"
          name=""
          id="losses"
          className="py-1 px-2 w-full outline-0"
        />
      </td>
      <td className="border">
        <input
          type="number"
          name=""
          id="feet"
          className="py-1 px-2 w-full outline-0"
        />
      </td>
      <td className="border">
        <input
          type="number"
          name=""
          id="inches"
          className="py-1 px-2 w-full outline-0"
        />
      </td>
      <td className="border pr-2">
        <select name="" id="playing-style" className="py-1 px-2 outline-0">
          {playingStyles.map((item, i) => {
            return (
              <option key={i} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </td>
      <td className="border pr-2">
        <select
          name=""
          id="years-on-varsity"
          className="py-1 px-2 outline-0 w-full"
        >
          {yearsOnVarsity.map((item, i) => {
            return (
              <option key={i} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </td>
      <td className="border pr-2">
        <select name="" id="is-varsity" className="py-1 px-2 outline-0">
          {isVarsity.map((item, i) => {
            return (
              <option key={i} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </td>
      <td className="border px-4">
        <select name="" id="genders" className="py-1 px-2 outline-0">
          {genders.map((item, i) => {
            return (
              <option key={i} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </td>
    </tr>
  );
};

export default PlayerSSRow;
