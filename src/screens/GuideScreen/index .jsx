import React, { useEffect, useState } from 'react'
import './style.css'
import { Button, IconButton } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import QuestionInfo from "../../screens/TestScreen/components/QuestionInfo"
function Guide() {
    const [sampleQuestion, setSampleQuestion] = useState(null);
    const [sampleBranches, setSampleBranches] = useState(null);
    const [branchCount, setBranchCount] = useState(0);
    const [pagenation, setPagenation] = useState(false);
    const [message, setMessage] = useState("");
    useEffect(() => {
        const sample = JSON.parse(window.localStorage.getItem('sample-question'));
        setSampleQuestion(sample.question);
        setSampleBranches(sample.branches);
    }, [])
    useEffect(() => {
        console.log(sampleBranches);
    }, [sampleBranches])
    if (!sampleBranches || !sampleQuestion) {
        return <div className="guide-main-container">Loading....</div>
    }

    const handleNext = (event) => {
        if (branchCount < sampleBranches.length - 1 && pagenation) {
            setBranchCount(prev => prev + 1);
            setPagenation(false);
            setMessage('');
        }
    }

    const handlePrev = (event) => {
        if (branchCount > 0 && pagenation) {
            setBranchCount(prev => prev - 1);
            setPagenation(false);
            setMessage('');
        }
    }

    const HandleBranchFinished = () => {
        setMessage(sampleBranches[branchCount].text);
        setPagenation(true);
    }
    // -map the sample branches to the message and Question info
    // -update QuestionInfo with a new infoType "autocomplete" that given shapes and lines will display the shapes vertices and the line , see sample-Question file for more information about the branches
    // - make a count state that will control the displayed branch

    return (
        <div className="guide-main-container">
            <h2>Guide</h2>
            <div className="guide-branches">
                <IconButton
                    aria-label="previous"
                    style={{ dropShadow: "1px 3px 19px #9e9e9e" }}
                    onClick={handlePrev}
                >
                    <ChevronLeftIcon style={{ fontSize: 40 }} />
                </IconButton>
                <QuestionInfo question={sampleQuestion} infoType='line' />
                <QuestionInfo question={sampleBranches[branchCount].shapes} lines={sampleBranches[branchCount].lines} Finish={HandleBranchFinished} />
                <IconButton
                    aria-label="next"
                    style={{ dropShadow: "1px 3px 19px #9e9e9e" }}
                    onClick={handleNext}
                >
                    <ChevronRightIcon style={{ fontSize: 40 }} />
                </IconButton>
            </div>
            <h4>{message}</h4>
        </div>
    )
}

export default Guide
