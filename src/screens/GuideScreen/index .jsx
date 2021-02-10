import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import './style.css'
import { Button, IconButton } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import QuestionInfo from "../../screens/TestScreen/components/QuestionInfo"
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

const useStyle = makeStyles((theme) => ({
    playBtn: {
        background: 'red',
        alignSelf: 'flex-end',
        margin: "0px 20px 20px 0px"
    }
}))

function Guide() {
    const [sampleQuestion, setSampleQuestion] = useState(null);
    const [sampleBranches, setSampleBranches] = useState(null);
    const [branchCount, setBranchCount] = useState(0);
    const [pagenation, setPagenation] = useState(false);
    const [message, setMessage] = useState("");
    const history = useHistory();

    const classes = useStyle();

    useEffect(() => {
        const sample = JSON.parse(window.localStorage.getItem('sample-question'));
        setSampleQuestion(sample.question);
        setSampleBranches(sample.branches);
    }, [])

    useEffect(() => {
        console.log(sampleBranches);
    }, [sampleBranches])


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

    const handleStart = (event) => {
        history.push('exercises')
    }

    if (!sampleBranches || !sampleQuestion) {
        return <div className="guide-main-container">Loading....</div>
    }

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
            {
                branchCount === sampleBranches.length - 1 ?
                    (<Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.playBtn}
                        startIcon={<PlayCircleOutlineIcon />}
                        onClick={handleStart}
                    >
                        Play
                    </Button>) :
                    <div></div>
            }

        </div>
    )
}

export default Guide


