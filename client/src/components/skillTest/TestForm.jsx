import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VideoEditingLogo from "../image//editing.jpeg";

const generateRandomQuestions = (allQuestions, count) => {
  const shuffledQuestions = [...allQuestions].sort(() => 0.5 - Math.random());
  return shuffledQuestions.slice(0, count);
};

const allQuestions = [
  {
    id: 1,
    question: "What does the term 'FPS' stand for in video editing?",
    options: [
      "Frames Per Second",
      "Final Processing Stage",
      "File Production System",
      "Frame Processing Software",
    ],
    answer: "Frames Per Second",
  },
  {
    id: 2,
    question: "Which video editing software is developed by Adobe?",
    options: [
      "Final Cut Pro",
      "Sony Vegas Pro",
      "Adobe Premiere Pro",
      "DaVinci Resolve",
    ],
    answer: "Adobe Premiere Pro",
  },
  {
    id: 3,
    question:
      "What is the purpose of the 'Timeline' in video editing software?",
    options: [
      "To organize files",
      "To apply effects",
      "To arrange clips in chronological order",
      "To export the final video",
    ],
    answer: "To arrange clips in chronological order",
  },
  {
    id: 4,
    question:
      "Which file format is commonly used for high-quality video editing?",
    options: ["JPEG", "GIF", "MP4", "RAW"],
    answer: "RAW",
  },
  {
    id: 5,
    question: "What does 'Cut,' 'Copy,' and 'Paste' refer to in video editing?",
    options: [
      "Editing tools",
      "Audio effects",
      "Color grading options",
      "Clipboard operations",
    ],
    answer: "Clipboard operations",
  },
  // {
  //   id: 6,
  //   question:
  //     "What is the purpose of the 'Ripple Edit' function in video editing?",
  //   options: [
  //     "Adding ripples to watermarks",
  //     "Adjusting audio levels",
  //     "Modifying the length of a clip and shifting subsequent clips",
  //     "Creating slow-motion effects",
  //   ],
  //   answer: "Modifying the length of a clip and shifting subsequent clips",
  // },
  // {
  //   id: 7,
  //   question:
  //     "Which term refers to the process of adjusting the colors in a video?",
  //   options: [
  //     "Color Correction",
  //     "Color Grading",
  //     "Color Enhancement",
  //     "Color Filtering",
  //   ],
  //   answer: "Color Grading",
  // },
  // {
  //   id: 8,
  //   question: "What is 'Keyframing' in video editing?",
  //   options: [
  //     "Adding a key to the keyboard for shortcuts",
  //     "Creating a key visual for a video",
  //     "Animating changes over time by setting keyframes at different points",
  //     "Encrypting video files with a key",
  //   ],
  //   answer:
  //     "Animating changes over time by setting keyframes at different points",
  // },
  // {
  //   id: 9,
  //   question:
  //     "Which video editing effect creates a mirror image of the footage?",
  //   options: [
  //     "Reflection Effect",
  //     "Mirror Effect",
  //     "Flip Effect",
  //     "Invert Effect",
  //   ],
  //   answer: "Mirror Effect",
  // },
  // {
  //   id: 10,
  //   question: "What does 'B-Roll' mean in video editing?",
  //   options: [
  //     "Basic Roll",
  //     "Backup Roll",
  //     "Background Roll",
  //     "Additional footage used to complement the main footage",
  //   ],
  //   answer: "Additional footage used to complement the main footage",
  // },
  // {
  //   id: 11,
  //   question:
  //     "Which tool is used for precise cutting and trimming in video editing?",
  //   options: [
  //     "Cutting Blade",
  //     "Razor Tool",
  //     "Trimming Scissors",
  //     "Slice Cutter",
  //   ],
  //   answer: "Razor Tool",
  // },
  // {
  //   id: 12,
  //   question: "In video editing, what does 'Export' refer to?",
  //   options: [
  //     "Save the project file",
  //     "Combine multiple videos into one",
  //     "Render and save the edited video as a separate file",
  //     "Import media files into the editor",
  //   ],
  //   answer: "Render and save the edited video as a separate file",
  // },
  // {
  //   id: 13,
  //   question:
  //     "Which video editing term is associated with a gradual transition between two shots?",
  //   options: ["Jump Cut", "Crossfade", "Match Cut", "Hard Cut"],
  //   answer: "Crossfade",
  // },
  // {
  //   id: 14,
  //   question: "What is 'Chroma Keying' used for in video editing?",
  //   options: [
  //     "Adding color to black and white footage",
  //     "Removing a specific color from a video",
  //     "Enhancing the saturation of colors",
  //     "Adjusting the overall color balance",
  //   ],
  //   answer: "Removing a specific color from a video",
  // },
  // {
  //   id: 15,
  //   question: "Which aspect ratio is commonly used for widescreen videos?",
  //   options: ["4:3", "16:9", "1:1", "2.35:1"],
  //   answer: "16:9",
  // },
  // {
  //   id: 16,
  //   question: "What is the purpose of 'J-Cut' in video editing?",
  //   options: [
  //     "Adding a jump-cut effect",
  //     "Smooth transition between audio and video",
  //     "Joining two video clips",
  //     "Creating a jagged transition",
  //   ],
  //   answer: "Smooth transition between audio and video",
  // },
  // {
  //   id: 17,
  //   question:
  //     "Which video editing technique involves reversing the playback direction?",
  //   options: [
  //     "Reverse Engineering",
  //     "Backward Playback",
  //     "Reverse Playback",
  //     "Playback Reversal",
  //   ],
  //   answer: "Reverse Playback",
  // },
  // {
  //   id: 18,
  //   question: "What is 'L-Cut' in video editing?",
  //   options: [
  //     "Cutting clips into an L-shape",
  //     "Editing audio before video",
  //     "Editing video before audio",
  //     "Extending audio beyond the cut in video",
  //   ],
  //   answer: "Extending audio beyond the cut in video",
  // },
  // {
  //   id: 19,
  //   question:
  //     "Which video editing term refers to the process of combining multiple clips into one?",
  //   options: ["Composition", "Concatenation", "Merging", "Consolidation"],
  //   answer: "Concatenation",
  // },
  // {
  //   id: 20,
  //   question:
  //     "In video editing, what is the purpose of the 'Dolly Zoom' effect?",
  //   options: [
  //     "Creating a smooth camera movement",
  //     "Zooming in and out simultaneously",
  //     "Adding a blur effect",
  //     "Rotating the camera while zooming",
  //   ],
  //   answer: "Zooming in and out simultaneously",
  // },
  // {
  //   id: 21,
  //   question: "What does 'Multicam Editing' allow in video editing?",
  //   options: [
  //     "Editing multiple cameras simultaneously",
  //     "Adding multiple audio tracks",
  //     "Creating multiple timelines",
  //     "Simultaneous playback of multiple video angles",
  //   ],
  //   answer: "Simultaneous playback of multiple video angles",
  // },
  // {
  //   id: 22,
  //   question: "What is the purpose of 'Motion Tracking' in video editing?",
  //   options: [
  //     "Tracking camera movements",
  //     "Animating text or graphics to follow an object",
  //     "Adding motion to still images",
  //     "Tracking the motion of the editor",
  //   ],
  //   answer: "Animating text or graphics to follow an object",
  // },
  // {
  //   id: 23,
  //   question:
  //     "Which video editing term refers to the removal of unwanted sections from a video?",
  //   options: ["Trimming", "Cropping", "Cutting", "Exclusion"],
  //   answer: "Trimming",
  // },
  // {
  //   id: 24,
  //   question: "What is the 'Rule of Thirds' in video composition?",
  //   options: [
  //     "Dividing the screen into nine equal parts",
  //     "Using three cameras for recording",
  //     "Editing in three segments",
  //     "Creating a three-act structure",
  //   ],
  //   answer: "Dividing the screen into nine equal parts",
  // },
  // {
  //   id: 25,
  //   question:
  //     "Which video editing technique involves slowing down the playback speed?",
  //   options: ["Fast Motion", "Speed Ramp", "Time Lapse", "Slow Motion"],
  //   answer: "Slow Motion",
  // },
  // {
  //   id: 26,
  //   question: "What is 'In and Out Points' in video editing?",
  //   options: [
  //     "Audio editing technique",
  //     "Setting the beginning and ending of a selected portion",
  //     "Cutting clips into 'in' and 'out' segments",
  //     "Editing inside and outside the timeline",
  //   ],
  //   answer: "Setting the beginning and ending of a selected portion",
  // },
  // {
  //   id: 27,
  //   question: "What does the term 'Denoising' refer to in video editing?",
  //   options: [
  //     "Reducing noise in audio",
  //     "Adding noise for artistic effect",
  //     "Blurring the video",
  //     "Enhancing background noise",
  //   ],
  //   answer: "Reducing noise in audio",
  // },
  // {
  //   id: 28,
  //   question:
  //     "Which video editing effect creates a transition by turning the screen to black or white?",
  //   options: [
  //     "Fade In/Out",
  //     "Wipe Transition",
  //     "Dissolve Effect",
  //     "Black & White Transition",
  //   ],
  //   answer: "Fade In/Out",
  // },
  // {
  //   id: 29,
  //   question: "What is the purpose of 'Storyboarding' in video editing?",
  //   options: [
  //     "Adding story elements to videos",
  //     "Creating an outline for a video project",
  //     "Animating characters in videos",
  //     "Organizing clips in a visual sequence",
  //   ],
  //   answer: "Creating an outline for a video project",
  // },
  // {
  //   id: 30,
  //   question: "In video editing, what is 'Render Time'?",
  //   options: [
  //     "Time spent planning a project",
  //     "Time taken to export the final video",
  //     "The duration of a video clip",
  //     "The time between video edits",
  //   ],
  //   answer: "Time taken to export the final video",
  // },
  // ... (15 more questions)
];

const TestForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const navigate = useNavigate();

  const storedAuth = JSON.parse(localStorage.getItem("auth"));
  const storedUser = storedAuth?.user;
  console.log(storedUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setSelectedQuestions(generateRandomQuestions(allQuestions, 15));
  }, []);

  const onSubmit = async (data) => {
    setSubmitted(true);
    let correct = 0;
    selectedQuestions.forEach((q) => {
      if (data[q.id] === q.answer) {
        correct++;
      }
    });
    setScore(correct);

    const testResult = correct > 2 ? "pass" : "fail";
    const email = localStorage.getItem("storedEmail");

    try {
      console.log("Try test");
      const response = await fetch(
        `http://localhost:4943/api/v1/auth/updateTestResult/${email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ testResult }),
        }
      );
      console.log(`Responese : ${response}`);
      if (!response.ok) {
        throw new Error("Failed to update test result");
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }

    if (correct > 2) {
      toast.success("Congratulations, you passed the test!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/login");
    } else {
      toast.error("Sorry, you did not pass the test. Please try again later.", {
        position: "top-right",
        autoClose: 5000, // Close the notification after 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={VideoEditingLogo}
            alt="Video Editing"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Video Editing Test
          </div>
          <p className="mt-2 text-gray-500">
            Test your knowledge about video editing with this simple test. You
            need to answer at least 8 questions correctly to pass the test.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            {selectedQuestions.map((q, index) => (
              <div key={q.id}>
                <p className="text-gray-700 font-medium">
                  {index + 1}. {q.question}
                </p>

                <div className="flex flex-wrap gap-2">
                  {q.options.map((o, index) => (
                    <label
                      key={o}
                      className="inline-flex items-center mt-3 cursor-pointer"
                    >
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-indigo-600"
                        {...register(`${q.id}`, { required: true })}
                        value={o}
                        disabled={submitted}
                      />
                      <span className="ml-2 text-gray-700">
                        {String.fromCharCode(65 + index)}. {o}
                      </span>
                    </label>
                  ))}
                </div>

                {errors[q.id] && (
                  <p className="text-red-500 text-sm">
                    Please select an option for this question.
                  </p>
                )}
              </div>
            ))}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 disabled:opacity-50"
                disabled={submitted}
              >
                Submit
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default TestForm;
