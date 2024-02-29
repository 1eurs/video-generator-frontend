import React, { useState } from "react";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import PreviewRatio from "./PreviewRatio";
import CheckboxInput from "./CheckboxInput";
import { Tab } from "@headlessui/react";
import axios from "axios";

const API = "http://127.0.0.1:5000";

const FONT_FAMILY_OPTIONS = [
  "Roboto",
  "Consolas",
  "Arial",
  "Trebuchet MS",
  "DejaVu Serif",
];
const ALIGNMENT_OPTIONS = [
  "bottom-left",
  "bottom-center",
  "bottom-right",
  "top-left",
  "top-center",
  "top-right",
  "middle-left",
  "middle-center",
  "middle-right",
];
const ASPECT_RATIO_OPTIONS = ["9:16", "16:9"];
const VOICE_TYPE_OPTIONS = ["Male", "Female"];

const Card = () => {
  const [formData, setFormData] = useState({
    text: "This is the first sentence",
    fontFamily: "Arial",
    fontSize: 16,
    textColor: "#ffffff",
    backgroundColor: "transparent",
    bold: false,
    italic: false,
    underline: false,
    alignment: "middle-center",
    aspectRatio: "9:16",
    topic: "",
    type: "fun",
    music: "",
    voiceType: "Male",
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function convertStyleToASS(style) {
    let assStyle = "FontSize=" + style.fontSize + ",";
    assStyle += "PrimaryColour=&H" + style.textColor.slice(1) + "&,";
    assStyle += "Bold=" + (style.bold ? "1" : "0") + ",";
    assStyle += "Italic=" + (style.italic ? "1" : "0") + ",";
    assStyle += "Underline=" + (style.underline ? "1" : "0") + ",";
    assStyle += "Alignment=" + convertAlignment(style.alignment);
    return assStyle;
  }

  function convertAlignment(alignment) {
    switch (alignment) {
      case "top-left":
        return 1;
      case "top-center":
        return 2;
      case "top-right":
        return 3;
      case "middle-left":
        return 4;
      case "middle-center":
        return 5;
      case "middle-right":
        return 6;
      case "bottom-left":
        return 7;
      case "bottom-center":
        return 8;
      case "bottom-right":
        return 9;
      default:
        return 10;
    }
  }

  function convertType(type) {
    switch (type) {
      case "fun":
        return "Given a user-provided topic, your task is to craft a fun and engaging story that brings the topic to life. in about 100-125 words—ideal for a 30-second read  starting immediately without including a title . Approach each topic with creativity, infusing your narrative with elements of humor, suspense, or wonder as fits the theme. If the topic is broad or open-ended, use your imagination to focus the story in a unique or unexpected way, ensuring it remains entertaining and captivating for the reader. Aim to create vivid characters, dynamic settings, and compelling plot twists that keep the reader engaged. Your story should be a delightful journey from start to finish, showcasing your ability to transform any topic into a memorable tale. Remember, the goal is to make the reader smile, laugh, or be amazed by your storytelling prowess.";
      case "educational":
        return "Your task is to generate educational content tailored to the user's specified topic, audience age group, and educational level. in about 100-125 words—ideal for a 30-second read  starting immediately without including a title . Begin by identifying the core concepts that need to be communicated, ensuring that your content is accurate, up-to-date, and aligned with current educational standards. Use clear and concise language appropriate for the intended audience, incorporating explanations, examples, and analogies to aid understanding. Engage the learner by posing questions, suggesting activities, or including interactive elements that encourage active participation. Your content should not only educate but also inspire curiosity and a desire for further learning. Tailor your approach to the subject matter, whether it requires a more formal tone for scientific topics or a more creative and narrative-driven approach for humanities. Remember, the goal is to create an effective learning experience that is informative, engaging, and accessible to learners of all backgrounds.";
      case "wise":
        return "Your task is to provide responses that reflect a deep understanding of the complexities of life, human nature, and the world at large. in about 100-125 words—ideal for a 30-second read  starting immediately without including a title . Draw upon a wide range of knowledge, including historical insights, philosophical theories, and practical wisdom, to craft responses that are thoughtful, balanced, and nuanced. Your answers should not only address the surface level of the queries but also explore the underlying themes, offering perspectives that encourage reflection, growth, and a deeper understanding of the issue at hand. Aim to communicate with empathy, acknowledging the diversity of human experiences, and offer guidance that is considerate of different viewpoints and life circumstances. Your goal is to inspire introspection and provide valuable insights that help others navigate their questions and challenges with greater clarity and wisdom.";
      case "anime":
        return "Your task is to create content that discusses a specific topic by integrating relevant references to anime. in about 100-125 words—ideal for a 30-second read  starting immediately without including a title . Begin by identifying key themes, characters, or narratives from a wide range of anime series that resonate with or provide unique insights into the topic. Use these references to enrich the content, whether by drawing parallels, illustrating points with examples from anime, or using anime-based analogies to clarify complex ideas. Ensure that your references are accessible, providing enough context for readers unfamiliar with the specific anime to understand and appreciate the connection. Your content should not only inform but also entertain, leveraging the rich storytelling and diverse themes found in anime to engage readers deeply with the topic. Remember to respect copyright by not reproducing copyrighted material directly and focusing on original analysis, interpretation, and discussion.";

      case "kpop":
        return "Your task is to create content that discusses a specific topic by weaving in relevant references to K-pop.  in about 100-125 words—ideal for a 30-second read  starting immediately without including a title . Begin by identifying key themes, artists, songs, or cultural phenomena within the K-pop industry that resonate with or provide unique perspectives on the topic. Use these references to enhance the content, whether by drawing parallels, illustrating points with examples from K-pop, or using K-pop-related analogies to simplify complex ideas. Ensure that your references are accessible, providing enough context for readers unfamiliar with K-pop to understand and appreciate the connection. Aim to not only inform but also entertain, leveraging the vibrant culture, diverse music, and dynamic personalities found in K-pop to deeply engage readers with the topic. Be mindful to respect copyright by not reproducing copyrighted material directly and focusing on original analysis, interpretation, and discussion.";
    }
  }

  const GenerateVideo = async (data) => {
    try {
      const res = await axios.post(`${API}/generate_video`, { data });
      setResponse(res.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleGenerate = () => {
    const style = {
      fontFamily: formData.fontFamily,
      fontSize: formData.fontSize,
      textColor: formData.textColor,
      backgroundColor: formData.backgroundColor,
      bold: formData.bold,
      italic: formData.italic,
      underline: formData.underline,
      alignment: formData.alignment,
    };

    const subtitleStyle = convertStyleToASS(style);
    const system_prompt = convertType(formData.type);

    let data = {
      topic: formData.topic,
      system_prompt,
      voice: formData.voiceType,
      subtitle_style: subtitleStyle,
      video_size: formData.aspectRatio,
      music: formData.music,
    };
    console.log(data);
    GenerateVideo(data);
  };

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-gray-800 p-8 shadow-2xl">
      <div className="flex items-center justify-center gap-12">
        <div className="min-w-64 max-w-64 ">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
              <Tab as={React.Fragment}>
                {({ selected }) => (
                  <button
                    className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ${
                      selected
                        ? "bg-white shadow"
                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                    }`}
                  >
                    Content
                  </button>
                )}
              </Tab>
              <Tab as={React.Fragment}>
                {({ selected }) => (
                  <button
                    className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ${
                      selected
                        ? "bg-white shadow"
                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                    }`}
                  >
                    Style
                  </button>
                )}
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel className="space-y-4 p-3">
                <TextInput
                  label="Topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  placeholder="Enter video topic"
                />
                <TextInput
                  label="Music URL"
                  name="music"
                  value={formData.music}
                  onChange={handleChange}
                  placeholder="Leave empty for AI selection"
                />
                <SelectInput
                  label="Voice Type"
                  name="voiceType"
                  value={formData.voiceType}
                  options={VOICE_TYPE_OPTIONS}
                  onChange={handleChange}
                />
                <SelectInput
                  label="Type"
                  name="type"
                  value={formData.type}
                  options={["fun", "educational", "wise", "anime", "kpop"]}
                  onChange={handleChange}
                />
              </Tab.Panel>
              <Tab.Panel className="grid grid-cols-2 gap-4 p-3">
                <SelectInput
                  label="Font"
                  name="fontFamily"
                  value={formData.fontFamily}
                  options={FONT_FAMILY_OPTIONS}
                  onChange={handleChange}
                />
                <SelectInput
                  label="Font Size"
                  name="fontSize"
                  options={[14, 15, 16, 17]}
                  value={formData.fontSize}
                  onChange={handleChange}
                />
                <TextInput
                  label="Text Color"
                  name="textColor"
                  type="color"
                  value={formData.textColor}
                  onChange={handleChange}
                />
                <TextInput
                  label="Bg Color"
                  name="backgroundColor"
                  type="color"
                  value={formData.backgroundColor}
                  onChange={handleChange}
                />
                <div className="col-span-2 flex gap-4">
                  <CheckboxInput
                    label="Bold"
                    name="bold"
                    checked={formData.bold}
                    onChange={handleChange}
                  />
                  <CheckboxInput
                    label="Italic"
                    name="italic"
                    checked={formData.italic}
                    onChange={handleChange}
                  />
                  <CheckboxInput
                    label="Underline"
                    name="underline"
                    checked={formData.underline}
                    onChange={handleChange}
                  />
                </div>
                <SelectInput
                  label="Alignment"
                  name="alignment"
                  value={formData.alignment}
                  options={ALIGNMENT_OPTIONS}
                  onChange={handleChange}
                />
                <SelectInput
                  label="Aspect Ratio"
                  name="aspectRatio"
                  value={formData.aspectRatio}
                  options={ASPECT_RATIO_OPTIONS}
                  onChange={handleChange}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
          <div className="flex items-center justify-center">
            <button
              onClick={handleGenerate}
              className="w-[92%] transform rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-2 font-bold text-white shadow-md transition duration-150 ease-in-out hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            >
              Generate
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <PreviewRatio formData={formData} />
        </div>
      </div>
    </div>
  );
};

export default Card;
