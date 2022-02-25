import React, {useState, useEffect} from "react";
import styled from "styled-components";
import axios from 'axios';
import AddAnswerModal from "./AddAnswerModal"
import Highlighter from "react-highlight-words";

const MainDiv = styled.div`
  color: #3a3b3c;
  background: transparent;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

const BlockHeader = styled.h2`
  padding: .25em 0em .25em;
  display: block;
`;

const AnswerBlock = styled.div`
  background: transparent;
  font-weight: thin;
  font-size: 11px;
  padding: 0.25em 1em;
`;

const Paragraph = styled.p`
  color: #3a3b3c;
  font-size: x-small;
  font-size: 7px;
  font-weight: 200;
  margin-bottom: 5px;
`;

const Button = styled.button`
  height: 16px;
  font-size: x-small;
`;

const StyledSpan = styled.span`
  color: #3a3b3c;
  height: 16px;
  font-size: 7px;
  float: right;
  vertical-align: baseline;
  font-weight: 200;
`;

const ClickableSpan= styled.span`
  text-decoration-line: underline;
  font-size: 7px;
  cursor: pointer;
`;

const ClickableDiv= styled.div`
  margin: 1em 2em;
  text-decoration-line: underline;
  font-size: 7px;
  cursor: pointer;
`;

const QuestionListEntry = ({questionObj, highlightedString}) => {
  const [answerCount, setAnswerCount] = useState(2)
  const [show, setShow] = useState(false);

  if (questionObj === undefined) {
    return (<div></div>)
  } else {
    return (
      <MainDiv className="questions-and-answers-question-list-entry">
      {/* <Highlighter
          highlightClassName="YourHighlightClass"
          searchWords={highlightedString}
          autoEscape={true}
          textToHighlight={"yes it will keep you warm and hidden from predators"}
        /> */}
       <span>
        <BlockHeader>Q: {questionObj.question_body}
           <StyledSpan>  Helpful?  <ClickableSpan>Yes</ClickableSpan>  |  <ClickableSpan onClick={() => setShow(true)}>Add Answer</ClickableSpan>
           <AddAnswerModal show={show} onClose={() => setShow(false)}/>
           </StyledSpan>
        </BlockHeader>
          {Object.values(questionObj.answers)
          .sort((a, b) => { return b.helpfulness - a.helpfulness; })
          .slice(0, answerCount)
          .map((answerObj, idx) => (
            <AnswerBlock key={idx}>
              <span>
                <h5> A: </h5> {answerObj.body}
              </span>
              <Paragraph>
                by {answerObj.answerer_name}  |  Helpful? <ClickableSpan>Yes</ClickableSpan>  |  <ClickableSpan>Report</ClickableSpan>
              </Paragraph>
            </AnswerBlock>
          ))}
      </span>
        {(Object.values(questionObj.answers).length > 2)
        ?
        <ClickableDiv onClick={() => {setAnswerCount(questionObj.answers.length)}}>More answers</ClickableDiv>
        :
        null}
     </MainDiv>
    )
  }
};

export default QuestionListEntry;

/*
TODO :
- add highlight functionality here (use highlightedString prop as text to highlight within this div)
*/





