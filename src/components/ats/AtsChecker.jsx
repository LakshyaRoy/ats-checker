import { useState } from "react";
import { pdfjs } from "react-pdf";
import { excludedWords } from "../../utils/excludedWords";
import { Typography } from "@mui/material";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  styled,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../Navbar";

const StyledContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  padding: "2rem",
  borderRadius: "8px",
});

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
});

const StyledHeading = styled("h1")({
  textAlign: "left",
  color: "#333",
  fontSize: "3rem",
  fontWeight: "bold",
  marginBottom: "1rem",
});

const Ats = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState([]);
  const [matchWords, setMatchWords] = useState([]);
  const [score, setScore] = useState(null);
  const [isScoreVisible, setIsScoreVisible] = useState(false);
  const onChangeHandle = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        let result = fileReader.result;
        // console.log(result);
        extractText(result);
      };
    } else {
      toast.error("Please upload a valid pdf file");
    }
  };

  async function extractText(url) {
    try {
      let pdf = await pdfjs.getDocument(url).promise;
      // console.log(pdf);
      let allText = [];
      let pages = pdf.numPages; // Get the total number of pages in the PDF
      for (let i = 1; i <= pages; i++) {
        let page = await pdf.getPage(i); // Get the page object for each page
        let txt = await page.getTextContent(); // Get the text content of the page
        let text = txt.items.map((s) => s.str).join(""); // Concatenate the text items into a single string
        allText.push(text); // Add the extracted text to the array
      }
      setResumeText(allText);
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
    }
  }

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };
  const handleCheckAtsResult = () => {
    if (!resumeText.length) return toast.error("Please upload a pdf file");

    if (!jobDescription.length)
      return toast.error("Please enter job description");

    const jdWords = jobDescription
      .split(" ")
      .filter((word) => !excludedWords.includes(word.toLocaleLowerCase()));

    const resumeWords = resumeText.map((item) =>
      item
        .split(" ")
        .filter((word) => !excludedWords.includes(word.toLocaleLowerCase()))
    );

    // console.log("jdWords", jdWords);
    // console.log("resumeWords", resumeWords[0]);

    // Check if each word in `jdWords` exists in any of the `resumeWords`
    const matchingwords = jdWords.filter((word) =>
      resumeWords[0].some((resumeItem) => resumeItem.includes(word))
    );
    console.log(matchWords.length);

    // console.log(finalMatch);
    setScore(Math.floor((matchingwords.length / jdWords.length) * 100));

    setMatchWords(matchingwords);
  };

  // console.log(score);
  // console.log(matchWords);

  return (
    <>
      <Navbar />
      <StyledContainer>
        <StyledBox>
          <StyledHeading>Track Resume 😎</StyledHeading>
          <TextField
            id="jobDescription"
            label="Enter Job Description"
            multiline
            rows={4}
            value={jobDescription}
            onChange={handleJobDescriptionChange}
          />
          <input
            type="file"
            name="resume"
            id="resume"
            accept=".pdf"
            onChange={(e) => onChangeHandle(e)}
          />
        </StyledBox>
        <Stack
          width={"100%"}
          direction="row"
          alignItems={"start"}
          justifyContent={"start"}
          py={4}
          flexWrap={"wrap"}
          gap={2}
        >
          <Button
            variant="contained"
            className="w-full sm:w-fit"
            onClick={handleCheckAtsResult}
          >
            Check ATS Result
          </Button>
          <Button
            variant="contained"
            className="w-full sm:w-fit"
            disabled={
              jobDescription.length === 0 ||
              resumeText.length === 0 ||
              score === null
            }
            onClick={() => {
              setIsScoreVisible(true);
            }}
          >
            Check Score
          </Button>
          {isScoreVisible ? (
            <Typography
              variant="h6"
              color={`${score > 50 ? "green" : "red"}`}
              border={"1px solid "}
              sx={{ padding: "0.1rem", paddingX: "1rem" }}
              borderRadius={"5px"}
              className="w-full sm:w-fit text-center"
            >
              Score: {score}%
            </Typography>
          ) : null}
        </Stack>
        <ToastContainer />

        {matchWords.length > 0 ? (
          resumeText?.length > 0 ? (
            <StyledBox>
              <TextField
                id="matched-words"
                label="Matched Words"
                multiline
                rows={10}
                value={matchWords.join(" ")}
                disabled
              />
            </StyledBox>
          ) : null
        ) : (
          <Typography
            variant="h6"
            sx={{ padding: "0.1rem", paddingX: "1rem", border: "1px solid" }}
            className="w-full sm:w-fit text-center"
          >
            No Match Found!
          </Typography>
        )}
      </StyledContainer>
    </>
  );
};

export default Ats;
