import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../client";
import { FaYoutube, FaXTwitter, FaInstagram, FaGlobe } from "react-icons/fa6";
import DeleteDialog from "../components/DeleteDialog";
import { toast } from "react-toastify";

function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Form data state (always strings)
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
  const [showDialog, setShowDialog] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // Fetch existing creator safely
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    if (isDeleted) return; // skip fetch if deleted

    async function fetchCreator() {
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        navigate("/"); // redirect immediately if not found
      } else {
        setFormData({ ...data });
      }
    }

    fetchCreator();
  }, [id, navigate, isDeleted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setErrorMsg("");
  //   setSuccessMsg("");

  //   try {
  //     const { error } = await supabase
  //       .from("creators")
  //       .update({ ...formData })
  //       .eq("id", id);

  //     if (error) throw error;

  //     setSuccessMsg(`${formData.name} updated successfully from edit page.`);
  //     toast.success(`${formData.name} updated successfully from edit page.`);
  //     setTimeout(() => {
  //       navigate(`/creators/view/${id}`);
  //     }, 1500);
  //   } catch (err) {
  //     console.error(err);
  //     setErrorMsg(err.message || "Failed to update creator.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // inside EditCreator.jsx
  const platformDomains = {
    youtube: ["youtube.com"],
    x: ["x.com", "twitter.com"],
    instagram: ["instagram.com"],
  };

  const validateSocial = (platform, url) => {
    if (!url) return true; // allow empty field
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

    // Social media validation
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

    try {
      const { error } = await supabase
        .from("creators")
        .update({ ...formData })
        .eq("id", id);

      if (error) throw error;

      setSuccessMsg(`${formData.name} updated successfully.`);
      toast.success(`${formData.name} updated successfully.`);

      setTimeout(() => {
        navigate(`/creators/view/${id}`);
      }, 1500);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Failed to update creator.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async (e) => {
    if (e) e.preventDefault();
    setDeleteError("");
    try {
      const { error } = await supabase.from("creators").delete().eq("id", id);
      if (error) throw error;

      setIsDeleted(true); // prevent future fetch
      setShowDialog(false);
      toast.success(`${formData.name} deleted successfully.`);
      navigate("/"); // safe navigation
    } catch (err) {
      console.error(err);
      setDeleteError("Failed to delete creator. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(0,6,13)] text-white flex flex-col items-center py-4 px-4">
      <h1 className="text-4xl sm:text-5xl font-semibold mb-2 tracking-wide">
        EDIT CREATOR
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
        <label className="flex items-center gap-2 text-sm mb-0.5 tracking-wide">
          Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name || ""}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-500 bg-gray-700 text-white mb-4 placeholder-gray-400 placeholder:text-sm"
          required
        />

        {/* Image */}
        <label className="flex items-center gap-2 text-sm mb-0.5 tracking-wide">
          Image
        </label>
        <input
          type="text"
          name="image"
          placeholder="Provide a link to an image of your creator. Include http://"
          value={formData.image || ""}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-500 bg-gray-700 text-white mb-4 placeholder-gray-400 placeholder:italic placeholder:text-xs"
        />

        {/* Description */}
        <label className="flex items-center gap-2 text-sm mb-0.5 tracking-wide">
          Description
        </label>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description || ""}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-500 bg-gray-700 text-white mb-4 placeholder-gray-400 placeholder:text-sm"
        />

        {/* Socials */}
        <div className="mb-4">
          <p className="text-sm text-blue-300 font-bold mb-1 tracking-wide">
            SOCIAL MEDIA PLATFORMS
          </p>
          <p className="text-xs italic text-gray-400 mb-4">
            Provide at least one of the creator’s social media links
          </p>

          <label className="flex items-center gap-2 text-sm mb-0.5 tracking-wide">
            <FaYoutube className="text-white" /> YouTube
          </label>
          <input
            type="text"
            name="youtube"
            placeholder="YouTube handle (without @)"
            value={formData.youtube || ""}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-500 bg-gray-700 text-white mb-4 placeholder-gray-400 placeholder:italic placeholder:text-xs"
          />

          <label className="flex items-center gap-2 text-sm mb-0.5 tracking-wide">
            <FaXTwitter className="text-white" /> X (Twitter)
          </label>
          <input
            type="text"
            name="x"
            placeholder="X/Twitter handle (without @)"
            value={formData.x || ""}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-500 bg-gray-700 text-white mb-4 placeholder-gray-400 placeholder:italic placeholder:text-xs"
          />

          <label className="flex items-center gap-2 text-sm mb-0.5 tracking-wide">
            <FaInstagram className="text-white" /> Instagram
          </label>
          <input
            type="text"
            name="instagram"
            placeholder="Instagram handle (without @)"
            value={formData.instagram || ""}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-500 bg-gray-700 text-white mb-4 placeholder-gray-400 placeholder:italic placeholder:text-xs"
          />

          <label className="flex items-center gap-2 text-sm mb-0.5 tracking-wide">
            <FaGlobe className="text-gray-300" /> Other Socials
          </label>
          <input
            type="text"
            name="other_socials"
            placeholder="Other Social Media URL (LinkedIn, Facebook, etc.)"
            value={formData.other_socials || ""}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-500 bg-gray-700 text-white mb-2 placeholder-gray-400 placeholder:italic placeholder:text-xs"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full sm:w-1/3 text-center text-lg font-semibold
                     bg-gray-800 text-white rounded-lg py-3
                     border-2 border-gray-500 hover:border-gray-300
                     hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
          >
            CANCEL
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-1/3 text-center text-lg font-semibold
               bg-blue-400 text-white rounded-lg py-3
               border-2 border-transparent hover:bg-blue-500
               hover:border-white transition-colors duration-200 cursor-pointer"
          >
            {loading ? "Updating..." : "SUBMIT"}
          </button>

          <button
            type="button"
            onClick={() => setShowDialog(true)}
            className="w-full sm:w-1/3 text-center text-lg font-semibold
                     bg-red-500 text-white rounded-lg py-3
                     border-2 border-transparent hover:border-red-300 hover:bg-red-600
                     transition-colors duration-200 cursor-pointer
                     flex items-center justify-center gap-2"
          >
            DELETE
          </button>

          {/* Delete confirmation dialog */}
          {showDialog && (
            <DeleteDialog
              creator={{ id, name: formData.name || "this creator" }}
              error={deleteError}
              onCancel={() => setShowDialog(false)}
              onConfirm={handleDeleteConfirm}
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default EditCreator;
