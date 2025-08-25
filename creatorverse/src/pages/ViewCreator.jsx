// src/pages/ViewCreator.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";
import {
  FaYoutube,
  FaXTwitter,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaFacebook,
  FaGlobe,
} from "react-icons/fa6";
import Card from "../components/Card";
import DeleteDialog from "../components/DeleteDialog";
import { toast } from "react-toastify";

// Extracts just the username/handle safely
function extractHandle(raw) {
  if (!raw) return "";
  let cleaned = raw.trim().replace(/^@+/, "");
  const lower = cleaned.toLowerCase();

  if (/^https?:\/\//i.test(cleaned)) {
    try {
      const u = new URL(cleaned);
      const host = u.hostname.toLowerCase();
      const parts = u.pathname.split("/").filter(Boolean);

      if (host.includes("youtube"))
        return u.pathname.includes("@")
          ? u.pathname.slice(u.pathname.indexOf("@") + 1)
          : parts.pop() || "";
      if (host.includes("x.com") || host.includes("twitter"))
        return parts[0] || "";
      if (host.includes("instagram")) return parts[0] || "";
      return parts.pop() || "";
    } catch {
      return cleaned;
    }
  }

  if (lower.includes("youtube.com"))
    return cleaned.split(/(?:www\.)?youtube\.com\//i).pop();
  if (lower.includes("x.com"))
    return cleaned.split(/(?:www\.)?x\.com\//i).pop();
  if (lower.includes("instagram.com"))
    return cleaned.split(/(?:www\.)?instagram\.com\//i).pop();

  return cleaned;
}

// Builds { handle, href, Icon } and auto-detects platform for other socials
function getHandleAndHref(platform, raw) {
  if (!raw) return null;

  const defaultMap = {
    youtube: { base: "https://youtube.com/@", Icon: FaYoutube },
    x: { base: "https://x.com/", Icon: FaXTwitter },
    instagram: { base: "https://instagram.com/", Icon: FaInstagram },
  };

  // Known platforms for automatic detection
  const platformIcons = [
    {
      keyword: "linkedin.com",
      Icon: FaLinkedin,
      base: "https://linkedin.com/in/",
    },
    { keyword: "tiktok.com", Icon: FaTiktok, base: "https://www.tiktok.com/@" },
    {
      keyword: "facebook.com",
      Icon: FaFacebook,
      base: "https://www.facebook.com/",
    },
  ];

  let entry = defaultMap[platform];

  // If "other", try to auto-detect icon based on URL
  if (!entry || platform === "other") {
    const lower = raw.toLowerCase();
    entry = platformIcons.find((p) => lower.includes(p.keyword)) || {
      base: raw,
      Icon: FaGlobe,
    };
  }

  const handle = extractHandle(raw);
  const href = entry.base.includes("@")
    ? entry.base.replace("@", handle)
    : `${entry.base}${handle}`;

  return { handle, href, Icon: entry.Icon };
}

function ViewCreator() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    let ignore = false;
    async function fetchCreator() {
      setLoading(true);
      setErr("");
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", id)
        .single();

      if (!ignore) {
        if (error) setErr("Failed to load creator.");
        else setCreator(data);
        setLoading(false);
      }
    }
    fetchCreator();
    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading)
    return (
      <p className="text-gray-300 text-center mt-10">Loading creator...</p>
    );
  if (err || !creator)
    return (
      <p className="text-red-500 text-center mt-10">
        {err || "Creator not found."}
      </p>
    );

  const socials = {
    youtube: getHandleAndHref("youtube", creator.youtube),
    x: getHandleAndHref("x", creator.x),
    instagram: getHandleAndHref("instagram", creator.instagram),
    other: creator.other_socials
      ? getHandleAndHref("other", creator.other_socials)
      : null,
  };

  // Handle delete confirm
  const handleDeleteConfirm = async () => {
    setDeleteError("");
    try {
      const { error } = await supabase
        .from("creators")
        .delete()
        .eq("id", creator.id);

      if (error) throw error;

      setShowDialog(false);
      toast.success(`${creator.name} was deleted successfully.`);
      navigate("/"); // go back home
    } catch (err) {
      console.error(err);
      setDeleteError("Failed to delete creator. Please try again.");
    }
  };

  return (
    <>
      <Card
        creator={creator}
        socials={socials}
        onEdit={() => navigate(`/creators/edit/${creator.id}`)}
        onDelete={() => setShowDialog(true)}
        onBack={() => navigate("/")}
      />

      {showDialog && (
        <DeleteDialog
          creator={creator}
          error={deleteError}
          onCancel={() => setShowDialog(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </>
  );
}
export default ViewCreator;
