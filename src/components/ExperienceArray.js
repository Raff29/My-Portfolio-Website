import { useState, useEffect } from "react";

const parseExperience = (mdContent) => {
  const experience = [];
  const lines = mdContent.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      const company = line.substr(3).trim();
      const positionLine = lines[++i]
        .substr(2)
        .split("|")
        .map((s) => s.trim());
      const position = positionLine[0].slice(1, -1);
      const duration = positionLine[1].trim();
      const imageLine = lines[++i];
      const imageMatch = imageLine.match(/!\[(.*)\]\((.*)\)/);
      const image = imageMatch ? imageMatch[2] : '';
      const tags = lines[++i].split(":")[1].trim();
      const badges = [];
      const listItems = [];

      while (lines[++i] && !lines[i].startsWith("- Badges:")) {}
      while (lines[++i] && lines[i].startsWith("  - ")) {
        const badgeLine = lines[i].substr(4).split("[");
        const badgeName = badgeLine[0].trim();
        const badgeColor = badgeLine[1].split("]")[0].trim();
        badges.push({ name: badgeName, colorScheme: badgeColor });
      }

      while (lines[++i] && lines[i].startsWith("  - ")) {
        listItems.push(lines[i].substr(4));
      }

      experience.push({
        image,
        company,
        position,
        duration,
        badges,
        listItems,
        tags,
      });
    }
  }

  return experience;
};

const useExperienceArray = () => {
  const [experience, setExperience] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await fetch("content/Experience.md");
        if (!response.ok) {
          throw new Error("Failed to fetch markdown content");
        }
        const mdContent = await response.text();
        setExperience(parseExperience(mdContent));
      } catch (error) {
        console.error("Error fetching markdown content:", error);
        setError(error);
      }
    };

    fetchExperience();
  }, []);

  return { experience, error };
};

export default useExperienceArray;

