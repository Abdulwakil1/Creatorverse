import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";
import { FaYoutube, FaXTwitter, FaInstagram, FaGlobe } from "react-icons/fa6";
import { toast } from "react-toastify";

function AddCreator() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    youtube: "",
    x: "",
    instagram: "",
    other_socials: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const platformDomains = {
    youtube: ["youtube.com"],
    x: ["x.com", "twitter.com"],
    instagram: ["instagram.com"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateSocial = (platform, url) => {
    if (!url) return true;
    const lower = url.toLowerCase();
    const allowed = platformDomains[platform];
    return allowed.some((domain) => lower.includes(domain));
  };

  const validateOtherSocials = (url) => {
    if (!url) return true;
    const lower = url.toLowerCase();
    const duplicates = ["youtube.com", "x.com", "twitter.com", "instagram.com"];
    return !duplicates.some((d) => lower.includes(d));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    if (!validateSocial("youtube", formData.youtube)) {
      setErrorMsg("YouTube field must contain a valid YouTube URL.");
      setLoading(false);
      return;
    }
    if (!validateSocial("x", formData.x)) {
      setErrorMsg("X field must contain a valid X/Twitter URL.");
      setLoading(false);
      return;
    }
    if (!validateSocial("instagram", formData.instagram)) {
      setErrorMsg("Instagram field must contain a valid Instagram URL.");
      setLoading(false);
      return;
    }
    if (!validateOtherSocials(formData.other_socials)) {
      setErrorMsg(
        "Other Socials field cannot contain YouTube, X, or Instagram links."
      );
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("creators").insert([{ ...formData }]);

    setLoading(false);

    if (error) {
      console.error(error);
      setErrorMsg(error.message);
    } else {
      setFormData({
        name: "",
        image: "",
        description: "",
        youtube: "",
        x: "",
        instagram: "",
        other_socials: "",
      });
      setSuccessMsg(`${formData.name} added successfully.`);
      toast.success(`${formData.name} added successfully.`);

      setTimeout(() => {
        setSuccessMsg("");
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(0,6,13)] text-white flex flex-col items-center py-1.5 px-4">
      <h1 className="text-4xl sm:text-5xl font-semibold mb-1.5 tracking-wide">
        ADD A NEW CREATOR
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg"
      >
        {errorMsg && (
          <p className="bg-red-500 text-white p-2 rounded mb-4">{errorMsg}</p>
        )}
        {successMsg && (
          <p className="bg-green-500 text-white p-2 rounded mb-4 text-center">
            {successMsg}
          </p>
        )}
        {/* Name */}
        <p className="flex items-center gap-2 text-sm mb-0.5 tracking-wide">
          Name
        </p>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-500 bg-gray-700 text-white mb-4 placeholder-gray-400 placeholder:text-sm"
          required
        />
        {/* Image */}
        <p className="flex items-center gap-2 text-sm mb-0.5 tracking-wide">
          Image
        </p>
        <input
          type="text"
          name="image"
          placeholder="Provide a link to an image of your creator. Be sure to include the http://"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-500 bg-gray-700 text-white mb-4 placeholder-gray-400 placeholder:italic placeholder:text-xs "
        />
        {/* Description */}
        <p className="flex items-center gap-2 text-sm mb-0.5 tracking-wide">
          Description
        </p>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-500 bg-gray-700 text-white mb-4 placeholder-gray-400 placeholder:text-sm"
        />
        {/* Socials Section */}
        <div className="mb-4">
          <p className="text-sm text-blue-300 font-bold mb-1 tracking-wide">
            SOCIAL MEDIA PLATFORMS
          </p>
          <p className="text-xs italic text-gray-400 mb-4">
            Provide at least one of the creator’s social media links
          </p>

          {/* YouTube */}
          <label className="flex items-center gap-2 text-sm mb-0.5 tracking-wide">
            <FaYoutube className="text-white" /> YouTube
          </label>
          {/* <p className="text-xs italic text-gray-400 mb-2 ">
            The creator’s YouTube handle (without @)
          </p> */}
          <input
            type="text"
            name="youtube"
            placeholder="The creator’s YouTube handle (without @)"
            value={formData.youtube}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-500 bg-gray-700 text-white mb-4 placeholder-gray-400 placeholder:italic placeholder:text-xs"
          />

          {/* X */}
          <label className="flex items-center gap-2 text-sm mb-0.5 tracking-wide">
            <FaXTwitter className="text-white" /> X (Twitter)
          </label>
          <input
            type="text"
            name="x"
            placeholder="The creator’s X/Twitter handle (without @)"
            value={formData.x}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-500 bg-gray-700 text-white mb-4 placeholder-gray-400 placeholder:italic placeholder:text-xs"
          />

          {/* Instagram */}
          <label className="flex items-center gap-2 text-sm mb-0.5 tracking-wide">
            <FaInstagram className="text-white" /> Instagram
          </label>
          <input
            type="text"
            name="instagram"
            placeholder="The creator’s Instagram handle (without @)"
            value={formData.instagram}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-500 bg-gray-700 text-white mb-4 placeholder-gray-400 placeholder:italic placeholder:text-xs"
          />

          {/* Other Socials */}
          <label className="flex items-center gap-2 text-sm mb-0.5 tracking-wide">
            <FaGlobe className="text-gray-300" /> Other Socials
          </label>
          <input
            type="text"
            name="other_socials"
            placeholder="Other Social Media URL (LinkedIn, Facebook, etc.)"
            value={formData.other_socials}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-500 bg-gray-700 text-white mb-2 placeholder-gray-400 placeholder:italic placeholder:text-xs"
          />
        </div>
        {/* Buttons row */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          {/* Cancel Button */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full sm:w-1/2 text-center text-lg font-semibold
                   bg-gray-800 text-white rounded-lg py-3
                  border-2 border-gray-500 hover:border-gray-300
                  hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
          >
            CANCEL
          </button>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-1/2 text-center text-lg font-semibold
               bg-blue-400 text-white rounded-lg py-3
               border-2 border-transparent hover:bg-blue-500
               hover:border-white transition-colors duration-200 cursor-pointer"
          >
            {loading ? "Adding..." : "ADD CREATOR"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCreator;
